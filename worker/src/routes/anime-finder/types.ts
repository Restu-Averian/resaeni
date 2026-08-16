import type { Context } from "hono";
import type { Bindings } from "../../types/bindings";

export type AnimeFinderContext = Context<{ Bindings: Bindings }>;

export type TraceMoeTitle = {
  native?: string;
  romaji?: string;
  english?: string;
};

export type TraceMoeResult = {
  anilist?: {
    id?: number;
    idMal?: number;
    isAdult?: boolean;
    title?: TraceMoeTitle;
  };
  episode?: number | string | null;
  at?: number | null;
  similarity?: number | null;
  image?: string | null;
  video?: string | null;
};

export type TraceMoeResponse = {
  result?: TraceMoeResult[];
};

export type CatalogAnime = {
  id: string;
  title_en: string | null;
  title_romaji: string | null;
  type: string | null;
  photo: string | null;
  banner_bg_img: string | null;
};

export type AnimeFinderMatch = {
  anilist_id: number | null;
  mal_id: number | null;
  title: TraceMoeTitle;
  episode: number | string | null;
  at: number | null;
  similarity: number;
  image: string | null;
  video: string | null;
  catalog: CatalogAnime | null;
};
