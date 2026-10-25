import { useEffect, useState } from 'react';
import article from '../assets/photos/article.jpg';
import coast from '../assets/photos/coast.jpg';
import desk from '../assets/photos/desk.jpg';
import guide from '../assets/photos/guide.jpg';
import notebook from '../assets/photos/notebook.jpg';
import podcast from '../assets/photos/podcast.jpg';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScramble } from '../hooks/useScramble';
import type { Resume } from '../lib/types';
import { GlowCard, type Accent } from './GlowCard';
import { Icon, type IconName } from './Icon';
import { Logo } from './Logo';
import { NAV } from './NavBar';
import { Reveal } from './Reveal';

/** "Occupational Psychologist | Workplace Mental Health" → ["Occupational Psychologist", "Workplace Mental Health"] */
export const splitHeadline = (h: string) => h.split(/\s*[|•·–—]\s*/).filter(Boolean);

const firstSentence = (t: string) => t.split(/(?<=[.!?])\s/)[0] || t;

/* =============================== main column =============================== */

/** Photo banner: desk by a sunny window, the motto handwritten on the glass, steam rising from the mug. */
export function Banner({ resume, isExample, onUpload }: { resume: Resume; isExample: boolean; onUpload: () => void }) {
  const [role, focus] = splitHeadline(resume.headline);
  const motto = (resume.motto || 'Healthy mind. Productive work.').replace(/[.!]/g, '').split(/\s+/).slice(0, 5);
  return (
    <section id="home" className="banner" aria-label="Introduction">
      <div className="banner__art" aria-hidden>
        <img src={desk} alt="" />
        {/* steam curling up from the coffee mug */}
        <svg className="banner__steam" viewBox="0 0 60 90">
          <path d="M20 88 C 10 72, 30 62, 20 46 C 12 34, 26 24, 20 8" />
          <path d="M32 88 C 24 70, 42 60, 32 44 C 24 32, 38 22, 32 6" />
          <path d="M44 88 C 36 74, 52 64, 44 50 C 38 40, 48 30, 44 16" />
        </svg>
        <p className="banner__note">
          {motto.map((w, i) => (
            <span key={i} style={{ ['--i' as string]: i }}>
              {w}
            </span>
          ))}
          <Icon name="heart" size={22} className="banner__heart" />
        </p>
      </div>
      <div className="banner__copy">
        <p className="label">{focus || 'Portfolio'}</p>
        <h1 className="banner__title" data-search>
          {resume.name}
          <span>{role || resume.headline}</span>
        </h1>
        <p className="banner__intro" data-search>
          {resume.summary ? firstSentence(resume.summary) : resume.tagline}
        </p>
        {isExample ? (
          <button className="pill pill--sm" onClick={onUpload}>
            Upload your CV <Icon name="arrowRight" size={14} />
          </button>
        ) : (
          <a className="pill pill--sm" href="#experience">
            View my journey <Icon name="arrowRight" size={14} />
          </a>
        )}
      </div>
    </section>
  );
}

const SKILL_ICONS: IconName[] = ['lotus', 'smile', 'brain', 'target', 'heart', 'breeze', 'shield', 'activity', 'clipboard', 'bulb'];
const SKILL_TINTS = ['mint', 'lilac', 'mint', 'mint', 'lilac'];

/** Five skill tiles under the banner ("Stress management, Anxiety support…"). */
export function SkillStrip({ resume }: { resume: Resume }) {
  const [all, setAll] = useState(false);
  const skills = all ? resume.skills : resume.skills.slice(0, 5);
  const notes = [...resume.interests, ...resume.certifications];
  return (
    <section id="skills" className="panel strip" aria-label="Skills">
      <ul>
        {skills.map((s, i) => (
          <Reveal as="li" key={s} delay={(i % 5) * 80}>
            <GlowCard className="tile" accent={(['green', 'purple', 'teal'] as Accent[])[i % 3]} phase={i * 0.2} speed={6 + (i % 4)} data-search>
              <span className={`tile__icon tile__icon--${SKILL_TINTS[i % SKILL_TINTS.length]}`}>
                <Icon name={SKILL_ICONS[i % SKILL_ICONS.length]} size={24} />
              </span>
              <b>{s}</b>
              <small>{notes[i % Math.max(notes.length, 1)] || 'Core skill'}</small>
            </GlowCard>
          </Reveal>
        ))}
      </ul>
      {resume.skills.length > 5 && (
        <button className="strip__more" onClick={() => setAll((a) => !a)}>
          {all ? 'Show fewer skills' : `Show all ${resume.skills.length} skills`} <Icon name={all ? 'chevronDown' : 'arrowRight'} size={13} />
        </button>
      )}
    </section>
  );
}

