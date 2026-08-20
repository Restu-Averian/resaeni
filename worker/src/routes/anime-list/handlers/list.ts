import { createDatabaseClient } from "../../../db/client";
import {
  databaseUnavailable,
  errorResponse,
  successResponse,
} from "../../../utils/response";
import { parseAired } from "../../anime-details/utils";
import type { AnimeListContext } from "../types";
import { orderByMap, parseOrder, parsePagination, trimQuery } from "../utils";

export const handleAnimeList = async (c: AnimeListContext) => {
  if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
    return databaseUnavailable(c);
  }

  const tab = c.req.query("tab") || "all";
  if (tab !== "all") {
    return c.json(
      errorResponse(
        "UNSUPPORTED_TAB",
        "This anime list tab is not supported yet",
      ),
      400,
    );
  }

  const { page, limit, offset } = parsePagination(
    c.req.query("page"),
    c.req.query("limit"),
  );

  const search = trimQuery(c.req.query("search"));
  const genre = trimQuery(c.req.query("genre"));
  const type = trimQuery(c.req.query("type"));
  const order = parseOrder(c.req.query("order"));

  const conditions: string[] = [];
  const args: (number | string)[] = [];

  if (search) {
    conditions.push(
      "(title_en LIKE ? OR title_romaji LIKE ? OR title_native LIKE ?)",
    );
    const searchPattern = `%${search}%`;
    args.push(searchPattern, searchPattern, searchPattern);
  }

  if (genre) {
    conditions.push(
      "EXISTS (SELECT 1 FROM json_each(anime_info.genres) AS genre_item WHERE genre_item.value = ?)",
    );
    args.push(genre);
  }

  if (type) {
    conditions.push("type = ? COLLATE NOCASE");
    args.push(type);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const dbClient = createDatabaseClient(c.env);
    const [itemsResult, countResult] = await Promise.all([
      dbClient.execute({
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
						updated_at,
						(
							SELECT COUNT(*)
							FROM episodes
							WHERE episodes.anime_id = anime_info.id
						) AS episodes_count
					FROM anime_info
					${whereClause}
					ORDER BY ${orderByMap[order]}
					LIMIT ? OFFSET ?
				`,
        args: [...args, limit, offset],
      }),
      dbClient.execute({
        sql: `
					SELECT COUNT(*) AS total
					FROM anime_info
					${whereClause}
				`,
        args,
      }),
    ]);

    const total = Number(countResult.rows[0]?.total ?? 0);
    const items = itemsResult.rows.map((row) => {
      const item = row as Record<string, unknown>;
      const aired = parseAired(
        typeof item.aired === "string" ? item.aired : null,
        typeof item.season === "string" ? item.season : null,
      );

      return {
        id: String(item.id),
        title_en: String(item.title_en ?? ""),
        title_romaji: String(item.title_romaji ?? ""),
        title_native: String(item.title_native ?? ""),
        rating: Number(item.rating ?? 0),
        type: String(item.type ?? ""),
        photo: typeof item.photo === "string" ? item.photo : null,
        episodes_count: Number(item.episodes_count ?? 0),
        year: aired.year,
        updated_at:
          typeof item.updated_at === "string" ? item.updated_at : null,
      };
    });

    return c.json(
      successResponse({
        items,
        pagination: {
          page,
          limit,
          total,
          total_pages: Math.ceil(total / limit),
        },
      }),
    );
  } catch {
    return databaseUnavailable(c);
  }
};
