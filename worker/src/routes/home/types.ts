import type { Context } from "hono";
import type { Bindings } from "../../types/bindings";

export type FeaturedRow = {
  id: string;
  title_en: string;
  title_romaji: string;
  title_native: string;
  type: string;
  season: string | null;
  aired: string | null;
  genres: string;
  description: string;
  banner_bg_img: string;
  photo: string;
  episodes_count: number;
};

export type TonightPickRow = {
  id: string;
  title_en: string;
  title_romaji: string;
  rating: number;
  type: string;
  photo: string;
};

export type HomeContext = Context<{ Bindings: Bindings }>;