/** "Our approach": summary, checklist, notebook photo. */
export function Approach({ resume, isExample, onDownloadCv }: { resume: Resume; isExample: boolean; onDownloadCv: () => void }) {
  const points = [...resume.certifications, ...resume.education.map((e) => e.degree), ...resume.skills.slice(0, 2)].slice(0, 4);
  return (
    <section id="about" className="panel approach" aria-labelledby="approach-title">
      <Reveal className="approach__copy">
        <span className="label">My approach</span>
        <h2 id="approach-title" className="title">
          Personalised Support,
          <br />
          Built on Evidence
        </h2>
        <p data-search>{resume.summary || resume.tagline}</p>
        <ul className="checks">
          {points.map((p, i) => (
            <Reveal as="li" key={p} delay={150 + i * 90} data-search>
              <Icon name="check" size={12} /> {p}
            </Reveal>
          ))}
        </ul>
        <button className="pill pill--sm" onClick={onDownloadCv}>
          {isExample ? 'Sample CV' : 'Download CV'} <Icon name="download" size={14} />
        </button>
      </Reveal>
      <div className="approach__photo" aria-hidden>
        <img src={notebook} alt="" loading="lazy" />
        <p className="approach__note">
          <span>Small</span>
          <span>steps</span>
          <span>Big</span>
          <span>changes</span>
        </p>
      </div>
    </section>
  );
}

const PROJECT_ICONS: IconName[] = ['breeze', 'lotus', 'brain', 'heart', 'shield', 'target'];

/** Dark band with a mountain and a flag ("Daily tools") — the projects. */
export function ProjectsBand({ resume }: { resume: Resume }) {
  const [open, setOpen] = useState(0);
  const projects = resume.projects.slice(0, 4);
  const current = projects[open];
  return (
    <section id="projects" className="tools" aria-labelledby="tools-title">
      <svg className="tools__mountain" viewBox="0 0 320 180" preserveAspectRatio="xMaxYMax slice" aria-hidden>
        <path d="M0 180 L90 110 L130 130 L200 40 L240 80 L262 62 L320 120 V180Z" fill="#2c7d72" opacity="0.55" />
        <path d="M60 180 L150 95 L190 120 L235 70 L320 150 V180Z" fill="#3f9a8c" opacity="0.6" />
        <path d="M200 40 L214 58 L206 56 L200 64 L192 54Z" fill="#cfece4" opacity="0.8" />
        <line x1="200" y1="40" x2="200" y2="12" stroke="#cfece4" strokeWidth="2" />
        <path className="tools__flag" d="M200 12 L222 18 L200 25Z" fill="#cfece4" />
      </svg>
      <div className="tools__copy">
        <span className="label tools__label">My projects</span>
        <h2 id="tools-title" className="tools__title">
          Programmes That Make a Difference
        </h2>
        <p data-search key={open}>
          {current ? current.description || current.meta : resume.tagline}
        </p>
        {current?.tags.length ? (
          <span className="tools__tags">
            {current.tags.slice(0, 3).map((t) => (
              <i key={t}>{t}</i>
            ))}
          </span>
        ) : null}
      </div>
      <ul className="tools__list" role="tablist" aria-label="Projects">
        {projects.map((p, i) => (
          <li key={p.title}>
            <button role="tab" aria-selected={open === i} className={open === i ? 'is-on' : ''} onClick={() => setOpen(i)} onPointerEnter={() => setOpen(i)} data-search>
              <span className="tools__icon">
                <Icon name={PROJECT_ICONS[i % PROJECT_ICONS.length]} size={20} />
              </span>
              {p.title}
            </button>
          </li>
        ))}
        {!projects.length && <li className="tools__empty">No projects were found in the CV.</li>}
      </ul>
    </section>
  );
}

