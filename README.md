# Strandard – Cloudflare Pages Static Site

## Deploy (recommended)
### Option A — Cloudflare Pages (Dashboard)
1. Cloudflare Dashboard → Pages → Create a project
2. Upload this folder (or connect a Git repo)
3. Build settings:
   - Framework preset: **None**
   - Build command: **(leave blank)**
   - Output directory: **/** (root)

### Option B — Wrangler (Cloudflare Pages)
From this folder:
```bash
npx wrangler pages deploy . --project-name strandard
```

> If you run `wrangler deploy` you’re deploying a Worker, which is why you saw the “assets directory” message.

## Fonts
Cabinet Grotesk is commercial, so it is **not** bundled. Add your `.woff2` into:
`/assets/fonts/` (see `assets/fonts/README.txt`).

## Forms
- Contact form: sends an email using the user’s default mail client to `jhaelle@thestrandard.com`.
- Delete account: submits to Supabase table `delete_requests`.
