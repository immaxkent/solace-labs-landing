# Solace Laboratories — landing page

The landing page for [Solace Laboratories Ltd](https://solacelabs.org), a UK
technology company trading as Good Paper.

Built with TanStack Start, React, Tailwind CSS and TypeScript. Originally
generated in [Lovable](https://lovable.dev).

## Development

```sh
npm install
npm run dev
```

The dev server runs on http://localhost:8080.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`,
`npm run format`.

## Deployment

Hosted on Vercel under the GoodPaper team. Pushes to `main` deploy to
production automatically; pull requests get preview deployments.

Two pieces of config make this work and are easy to break:

- `vite.config.ts` pins the nitro deploy target to `vercel`. The Lovable
  template defaults to `cloudflare-module`, which produces an output format
  Vercel can't serve. Lovable's own builds ignore this override, so the
  project can still sync back to the Lovable editor.
- `vercel.json` pins the install and build commands to npm, and redirects
  `www.solacelabs.org` to the apex domain.

## DNS

`solacelabs.org` is registered through Google and **must keep its Google
nameservers** — Google Workspace email runs on this domain via its MX and SPF
records, and moving the nameservers to Vercel would drop them.

The domain points at Vercel with records added at Google instead:

| Type  | Name  | Value                   |
| ----- | ----- | ----------------------- |
| A     | `@`   | `76.76.21.21`           |
| CNAME | `www` | `cname.vercel-dns.com`  |

If the nameservers ever do need to move, recreate the MX and SPF records at
the new provider *before* cutting over.
