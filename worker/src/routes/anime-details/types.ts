import type { Context } from "hono";
import type { Bindings } from "../../types/bindings";

export type AnimeDetailsRow = {
  id: string;
  title_en: string | null;
  title_romaji: string | null;
  title_native: string | null;
  type: string | null;
  status: string | null;
  season: string | null;
  rating: number | null;
  studio: string | null;
  description: string | null;
  photo: string | null;
  banner_bg_img: string | null;
  genres: string | null;
  aired: string | null;
};

export type EpisodeRow = {
  id: string;
  episode_number: number;
  thumbnail_url: string | null;
  aired_at: string | null;
};

export type EpisodeLinkRow = {
  embed_url: string | null;
};

export type CharacterVoiceRow = {
  character_id: string;
  name: string;
  role: string | null;
  photo: string | null;
  voice_actor_id: string | null;
  voice_actor_name: string | null;
  voice_actor_photo: string | null;
  country: string | null;
};

export type AnimeDetailsContext = Context<{ Bindings: Bindings }>;
