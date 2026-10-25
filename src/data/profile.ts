import type { Resume } from '../lib/types';

/**
 * Everything the dashboard shows comes from this object.
 * Replace the placeholder values with real ones and the whole page updates —
 * no other file needs to change.
 */
export const profile: Resume = {
  name: 'Your Name',
  headline: 'Your Role | Your Specialty',
  tagline: 'One sentence about the work you do and the impact you want it to have.',
  email: 'you@example.com',
  phone: '+00 00000 00000',
  location: 'Your City, Country',
  links: {
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
  },
  summary:
    'Two or three sentences about who you are, the problems you like to work on and what you are looking for next.',
  motto: 'Healthy mind. Productive work.',

  experience: [
    {
      role: 'Your Current Role',
      company: 'Company Name',
      period: '2023 – Present',
      current: true,
      bullets: ['What you are responsible for.', 'A result you are proud of.'],
    },
    {
      role: 'Previous Role',
      company: 'Company Name',
      period: '2020 – 2023',
      current: false,
      bullets: ['What you delivered there.', 'A number that shows the impact.'],
    },
    {
      role: 'First Role',
      company: 'Company Name',
      period: '2018 – 2020',
      current: false,
      bullets: ['Where you started and what you learned.'],
    },
  ],

  education: [{ degree: 'Your Degree in Your Subject', short: 'M.Sc.', field: 'Your Subject', institution: 'Your University', year: '2020' }],

  skills: ['Skill One', 'Skill Two', 'Skill Three', 'Skill Four', 'Skill Five', 'Skill Six', 'Skill Seven', 'Skill Eight'],

  projects: [
    { title: 'Project One', meta: 'Category', description: 'What it improved, in one line.', tags: ['Tool', 'Method'] },
    { title: 'Project Two', meta: 'Category', description: 'Who it helped and how.', tags: ['Tool', 'Method'] },
    { title: 'Project Three', meta: 'Category', description: 'The process it made simpler.', tags: ['Tool', 'Method'] },
    { title: 'Project Four', meta: 'Category · Tools', description: 'The result you can measure.', tags: [] },
  ],

  achievements: ['An award or recognition you received', 'A milestone you reached, with a number if you have one'],
  certifications: ['A certification you hold'],

  goals: [
    { label: 'Goal', value: 'Your next milestone', note: 'a measurable target' },
    { label: 'Next Step', value: 'What you are working on now' },
  ],

  interests: ['Focus Area One', 'Focus Area Two', 'Focus Area Three'],

  stats: { years: 5, yearsPlus: true, projects: 4, projectsPlus: false, skills: 8 },
};
