# http-meme

Maps HTTP error status codes to Bollywood/Hindi memes. Also wraps `fetch` to detect slow responses and attach memes.

## Install

```bash
npm install http-meme
```

Requires Node.js >= 18 (uses native `fetch`).

## Usage

### Get a meme for a status code

```ts
import { getMeme } from "http-meme";

const meme = getMeme(404);
// {
//   statusCode: 404,
//   caption: "Dhundhte reh jaoge",
//   imageUrl: "https://raw.githubusercontent.com/Priyans-hu/http-meme/main/assets/404.webp",
//   localPath: "/path/to/node_modules/http-meme/assets/404.webp"
// }
```

### Get a slow response meme

```ts
import { getSlowMeme } from "http-meme";

const meme = getSlowMeme();
// { statusCode: "slow", caption: "Kitna time lagega bhai", ... }
```

### Wrap fetch with memes

```ts
import { memeFetch } from "http-meme";

const { response, meme, slow } = await memeFetch("https://api.example.com/data");

if (meme) {
  console.log(meme.caption); // "Ye sab doglapan hai" (on 500)
}

if (slow) {
  console.log("Response was slow!");
}
```

### Configure globally

```ts
import { configure } from "http-meme";

configure({
  imageSource: "local",    // "cdn" (default) or "local"
  slowThreshold: 5000,     // ms before a response is considered slow (default: 3000)
});
```

## Supported Status Codes

| Code | Captions |
|------|----------|
| 400 | Ye kya kar diya tune |
| 401 | Tera baap aaya / Permission liya? Nahi? Toh nikal |
| 403 | Aukaat mein reh |
| 404 | Ye kya kar diya tune / Dhundhte reh jaoge |
| 408 | Jaldi bol, kal subah panvel nikalna hai |
| 429 | Ruko zara, sabar kro |
| 500 | Ye sab doglapan hai / Bohot hard |
| 502 | Bade harami ho beta |
| 503 | Thak gaya hu bro |
| 504 | Jaldi bol, kal subah panvel nikalna hai |
| slow | Jaldi bol / Kitna time lagega bhai |

Multiple captions per code are picked randomly.

## API

### `getMeme(statusCode: number, config?: HttpMemeConfig): Meme | undefined`

Returns a meme for the given HTTP status code, or `undefined` if no meme exists for that code.

### `getSlowMeme(config?: HttpMemeConfig): Meme`

Returns a random "slow response" meme.

### `memeFetch(url: string | URL, options?: MemeFetchOptions): Promise<MemeFetchResult>`

Wraps native `fetch`. Returns the response along with an optional meme (if the response was an error or slow). Error memes take priority over slow memes.

### `configure(config: HttpMemeConfig): void`

Sets global configuration. Options:
- `imageSource` — `"cdn"` (default) or `"local"`
- `slowThreshold` — milliseconds before a response is "slow" (default: `3000`)

## License

MIT
