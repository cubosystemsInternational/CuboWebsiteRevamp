# Cubo Systems Website

Next.js + TypeScript site for cubosystems.com.

## Stack

- Next.js (App Router) + TypeScript
- Framer Motion for animation (scroll reveals, hero text stagger, stat counters)
- Contact form backed by a Next.js API route (`src/app/api/contact/route.ts`) that sends email via [Resend](https://resend.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form setup

Copy `.env.local.example` to `.env.local` and fill in:

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

`CONTACT_FROM_EMAIL` must be on a domain verified with Resend. Without these set, the form shows a graceful error instead of sending.

## Project structure

```
src/
├── app/            # App Router pages, layout, global styles, API routes
├── components/      # Page sections (Header, Hero, Cards, Technology, Contact, ...)
└── lib/content.ts   # Site copy/data (services, solutions, stats, testimonials)
public/media/         # Site imagery
```

## Deployment

This project uses a server-rendered API route for the contact form, so it needs a Node-capable host (e.g. Vercel) rather than static S3/CloudFront hosting. `config.json`, `dist.json`, and `policy.json` at the repo root are the AWS CloudFront/S3 configuration from the site's previous static-hosting setup — kept for reference until the deployment target is finalized.

## History

This project replaced an earlier Vite + React implementation, which itself replaced a static HTML export of the original Umbraco-based site. The prior Vite version is preserved at `../cubosystems-site-legacy-backup`.
