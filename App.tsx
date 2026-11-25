import { useEffect, useRef, useState } from 'react';

type Project={id:string;no:string;title:string;cat:string;ratio:'v'|'w';poster:string;video:string;desc:string};
const projects:Project[]=[
{id:'times',no:'01',title:'TimesPhysio',cat:'CLIENT WORK · HEALTHCARE',ratio:'v',poster:'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=1200',video:'https://res.cloudinary.com/exuhr3rh/video/upload/v1786361560/timesphysio.mp4.mov',desc:'Healthcare content edited for clarity, trust and a clean social-first rhythm.'},
{id:'doctor',no:'02',title:'Doctor Content',cat:'CLIENT WORK · TALKING HEAD',ratio:'v',poster:'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1200',video:'https://res.cloudinary.com/exuhr3rh/video/upload/v1786361132/doctor.mp4.mp4',desc:'Talking-head editing with tighter cuts, B-roll, captions and restrained motion.'},
{id:'podcast',no:'03',title:'Podcast Edit',cat:'PODCAST · SOCIAL',ratio:'v',poster:'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=1200',video:'https://res.cloudinary.com/exuhr3rh/video/upload/v1786361117/podcast.mp4.mp4',desc:'Conversation-led editing focused on natural flow, sound and pacing.'},
{id:'motion',no:'04',title:'3D Motion Graphic',cat:'MOTION DESIGN',ratio:'w',poster:'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600',video:'https://res.cloudinary.com/exuhr3rh/video/upload/v1786361135/3d-motion.mp4.mov',desc:'A motion experiment exploring form, light and movement.'},
{id:'tutorial',no:'05',title:'Talking Head / Tutorial',cat:'TUTORIAL · SOCIAL',ratio:'w',poster:'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600',video:'https://res.cloudinary.com/exuhr3rh/video/upload/v1786361165/tutorial.mp4.mov',desc:'Tutorial editing where structure, captions and motion support the explanation.'},
{id:'car',no:'06',title:'Car Edit',cat:'PERSONAL EXPERIMENT',ratio:'w',poster:'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1600',video:'https://res.cloudinary.com/exuhr3rh/video/upload/v1786361135/car.mp4.mp4',desc:'A rhythm-first experiment built around music, sound design and movement.'}];
const services=[['01','SHORT-FORM','Reels, Shorts and social-first content built around retention.'],['02','TALKING HEAD','Clean cuts, B-roll, captions and motion without unnecessary noise.'],['03','PODCAST','Natural conversation edits with strong pacing and sound.'],['04','MOTION DESIGN','Motion graphics when the idea needs movement.']];

function ProjectCard({p,index,onOpen}:{p:Project;index:number;onOpen:(p:Project)=>void}){
 const videoRef=useRef<HTMLVideoElement>(null);
 const [hovered,setHovered]=useState(false);
 const play=()=>{setHovered(true);videoRef.current?.play().catch(()=>{})};
 const pause=()=>{setHovered(false);if(videoRef.current){videoRef.current.pause();videoRef.current.currentTime=0}};
 return <article className={`projectCard ${p.ratio} reveal`} style={{'--delay':`${index*100}ms`} as React.CSSProperties}>
  <button className="projectMedia" onClick={()=>onOpen(p)} onMouseEnter={play} onMouseLeave={pause} aria-label={`Open ${p.title}`}>
   <video ref={videoRef} src={p.video} poster={p.poster} muted loop playsInline preload="metadata"/>
   <span className="mediaNumber">{p.no}<i/></span>
   <span className={`mediaHoverLabel ${hovered?'isVisible':''}`}>VIEW PROJECT <b>↗</b></span>
   <span className="mediaCorner">{p.ratio==='v'?'9:16':'16:9'}</span>
  </button>
  <div className="projectDetails"><div><small>{p.cat}</small><h3>{p.title}</h3></div><p>{p.desc}</p></div>
 </article>
}

