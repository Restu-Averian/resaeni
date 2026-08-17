import { Hono } from "hono";
import type { Bindings } from "../../types/bindings";

import { handleAnimeList } from "./handlers/list";
import { handleOptions } from "./handlers/options";

const animeListRouter = new Hono<{ Bindings: Bindings }>();

animeListRouter.use("*", async (c, next) => {
  await next();

  c.header("Cache-Control", "no-store");
});

animeListRouter.get("/", handleAnimeList);
animeListRouter.get("/options", handleOptions);

export default animeListRouter;
