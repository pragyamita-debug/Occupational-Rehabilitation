import { useEffect, useRef, useState } from 'react';
import type { Goal } from '../lib/types';
import { Icon } from './Icon';
import { Logo } from './Logo';

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'Approach' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/** Searches the dashboard text (elements marked data-search), scrolls to the first hit and flashes it. */
function findInPage(term: string) {
  const q = term.trim().toLowerCase();
  if (!q) return false;
  const hit = Array.from(document.querySelectorAll<HTMLElement>('main [data-search]')).find((el) => el.textContent?.toLowerCase().includes(q));
  if (!hit) return false;
  hit.scrollIntoView({ behavior: 'smooth', block: 'center' });
  hit.classList.remove('is-flash');
  void hit.offsetWidth;
  hit.classList.add('is-flash');
  return true;
}

interface Props {
  name: string;
  tagline: string;
  email?: string;
  goals: Goal[];
  active: string;
}

type Pop = 'bell' | null;

export function NavBar({ name, tagline, email, goals, active }: Props) {
  const [pop, setPop] = useState<Pop>(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [term, setTerm] = useState('');
  const [miss, setMiss] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setPop(null);
        setMobile(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPop(null);
        setSearch(false);
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (search) input.current?.focus();
  }, [search]);

  const toggle = (p: Pop) => setPop((cur) => (cur === p ? null : p));

  return (
    <header ref={ref} className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#home">
          <Logo />
          <span className="nav__name">
            <span className="wordmark">{name}</span>
            <small>{tagline}</small>
          </span>
        </a>

        <nav className={`nav__links ${mobile ? 'is-open' : ''}`} aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} aria-current={active === n.id ? 'location' : undefined} onClick={() => setMobile(false)}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <form
            className={`nav__search ${search ? 'is-open' : ''} ${miss ? 'is-miss' : ''}`}
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (!search) return setSearch(true);
              setMiss(!findInPage(term));
            }}
          >
            <input
              ref={input}
              type="search"
              value={term}
              placeholder="Search the dashboard…"
              aria-label="Search the dashboard"
              tabIndex={search ? 0 : -1}
              onChange={(e) => {
                setTerm(e.target.value);
                setMiss(false);
              }}
              onBlur={() => !term && setSearch(false)}
            />
            <button className="nav__icon" aria-label={search ? 'Search' : 'Open search'} type="submit">
              <Icon name="search" size={18} />
            </button>
          </form>

          <div className="nav__pop">
            <button className="nav__icon nav__bell" aria-label="What’s next" aria-expanded={pop === 'bell'} onClick={() => toggle('bell')}>
              <Icon name="bell" size={18} />
              {goals.length > 0 && <i className="nav__dot" />}
            </button>
            {pop === 'bell' && (
              <div className="popover popover--wide" role="dialog" aria-label="What’s next">
                <p className="popover__title">What’s next</p>
                {goals.length ? (
                  <ul className="popover__list">
                    {goals.slice(0, 3).map((g) => (
                      <li key={g.label + g.value}>
                        <small>{g.label}</small>
                        {g.value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="popover__empty">Add goals to src/data/profile.ts to show them here.</p>
                )}
              </div>
            )}
          </div>


          <a className="pill pill--sm nav__cta" href={email ? `mailto:${email}` : '#contact'}>
            Get in touch
          </a>
          <button className="nav__icon nav__burger" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile((m) => !m)}>
            <Icon name={mobile ? 'close' : 'menu'} size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
