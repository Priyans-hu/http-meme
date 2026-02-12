import type { MemeFetchOptions, MemeFetchResult } from "./types.js";
import { getConfig } from "./config.js";
import { getMeme, getSlowMeme } from "./get-meme.js";

export async function memeFetch(
  url: string | URL,
  options?: MemeFetchOptions
): Promise<MemeFetchResult> {
  const { memeConfig, ...fetchOptions } = options ?? {};
  const merged = { ...getConfig(), ...memeConfig };

  let slow = false;
  const timer = setTimeout(() => {
    slow = true;
  }, merged.slowThreshold);

  try {
    const response = await fetch(url, fetchOptions);
    clearTimeout(timer);

    // error meme takes priority over slow meme
    const errorMeme =
      response.status >= 400 ? getMeme(response.status, memeConfig) : undefined;

    const meme = errorMeme ?? (slow ? getSlowMeme(memeConfig) : undefined);

    return { response, meme, slow };
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
}
