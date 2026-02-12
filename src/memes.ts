import type { MemeEntry } from "./types.js";

export const memeRegistry: Record<number, MemeEntry[]> = {
  400: [{ caption: "Ye kya kar diya tune", image: "400.jpg" }],
  401: [
    { caption: "Tera baap aaya", image: "401.jpg" },
    { caption: "Permission liya? Nahi? Toh nikal", image: "401.jpg" },
  ],
  403: [{ caption: "Aukaat mein reh", image: "403.webp" }],
  404: [
    { caption: "Ye kya kar diya tune", image: "404.jpg" },
    { caption: "Dhundhte reh jaoge", image: "404.jpg" },
  ],
  408: [
    { caption: "Jaldi bol, kal subah panvel nikalna hai", image: "408.jpg" },
  ],
  429: [{ caption: "Ruko zara, sabar kro", image: "429.jpg" }],
  500: [
    { caption: "Ye sab doglapan hai", image: "500.jpg" },
    { caption: "Bohot hard", image: "500.jpg" },
  ],
  502: [{ caption: "Bade harami ho beta", image: "502.jpg" }],
  503: [{ caption: "Thak gaya hu bro", image: "503.jpg" }],
  504: [
    { caption: "Jaldi bol, kal subah panvel nikalna hai", image: "504.jpg" },
  ],
};

export const slowMemes: MemeEntry[] = [
  { caption: "Jaldi bol", image: "slow.jpg" },
  { caption: "Kitna time lagega bhai", image: "slow.jpg" },
];
