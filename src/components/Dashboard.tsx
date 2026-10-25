import { useScrollSpy } from '../hooks/useScrollSpy';
import type { Resume } from '../lib/types';
import { NAV, NavBar } from './NavBar';
import { Approach, Banner, Footer, Highlights, MissionCard, ProjectsBand, QuickAccess, QuoteRow, SkillStrip, splitHeadline, Steps, WelcomeCard } from './Sections';
import './Dashboard.css';

const IDS = NAV.map((n) => n.id);

export function Dashboard({ resume }: { resume: Resume }) {
  const active = useScrollSpy(IDS, 140);
  const motto = resume.motto || 'Healthy mind. Productive work.';
  const [, focus] = splitHeadline(resume.headline);

  return (
    <>
      <NavBar
        name={resume.name}
        tagline={focus || motto}
        email={resume.email}
        goals={resume.goals}
        active={active}
      />
      <main className="wrap board">
        <div className="board__main">
          <Banner resume={resume} />
          <SkillStrip resume={resume} />
          <Approach resume={resume} />
          <ProjectsBand resume={resume} />
          <QuoteRow resume={resume} />
        </div>
        <aside className="board__side">
          <WelcomeCard resume={resume} />
          <QuickAccess resume={resume} />
          <Steps resume={resume} />
          <Highlights resume={resume} />
          <MissionCard resume={resume} />
        </aside>
      </main>
      <Footer resume={resume} />
    </>
  );
}
