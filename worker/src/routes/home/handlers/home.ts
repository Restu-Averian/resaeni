import { createDatabaseClient } from "../../../db/client";
import { errorResponse, successResponse } from "../../../utils/response";
import { loadFeatured } from "../loaders/featured";
import { loadTonightsPicks } from "../loaders/tonights-picks";
import type { HomeContext } from "../types";

export const handleHome = async (c: HomeContext) => {
  if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
    console.error("Turso local credentials must be configured.");

    return c.json(
      errorResponse(
        "DATABASE_UNAVAILABLE",
        "Database is temporarily unavailable",
      ),
      503,
    );
  }

  try {
    const dbClient = createDatabaseClient(c.env);

    const [featuredResult, tonightsPicksResult] =
      await Promise.allSettled([
        loadFeatured(dbClient),
        loadTonightsPicks(dbClient),
      ]);

    const failedQueryCount = [
      featuredResult,
      tonightsPicksResult,
    ].filter((result) => result.status === "rejected").length;

    /*
     * Kalau seluruh bagian gagal, response kosong akan menyesatkan.
     * Lebih baik anggap database benar-benar unavailable.
     */
    if (failedQueryCount === 2) {
      console.error("All home database queries failed.");

      return c.json(
        errorResponse(
          "DATABASE_UNAVAILABLE",
          "Database is temporarily unavailable",
        ),
        503,
      );
    }

    const { featured, tonightsPicks } = {
      featured:
        featuredResult.status === "fulfilled" ? featuredResult.value : {},
      tonightsPicks:
        tonightsPicksResult.status === "fulfilled"
          ? tonightsPicksResult.value
          : [],
    };

    if (featuredResult.status === "rejected") {
      console.error("Home query failed: featured");
    }

    if (tonightsPicksResult.status === "rejected") {
      console.error("Home query failed: tonights_picks");
    }

    /*
     * Bisa dipakai untuk observability/debugging.
     * Frontend tidak wajib membaca header ini.
     */
    if (failedQueryCount > 0) {
      c.header("X-Partial-Response", "true");
    }

    return c.json(
      successResponse({
        featured,
        tonights_picks: tonightsPicks,
      }),
      200,
    );
  } catch {
    /*
     * Hanya untuk error yang terjadi di luar promise query,
     * misalnya gagal membuat database client atau mapping tak terduga.
     */
    console.error("Unexpected home endpoint failure.");

    return c.json(
      errorResponse(
        "DATABASE_UNAVAILABLE",
        "Database is temporarily unavailable",
      ),
      503,
    );
  }
};
