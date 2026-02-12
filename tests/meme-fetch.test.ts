import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { memeFetch, configure } from "../src/index.js";

describe("memeFetch", () => {
  beforeEach(() => {
    configure({ imageSource: "cdn", slowThreshold: 3000 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns response with meme on 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Not Found", { status: 404 }))
    );

    const result = await memeFetch("https://example.com");
    expect(result.response.status).toBe(404);
    expect(result.meme).toBeDefined();
    expect(result.meme!.statusCode).toBe(404);
    expect(result.slow).toBe(false);
  });

  it("returns response without meme on 200", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("OK", { status: 200 }))
    );

    const result = await memeFetch("https://example.com");
    expect(result.response.status).toBe(200);
    expect(result.meme).toBeUndefined();
    expect(result.slow).toBe(false);
  });

  it("detects slow responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(new Response("OK", { status: 200 })), 150)
          )
      )
    );

    const result = await memeFetch("https://example.com", {
      memeConfig: { slowThreshold: 50 },
    });

    expect(result.slow).toBe(true);
    expect(result.meme).toBeDefined();
    expect(result.meme!.statusCode).toBe("slow");
  });

  it("error meme takes priority over slow meme", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve(new Response("Server Error", { status: 500 })),
              150
            )
          )
      )
    );

    const result = await memeFetch("https://example.com", {
      memeConfig: { slowThreshold: 50 },
    });

    expect(result.slow).toBe(true);
    expect(result.meme).toBeDefined();
    expect(result.meme!.statusCode).toBe(500);
  });

  it("throws on fetch error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error"))
    );

    await expect(memeFetch("https://example.com")).rejects.toThrow(
      "Network error"
    );
  });
});
