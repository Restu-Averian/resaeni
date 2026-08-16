import { Hono } from "hono";
import type { Bindings } from "../../types/bindings";
import { handleAnimeFinderSearch } from "./handlers/search";

const animeFinderRouter = new Hono<{ Bindings: Bindings }>();

animeFinderRouter.post("/", handleAnimeFinderSearch);

export default animeFinderRouter;
