import { describe, it, expect, beforeEach } from "vitest";
import { getMeme, getSlowMeme, configure } from "../src/index.js";

describe("getMeme", () => {
  it("returns a meme for a known status code", () => {
    const meme = getMeme(404);
    expect(meme).toBeDefined();
    expect(meme!.statusCode).toBe(404);
    expect(meme!.caption).toBeTruthy();
    expect(meme!.imageUrl).toContain("404.webp");
    expect(meme!.localPath).toContain("404.webp");
  });

  it("returns undefined for an unknown status code", () => {
    expect(getMeme(418)).toBeUndefined();
  });

  it("returns a meme for each registered code", () => {
    for (const code of [400, 401, 403, 404, 408, 429, 500, 502, 503, 504]) {
      const meme = getMeme(code);
      expect(meme).toBeDefined();
      expect(meme!.statusCode).toBe(code);
    }
  });

  it("imageUrl points to CDN by default", () => {
    const meme = getMeme(500)!;
    expect(meme.imageUrl).toMatch(
      /^https:\/\/raw\.githubusercontent\.com\/Priyans-hu\/http-meme\/main\/assets\//
    );
  });
});

describe("getSlowMeme", () => {
  it("returns a slow meme", () => {
    const meme = getSlowMeme();
    expect(meme.statusCode).toBe("slow");
    expect(meme.caption).toBeTruthy();
    expect(meme.imageUrl).toContain("slow.webp");
  });
});

describe("configure", () => {
  beforeEach(() => {
    configure({ imageSource: "cdn", slowThreshold: 3000 });
  });

  it("configure changes imageSource for subsequent calls", () => {
    configure({ imageSource: "local" });
    const meme = getMeme(404)!;
    // localPath should always be populated regardless
    expect(meme.localPath).toContain("404.webp");
  });

  it("configure changes slowThreshold", () => {
    configure({ slowThreshold: 100 });
    const meme = getSlowMeme();
    expect(meme).toBeDefined();
  });
});
