import { Hono } from "hono";
import { cors } from "hono/cors";
import { Bindings } from "./types/bindings";
import { errorResponse } from "./utils/response";
import health from "./routes/health";
import homeRouter from "./routes/home";
import animeListRouter from "./routes/anime-list";
import animeDetailsRouter from "./routes/anime-details";

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
      "https://resaeni.cc",
    ],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
    credentials: false,
  }),
);

app.route("/health", health);

app.route("/api/home", homeRouter);
app.route("/api/anime", animeListRouter);
app.route("/api/anime/:mal_id", animeDetailsRouter);

app.notFound((c) => {
  return c.json(errorResponse("NOT_FOUND", "Route not found"), 404);
});

app.onError((err, c) => {
  console.error(err);
  return c.json(
    errorResponse("INTERNAL_SERVER_ERROR", "An unexpected error occurred"),
    500,
  );
});

export default app;
