import type { Client } from "@libsql/client";
import { parseAired } from "../../anime-details/utils";
import type { TonightPickRow } from "../types";
import { TONIGHTS_PICK_IDS } from "../utils";

export const loadTonightsPicks = async (dbClient: Client) => {
  const result = await dbClient.execute({
    sql: `
			SELECT
				id,
				title_en,
				title_romaji,
				title_native,
				rating,
				type,
				photo,
				season,
				aired,
				(
					SELECT COUNT(*)
					FROM episodes
					WHERE episodes.anime_id = anime_info.id
				) AS episodes_count
			FROM anime_info
			WHERE id IN (${TONIGHTS_PICK_IDS.map(() => "?").join(", ")})
			ORDER BY updated_at desc;
		`,
    args: [...TONIGHTS_PICK_IDS],
  });

  const rows = result.rows as unknown as (TonightPickRow & {
    title_native: string;
    season: string;
    aired: string;
    episodes_count: number;
  })[];

  /*
   * SQL IN (...) tidak menjamin urutan hasil.
   * Susun ulang berdasarkan TONIGHTS_PICK_IDS.
   */
  const rowById = new Map(rows.map((row) => [String(row.id), row]));

  return TONIGHTS_PICK_IDS.flatMap((id) => {
    const row = rowById.get(id);

    if (!row) {
      return [];
    }

    const aired = parseAired(row.aired, row.season);

    return [
      {
        id: Number(row.id),
        title_en: row.title_en,
        title_romaji: row.title_romaji,
        title_native: row.title_native,
        rating: Number(row.rating),
        type: row.type,
        photo: row.photo,
        episodes_count: Number(row.episodes_count),
        year: aired.year,
      },
    ];
  });
};
