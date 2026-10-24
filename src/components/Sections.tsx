import { useEffect, useState } from 'react';
import care from '../assets/photos/care.jpg';
import clinic from '../assets/photos/clinic.jpg';
import family from '../assets/photos/family.jpg';
import mentor from '../assets/photos/mentor.jpg';
import p1 from '../assets/photos/project-1.jpg';
import p3 from '../assets/photos/project-3.jpg';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Resume } from '../lib/types';
import { GlowCard, type Accent } from './GlowCard';
import { splitHeadline } from './Hero';
import { Icon, type IconName } from './Icon';
import { Logo } from './Logo';
import { NAV } from './NavBar';
import { Reveal } from './Reveal';

const PROJECT_PHOTOS = [p1, care, p3];
const SKILL_ICONS: IconName[] = ['heartPulse', 'clipboard', 'hand', 'activity', 'shield', 'users', 'flask', 'target', 'file', 'bulb'];

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function Head({ label, title, id, intro, link, light = false }: { label: string; title: React.ReactNode; id: string; intro?: string; link?: { href?: string; text: string; onClick?: () => void }; light?: boolean }) {
  return (
    <div className={`head ${light ? 'head--light' : ''}`}>
      <div>
        <span className="label">{label}</span>
        <h2 id={id} className="title">
          {title}
        </h2>
        {intro && <p className="head__intro">{intro}</p>}
      </div>
      {link &&
        (link.onClick ? (
          <button className="head__link" onClick={link.onClick}>
            {link.text} <Icon name="arrowRight" size={14} />
          </button>
        ) : (
          <a className="head__link" href={link.href}>
            {link.text} <Icon name="arrowRight" size={14} />
          </a>
        ))}
    </div>
  );
}

/* ================= about: checklist + reception photo with the name on the wall ================= */

function Badge({ years, plus }: { years: number; plus: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.5);
  const n = useCountUp(years, inView, { duration: 2000 });
  return (
    <div className="about__badge" ref={ref}>
      <span className="about__badge-icon">
        <Icon name="users" size={18} />
      </span>
      <span>
        <small>Experience</small>
        <b>
          {Math.round(n)}
          {plus ? '+' : ''} years
        </b>
      </span>
    </div>
  );
}

export function AboutSection({ resume, onDownloadCv, isExample }: { resume: Resume; onDownloadCv: () => void; isExample: boolean }) {
  const [role, focus] = splitHeadline(resume.headline);
  const edu = resume.education[0];
  const points = [
    `${resume.stats.years}${resume.stats.yearsPlus ? '+' : ''} years of hands-on experience`,
    edu?.degree,
    resume.certifications[0],
    resume.skills.slice(0, 3).join(', '),
  ].filter(Boolean) as string[];

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap about">
        <Reveal className="about__copy">
          <span className="label">About me</span>
          <h2 id="about-title" className="title">
            Modern Care
            <br />
            For a <span className="accent">Healthier</span> You
          </h2>
          <p data-search>{resume.summary || resume.tagline}</p>
          <ul className="checks">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={120 + i * 90} data-search>
                <Icon name="check" size={13} /> {p}
              </Reveal>
            ))}
          </ul>
          <div className="about__actions">
            <a className="pill pill--sm" href="#experience">
              Learn more <Icon name="arrowRight" size={14} />
            </a>
            <button className="pill pill--sm pill--ghost" onClick={onDownloadCv}>
              <Icon name="download" size={14} /> {isExample ? 'Sample CV' : 'Download CV'}
            </button>
          </div>
        </Reveal>

        <Reveal className="about__visual" delay={150}>
          <span className="about__wash" aria-hidden />
          <div className="about__photo">
            <img src={clinic} alt="" loading="lazy" />
            {/* the candidate's name mounted on the reception wall, where the clinic sign was */}
            <div className="about__sign" aria-hidden>
              <Logo size={30} />
              <span>
                <b>{resume.name}</b>
                <small>{focus || role}</small>
              </span>
            </div>
          </div>
          <Badge years={resume.stats.years} plus={resume.stats.yearsPlus} />
        </Reveal>
      </div>
    </section>
  );
}

/* ================= experience band: roles in a phone mock-up ================= */

