import { createDatabaseClient } from "../../../db/client";
import { databaseUnavailable, errorResponse } from "../../../utils/response";
import { parseAired, parseGenres, parseMalId } from "../utils";
import type { AnimeDetailsContext, AnimeDetailsRow } from "../types";

export const handleAnimeDetails = async (c: AnimeDetailsContext) => {
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

  try {
    const dbClient = createDatabaseClient(c.env);
    const [animeResult, episodeCountResult] = await Promise.all([
      dbClient.execute({
        sql: `
					SELECT
						id,
						title_en,
						title_romaji,
						title_native,
						type,
						status,
						season,
						rating,
						studio,
						description,
						photo,
						banner_bg_img,
						genres,
						aired
					FROM anime_info
					WHERE id = ?
					LIMIT 1
				`,
        args: [String(malId)],
      }),
      dbClient.execute({
        sql: "SELECT COUNT(*) AS total FROM episodes WHERE anime_id = ?",
        args: [String(malId)],
      }),
    ]);

    const row = animeResult.rows[0] as unknown as AnimeDetailsRow | undefined;
    if (!row) {
      return c.json(errorResponse("ANIME_NOT_FOUND", "Anime not found"), 404);
    }

    const aired = parseAired(row.aired, row.season);

    return c.json({
      id: Number(row.id),
      title_en: row.title_en,
      title_romaji: row.title_romaji,
      title_native: row.title_native,
      type: row.type,
      status: row.status,
      episodes_count: Number(episodeCountResult.rows[0]?.total ?? 0),
      season: row.season,
      year: aired.year,
      aired_from: aired.aired_from,
      aired_to: aired.aired_to,
      score: row.rating === null ? null : Number(row.rating),
      studio: row.studio,
      synopsis: row.description,
      photo: row.photo,
      banner_bg_img: row.banner_bg_img,
      genres: parseGenres(row.genres),
    });
  } catch {
    return databaseUnavailable(c);
  }
};
