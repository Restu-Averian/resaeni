import type { Client } from "@libsql/client";
import type { FeaturedRow } from "../types";
import { FEATURED_ANIME_ID, parseGenres } from "../utils";

export const loadFeatured = async (dbClient: Client) => {
  const result = await dbClient.execute({
    sql: `
			SELECT
				id,
				title_en,
				title_romaji,
				type,
				genres,
				description,
				banner_bg_img,
				photo
			FROM anime_info
			WHERE id = ?
			ORDER BY rating desc
			LIMIT 1;
			
		`,
    args: [FEATURED_ANIME_ID],
  });

  const row = result.rows[0] as unknown as FeaturedRow | undefined;

  if (!row) {
    return {};
  }

  return {
    id: Number(row.id),
    title_en: row.title_en,
    title_romaji: row.title_romaji,
    type: row.type,
    genres: parseGenres(row.genres),
    description: row.description,
    banner_bg_img: row.banner_bg_img,
    photo: row.photo,
  };
};
