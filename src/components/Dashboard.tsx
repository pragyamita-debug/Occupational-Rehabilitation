import { useScrollSpy } from '../hooks/useScrollSpy';
import type { StoredProfile } from '../lib/types';
import { FactStrip, Hero } from './Hero';
import { NAV, NavBar } from './NavBar';
import { AboutSection, CallToAction, Footer, JourneyBand, MissionBand, NumbersBand, ProjectsSection, ResultsSection, SkillsSection, Spotlight } from './Sections';
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

  return (
    <>
      <NavBar name={resume.name} email={resume.email} active={active} isExample={isExample} onUploadNew={onUploadNew} onEdit={onEdit} onDownloadCv={onDownloadCv} onReset={onReset} />
      <main>
        <Hero resume={resume} isExample={isExample} onUpload={onUploadNew} />
        <FactStrip resume={resume} />
        <AboutSection resume={resume} onDownloadCv={onDownloadCv} isExample={isExample} />
        <JourneyBand resume={resume} />
        <ResultsSection resume={resume} />
        <SkillsSection resume={resume} />
        <Spotlight resume={resume} />
        <NumbersBand resume={resume} />
        <ProjectsSection resume={resume} />
        <MissionBand resume={resume} />
        <CallToAction resume={resume} />
      </main>
      <Footer resume={resume} />
    </>
  );
}
