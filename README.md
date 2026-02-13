# Strandard Static Site (Cloudflare Pages)

## What you got
- `index.html` (Home)
- `privacy.html` (Privacy Policy)
- `delete-account.html` (Delete Account)
- `styles.css`
- `script.js` (perk reveal animation)
- `/assets` (put your images here)
- `/fonts` (optional: self-host Cabinet Grotesk)

## Assets you told me to use
Place these files into `/assets/` with these exact names:
- `icon-only.png`
- `Strandard-Phone.png`
- `app-store-badge.png`
- `google-play-badge.png`

## Fonts
- DM Sans loads via Google Fonts automatically.
- Cabinet Grotesk is set up for self-hosting:
  - Put `CabinetGrotesk-Variable.woff2` in `/fonts/`
  - If your filename differs, update the `@font-face` in `styles.css`.

## Deploy to Cloudflare Pages
1. In Cloudflare Pages, create a new project.
2. Upload this folder (or connect a Git repo).
3. Build settings:
   - Framework preset: **None**
   - Build command: **(leave blank)**
   - Output directory: **/** (root)

That's it — it’s a static site.
