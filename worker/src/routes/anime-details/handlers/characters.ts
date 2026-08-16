import { createDatabaseClient } from "../../../db/client";
import {
  databaseUnavailable,
  invalidMalId,
  parseMalId,
  parsePagination,
} from "../utils";
import type {
  AnimeDetailsContext,
  CharacterVoiceRow,
} from "../types";

export const handleAnimeCharacters = async (c: AnimeDetailsContext) => {
  const malId = parseMalId(c.req.param("mal_id"));
  if (!malId) {
    return invalidMalId(c);
  }

  if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
    return databaseUnavailable(c);
  }

  const { page, limit, offset } = parsePagination(
    c.req.query("page"),
    c.req.query("limit"),
  );

  try {
    const dbClient = createDatabaseClient(c.env);
    const [countResult, rowsResult] = await Promise.all([
      dbClient.execute({
        sql: "SELECT COUNT(*) AS total FROM anime_characters WHERE anime_id = ?",
        args: [String(malId)],
      }),
      dbClient.execute({
        sql: `
					SELECT
						ac.character_id,
						c.name,
						ac.role,
						c.photo,
						va.id AS voice_actor_id,
						va.name AS voice_actor_name,
						va.photo AS voice_actor_photo,
						va.country
					FROM (
						SELECT *
						FROM anime_characters
						WHERE anime_id = ?
						ORDER BY CASE role WHEN 'Main' THEN 0 ELSE 1 END, id ASC
						LIMIT ? OFFSET ?
					) ac
					JOIN characters c ON c.id = ac.character_id
					LEFT JOIN character_voice_actors cva ON cva.anime_character_id = ac.id
					LEFT JOIN voice_actors va ON va.id = cva.voice_actor_id
					ORDER BY CASE ac.role WHEN 'Main' THEN 0 ELSE 1 END, c.name COLLATE NOCASE ASC, va.country = 'Japan' DESC, va.name COLLATE NOCASE ASC
				`,
        args: [String(malId), limit, offset],
      }),
    ]);

    const characterMap = new Map<
      string,
      {
        character_id: string;
        name: string;
        role: string | null;
        photo: string | null;
        voice_actors: Array<{
          id: string;
          name: string;
          photo: string | null;
          country: string | null;
        }>;
      }
    >();

    for (const row of rowsResult.rows as unknown as CharacterVoiceRow[]) {
      if (!characterMap.has(row.character_id)) {
        characterMap.set(row.character_id, {
          character_id: row.character_id,
          name: row.name,
          role: row.role,
          photo: row.photo,
          voice_actors: [],
        });
      }

      if (row.voice_actor_id && row.voice_actor_name) {
        characterMap.get(row.character_id)?.voice_actors.push({
          id: row.voice_actor_id,
          name: row.voice_actor_name,
          photo: row.voice_actor_photo,
          country: row.country,
        });
      }
    }

    return c.json({
      items: Array.from(characterMap.values()),
      pagination: {
        page,
        limit,
        total: Number(countResult.rows[0]?.total ?? 0),
      },
    });
  } catch {
    return databaseUnavailable(c);
  }
};
