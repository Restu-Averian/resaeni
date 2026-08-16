import type { Client } from "@libsql/client";
import type { TonightPickRow } from "../types";
import { TONIGHTS_PICK_IDS } from "../utils";

export const loadTonightsPicks = async (dbClient: Client) => {
  const result = await dbClient.execute({
    sql: `
			SELECT
				id,
				title_en,
				title_romaji,
				rating,
				type,
				photo
			FROM anime_info
			WHERE id IN (${TONIGHTS_PICK_IDS.map(() => "?").join(", ")})
			ORDER BY updated_at desc;
		`,
    args: [...TONIGHTS_PICK_IDS],
  });

  const rows = result.rows as unknown as TonightPickRow[];

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

    return [
      {
        id: Number(row.id),
        title_en: row.title_en,
        title_romaji: row.title_romaji,
        rating: Number(row.rating),
        type: row.type,
        photo: row.photo,
      },
    ];
  });
};
