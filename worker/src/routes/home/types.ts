import type { Context } from "hono";
import type { Bindings } from "../../types/bindings";

export type FeaturedRow = {
  id: string;
  title_en: string;
  title_romaji: string;
  type: string;
  genres: string;
  description: string;
  banner_bg_img: string;
  photo: string;
};

export type TonightPickRow = {
  id: string;
  title_en: string;
  title_romaji: string;
  rating: number;
  type: string;
  photo: string;
};

export type GenreRow = {
  name: string;
  anime_count: number;
};

export type HomeContext = Context<{ Bindings: Bindings }>;