/** Sunrise photo with the motto as a quote, plus the "you are not alone" style contact card. */
export function QuoteRow({ resume }: { resume: Resume }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const goal = resume.goals[0];
  return (
    <div className="panel quoterow" ref={ref}>
      <div className={`quote ${inView ? 'is-up' : ''}`}>
        <img src={coast} alt="" loading="lazy" />
        <blockquote data-search>
          <Icon name="quote" size={22} />
          <p>{resume.tagline || resume.motto}</p>
          <i />
        </blockquote>
      </div>
      <div id="contact" className="reachout">
        <h2 className="reachout__title">Let’s Work Together</h2>
        <p data-search>{goal ? `Next up: ${goal.value.charAt(0).toLowerCase()}${goal.value.slice(1)}${goal.note ? ` (${goal.note})` : ''}.` : 'Open to new roles, collaborations and referrals.'}</p>
        <ul className="reachout__list">
          {resume.email && (
            <li>
              <Icon name="mail" size={14} /> <a href={`mailto:${resume.email}`}>{resume.email}</a>
            </li>
          )}
          {resume.phone && (
            <li>
              <Icon name="phone" size={14} /> {resume.phone}
            </li>
          )}
          {resume.location && (
            <li>
              <Icon name="pin" size={14} /> {resume.location}
            </li>
          )}
        </ul>
        <a className="pill pill--sm" href={resume.email ? `mailto:${resume.email}` : '#home'}>
          Get in touch <Icon name="arrowRight" size={14} />
        </a>
      </div>
    </div>
  );
}

/* =============================== sidebar =============================== */

/** "Your mental wellness matters" card: the profile at a glance, with the years counting up. */
export function WelcomeCard({ resume }: { resume: Resume }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const n = useCountUp(resume.stats.years, inView, { duration: 2200 });
  const [role] = splitHeadline(resume.headline);
  return (
    <div className="panel welcome" ref={ref}>
      <span className="welcome__badge" aria-hidden>
        <Logo size={64} />
      </span>
      <div>
        <h2 className="welcome__title" data-search>
          {role || 'Your role'}
        </h2>
        <p className="welcome__years">
          <b>
            {Math.round(n)}
            {resume.stats.yearsPlus && <i className={n >= resume.stats.years * 0.98 ? 'is-on' : ''}>+</i>}
          </b>
          years of experience helping people at work
        </p>
        <a className="pill pill--sm" href={resume.email ? `mailto:${resume.email}` : '#contact'}>
          Book a conversation <Icon name="arrowRight" size={14} />
        </a>
      </div>
    </div>
  );
}

function QuickTile({ icon, tint, value, suffix = '', label, sub, run, delay, href }: { icon: IconName; tint: string; value: number | string; suffix?: string; label: string; sub: string; run: boolean; delay: number; href: string }) {
  const numeric = typeof value === 'number';
  const n = useCountUp(numeric ? value : 0, run, { duration: 2000, delay });
  const text = useScramble(numeric ? '' : value, run && !numeric, { delay });
  return (
    <a href={href} className={`quick__tile quick__tile--${tint}`} data-search>
      <span className="quick__icon">
        <Icon name={icon} size={18} />
      </span>
      <b>
        {numeric ? Math.round(n) : text || ' '}
        {suffix}
      </b>
      <span className="quick__label">{label}</span>
      <small>{sub}</small>
    </a>
  );
}

/** "Quick access" — four tiles that count / decode. */
export function QuickAccess({ resume }: { resume: Resume }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const { stats } = resume;
  const edu = resume.education[0];
  return (
    <div className="panel quick" ref={ref}>
      <h2 className="side-title">At a Glance</h2>
      <div className="quick__grid">
        <QuickTile icon="folder" tint="mint" value={stats.projects} suffix={stats.projectsPlus ? '+' : ''} label="Projects" sub="Programmes delivered" run={inView} delay={0} href="#projects" />
        <QuickTile icon="graduation" tint="lilac" value={edu?.short || '—'} label="Education" sub={edu?.field || 'Degree'} run={inView} delay={150} href="#about" />
        <QuickTile icon="activity" tint="lilac" value={stats.skills} suffix="+" label="Core skills" sub="Therapy & coaching" run={inView} delay={300} href="#skills" />
        <QuickTile icon="pin" tint="mint" value={resume.location?.split(',')[0] || '—'} label="Based in" sub="On-site or remote" run={inView} delay={450} href="#contact" />
      </div>
    </div>
  );
}

/** "How it works" — the career, as numbered steps; the highlight walks from step to step. */
export function Steps({ resume }: { resume: Resume }) {
  const reduced = useReducedMotion();
  const roles = resume.experience.slice(0, 4);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (reduced || paused || roles.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, [reduced, paused, roles.length]);

  return (
    <section id="experience" className="panel steps" aria-labelledby="steps-title" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="side-head">
        <h2 id="steps-title" className="side-title">
          My Experience
        </h2>
        <button className="side-link" onClick={() => setOpen((o) => !o)}>
          {open ? 'Hide details' : 'View details'} <Icon name="arrowRight" size={13} />
        </button>
      </div>
      <ol>
        {roles.map((r, i) => (
          <li key={r.role + i} className={i === active ? 'is-on' : ''} onPointerEnter={() => setActive(i)} data-search>
            <span className="steps__no">{i + 1}</span>
            <span>
              <b>{r.role}</b>
              <small>{[r.company, r.period].filter(Boolean).join(' · ')}</small>
              {(open || i === active) && r.bullets[0] && <em>{r.bullets[0]}</em>}
            </span>
          </li>
        ))}
        {!roles.length && <li className="empty">No experience section was found in the CV.</li>}
      </ol>
    </section>
  );
}

