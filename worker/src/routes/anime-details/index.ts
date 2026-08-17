import { Hono } from "hono";
import type { Bindings } from "../../types/bindings";

import { handleAnimeCharacters } from "./handlers/characters";
import { handleAnimeDetails } from "./handlers/detail";
import { handleAnimeEpisode } from "./handlers/episode-link";
import { handleAnimeEpisodes } from "./handlers/episodes";

const animeDetailsRouter = new Hono<{ Bindings: Bindings }>();

animeDetailsRouter.use("*", async (c, next) => {
  await next();

  c.header("Cache-Control", "no-store");
});

animeDetailsRouter.get("/", handleAnimeDetails);
animeDetailsRouter.get("/episodes", handleAnimeEpisodes);
animeDetailsRouter.get("/episodes/:episode_number", handleAnimeEpisode);
animeDetailsRouter.get("/characters", handleAnimeCharacters);

export default animeDetailsRouter;
