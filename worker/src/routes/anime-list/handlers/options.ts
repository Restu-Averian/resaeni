import { createDatabaseClient } from "../../../db/client";
import { databaseUnavailable } from "../../../utils/response";
import type { AnimeListContext } from "../types";

export const handleOptions = async (c: AnimeListContext) => {
  if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
    return databaseUnavailable(c);
  }

  try {
    const dbClient = createDatabaseClient(c.env);

    const [genresResult, typesResult] = await Promise.all([
      dbClient.execute(`
        SELECT DISTINCT value AS genre
        FROM anime_info, json_each(genres)
        WHERE value IS NOT NULL AND value != ''
        ORDER BY value COLLATE NOCASE
      `),

      dbClient.execute(`
        SELECT DISTINCT type
        FROM anime_info
        WHERE type IS NOT NULL AND type != ''
        ORDER BY type COLLATE NOCASE
      `),
    ]);

    const genres = [
      "Any",
      ...genresResult.rows.map((row) => String(row.genre)),
    ];

    const types = ["Any", ...typesResult.rows.map((row) => String(row.type))];

    return c.json({
      genre: genres,
      type: types,
    });
  } catch {
    return databaseUnavailable(c);
  }
};
