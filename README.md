# Cloudflare
"[cloudflare] only runs JavaScript code using the V8 engine on the edge network
not in a Node.js runtime so any Node.js package that has Node.js specific dependencies
like fs and net/http are not compatible." - Stackoverflow user Clarence

https://stackoverflow.com/a/73222998

https://hookdeck.com/blog/how-to-call-google-cloud-apis-from-cloudflare-workers

What the hell is the point of cloudflare pages for fullstack frameworks then?
Or for that matter JAMstack? I won't even be able to call the google api from a cloudflare servless function (aka cloudflare worker) because it will have the same limitation.
Why can't it just run node like it claims to in many of its blog posts.
It does not support node, it supports something _like_ node.

Rant over normal .md content below.

---
## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
