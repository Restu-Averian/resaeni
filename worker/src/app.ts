import { Hono } from "hono";
import { cors } from "hono/cors";

import health from "./routes/health";
import ready from "./routes/ready";
import type { Bindings } from "./types/bindings";
import { errorResponse, successResponse } from "./utils/response";

const allowedOrigins = new Set(["http://localhost:5173"]);

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    origin: (origin) => (allowedOrigins.has(origin) ? origin : null),
  }),
);

app.get("/", (c) =>
  c.json(
    successResponse({
      service: "resaeni-api",
      status: "running",
    }),
  ),
);

app.route("/health", health);
app.route("/ready", ready);

app.notFound((c) => c.json(errorResponse("NOT_FOUND", "Route not found"), 404));

app.onError((error, c) => {
  console.error(error);
  return c.json(
    errorResponse("INTERNAL_SERVER_ERROR", "Internal server error"),
    500,
  );
});

export default app;
