import type {
  AnimeFinderMatch,
  CatalogAnime,
  TraceMoeResult,
  TraceMoeTitle,
} from "./types";

const MAX_RESULTS = 6;

export const ANIME_FINDER_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const ANIME_FINDER_MAX_FILE_SIZE = 10 * 1024 * 1024;

const normalizeTitle = (title: TraceMoeTitle | undefined): TraceMoeTitle => ({
  native: typeof title?.native === "string" ? title.native : undefined,
  romaji: typeof title?.romaji === "string" ? title.romaji : undefined,
  english: typeof title?.english === "string" ? title.english : undefined,
});

export const normalizeTraceResults = (
  results: TraceMoeResult[],
  catalogById: Map<number, CatalogAnime>,
): AnimeFinderMatch[] => {
  return results
    .filter((result) => result.anilist?.isAdult !== true)
    .map((result) => {
      const malId =
        typeof result.anilist?.idMal === "number" ? result.anilist.idMal : null;

      return {
        anilist_id:
          typeof result.anilist?.id === "number" ? result.anilist.id : null,
        mal_id: malId,
        title: normalizeTitle(result.anilist?.title),
        episode: result.episode ?? null,
        at: typeof result.at === "number" ? result.at : null,
        similarity:
          typeof result.similarity === "number" ? result.similarity : 0,
        image: typeof result.image === "string" ? result.image : null,
        video: typeof result.video === "string" ? result.video : null,
        catalog: malId ? (catalogById.get(malId) ?? null) : null,
      };
    })
    .slice(0, MAX_RESULTS);
};
