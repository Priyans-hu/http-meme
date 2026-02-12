import type { MemeEntry } from "./types.js";

export const memeRegistry: Record<number, MemeEntry[]> = {
  400: [{ caption: "Ye kya kar diya tune", image: "400.webp" }],
  401: [
    { caption: "Tera baap aaya", image: "401.webp" },
    { caption: "Permission liya? Nahi? Toh nikal", image: "401.webp" },
  ],
  403: [{ caption: "Aukaat mein reh", image: "403.webp" }],
  404: [
    { caption: "Ye kya kar diya tune", image: "404.webp" },
    { caption: "Dhundhte reh jaoge", image: "404.webp" },
  ],
  408: [
    { caption: "Jaldi bol, kal subah panvel nikalna hai", image: "408.webp" },
  ],
  429: [{ caption: "Ruko zara, sabar kro", image: "429.webp" }],
  500: [
    { caption: "Ye sab doglapan hai", image: "500.webp" },
    { caption: "Bohot hard", image: "500.webp" },
  ],
  502: [{ caption: "Bade harami ho beta", image: "502.webp" }],
  503: [{ caption: "Thak gaya hu bro", image: "503.webp" }],
  504: [
    { caption: "Jaldi bol, kal subah panvel nikalna hai", image: "504.webp" },
  ],
};

export const slowMemes: MemeEntry[] = [
  { caption: "Jaldi bol", image: "slow.webp" },
  { caption: "Kitna time lagega bhai", image: "slow.webp" },
];
