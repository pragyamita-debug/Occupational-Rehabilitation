# CV → Dashboard (Occupational Psychology & Workplace Mental Health)

Candidates upload a CV (PDF, DOCX or TXT) and get an animated portfolio dashboard in a calm, two-column
wellbeing style: soft mint, deep teal, rounded white panels, real desk / notebook / coastline photos, a
handwritten motto on the window and a morning sun coming up.

Everything runs in the browser. The CV is read client-side and never sent to a server.

**Live site:** https://pragyamita-debug.github.io/Occupational-Rehabilitation/ (after Pages is switched on — see below)

## How it works

0. **Example first** — the page opens on the full design filled with neutral placeholder text
   (`src/data/placeholder.ts`: “Your Name”, “Your Role”, “Project One”…) and an **Upload CV** button.
1. **Upload** — drag a CV onto the drop zone, or try the bundled sample (`src/data/sample-cv.txt`, a fictional occupational psychologist).
2. **Read** — PDF text comes from pdf.js, Word files from mammoth; both load only when needed.
3. **Parse** — `src/lib/parseResume.ts` splits the text into sections and works out years of experience from
   the date ranges, counting overlapping jobs once. `Tools: …` lines under a project become its tags.
4. **Review** — the candidate checks what was found and fixes anything before the dashboard is built.
5. **Dashboard** — saved to `localStorage`; the profile menu (top right) can upload another CV, edit, download or go back to the example.

## What the dashboard shows

| Part | Built from |
| --- | --- |
| Top bar | logo, name and focus, section links, expanding search (Enter jumps to and highlights the match), bell with the goals, profile menu, **Upload CV** / **Get in touch** |
| Banner | focus, name, role, first line of the summary; desk photo with the motto handwritten on the window and a rising sun |
| Skill tiles | the first five skills (all on request), each with an interest or certification underneath |
| My approach | summary, a checklist of certifications / degrees / skills, the notebook photo |
| My projects | dark band with a mountain and flag; pick a project to read it and see its tags |
| Quote + Let’s work together | the tagline over the sunrise coast photo; next goal, email, phone, city |
| Sidebar: role card | role and years of experience counting up |
| Sidebar: At a glance | projects, degree, skills and city — counting / decoding |
| Sidebar: My experience | roles as numbered steps; the highlight walks from step to step and shows each role’s first bullet |
| Sidebar: Highlights | achievements and certifications as photo cards |
| Sidebar: closing card | the next step, with a sprig that grows in |

## Animations

| Effect | Where | How |
| --- | --- | --- |
| Counting numbers | role card, At a glance | `useCountUp` — rAF + ease-out-expo, starts when in view; the “+” lands when the count finishes |
| Decoding text | degree and city tiles | `useScramble` — characters settle left to right |
| Moving, lit borders | skill tiles, highlight cards | conic gradient on `@property --angle`, masked to a thin ring, plus a blurred halo (`GlowCard`) |
| Hover | every tile, card, link and icon | pointer spotlight + slight tilt, lift, photo zoom, icons fill teal |
| Rising sun | banner window, coast photo | the sun climbs into place, rays fade in and turn; the coast sun glows up when it scrolls into view |
| Handwriting | banner, notebook | words are written in one after another; the heart beats |
| Step walk, flag, sprig | experience, projects band, closing card | small React timers and CSS keyframes (pause on hover) |

All motion respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev          # local dev server
npm test             # parser tests (vitest)
npm run build        # static build in dist/
npm run build:single # one self-contained index.html in dist-single/
```

## Publish on GitHub Pages

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. **Actions → Deploy to GitHub Pages → Run workflow** (it also runs on every push to `main`).

## Writing a CV that parses well

- Clear headings: **Experience**, **Education**, **Skills**, **Projects**, **Achievements**, **Certifications**.
- Dates on the role line or the line after it: `Jan 2023 – Present`, `03/2021 - 06/2023`, `2019 - 2022`.
- Optional extras: **Goals** (`Goal: …`, `Next Step: …`), **Motto** (handwritten on the window), **Interests**.
- Text-based PDFs only — scanned images have no text to read.

## Project structure

```
src/
  App.tsx                 example → upload → reading → review → dashboard
  data/placeholder.ts     the general example profile shown before any upload
  data/sample-cv.txt      fictional sample CV
  lib/                    extractText, parseResume (+ tests), dates, storage, types
  hooks/                  useCountUp, useScramble, useInView, usePointerGlow, useScrollSpy
  components/
    NavBar.tsx            top bar, search, bell, profile menu
    Sections.tsx          banner, skill tiles, approach, projects band, quote row, sidebar cards, footer
    Dashboard.tsx         two-column layout
    UploadScreen.tsx, ReviewDialog.tsx
    GlowCard.tsx          the moving-border card
  assets/photos/          desk, notebook, coast, article, podcast, guide
  styles/global.css       colour tokens, type, buttons
```

The photos in `src/assets/photos/` were cut from the design mock-up (handwriting removed — the page writes
its own) and enlarged with Real-ESRGAN mixed with a plain enlargement and light grain, so they stay sharp
but read as photographs. Swap in higher-resolution photos with the same file names for the sharpest page.

The previous clinic-style version of this repository is in the git history.
