import { Hono } from "hono";
import type { Bindings } from "../../types/bindings";

import { handleHome } from "./handlers/home";

const homeRouter = new Hono<{ Bindings: Bindings }>();

homeRouter.use("*", async (c, next) => {
  await next();

  c.header("Cache-Control", "no-store");
});

homeRouter.get("/", handleHome);

export default homeRouter;
