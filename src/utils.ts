import path from "node:path";
import { fileURLToPath } from "node:url";
import type { HttpMemeConfig, MemeEntry } from "./types.js";

const CDN_BASE =
  "https://raw.githubusercontent.com/Priyans-hu/http-meme/main/assets/";

const assetsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "assets"
);

export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function resolveImage(
  entry: MemeEntry,
  imageSource: HttpMemeConfig["imageSource"]
): { imageUrl: string; localPath: string } {
  return {
    imageUrl: `${CDN_BASE}${entry.image}`,
    localPath: path.join(assetsDir, entry.image),
  };
}
