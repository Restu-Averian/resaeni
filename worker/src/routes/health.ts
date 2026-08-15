import { Hono } from "hono";

import type { Bindings } from "../types/bindings";
import { successResponse } from "../utils/response";

const health = new Hono<{ Bindings: Bindings }>();

health.get("/", (c) => c.json(successResponse({ status: "ok" })));

export default health;
