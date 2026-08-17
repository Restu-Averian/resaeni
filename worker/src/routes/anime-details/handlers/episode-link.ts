import { createDatabaseClient } from "../../../db/client";
import { databaseUnavailable, errorResponse } from "../../../utils/response";
import {
  normalizeNullableEpisodeNumber,
  parseEpisodeNumber,
  parseMalId,
} from "../utils";
import type {
  AnimeDetailsContext,
  AnimeDetailsRow,
  EpisodeLinkRow,
  EpisodeRow,
} from "../types";

export const handleAnimeEpisode = async (c: AnimeDetailsContext) => {
  const malId = parseMalId(c.req.param("mal_id"));

  if (!malId) {
    return c.json(
      errorResponse("INVALID_MAL_ID", "MAL ID must be a positive number"),
      400,
    );
  }

  const episodeNumber = parseEpisodeNumber(c.req.param("episode_number"));



  if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
    return databaseUnavailable(c);
  }

  try {
    const dbClient = createDatabaseClient(c.env);

    const animeResult = await dbClient.execute({
      sql: `
				SELECT id, title_en, title_romaji, title_native
				FROM anime_info
				WHERE id = ?
				LIMIT 1
			`,
      args: [String(malId)],
    });

    const anime = animeResult.rows[0] as unknown as
      | Pick<
          AnimeDetailsRow,
          "id" | "title_en" | "title_romaji" | "title_native"
        >
      | undefined;
    if (!anime) {
      return c.json(errorResponse("ANIME_NOT_FOUND", "Anime not found"), 404);
    }

    if (!episodeNumber) {
      return c.json(
        {
          ...errorResponse(
            "INVALID_EPISODE_NUMBER",
            "Episode number must be a positive number",
          ),
          title_en: anime.title_en,
          title_romaji: anime.title_romaji,
          title_native: anime.title_native,
        },
        400,
      );
    }

    const episodeResult = await dbClient.execute({
      sql: `
				SELECT e.id, e.episode_number, e.thumbnail_url, e.aired_at
				FROM episodes e
				WHERE e.anime_id = ?
					AND e.episode_number = ?
				LIMIT 1
			`,
      args: [String(malId), episodeNumber],
    });

    const episode = episodeResult.rows[0] as unknown as EpisodeRow | undefined;

    if (!episode) {
      return c.json(
        {
          ...errorResponse("EPISODE_NOT_FOUND", "Episode not found"),
          title_en: anime.title_en,
          title_romaji: anime.title_romaji,
          title_native: anime.title_native,
        },
        404,
      );
    }

    const [totalResult, previousResult, nextResult, linksResult] =
      await Promise.all([
        dbClient.execute({
          sql: "SELECT COUNT(*) AS total FROM episodes WHERE anime_id = ?",
          args: [String(malId)],
        }),
        dbClient.execute({
          sql: "SELECT MAX(episode_number) AS episode_number FROM episodes WHERE anime_id = ? AND episode_number < ?",
          args: [String(malId), episodeNumber],
        }),
        dbClient.execute({
          sql: "SELECT MIN(episode_number) AS episode_number FROM episodes WHERE anime_id = ? AND episode_number > ?",
          args: [String(malId), episodeNumber],
        }),
        dbClient.execute({
          sql: `
					SELECT embed_url
					FROM episode_links
					WHERE episode_id = ?
					ORDER BY id ASC
				`,
          args: [episode.id],
        }),
      ]);

    const previousEpisodeNumber = normalizeNullableEpisodeNumber(
      previousResult.rows[0]?.episode_number,
    );
    const nextEpisodeNumber = normalizeNullableEpisodeNumber(
      nextResult.rows[0]?.episode_number,
    );

    return c.json({
      title_en: anime.title_en,
      title_romaji: anime.title_romaji,
      title_native: anime.title_native,
      episode_number: Number(episode.episode_number),
      total_episodes: Number(totalResult.rows[0]?.total ?? 0),
      aired_at: episode.aired_at,
      previous_episode_number: previousEpisodeNumber,
      next_episode_number: nextEpisodeNumber,
      links: linksResult.rows as unknown as EpisodeLinkRow[],
      thumbnail_url: episode?.thumbnail_url,
    });
  } catch {
    return databaseUnavailable(c);
  }
};
