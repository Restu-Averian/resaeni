import type { Client } from "@libsql/client";
import { parseAired } from "../../anime-details/utils";
import type { FeaturedRow } from "../types";
import { FEATURED_ANIME_ID, parseGenres } from "../utils";

export const loadFeatured = async (dbClient: Client) => {
  const result = await dbClient.execute({
    sql: `
			SELECT
				id,
				title_en,
				title_romaji,
				title_native,
				type,
				season,
				aired,
				genres,
				description,
				banner_bg_img,
				photo,
				(
					SELECT COUNT(*)
					FROM episodes
					WHERE episodes.anime_id = anime_info.id
				) AS episodes_count
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

  const aired = parseAired(row.aired, row.season);

  return {
    id: Number(row.id),
    title_en: row.title_en,
    title_romaji: row.title_romaji,
    title_native: row.title_native,
    type: row.type,
    year: aired.year,
    genres: parseGenres(row.genres),
    description: row.description,
    banner_bg_img: row.banner_bg_img,
    photo: row.photo,
    episodes_count: Number(row.episodes_count ?? 0),
  };
};
