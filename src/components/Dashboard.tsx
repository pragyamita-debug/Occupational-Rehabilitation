import { useScrollSpy } from '../hooks/useScrollSpy';
import type { StoredProfile } from '../lib/types';
import { NAV, NavBar } from './NavBar';
import { Approach, Banner, Footer, Highlights, MissionCard, ProjectsBand, QuickAccess, QuoteRow, SkillStrip, splitHeadline, Steps, WelcomeCard } from './Sections';
import './Dashboard.css';

const IDS = NAV.map((n) => n.id);

interface Props {
  profile: StoredProfile;
  isExample: boolean;
  onUploadNew: () => void;
  onEdit: () => void;
  onReset: () => void;
  onDownloadCv: () => void;
}

export function Dashboard({ profile, isExample, onUploadNew, onEdit, onReset, onDownloadCv }: Props) {
  const { resume } = profile;
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
        isExample={isExample}
        onUploadNew={onUploadNew}
        onEdit={onEdit}
        onDownloadCv={onDownloadCv}
        onReset={onReset}
      />
      <main className="wrap board">
        <div className="board__main">
          <Banner resume={resume} isExample={isExample} onUpload={onUploadNew} />
          <SkillStrip resume={resume} />
          <Approach resume={resume} isExample={isExample} onDownloadCv={onDownloadCv} />
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