export function JourneyBand({ resume }: { resume: Resume }) {
  const reduced = useReducedMotion();
  const roles = resume.experience.slice(0, 4);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || roles.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % roles.length), 3000);
    return () => clearInterval(t);
  }, [reduced, paused, roles.length]);

  const role = roles[active];
  const perks: { icon: IconName; title: string; text: string }[] = [
    { icon: 'calendar', title: role?.period || 'Timeline', text: [role?.company, role?.location].filter(Boolean).join(' · ') || 'Organisation' },
    { icon: 'chat', title: resume.goals[1]?.label || 'Next step', text: resume.goals[1]?.value || resume.goals[0]?.value || 'Always learning' },
    { icon: 'headset', title: 'Open to new roles', text: resume.location ? `${resume.location} or remote` : 'On-site or remote' },
  ];

  return (
    <section id="experience" className="journey" aria-labelledby="journey-title" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="wrap journey__grid">
        <Reveal className="journey__copy">
          <span className="label journey__label">Experience</span>
          <h2 id="journey-title" className="journey__title">
            My Career
            <br />
            Journey
          </h2>
          <p>Each role built on the last. Tap a role on the phone to see what it involved.</p>
          {role && role.bullets.length > 0 && (
            <ul className="journey__bullets" key={active} data-search>
              {role.bullets.slice(0, 3).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </Reveal>

        <div className="phone" aria-label="Roles">
          <div className="phone__screen">
            <span className="phone__notch" aria-hidden />
            <p className="phone__title">My Roles</p>
            <p className="phone__sub">{roles.length} positions</p>
            <ol className="phone__list">
              {roles.map((r, i) => (
                <li key={r.role + i}>
                  <button className={i === active ? 'is-on' : ''} onClick={() => setActive(i)} data-search>
                    <span className="phone__date">{r.period?.split(/\s*[–-]\s*/)[0] || '—'}</span>
                    <span>
                      <b>{r.role}</b>
                      <small>{r.company}</small>
                    </span>
                  </button>
                </li>
              ))}
              {!roles.length && <li className="phone__empty">No experience section was found in the CV.</li>}
            </ol>
            <a className="phone__btn" href="#contact">
              Get in touch
            </a>
          </div>
        </div>

        <ul className="journey__perks">
          {perks.map((p, i) => (
            <Reveal as="li" key={p.title + i} delay={i * 110}>
              <span className="journey__icon">
                <Icon name={p.icon} size={20} />
              </span>
              <span>
                <b>{p.title}</b>
                <small>{p.text}</small>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================= achievements ("What our patients say") ================= */

export function ResultsSection({ resume }: { resume: Resume }) {
  const items = [...resume.achievements.map((t) => ({ text: t, kind: 'Achievement' })), ...resume.certifications.map((t) => ({ text: t, kind: 'Certification' }))];
  const [start, setStart] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const shown = items.length <= 3 ? items : [0, 1, 2].map((k) => items[(start + k) % items.length]);
  const initials = initialsOf(resume.name);
  const pages = Math.max(1, items.length - 2);

  return (
    <section className="section" aria-labelledby="results-title">
      <div className="wrap">
        <Head label="Achievements" id="results-title" title="Milestones & Credentials" />
        <div className={`results ${inView ? 'is-on' : ''}`} ref={ref}>
          {shown.map((it, i) => (
            <Reveal key={it.text} delay={i * 110}>
              <GlowCard className={`quote ${i === 1 ? 'quote--green' : ''}`} accent={i === 1 ? 'amber' : 'green'} phase={i * 0.3} speed={8} data-search>
                <span className="quote__top">
                  <span className="quote__avatar">{initials}</span>
                  <Icon name="quote" size={22} className="quote__mark" />
                </span>
                <p>{it.text}</p>
                <footer>
                  <span>
                    <b>{resume.name}</b>
                    <small>{it.kind}</small>
                  </span>
                  <span className="stars" aria-hidden>
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Icon key={s} name="star" size={13} style={{ ['--s' as string]: s }} />
                    ))}
                  </span>
                </footer>
              </GlowCard>
            </Reveal>
          ))}
          {!items.length && <p className="empty">Add Achievements or Certifications to the CV to show them here.</p>}
        </div>
        {items.length > 3 && (
          <div className="pager">
            <button aria-label="Previous" onClick={() => setStart((s) => (s - 1 + items.length) % items.length)}>
              <Icon name="chevronLeft" size={16} />
            </button>
            {Array.from({ length: pages }).map((_, k) => (
              <i key={k} className={k === start % pages ? 'is-on' : ''} />
            ))}
            <button aria-label="Next" onClick={() => setStart((s) => (s + 1) % items.length)}>
              <Icon name="chevronRight" size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================= skills: dark header with the stethoscope photo + grid ================= */

export function SkillsSection({ resume }: { resume: Resume }) {
  const [all, setAll] = useState(false);
  const skills = all ? resume.skills : resume.skills.slice(0, 6);
  const notes = [...resume.interests, ...resume.certifications];
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <div className="skills__hero">
          <img src={care} alt="" loading="lazy" />
          <div>
            <span className="label skills__label">My skills</span>
            <h2 id="skills-title" className="skills__title">
              Comprehensive Care
              <br />
              Under One Roof
            </h2>
            <p>{resume.tagline}</p>
            {resume.skills.length > 6 && (
              <button className="pill pill--sm pill--white" onClick={() => setAll((a) => !a)}>
                {all ? 'Show fewer' : `View all ${resume.skills.length} skills`} <Icon name="arrowRight" size={14} />
              </button>
            )}
          </div>
        </div>
        <ul className="skills">
          {skills.map((s, i) => (
            <Reveal as="li" key={s} delay={(i % 6) * 70}>
              <GlowCard className="skill" accent={(['green', 'teal', 'amber'] as Accent[])[i % 3]} phase={i * 0.14} speed={6 + (i % 4)} data-search>
                <span className="skill__icon">
                  <Icon name={SKILL_ICONS[i % SKILL_ICONS.length]} size={19} />
                </span>
                <b>{s}</b>
                <small>{notes[i % Math.max(notes.length, 1)] || 'Core skill'}</small>
              </GlowCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================= current role spotlight ("Expert doctors") ================= */

export function Spotlight({ resume }: { resume: Resume }) {
  const current = resume.experience[0];
  if (!current) return null;
  return (
    <section className="section" aria-labelledby="spot-title">
      <div className="wrap">
        <div className="spot">
          <Reveal className="spot__copy">
            <span className="label">Where I work now</span>
            <h2 id="spot-title" className="title" data-search>
              {current.role}.
              <br />
              <span className="accent">Personalized Care.</span>
            </h2>
            <p data-search>{current.bullets[0] || resume.tagline}</p>
            <a className="pill pill--sm" href="#experience">
              See my journey <Icon name="arrowRight" size={14} />
            </a>
          </Reveal>
          <div className="spot__visual">
            <img src={mentor} alt="" loading="lazy" />
            <div className="spot__card">
              <span className="spot__avatar">{initialsOf(current.company || resume.name)}</span>
              <span>
                <b>{current.company}</b>
                <small>{current.period}</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= numbers band ================= */

function Count({ icon, value, suffix = '', label, run, delay }: { icon: IconName; value: number; suffix?: string; label: string; run: boolean; delay: number }) {
  const n = useCountUp(value, run, { duration: 2200, delay });
  return (
    <li className="count">
      <span className="count__icon">
        <Icon name={icon} size={20} />
      </span>
      <b aria-label={`${value}${suffix}`}>
        <span aria-hidden>
          {Math.round(n)}
          {suffix && <i className={n >= value * 0.98 ? 'is-on' : ''}>{suffix}</i>}
        </span>
      </b>
      <small>{label}</small>
    </li>
  );
}

export function NumbersBand({ resume }: { resume: Resume }) {
  const [ref, inView] = useInView<HTMLElement>(0.4);
  const { stats } = resume;
  return (
    <section className="numbers" ref={ref} aria-labelledby="numbers-title">
      <div className="wrap numbers__grid">
        <div>
          <span className="label numbers__label">My impact</span>
          <h2 id="numbers-title" className="numbers__title">
            Trusted Care
            <br />
            By The Numbers
          </h2>
        </div>
        <ul>
          <Count icon="folder" value={stats.projects} suffix={stats.projectsPlus ? '+' : ''} label="Projects Delivered" run={inView} delay={0} />
          <Count icon="activity" value={stats.skills} suffix="+" label="Core Skills" run={inView} delay={150} />
          <Count icon="award" value={stats.years} suffix={stats.yearsPlus ? '+' : ''} label="Years of Care" run={inView} delay={300} />
          <Count icon="trophy" value={resume.achievements.length + resume.certifications.length} label="Awards & Certifications" run={inView} delay={450} />
        </ul>
      </div>
    </section>
  );
}

/* ================= projects ("Health tips & articles") ================= */

export function ProjectsSection({ resume }: { resume: Resume }) {
  const [all, setAll] = useState(false);
  const projects = all ? resume.projects : resume.projects.slice(0, 3);
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <Head
          label="My projects"
          id="projects-title"
          title="Projects & Programmes"
          intro="Work I designed, led or delivered — and what changed because of it."
          link={resume.projects.length > 3 ? { text: all ? 'Show fewer' : `View all ${resume.projects.length} projects`, onClick: () => setAll((a) => !a) } : undefined}
        />
        <div className="posts">
          {projects.map((p, i) => (
            <Reveal key={p.title + i} delay={(i % 3) * 110}>
              <GlowCard className="post" accent={i % 2 ? 'amber' : 'green'} phase={i * 0.25} speed={7 + (i % 3)}>
                <div className="post__photo">
                  <img src={PROJECT_PHOTOS[i % PROJECT_PHOTOS.length]} alt="" loading="lazy" />
                </div>
                <div className="post__body" data-search>
                  {p.meta && <small className="post__meta">{p.meta}</small>}
                  <h3>{p.title}</h3>
                  {p.description && <p>{p.description}</p>}
                  {p.tags.length > 0 && (
                    <span className="post__tags">
                      {p.tags.slice(0, 3).map((t) => (
                        <i key={t}>{t}</i>
                      ))}
                    </span>
                  )}
                </div>
              </GlowCard>
            </Reveal>
          ))}
          {!projects.length && <p className="empty">No projects were found in the CV.</p>}
        </div>
      </div>
    </section>
  );
}

/* ================= mission band (goal) with a heartbeat line drawing itself ================= */

export function MissionBand({ resume }: { resume: Resume }) {
  const [ref, inView] = useInView<HTMLElement>(0.4);
  const goal = resume.goals[0];
  return (
    <section className={`mission ${inView ? 'is-on' : ''}`} ref={ref} aria-labelledby="mission-title">
      <svg className="mission__line" viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden>
        <path d="M0 110 H180 L200 110 L215 70 L232 140 L250 40 L268 120 L282 110 H360 C380 110 395 70 430 70 C470 70 470 120 500 100 C540 70 520 30 490 40 C470 47 470 75 490 90 C520 110 560 110 600 110" />
      </svg>
      <div className="wrap mission__inner">
        <span className="label numbers__label">
          <Icon name="heart" size={13} /> {goal?.label || 'Mission'}
        </span>
        <h2 id="mission-title" className="mission__title" data-search>
          {goal ? goal.value : 'Your Health Is My Mission'}
        </h2>
        <p>{goal?.note ? `Target: ${goal.note}.` : resume.tagline}</p>
        <a className="pill pill--sm pill--white" href={resume.email ? `mailto:${resume.email}` : '#contact'}>
          Talk to me <Icon name="arrowRight" size={14} />
        </a>
      </div>
    </section>
  );
}

/* ================= call to action with the family photo ================= */

export function CallToAction({ resume }: { resume: Resume }) {
  return (
    <section id="contact" className="section" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta">
          <img className="cta__photo" src={family} alt="" loading="lazy" />
          <div className="cta__copy">
            <span className="label">Let’s work together</span>
            <h2 id="cta-title" className="title">
              Take the First Step
              <br />
              Towards a Healthier Team
            </h2>
            <p>Get in touch about roles, collaborations or referrals — I usually reply within a day.</p>
            <div className="cta__actions">
              <a className="pill pill--sm" href={resume.email ? `mailto:${resume.email}` : '#home'}>
                Email me <Icon name="arrowRight" size={14} />
              </a>
              {resume.phone && (
                <a className="pill pill--sm pill--ghost" href={`tel:${resume.phone.replace(/[^\d+]/g, '')}`}>
                  <Icon name="phone" size={14} /> {resume.phone}
                </a>
              )}
            </div>
          </div>
          <p className="cta__note" aria-hidden>
            <span>Healthy</span>
            <span>Teams</span>
            <span>Stronger</span>
            <span>Communities</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================= footer ================= */

export function Footer({ resume }: { resume: Resume }) {
  const [role] = splitHeadline(resume.headline);
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">
            <Logo size={32} />
            <b className="wordmark">{resume.name}</b>
          </span>
          <p>{role}</p>
          <p className="footer__motto">{resume.motto || resume.tagline}</p>
        </div>
        <div>
          <h4>Quick links</h4>
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Skills</h4>
          <ul>
            {resume.skills.slice(0, 6).map((s) => (
              <li key={s}>
                <a href="#skills">{s}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footer__contact">
            {resume.phone && (
              <li>
                <Icon name="phone" size={14} /> {resume.phone}
              </li>
            )}
            {resume.email && (
              <li>
                <Icon name="mail" size={14} /> <a href={`mailto:${resume.email}`}>{resume.email}</a>
              </li>
            )}
            {resume.location && (
              <li>
                <Icon name="pin" size={14} /> {resume.location}
              </li>
            )}
          </ul>
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
      </div>
      <div className="wrap footer__base">
        <span>
          © {new Date().getFullYear()} {resume.name}. Built from a CV.
        </span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
