# Avijit Saha — Portfolio

Dark themed personal portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Quick Start

```bash
npm install
cp .env.example .env.local   # RESEND_API_KEY দাও
npm run dev
```

## Customize করো

| File | কী change করবে |
|---|---|
| `lib/config.ts` | নাম, email, GitHub, LinkedIn, Twitter, Facebook, Phone, WhatsApp |
| `lib/github.ts` | GitHub username (line 3) |
| `lib/data.ts` | Skills, Experience, Testimonials |
| `app/about/page.tsx` | About text, Journey, Hobbies |
| `app/experience/page.tsx` | Education details |
| `app/now/page.tsx` | Currently doing what |
| `content/projects/*.mdx` | Project details, live links, GitHub links |

## Files যোগ করো

```
public/profile.jpg              ← তোমার photo
public/resume/avijit-saha-resume.pdf  ← তোমার resume
public/og-image.png             ← 1200x630px social preview
public/projects/chatify/thumbnail.png ← project screenshots
```

## Deploy

```bash
npx vercel
```

Vercel এ এই env variables দাও:
- `RESEND_API_KEY`
- `GITHUB_TOKEN` (optional)
- `NEXT_PUBLIC_SITE_URL`
