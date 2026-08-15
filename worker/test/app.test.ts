import { describe, expect, it } from "vitest";

import app from "../src/app";

describe("resaeni-api", () => {
  it("serves health endpoints", async () => {
    const root = await app.request("/");
    const health = await app.request("/health");
    const ready = await app.request("/ready");

    await expect(root.json()).resolves.toMatchObject({
      success: true,
      data: { service: "resaeni-api", status: "running" },
    });
    await expect(health.json()).resolves.toMatchObject({
      success: true,
      data: { status: "ok" },
    });
    await expect(ready.json()).resolves.toMatchObject({
      success: true,
      data: { status: "ready" },
    });
  });
});
