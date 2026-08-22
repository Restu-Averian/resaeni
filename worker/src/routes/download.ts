import { Hono } from "hono";
import type { Bindings } from "../types/bindings";
import { errorResponse } from "../utils/response";

const downloadRouter = new Hono<{ Bindings: Bindings }>();

downloadRouter.get("/", async (c) => {
  const url = c.req.query("url");
  const filename = c.req.query("filename") || "video.mp4";

  if (!url) {
    return c.json(errorResponse("INVALID_URL", "Video URL is required"), 400);
  }

  const targetUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://videos.resaeni.cc${url.startsWith("/") ? url : `/${url}`}`;

  try {
    const rangeHeader = c.req.header("range");
    const upstream = await fetch(targetUrl, {
      headers: rangeHeader ? { range: rangeHeader } : undefined,
    });

    if (!upstream.ok && upstream.status !== 206) {
      return c.json(
        errorResponse("FETCH_FAILED", "Failed to fetch video stream"),
        upstream.status >= 400 && upstream.status <= 599
          ? (upstream.status as 400 | 404 | 500 | 502 | 503)
          : 502,
      );
    }

    const headers = new Headers(upstream.headers);
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set(
      "Access-Control-Expose-Headers",
      "Content-Disposition, Content-Length, Content-Range",
    );

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch {
    return c.json(
      errorResponse("DOWNLOAD_ERROR", "Failed to stream video download"),
      500,
    );
  }
});

export default downloadRouter;
