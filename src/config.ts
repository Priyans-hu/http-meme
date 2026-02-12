import type { HttpMemeConfig } from "./types.js";

const defaults: Required<HttpMemeConfig> = {
  imageSource: "cdn",
  slowThreshold: 3000,
};

let globalConfig: Required<HttpMemeConfig> = { ...defaults };

export function configure(config: HttpMemeConfig): void {
  globalConfig = { ...globalConfig, ...config };
}

export function getConfig(): Required<HttpMemeConfig> {
  return globalConfig;
}
