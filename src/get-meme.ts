import type { HttpMemeConfig, Meme } from "./types.js";
import { getConfig } from "./config.js";
import { memeRegistry, slowMemes } from "./memes.js";
import { randomPick, resolveImage } from "./utils.js";

export function getMeme(
  statusCode: number,
  config?: HttpMemeConfig
): Meme | undefined {
  const entries = memeRegistry[statusCode];
  if (!entries || entries.length === 0) return undefined;

  const merged = { ...getConfig(), ...config };
  const entry = randomPick(entries);
  const { imageUrl, localPath } = resolveImage(entry, merged.imageSource);

  return {
    statusCode,
    caption: entry.caption,
    imageUrl,
    localPath,
  };
}

export function getSlowMeme(config?: HttpMemeConfig): Meme {
  const merged = { ...getConfig(), ...config };
  const entry = randomPick(slowMemes);
  const { imageUrl, localPath } = resolveImage(entry, merged.imageSource);

  return {
    statusCode: "slow",
    caption: entry.caption,
    imageUrl,
    localPath,
  };
}
