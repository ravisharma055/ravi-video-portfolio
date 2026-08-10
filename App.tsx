import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Play, X } from 'lucide-react';

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tools: string;
  ratio: 'vertical' | 'horizontal';
  video: string;
  poster: string;
};

const projects: Project[] = [
  {
    id: 'timesphysio',
    number: '01',
    title: 'TimesPhysio',
    category: 'CLIENT WORK',
    description: 'Healthcare content edited around clarity, pacing, captions and a clean visual rhythm.',
    tools: 'EDIT · CAPTIONS · GRADE',
    ratio: 'vertical',
    video: 'https://res.cloudinary.com/exuhr3rh/video/upload/f_mp4,vc_h264/v1786361560/timesphysio.mp4.mp4',
    poster: 'https://res.cloudinary.com/exuhr3rh/video/upload/so_0/v1786361560/timesphysio.mp4.jpg',
  },
  {
    id: 'doctor',
    number: '02',
    title: 'Doctor Content',
    category: 'CLIENT WORK',
    description: 'Talking-head edits shaped with tighter cuts, useful B-roll, captions and motion.',
    tools: 'EDIT · B-ROLL · CAPTIONS',
    ratio: 'vertical',
    video: 'https://res.cloudinary.com/exuhr3rh/video/upload/f_mp4,vc_h264/v1786361132/doctor.mp4.mp4',
    poster: 'https://res.cloudinary.com/exuhr3rh/video/upload/so_0/v1786361132/doctor.mp4.jpg',
  },
  {
    id: 'podcast',
    number: '03',
    title: 'Podcast Edit',
    category: 'PODCAST',
    description: 'Conversation-led editing with clean cuts, sound, pacing and visual emphasis.',
    tools: 'EDIT · SOUND · PACING',
    ratio: 'vertical',
    video: 'https://res.cloudinary.com/exuhr3rh/video/upload/f_mp4,vc_h264/v1786361117/podcast.mp4.mp4',
    poster: 'https://res.cloudinary.com/exuhr3rh/video/upload/so_0/v1786361117/podcast.mp4.jpg',
  },
  {
    id: 'motion',
    number: '04',
    title: '3D Motion Graphic',
    category: 'MOTION DESIGN',
    description: 'A personal motion piece built around form, light, movement and compositing.',
    tools: 'MOTION · 3D · COMPOSITING',
    ratio: 'horizontal',
    video: 'https://res.cloudinary.com/exuhr3rh/video/upload/f_mp4,vc_h264/v1786361135/3d-motion.mp4.mp4',
    poster: 'https://res.cloudinary.com/exuhr3rh/video/upload/so_0/v1786361135/3d-motion.mp4.jpg',
  },
  {
    id: 'tutorial',
    number: '05',
    title: 'Talking Head / Tutorial',
    category: 'TUTORIAL',
    description: 'A tutorial edit focused on structure, clear explanations, captions and purposeful motion.',
    tools: 'EDIT · CAPTIONS · MOTION',
    ratio: 'vertical',
    video: 'https://res.cloudinary.com/exuhr3rh/video/upload/f_mp4,vc_h264/v1786361165/tutorial.mp4.mp4',
    poster: 'https://res.cloudinary.com/exuhr3rh/video/upload/so_0/v1786361165/tutorial.mp4.jpg',
  },
  {
    id: 'car',
    number: '06',
    title: 'Car Edit',
    category: 'EXPERIMENTAL',
    description: 'A personal experiment in rhythm, sound design, movement and visual pacing.',
    tools: 'EDIT · SOUND DESIGN · GRADE',
    ratio: 'horizontal',
    video: 'https://res.cloudinary.com/exuhr3rh/video/upload/f_mp4,vc_h264/v1786361135/car.mp4.mp4',
    poster: 'https://res.cloudinary.com/exuhr3rh/video/upload/so_0/v1786361135/car.mp4.jpg',
  },
];

