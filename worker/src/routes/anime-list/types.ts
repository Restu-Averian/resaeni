import type { Context } from "hono";
import type { Bindings } from "../../types/bindings";

export type AnimeListContext = Context<{ Bindings: Bindings }>;

export type AnimeListOrder = "highest_rated" | "latest" | "a_z" | "z_a";