const RESOURCE_PHOTOS = [article, podcast, guide];

/** "Wellbeing resources" — achievements and certifications as three photo cards. */
export function Highlights({ resume }: { resume: Resume }) {
  const [all, setAll] = useState(false);
  const items = [...resume.achievements.map((t) => ({ text: t, kind: 'Achievement' })), ...resume.certifications.map((t) => ({ text: t, kind: 'Certification' }))];
  const shown = all ? items : items.slice(0, 3);
  return (
    <div className="panel res">
      <div className="side-head">
        <h2 className="side-title">Highlights</h2>
        {items.length > 3 && (
          <button className="side-link" onClick={() => setAll((a) => !a)}>
            {all ? 'Show less' : 'View all'} <Icon name="arrowRight" size={13} />
          </button>
        )}
      </div>
      <div className="res__grid">
        {shown.map((it, i) => (
          <GlowCard key={it.text} className="res__card" accent={i % 2 ? 'purple' : 'green'} phase={i * 0.3} speed={7 + i} data-search>
            <div className="res__photo">
              <img src={RESOURCE_PHOTOS[i % RESOURCE_PHOTOS.length]} alt="" loading="lazy" />
            </div>
            <b>{it.kind}</b>
            <small>{it.text}</small>
          </GlowCard>
        ))}
        {!items.length && <p className="empty">Add Achievements or Certifications to the CV to show them here.</p>}
      </div>
    </div>
  );
}

/** Dark closing card with a sprig that grows in. */
export function MissionCard({ resume }: { resume: Resume }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const goal = resume.goals[1] || resume.goals[0];
  return (
    <div className={`mission ${inView ? 'is-on' : ''}`} ref={ref}>
      <svg className="mission__sprig" viewBox="0 0 120 150" aria-hidden>
        <path className="mission__stem" d="M40 148 C 46 110, 60 80, 92 30" />
        <path className="mission__leaf" style={{ ['--d' as string]: '0.6s' }} d="M52 104 C 30 100, 18 84, 20 66 C 38 70, 50 84, 52 104Z" />
        <path className="mission__leaf" style={{ ['--d' as string]: '0.9s' }} d="M62 80 C 70 60, 88 54, 104 58 C 98 76, 82 84, 62 80Z" />
        <path className="mission__leaf" style={{ ['--d' as string]: '1.2s' }} d="M70 64 C 52 54, 48 36, 56 20 C 70 30, 74 48, 70 64Z" />
        <path className="mission__leaf" style={{ ['--d' as string]: '1.5s' }} d="M86 40 C 92 24, 104 16, 118 18 C 114 32, 102 40, 86 40Z" />
      </svg>
      <h2 className="mission__title">
        Better Mental Health.
        <br />
        Better Work.
      </h2>
      <p data-search>{goal ? `${goal.label}: ${goal.value}` : 'Feel supported. Perform better. Live fuller.'}</p>
      <a className="pill pill--sm pill--white" href={resume.email ? `mailto:${resume.email}` : '#contact'}>
        Start today <Icon name="arrowRight" size={14} />
      </a>
    </div>
  );
}

/* =============================== footer =============================== */

export function Footer({ resume }: { resume: Resume }) {
  const [role] = splitHeadline(resume.headline);
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span className="footer__brand">
          <Logo size={32} />
          <span>
            <b className="wordmark">{resume.name}</b>
            <small>{role}</small>
          </span>
        </span>
        <nav className="footer__nav" aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <nav className="footer__social" aria-label="Profiles">
          {resume.links.linkedin && (
            <a href={resume.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" size={16} />
            </a>
          )}
          {resume.links.github && (
            <a href={resume.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" size={16} />
            </a>
          )}
          {resume.email && (
            <a href={`mailto:${resume.email}`} aria-label="Email">
              <Icon name="mail" size={16} />
            </a>
          )}
        </nav>
      </div>
      <p className="wrap footer__base">
        © {new Date().getFullYear()} {resume.name}. Built from a CV.
      </p>
    </footer>
  );
}
