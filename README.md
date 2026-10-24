# CV → Dashboard (Occupational Rehabilitation)

Candidates upload a CV (PDF, DOCX or TXT) and get an animated portfolio dashboard in a clean clinic style:
white and mint, deep pine green, a full-size clinician photo, real clinic photos, and a handwritten motto.

Everything runs in the browser. The CV is read client-side and never sent to a server.

**Live site:** https://pragyamita-debug.github.io/Occupational-Rehabilitation/ (after Pages is switched on — see below)

## How it works

0. **Example first** — the page opens on the full design filled with neutral placeholder text
   (`src/data/placeholder.ts`: “Your Name”, “Your Role”, “Project One”…) and an **Upload CV** button.
1. **Upload** — drag a CV onto the drop zone, or try the bundled sample (`src/data/sample-cv.txt`, a fictional occupational therapist).
2. **Read** — PDF text comes from pdf.js, Word files from mammoth; both load only when needed.
3. **Parse** — `src/lib/parseResume.ts` splits the text into sections and works out years of experience from
   the date ranges, counting overlapping jobs once. `Tools: …` lines under a project become its tags.
4. **Review** — the candidate checks what was found and fixes anything before the dashboard is built.
5. **Dashboard** — saved to `localStorage`; the gear menu can upload another CV, edit, download or go back to the example.

## What the dashboard shows

| Section | Built from |
| --- | --- |
| Nav | cross-and-sun mark, name, links, expanding search (Enter jumps to and highlights the match), gear menu, **Upload CV** / **Get in touch** |
| Hero | specialism, name (last name in green), role, summary; projects / skills / years counting up; full clinician photo with the motto handwritten beside it |
| Fact strip | current role, degree, certification, city, top achievement, next step |
| About | summary and a checklist; the reception photo with the candidate’s name on the wall and a counting experience badge |
| Career journey | roles listed in a phone mock-up — the selected one walks through them and its bullets show beside it |
| Milestones & credentials | achievements and certifications as quote cards with stars, paged |
| Skills | dark header over the stethoscope photo, then a card per skill |
| Where I work now | current role and company over the clinician portrait |
| By the numbers | projects, skills, years, awards — counting up |
| Projects & programmes | photo cards with tags; **View all** shows the rest |
| Mission | the main goal, with a heartbeat line that draws itself |
| Let’s work together | email and phone over the family photo |

## Animations

| Effect | Where | How |
| --- | --- | --- |
| Counting numbers | hero stats, experience badge, numbers band | `useCountUp` — rAF + ease-out-expo, starts when in view; the “+” lands when the count finishes |
| Moving, lit borders | fact, quote, skill and project cards | conic gradient on `@property --angle`, masked to a thin ring, plus a blurred halo (`GlowCard`) |
| Hover | every card, icon and button | pointer spotlight + slight tilt, lift, photo zoom, icons fill green |
| Handwriting | hero | each word is written in, then the heart line draws |
| Role walk, heartbeat line, stars | career journey, mission, milestones | small React timers and CSS transitions (pause on hover) |

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
- Optional extras: **Goals** (`Goal: …`, `Next Step: …`), **Motto** (handwritten in the hero), **Interests**.
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
    NavBar.tsx            nav, search, gear menu
    Hero.tsx              hero + fact strip
    Sections.tsx          about, career journey, milestones, skills, spotlight, numbers, projects, mission, CTA, footer
    UploadScreen.tsx, ReviewDialog.tsx
    GlowCard.tsx          the moving-border card
  assets/photos/          hero, reception, portrait, stethoscope, projects, family
  styles/global.css       colour tokens, type, buttons
```

The photos in `src/assets/photos/` were cut from the design mock-up (printed text and logos removed) and
enlarged with Real-ESRGAN, then sized for high-density screens. The hero photo is a full-resolution photo by
Ato Aikins on [Unsplash](https://unsplash.com/photos/TPT4pevJEmQ) (free under the Unsplash License), loaded from Unsplash's image
server in the size each screen needs; if it can't load, the bundled `hero.jpg` is shown instead. For the sharpest page, swap in original
high-resolution photos with the same file names.
