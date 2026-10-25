# Workplace Mental Health Portfolio Dashboard

An animated portfolio dashboard in a calm, two-column wellbeing style: soft mint, deep teal, rounded white panels, real desk / notebook / coastline photos, a
handwritten motto on the window and steam rising from a coffee mug.

All the content lives in one file, `src/data/profile.ts`. It ships with neutral placeholder text
(“Your Name”, “Your Role”, “Project One”…) — replace the values and the whole page updates.

**Live site:** https://pragyamita-debug.github.io/Occupational-Rehabilitation/ (after Pages is switched on — see below)

## Making it yours

Open `src/data/profile.ts` and edit the fields:

| Field | Shown in |
| --- | --- |
| `name`, `headline` (`Role | Focus`), `location`, `email`, `phone`, `links` | top bar, banner, role card, contact, footer |
| `summary`, `tagline`, `motto` | banner, approach, quote, the handwriting |
| `skills`, `interests`, `certifications` | skill tiles, approach checklist |
| `experience` | My experience steps |
| `education` | At a glance, approach checklist |
| `projects` (with `tags`) | projects band |
| `achievements`, `certifications` | Highlights |
| `goals` | bell, contact card, closing card |
| `stats` | the counting numbers |
| `cvUrl` (optional) | adds a **Download CV** button — put the file in `public/` |

## What the dashboard shows

| Part | Built from |
| --- | --- |
| Top bar | logo, name and focus, section links, expanding search (Enter jumps to and highlights the match), bell with the goals, **Get in touch** |
| Banner | focus, name, role, first line of the summary; desk photo with the motto handwritten on the window and steam curling up from the mug |
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
| Rising steam | banner | three soft wisps drift up from the coffee mug and fade, one after another |
| Handwriting | banner, notebook | words are written in one after another; the heart beats |
| Step walk, flag, sprig | experience, projects band, closing card | small React timers and CSS keyframes (pause on hover) |

All motion respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev          # local dev server
npm run typecheck    # TypeScript check
npm run build        # static build in dist/
npm run build:single # one self-contained index.html in dist-single/
```

## Publish on GitHub Pages

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. **Actions → Deploy to GitHub Pages → Run workflow** (it also runs on every push to `main`).

## Project structure

```
src/
  App.tsx                 renders the dashboard from the profile
  data/profile.ts         all the content (edit this)
  lib/types.ts            the profile shape
  hooks/                  useCountUp, useScramble, useInView, usePointerGlow, useScrollSpy
  components/
    NavBar.tsx            top bar, search, bell
    Sections.tsx          banner, skill tiles, approach, projects band, quote row, sidebar cards, footer
    Dashboard.tsx         two-column layout
    GlowCard.tsx          the moving-border card
  assets/photos/          desk, notebook, coast, article, podcast, guide
  styles/global.css       colour tokens, type, buttons
```

The photos in `src/assets/photos/` were cut from the design mock-up (handwriting removed — the page writes
its own) and enlarged with Real-ESRGAN mixed with a plain enlargement and light grain, so they stay sharp
but read as photographs. Swap in higher-resolution photos with the same file names for the sharpest page.

The previous clinic-style version of this repository is in the git history.
