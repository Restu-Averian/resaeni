import { createDatabaseClient } from "../../../db/client";
import { databaseUnavailable, errorResponse } from "../../../utils/response";
import {
  parseMalId,
  parsePagination,
} from "../utils";
import type {
  AnimeDetailsContext,
  EpisodeRow,
} from "../types";

export const handleAnimeEpisodes = async (c: AnimeDetailsContext) => {
  const malId = parseMalId(c.req.param("mal_id"));
  if (!malId) {
    return c.json(
      errorResponse("INVALID_MAL_ID", "MAL ID must be a positive number"),
      400,
    );
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

    const [countResult, itemsResult] = await Promise.all([
      dbClient.execute({
        sql: "SELECT COUNT(*) AS total FROM episodes WHERE anime_id = ?",
        args: [String(malId)],
      }),

      dbClient.execute({
        sql: `
					SELECT episode_number, thumbnail_url, aired_at
					FROM episodes
					WHERE anime_id = ?
					ORDER BY episode_number ASC
					LIMIT ? OFFSET ?
				`,
        args: [String(malId), limit, offset],
      }),
    ]);

    const items = (itemsResult.rows as unknown as EpisodeRow[]).map((row) => ({
      episode_number: Number(row.episode_number),
      thumbnail_url: row.thumbnail_url,
      aired_at: row.aired_at,
    }));

    return c.json({
      items,
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