const services = [
  ['01', 'SHORT-FORM EDITING', 'Reels, Shorts and social-first edits built around retention and clarity.'],
  ['02', 'TALKING HEAD', 'Clean cuts, B-roll, captions and motion that keep the message moving.'],
  ['03', 'PODCAST EDITING', 'Conversation-led edits with rhythm, sound and visual emphasis.'],
  ['04', 'MOTION DESIGN', 'Motion graphics, 3D and compositing used with intent.'],
];

const process = [
  ['01', 'UNDERSTAND', 'Content, audience and goal.'],
  ['02', 'SHAPE', 'Story, structure and strongest moments.'],
  ['03', 'DESIGN', 'Pacing, sound, motion and visual language.'],
  ['04', 'REFINE', 'Polish, feedback and final delivery.'],
];

const principles = [
  ['01', 'STORY FIRST', 'Every cut has a reason.'],
  ['02', 'DETAIL OBSESSED', 'Small decisions change how an edit feels.'],
  ['03', 'BUILT FOR ATTENTION', 'The edit should earn the next second.'],
  ['04', 'COLLABORATIVE', 'The final video should still sound like you.'],
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function ProjectCard({ project, onPlay }: { project: Project; onPlay: (project: Project) => void }) {
  return (
    <article className={`project-card ${project.ratio}`}>
      <button className="media-button" onClick={() => onPlay(project)} aria-label={`Play ${project.title}`}>
        <div className="project-media">
          <img src={project.poster} alt={`${project.title} project poster`} loading="lazy" />
          <div className="media-vignette" />
          <span className="project-number">{project.number}</span>
          <span className="play-button"><Play size={16} fill="currentColor" /></span>
          <span className="view-label">VIEW PROJECT ↗</span>
        </div>
      </button>
      <div className="project-meta">
        <div>
          <div className="project-category">{project.category}</div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="project-tools">{project.tools}</div>
      </div>
    </article>
  );
}

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featured = useMemo(() => projects[0], []);
  const verticals = projects.slice(1, 3);
  const motion = projects[3];
  const finalPair = projects.slice(4);

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <a href="#top" className="brand">RAVI SHARMA <span>VIDEO EDITOR</span></a>
        <nav>
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <a className="nav-cta" href="mailto:hello@ravisharma.edit">LET'S TALK <ArrowUpRight size={14} /></a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
          <div className="hero-inner">
            <div className="hero-kicker"><span className="live-dot" /> RAVI SHARMA · VIDEO EDITOR</div>
            <h1>
              <span className="hero-line"><span>I EDIT</span></span>
              <span className="hero-line hero-accent"><span>ATTENTION.</span></span>
            </h1>
            <div className="hero-bottom">
              <p>I turn raw footage into content worth watching — through timing, sound, story and motion.</p>
              <a href="#work" className="hero-link">VIEW MY WORK <ArrowDown size={16} /></a>
            </div>
          </div>
          <div className="hero-scroll">SCROLL TO EXPLORE <ArrowDown size={13} /></div>
        </section>

        <section id="work" className="work section">
          <Reveal className="section-head">
            <div><span className="eyebrow">SELECTED WORK</span><h2>WORK THAT<br /><em>EARNS THE NEXT SECOND.</em></h2></div>
            <p>Client work, social content and experiments — different formats, one obsession: making the edit feel intentional.</p>
          </Reveal>

          <Reveal className="featured-work">
            <ProjectCard project={featured} onPlay={setActiveProject} />
            <div className="featured-side">
              <span className="side-index">01 / 06</span>
              <h3>CLIENT<br /><span>FIRST.</span></h3>
              <p>Real client work gets priority. The edit should solve the communication problem before it tries to impress.</p>
              <a href="#contact">WORK WITH ME <ArrowUpRight size={15} /></a>
            </div>
          </Reveal>

          <div className="project-grid two-up">
            {verticals.map((project) => <Reveal key={project.id}><ProjectCard project={project} onPlay={setActiveProject} /></Reveal>)}
          </div>

          <Reveal className="wide-work"><ProjectCard project={motion} onPlay={setActiveProject} /></Reveal>

          <div className="project-grid final-grid">
            {finalPair.map((project) => <Reveal key={project.id}><ProjectCard project={project} onPlay={setActiveProject} /></Reveal>)}
          </div>
        </section>

        <section className="statement section">
          <Reveal>
            <span className="eyebrow">EDITING PHILOSOPHY</span>
            <h2>GOOD EDITING<br /><span>ISN'T ABOUT</span><br />ADDING MORE.</h2>
            <p>It's about knowing what deserves to stay.</p>
          </Reveal>
        </section>

        <section className="services section">
          <Reveal className="section-title-row"><span className="eyebrow">WHAT I DO</span><span className="mono">01 — 04</span></Reveal>
          <div className="service-list">
            {services.map(([num, title, body]) => (
              <Reveal key={num} className="service-row">
                <span className="mono">{num}</span><h3>{title}</h3><p>{body}</p><ArrowUpRight className="service-arrow" size={20} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="process section">
          <Reveal className="section-title-row"><div><span className="eyebrow">PROCESS</span><h2>FROM RAW<br />TO <em>READY.</em></h2></div><p>Simple process. No mystery. Every stage has a job.</p></Reveal>
          <div className="process-grid">
            {process.map(([num, title, body]) => (
              <Reveal key={num} className="process-step"><span className="mono">{num}</span><div className="step-line" /><h3>{title}</h3><p>{body}</p></Reveal>
            ))}
          </div>
        </section>

        <section id="about" className="about section">
          <Reveal className="about-grid">
            <div><span className="eyebrow">ABOUT</span><h2>THE EDITOR<br /><em>BEHIND THE CUT.</em></h2></div>
            <div className="about-copy"><p>I'm Ravi Sharma, a video editor focused on turning raw footage and ideas into engaging visual stories.</p><p>I care about the details that make an edit feel intentional — timing, sound, composition, motion and the moments that keep people watching.</p><div className="tools"><span>DAVINCI RESOLVE</span><span>AFTER EFFECTS</span><span>PHOTOSHOP</span></div></div>
          </Reveal>
        </section>

        <section className="principles section">
          <Reveal className="section-title-row"><span className="eyebrow">WHY RAVI</span><p>Good editing is a chain of small decisions. These are the ones I care about most.</p></Reveal>
          <div className="principle-grid">
            {principles.map(([num, title, body]) => <Reveal key={num} className="principle"><span className="mono">{num}</span><h3>{title}</h3><p>{body}</p></Reveal>)}
          </div>
        </section>

        <section id="contact" className="contact section">
          <Reveal>
            <span className="eyebrow">START A PROJECT</span>
            <h2>HAVE SOMETHING<br /><em>WORTH WATCHING?</em></h2>
            <p>Send me the footage, idea or brief. Let's figure out the edit.</p>
            <a className="contact-button" href="mailto:hello@ravisharma.edit">START A PROJECT <ArrowUpRight size={18} /></a>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} RAVI SHARMA</span>
        <div><a href="https://www.linkedin.com/in/ravi-sharma-b61aa7279" target="_blank" rel="noreferrer">LINKEDIN</a><a href="https://x.com/meravi05" target="_blank" rel="noreferrer">X</a><a href="mailto:hello@ravisharma.edit">EMAIL</a></div>
      </footer>

      {activeProject && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title} video`} onClick={() => setActiveProject(null)}>
          <div className={`modal-frame ${activeProject.ratio}`} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close video"><X size={18} /></button>
            <video src={activeProject.video} poster={activeProject.poster} controls autoPlay playsInline preload="metadata" />
            <div className="modal-caption"><span>{activeProject.number}</span><strong>{activeProject.title}</strong><span>{activeProject.category}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
