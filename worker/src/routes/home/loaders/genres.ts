import type { Client } from "@libsql/client";
import type { GenreRow } from "../types";

export const loadGenres = async (dbClient: Client) => {
  const result = await dbClient.execute(`
		SELECT
			genre.value AS name,
			COUNT(*) AS anime_count
		FROM anime_info
		CROSS JOIN json_each(anime_info.genres) AS genre
		GROUP BY genre.value
		ORDER BY anime_count DESC, name ASC
		LIMIT 3;
	`);

  const rows = result.rows as unknown as GenreRow[];

  return rows.map((row) => ({
    name: String(row.name),
    anime_count: Number(row.anime_count),
  }));
};
