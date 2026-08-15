import { Hono } from "hono";

import type { Bindings } from "../types/bindings";
import { successResponse } from "../utils/response";

const ready = new Hono<{ Bindings: Bindings }>();

ready.get("/", (c) => c.json(successResponse({ status: "ready" })));

export default ready;
