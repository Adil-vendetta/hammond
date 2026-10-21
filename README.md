# Hammond Institute website (Next.js)

A production-ready Node.js website for Hammond Institute Pty Ltd (TOID 90720), built with Next.js 15, React 19, TypeScript and Tailwind CSS 4. All content comes from the original site zip, with corrections, the updated Hammond logo and an Edupls-style layout.

## Pages
| Page | URL |
|---|---|
| Home | `/` |
| About | `/about` |
| All courses (filter by area/level, search, grid/list) | `/courses` |
| 16 course pages (fees, units, placement, entry, careers) | `/courses/[slug]` |
| Student information (enrolment, payment, RPL, support, policies, FAQ) | `/student-information` |
| Contact (form + map) | `/contact` |
| Apply now (course pre-selected from course pages) | `/enquire` |
| Thank you (not indexed) | `/enquire/thank-you` |
| Privacy policy | `/privacy-policy` |
| 404, `sitemap.xml`, `robots.txt`, favicon, social share image | automatic |

Old URLs (`/course/chc53315`, `/enquire_now`, `/about-us`, WordPress course slugs, etc.) redirect permanently to the new pages, so existing Google rankings and ad links keep working.

## Run locally
Requires Node.js 20 or later.
```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production mode
```

## Publish a preview (easiest: Vercel, free)
**Option A – no Git:** `npm i -g vercel` then run `vercel` in this folder and follow the prompts. You get a `*.vercel.app` link in about a minute.

**Option B – GitHub:** push this folder to a GitHub repo → vercel.com → *Add New Project* → import the repo → Deploy. Every push updates the site.

Add the environment variables below in *Project → Settings → Environment Variables*, then redeploy.

Also works on **Netlify** (auto-detects Next.js) and **Render** (Web Service: build `npm install && npm run build`, start `npm start`). Cloudflare Pages needs the OpenNext adapter, so use Vercel or Netlify for the quickest preview.

## Environment variables
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live domain, e.g. `https://hammond.edu.au` (canonical URLs, sitemap) |
| `NEXT_PUBLIC_NOINDEX` | `true` on previews so Google doesn't index them. **Set to `false` on the live site.** |
| `SMTP_HOST` `SMTP_PORT` `SMTP_SECURE` `SMTP_USER` `SMTP_PASS` | Email account used to send enquiries (e.g. Microsoft 365: `smtp.office365.com`, `587`, `false`) |
| `ENQUIRY_TO` | Inbox that receives enquiries (default info@hammond.edu.au) |
| `MAIL_FROM` | Sender address, e.g. `Hammond Institute <info@hammond.edu.au>` |
| `ENQUIRY_WEBHOOK_URL` | Optional: also POST each enquiry as JSON to a CRM, Zapier or Make |

Until SMTP or a webhook is set, the form shows a polite message asking people to call or email, so no lead is silently lost. Enquiries from SA postcodes get `[SA]` in the email subject.

## Editing content
- **Contact details, nav, testimonials, FAQs, policies:** `src/data/site.ts`
- **Courses (fees, units, placement, images…):** `src/data/courses.ts`
- **Logo:** `public/logo.svg`, `public/logo-white.svg`, favicon `src/app/icon.svg`
- **Colours and fonts:** `src/app/globals.css` (`@theme` block)

## What was corrected from the original zip
- Removed the fake checkout/payment pages and the misleading "original price", "weekly price" and funding badges. The course fee shown is the zip's sale price.
- CHC33021: the official 9 core units plus Ageing or Disability specialisation units. CHC50125: the 12 current core units.
- Official unit titles (e.g. CHCPRT025, CHCCCS038). CHC53315 unit titles changed from all caps to normal case.
- Australian spelling and typo fixes throughout (person-centred, behaviour, organisational, Enrol…).
- New CHC43415 description (the original was copied from another course).
- Victoria-only Working with Children Check link replaced with state-neutral wording (ready for SA).
- Removed unverifiable stats (4,200+ students, 4.9 rating). Only real figures are used.

## Please check before launch
1. **Phone number and hours** – the zip says 03 8764 8419 and 9 am–5 pm; other Hammond sites use 03 8370 3170 / 1800 788 399 and 9 am–6 pm. Edit `src/data/site.ts`.
2. **Fees** in `src/data/courses.ts`.
3. **Unit lists** for CHC40225, CHC52025, CHC53315 and CHC62015, and the CHC50125 unit titles, against training.gov.au (e.g. BSBMGT608 may now be BSBSTR601).
4. **Photos** – currently Unsplash stock images (loaded from images.unsplash.com). Replace them with real Hammond photos: put files in `public/images/` and change the `image` paths.
5. **Privacy policy** – a general template; have it reviewed against your RTO privacy policy.
6. There are no Team, Events or Blog pages because there was no real content for them. They can be added later.

## Checks run
- `next build` passes (31 routes, type-checked).
- Tested at 390 px (mobile), 768 px (tablet) and 1366 px (desktop): no horizontal scroll; the mobile menu and course filters work (including footer category links).
- axe WCAG 2 AA scan: 0 violations on all pages.
- Form API returns field errors for invalid input and a safe message when email isn't configured.
