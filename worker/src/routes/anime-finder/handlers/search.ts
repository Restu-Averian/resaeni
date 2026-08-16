import { createDatabaseClient } from "../../../db/client";
import { errorResponse, successResponse } from "../../../utils/response";
import type {
  AnimeFinderContext,
  CatalogAnime,
  TraceMoeResponse,
  TraceMoeResult,
} from "../types";
import {
  ANIME_FINDER_ALLOWED_TYPES,
  ANIME_FINDER_MAX_FILE_SIZE,
  normalizeTraceResults,
} from "../utils";

const TRACE_MOE_URL = "https://api.trace.moe/search?anilistInfo&cutBorders";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

const getCatalogByMalId = async (
  c: AnimeFinderContext,
  results: TraceMoeResult[],
) => {
  const malIds = [
    ...new Set(
      results
        .filter((result) => result.anilist?.isAdult !== true)
        .map((result) => result.anilist?.idMal)
        .filter((id): id is number => typeof id === "number" && id > 0),
    ),
  ];

  if (malIds.length === 0) {
    return new Map<number, CatalogAnime>();
  }

  if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
    throw new Error("DATABASE_UNAVAILABLE");
  }

  const dbClient = createDatabaseClient(c.env);
  const placeholders = malIds.map(() => "?").join(",");
  const catalogResult = await dbClient.execute({
    sql: `
      SELECT id, title_en, title_romaji, type, photo, banner_bg_img
      FROM anime_info
      WHERE id IN (${placeholders})
    `,
    args: malIds.map(String),
  });

  return new Map(
    catalogResult.rows.map((row) => {
      const item = row as Record<string, unknown>;
      const catalog: CatalogAnime = {
        id: String(item.id),
        title_en: typeof item.title_en === "string" ? item.title_en : null,
        title_romaji:
          typeof item.title_romaji === "string" ? item.title_romaji : null,
        type: typeof item.type === "string" ? item.type : null,
        photo: typeof item.photo === "string" ? item.photo : null,
        banner_bg_img:
          typeof item.banner_bg_img === "string" ? item.banner_bg_img : null,
      };

      return [Number(catalog.id), catalog];
    }),
  );
};

export const handleAnimeFinderSearch = async (c: AnimeFinderContext) => {
  let formData: FormData;
  try {
    formData = await c.req.formData();
  } catch {
    return c.json(
      errorResponse("IMAGE_REQUIRED", "Screenshot image is required"),
      400,
      noStoreHeaders,
    );
  }

  const image = formData.get("image");

  if (!(image instanceof File)) {
    return c.json(
      errorResponse("IMAGE_REQUIRED", "Screenshot image is required"),
      400,
      noStoreHeaders,
    );
  }

  if (image.size === 0) {
    return c.json(
      errorResponse("IMAGE_REQUIRED", "Screenshot image is required"),
      400,
      noStoreHeaders,
    );
  }

  if (!ANIME_FINDER_ALLOWED_TYPES.includes(image.type)) {
    return c.json(
      errorResponse("INVALID_IMAGE_TYPE", "Upload a JPG, PNG, or WebP image"),
      400,
      noStoreHeaders,
    );
  }

  if (image.size > ANIME_FINDER_MAX_FILE_SIZE) {
    return c.json(
      errorResponse("IMAGE_TOO_LARGE", "Upload an image under 10MB"),
      400,
      noStoreHeaders,
    );
  }

  const traceFormData = new FormData();
  traceFormData.append("image", image, image.name || "screenshot");

  const headers = new Headers();
  if (c.env.TRACE_MOE_API_KEY) {
    headers.set("x-trace-key", c.env.TRACE_MOE_API_KEY);
  }

  const traceResponse = await fetch(TRACE_MOE_URL, {
    method: "POST",
    headers,
    body: traceFormData,
  });

  if (!traceResponse.ok) {
    return c.json(
      errorResponse(
        "TRACE_MOE_UNAVAILABLE",
        "Scene recognition is temporarily unavailable",
      ),
      502,
      noStoreHeaders,
    );
  }

  const traceData = (await traceResponse.json()) as TraceMoeResponse;
  const traceResults = Array.isArray(traceData.result) ? traceData.result : [];

  try {
    const catalogById = await getCatalogByMalId(c, traceResults);
    const matches = normalizeTraceResults(traceResults, catalogById);

    return c.json(
      successResponse({
        best_match: matches[0] ?? null,
        other_matches: matches.slice(1),
      }),
      200,
      noStoreHeaders,
    );
  } catch {
    return c.json(
      errorResponse(
        "DATABASE_UNAVAILABLE",
        "Database is temporarily unavailable",
      ),
      503,
      noStoreHeaders,
    );
  }
};