function Marquee(){return <div className="marquee"><div className="marqueeTrack">{Array.from({length:4}).map((_,i)=><span key={i}>STORY FIRST <i>✳</i> EDIT WITH INTENT <i>✳</i> MOTION WITH PURPOSE <i>✳</i></span>)}</div></div>}

export default function App(){
 const [active,setActive]=useState<Project|null>(null);
 const [menu,setMenu]=useState(false);
 useEffect(()=>{
  const ring=document.querySelector('.cursorRing') as HTMLElement|null;
  const dot=document.querySelector('.cursorDot') as HTMLElement|null;
  const move=(e:MouseEvent)=>{if(ring)ring.style.transform=`translate3d(${e.clientX-15}px,${e.clientY-15}px,0)`;if(dot)dot.style.transform=`translate3d(${e.clientX-2.5}px,${e.clientY-2.5}px,0)`};
  const over=()=>document.body.classList.add('cursorHover');const out=()=>document.body.classList.remove('cursorHover');
  addEventListener('mousemove',move);document.querySelectorAll('a,button').forEach(x=>{x.addEventListener('mouseenter',over);x.addEventListener('mouseleave',out)});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
  return()=>{removeEventListener('mousemove',move);io.disconnect()};
 },[]);
 return <div className="site">
  <div className="cursorDot"/><div className="cursorRing"/>
  <header><a className="brand" href="#top">RAVI<span>®</span><small>VIDEO EDITOR / MOTION DESIGN</small></a>
   <nav className={menu?'show':''}><a href="#work" onClick={()=>setMenu(false)}>WORK</a><a href="#services" onClick={()=>setMenu(false)}>SERVICES</a><a href="#about" onClick={()=>setMenu(false)}>ABOUT</a><a href="#contact" onClick={()=>setMenu(false)}>CONTACT</a></nav>
   <a className="headerCta" href="#contact">LET'S TALK <span>↗</span></a><button className="hamb" onClick={()=>setMenu(!menu)}>{menu?'CLOSE':'MENU'}</button>
  </header>
  <main id="top">
   <section className="hero">
    <div className="heroMeta"><span>INDEPENDENT VIDEO EDITOR</span><span>INDIA · AVAILABLE WORLDWIDE</span></div>
    <div className="heroMain">
     <p className="eyebrow"><i/> VIDEO EDITING / STORYTELLING / MOTION</p>
     <h1 className="heroTitle"><span>MAKE EVERY</span><span><em>FRAME</em> <b>COUNT.</b></span></h1>
     <div className="heroBottom"><p>I turn raw footage into clear, engaging videos that make people stop, watch and remember.</p><a href="#work" className="roundLink"><span>EXPLORE<br/>MY WORK</span><b>↓</b></a></div>
    </div>
    <div className="heroVisual">
     <div className="heroVisualTop"><span>SELECTED WORK / 2026</span><span>01 — 06</span></div>
     <div className="heroVisualImage"><img src={projects[0].poster} alt="Selected healthcare video project"/><div className="heroVisualTint"/><div className="heroVisualOverlay"><span className="heroVisualIndex">01 / CLIENT FILM</span><strong>STORIES<br/><em>IN MOTION.</em></strong><span className="heroVisualScroll">SCROLL TO EXPLORE ↓</span></div><div className="heroImageOrb"/></div>
    </div>
    <div className="heroFootnote"><span>DAVINCI RESOLVE · AFTER EFFECTS · PHOTOSHOP</span><span>SCROLL TO DISCOVER ↓</span></div>
   </section>
   <section id="work" className="workSection">
    <div className="sectionHead reveal"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>THE WORK<br/><em>DOES THE TALK.</em></h2></div><p>A selection of edits across healthcare, creator content, podcasts and motion. Every frame has a job to do.</p></div>
    <div className="workGrid">
     <ProjectCard p={projects[0]} index={0} onOpen={setActive}/>
     <div className="workStatement reveal"><span className="statementNo">THE WAY I SEE IT</span><h3>GOOD EDITING<br/>SHOULDN'T<br/><em>GET IN THE WAY.</em></h3><p>It should make the message easier to understand, the story easier to follow and the experience worth finishing.</p><a href="#services">WHAT I DO <b>↗</b></a></div>
     <ProjectCard p={projects[1]} index={1} onOpen={setActive}/>
     <ProjectCard p={projects[2]} index={2} onOpen={setActive}/>
     <div className="workWideIntro reveal"><p className="eyebrow">02 / BEYOND THE CUT</p><h3>WHEN THE IDEA NEEDS<br/><em>A LITTLE MORE LIFE.</em></h3></div>
     <ProjectCard p={projects[3]} index={3} onOpen={setActive}/>
     <ProjectCard p={projects[4]} index={4} onOpen={setActive}/>
     <ProjectCard p={projects[5]} index={5} onOpen={setActive}/>
    </div>
    <div className="workEnd"><span>THAT'S THE CURRENT SELECTION.</span><a href="#contact">HAVE A PROJECT IN MIND? ↗</a></div>
   </section>
   <Marquee/>
   <section id="services" className="servicesSection">
    <div className="sectionHead reveal"><div><p className="eyebrow">03 / SERVICES</p><h2>THE RIGHT EDIT<br/><em>FOR THE STORY.</em></h2></div><p>Different formats need different decisions. The goal stays the same: make every second count.</p></div>
    <div className="serviceList">{services.map(s=><div className="serviceRow reveal" key={s[0]}><span className="serviceNo">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><span className="serviceArrow">↗</span></div>)}</div>
   </section>
   <section className="beliefSection"><div className="beliefInner reveal"><p className="eyebrow">A SIMPLE PRINCIPLE</p><h2>NOT MORE<br/>EFFECTS.<br/><em>MORE IMPACT.</em></h2><p>Transitions and motion are tools, not the point. Every cut, sound and graphic should earn its place.</p></div><div className="beliefStamp">R / 26</div></section>
   <section id="about" className="aboutSection"><div className="aboutSide reveal"><p className="eyebrow">04 / ABOUT</p><h2>HI, I'M<br/><em>RAVI.</em></h2></div><div className="aboutContent reveal"><p className="aboutLead">A video editor focused on content that needs to communicate, not just look cinematic.</p><p>I work across short-form, talking-head, podcast and motion design — bringing structure, rhythm and clarity to every project.</p><div className="software"><span>TOOLS I WORK WITH</span><div><b>DaVinci Resolve</b><b>After Effects</b><b>Photoshop</b></div></div></div></section>
   <section id="contact" className="contactSection"><p className="eyebrow">05 / HAVE A PROJECT?</p><h2>LET'S MAKE<br/><em>IT MATTER.</em></h2><div className="contactBottom"><p>Have footage, an idea or a project that needs a thoughtful edit? Send me a note.</p><a className="contactButton" href="mailto:ravisharma1234n@gmail.com">START A CONVERSATION <b>↗</b></a></div><div className="contactLinks"><a href="mailto:ravisharma1234n@gmail.com">EMAIL ↗</a><a href="https://www.linkedin.com/in/ravi-sharma-b61aa7279" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://x.com/meravi05" target="_blank" rel="noreferrer">X ↗</a></div></section>
  </main>
  <footer><span>RAVI® — VIDEO EDITOR</span><span>MADE WITH INTENTION · © 2026</span><a href="#top">BACK TO TOP ↑</a></footer>
  {active&&<div className="modal" onClick={()=>setActive(null)}><div className="player" onClick={e=>e.stopPropagation()}><button onClick={()=>setActive(null)}>CLOSE ×</button><video src={active.video} controls autoPlay playsInline poster={active.poster}/><small>{active.cat}</small><h3>{active.title}</h3></div></div>}
 </div>
}
