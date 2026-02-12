export interface MemeEntry {
  caption: string;
  image: string; // filename in assets/, e.g. "404.webp"
}

export interface Meme {
  statusCode: number | "slow";
  caption: string;
  imageUrl: string;
  localPath: string;
}

export interface HttpMemeConfig {
  imageSource?: "cdn" | "local";
  slowThreshold?: number; // ms, default 3000
}

export interface MemeFetchOptions extends RequestInit {
  memeConfig?: HttpMemeConfig;
}

export interface MemeFetchResult {
  response: Response;
  meme?: Meme;
  slow: boolean;
}
