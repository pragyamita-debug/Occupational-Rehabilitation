import hero from '../assets/photos/hero.jpg';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import type { Resume } from '../lib/types';
import { GlowCard, type Accent } from './GlowCard';
import { Icon, type IconName } from './Icon';
import './Hero.css';

/** "Occupational Therapist | Work Rehabilitation" → ["Occupational Therapist", "Work Rehabilitation"] */
export const splitHeadline = (h: string) => h.split(/\s*[|•·–—]\s*/).filter(Boolean);

function Stat({ icon, value, suffix = '', label, run, delay }: { icon: IconName; value: number; suffix?: string; label: string; run: boolean; delay: number }) {
  const n = useCountUp(value, run, { duration: 2200, delay });
  return (
    <li className="hstat">
      <span className="hstat__icon">
        <Icon name={icon} size={17} />
      </span>
      <span>
        <b aria-label={`${value}${suffix}`}>
          <span aria-hidden>
            {Math.round(n)}
            {suffix && <i className={n >= value * 0.98 ? 'is-on' : ''}>{suffix}</i>}
          </span>
        </b>
        <small>{label}</small>
      </span>
    </li>
  );
}

interface Props {
  resume: Resume;
  isExample: boolean;
  onUpload: () => void;
}

export function Hero({ resume, isExample, onUpload }: Props) {
  const [ref, inView] = useInView<HTMLUListElement>(0.4);
  const [role, focus] = splitHeadline(resume.headline);
  const words = resume.name.split(/\s+/);
  const first = words.length > 1 ? words.slice(0, -1).join(' ') : words[0];
  const last = words.length > 1 ? words[words.length - 1] : '';
  const intro = resume.summary ? resume.summary.split(/(?<=[.!?])\s/).slice(0, 2).join(' ') : resume.tagline;
  const motto = (resume.motto || 'Healthy people. Happier lives.').replace(/[.!]/g, '').split(/\s+/).slice(0, 5);
  const { stats } = resume;

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="label hero__eyebrow">{focus || resume.tagline || 'Portfolio'}</p>
          <h1 className="display hero__title" data-search>
            {first}
            {last && <span className="accent"> {last}</span>}
            <span className="hero__role">{role || resume.headline}</span>
          </h1>
          {intro && <p className="hero__intro">{intro}</p>}
          <div className="hero__actions">
            {isExample ? (
              <button className="pill" onClick={onUpload}>
                Upload your CV <Icon name="arrowRight" size={15} />
              </button>
            ) : (
              <a className="pill" href={resume.email ? `mailto:${resume.email}` : '#contact'}>
                Get in touch <Icon name="arrowRight" size={15} />
              </a>
            )}
            <a className="pill pill--ghost" href="#experience">
              Explore experience
            </a>
          </div>
          <ul className="hero__stats" ref={ref}>
            <Stat icon="folder" value={stats.projects} suffix={stats.projectsPlus ? '+' : ''} label="Projects" run={inView} delay={0} />
            <Stat icon="activity" value={stats.skills} suffix="+" label="Core Skills" run={inView} delay={150} />
            <Stat icon="award" value={stats.years} suffix={stats.yearsPlus ? '+' : ''} label="Years of Care" run={inView} delay={300} />
          </ul>
        </div>

        <div className="hero__visual" aria-hidden>
          <div className="hero__photo">
            <img src={hero} alt="" />
          </div>
          <p className="hero__note">
            {motto.map((w, i) => (
              <span key={i} style={{ ['--i' as string]: i }}>
                {w}
              </span>
            ))}
            <svg viewBox="0 0 60 24">
              <path d="M2 18c10 0 16-4 24-4 6 0 6 6 12 6M44 12c-3-6 6-9 7-3 1-6 10-3 7 3-2 4-7 7-7 7s-5-3-7-7Z" />
            </svg>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- the strip of six quick-fact cards under the hero ---------- */

const ACCENTS: Accent[] = ['green', 'teal', 'amber', 'green', 'teal', 'amber'];

export function FactStrip({ resume }: { resume: Resume }) {
  const current = resume.experience[0];
  const edu = resume.education[0];
  const facts: { icon: IconName; title: string; sub: string }[] = [
    { icon: 'heart', title: current?.role || 'Current role', sub: current?.company || 'Organisation' },
    { icon: 'graduation', title: edu?.short ? `${edu.short}${edu.field ? ` ${edu.field}` : ''}` : 'Education', sub: [edu?.institution, edu?.year].filter(Boolean).join(' · ') || 'Degree' },
    { icon: 'shield', title: resume.certifications[0] || 'Certified', sub: resume.certifications.length > 1 ? `+${resume.certifications.length - 1} more` : 'Certification' },
    { icon: 'pin', title: resume.location || 'Location', sub: 'On-site or remote' },
    { icon: 'trophy', title: resume.achievements[0] || 'Recognition', sub: 'Achievement' },
    { icon: 'target', title: resume.goals[1]?.value || resume.goals[0]?.value || 'Next step', sub: resume.goals[1]?.label || 'Next step' },
  ];
  return (
    <div className="wrap">
      <div className="facts">
        {facts.map((f, i) => (
          <GlowCard key={f.title + i} className="fact" accent={ACCENTS[i]} phase={i * 0.17} speed={6 + i * 0.5} data-search>
            <span className="fact__icon">
              <Icon name={f.icon} size={20} />
            </span>
            <b>{f.title}</b>
            <small>{f.sub}</small>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
