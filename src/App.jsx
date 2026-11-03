import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, BookOpen, Braces, BriefcaseBusiness, Building2, Check, Code2, Copy, Download, FileText, Flag, Globe2, GraduationCap, Heart, Layers, Mail, MapPin, MessageCircle, Rocket, Send, Server, Sparkles, Star, Target, Terminal, User, Users, Zap } from 'lucide-react';
import { FaBootstrap, FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaJava, FaJs, FaPython, FaReact } from 'react-icons/fa';
import { SiMysql, SiNetlify, SiPostman, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import portrait from '../assets/portrait.png';
import workspaceIllustration from '../assets/WhatsApp Image 2026-08-31 at 23.53.15.jpeg';
import skillsIllustration from '../assets/WhatsApp Image 2026-09-01 at 00.14.51.jpeg';
import inworldPreview from '../assets/inworld-preview.png';
import pivotPreview from '../assets/pivot-preview.png';
import lmsPreview from '../assets/lms-preview.png';
import './styles/app.css';
import './styles/about.css';
import './styles/skills.css';
import './styles/works.css';
import './styles/contact.css';

const navigation = ['Home', 'About', 'Skills', 'Works', 'Contact'];
const contactEmail = 'vajeshbabu200624@gmail.com';
const resumeFiles = import.meta.glob('../assets/resume.pdf', { eager: true, query: '?url', import: 'default' });
const resumeUrl = resumeFiles['../assets/resume.pdf'];
const projects = [
  {
    name: 'InWorld', category: 'Web App', categories: ['Web App'], preview: inworldPreview, previewAlt: 'InWorld login screen',
    description: 'A social web app for connecting with people, sharing posts, and exploring profiles.',
    demo: 'https://inworld.vercel.app/', source: 'https://github.com/vajesh-005/inworld.git',
    technologies: [[FaHtml5, 'HTML', '#ef652a'], [FaCss3Alt, 'CSS', '#38a9ff'], [FaJs, 'JavaScript', '#f7d33a']],
  },
  {
    name: 'Pivot Table', category: 'Tool', categories: ['Tool'], preview: pivotPreview, previewAlt: 'Pivot Table with grouped salary data and totals',
    description: 'An interactive data analysis tool for organizing and exploring data in pivot tables.',
    demo: 'https://pivot-table-vajesh.vercel.app/', source: 'https://github.com/vajesh-005/pivot_table.git',
    technologies: [[FaReact, 'React JS', '#61dafb'], [FaCss3Alt, 'CSS', '#38a9ff'], [FaHtml5, 'HTML', '#ef652a']],
  },
  {
    name: 'Leave Management System', category: 'Full Stack', categories: ['Web App', 'Full Stack'], preview: lmsPreview, previewAlt: 'Leave Management System GitHub repository',
    description: 'A full-stack application for managing employee leave requests and approval workflows.',
    source: 'https://github.com/vajesh-005/LMS_FULLSTACK.git',
    technologies: [[FaReact, 'React JS', '#61dafb'], [FaHtml5, 'HTML', '#ef652a'], [FaCss3Alt, 'CSS', '#38a9ff'], [FaJs, 'JavaScript', '#f7d33a'], [Server, 'Hapi JS', '#f5b76b']],
  },
];
const projectFilters = ['All Projects', 'Web App', 'Tool', 'Full Stack'];
const skills = [[FaHtml5, 'HTML', 92], [FaCss3Alt, 'CSS', 87], [FaJs, 'JavaScript', 85], [SiMysql, 'SQL', 90], [FaReact, 'React', 70], [SiTypescript, 'TypeScript', 80], [FaPython, 'Python', 89], [FaJava, 'Java', 20], [Braces, 'Problem Solving', 75], [SiTailwindcss, 'Tailwind CSS', 75]];
const tools = [[FaGitAlt, 'Git'], [FaGithub, 'GitHub'], [VscVscode, 'VS Code'], [SiPostman, 'Postman'], [FaBootstrap, 'Bootstrap'], [SiTailwindcss, 'Tailwind CSS'], [SiNetlify, 'Netlify']];
const highlights = [
  { icon: Code2, title: 'Clean Code', text: 'Writing scalable and maintainable code for real-world solutions.' },
  { icon: Zap, title: 'Performance Focused', text: 'Building fast, optimized, and accessible web applications.' },
  { icon: Sparkles, title: 'Modern Tech', text: 'Working with the latest tools and technologies.' },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const copyStatusTimeout = useRef(null);
  const [projectFilter, setProjectFilter] = useState('All Projects');
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) setActiveSection(visibleEntry.target.id);
    }, { rootMargin: '-35% 0px -55% 0px' });
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      clearTimeout(copyStatusTimeout.current);
    };
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    if (!name || !email || !message) {
      event.currentTarget.querySelector(!name ? '[name="name"]' : !email ? '[name="email"]' : '[name="message"]').focus();
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyStatus('Email copied');
    } catch {
      setCopyStatus('Unable to copy email');
    } finally {
      clearTimeout(copyStatusTimeout.current);
      copyStatusTimeout.current = setTimeout(() => setCopyStatus(''), 5000);
    }
  }
  return <main>
    <header className="site-header"><a className="brand" href="#home" aria-label="Vajesh home">VJ</a><nav aria-label="Main navigation">{navigation.map((item) => { const sectionId = item.toLowerCase(); return <a className={activeSection === sectionId ? 'active' : ''} href={`#${sectionId}`} key={item}>{item}</a>; })}</nav></header>
    <section className="hero" id="home">
      <div className="hero-visual" aria-hidden="true"><div className="dot-grid dot-grid-left" /><div className="portrait-frame"><img src={portrait} alt="" /></div><div className="floating-icon code-icon"><Code2 /></div><div className="floating-icon braces-icon"><Braces /></div><div className="floating-icon terminal-icon"><Terminal /></div><div className="orbit" /></div>
      <div className="hero-content"><p className="eyebrow">Hey there,</p><h1>I&apos;m <span>Vajesh.</span></h1><div className="role-line"><strong>Frontend Developer</strong><span>React</span><span>TypeScript</span><span>JavaScript</span></div><p className="hero-summary">I build clean, responsive, and interactive web experiences that make an impact.</p><div className="hero-actions"><a className="button button-primary" href="#works">View My Work <ArrowUpRight /></a><a className="button button-secondary" href="#contact">Contact Me <Mail /></a></div><div className="social-links" aria-label="Social media links"><a href="https://www.linkedin.com/in/vajesh-babu-0851a832b/" aria-label="LinkedIn"><Globe2 /></a><a href="https://github.com/vajesh-005" aria-label="GitHub"><Code2 /></a><a href="https://x.com/Vajesh_05" aria-label="X"><MessageCircle /></a></div><div className="hero-highlights">{highlights.map(({ icon: Icon, title, text }) => <article key={title}><Icon /><div><h2>{title}</h2><p>{text}</p></div></article>)}</div></div>
      <a className="scroll-prompt" href="#about">Scroll down <ArrowDown /></a><div className="dot-grid dot-grid-right" />
    </section>
    <section className="content-section about" id="about"><div className="about-intro"><p className="eyebrow">About me</p><h2>A little about me</h2><div className="about-stats"><article><BriefcaseBusiness /><strong>1.5+</strong><span>Years of Experience</span></article><article><Building2 /><strong>1</strong><span>Amazing Company</span></article><article><Users /><strong>Countless</strong><span>Things Learned</span></article></div><img className="about-artwork" src={workspaceIllustration} alt="Developer working at a laptop" /><div className="what-i-do"><h3>What I do</h3><p>I build responsive, accessible and performant web applications with clean code and great user experience.</p><div><span>Frontend Development</span><span>UI/UX Implementation</span><span>Problem Solving</span></div></div></div><div className="journey"><h3>My Journey</h3><div className="timeline">{[[GraduationCap, 'Completed 12th', 'Completed my 12th in 2024.', '2024'], [BookOpen, 'Freshworks Academy', 'Learned web development and gained strong fundamentals.', '2024'], [Building2, 'Interview in Lumel', 'Got placed and started my journey.', '2024'], [Rocket, 'Internship', 'Converted into a full time employee.', '2024'], [Star, 'Promotion', 'Promoted to Associate Product Developer.', 'Now']].map(([Icon, title, text, year]) => <article key={title}><span className="timeline-icon"><Icon /></span><h4>{title}</h4><p>{text}</p><strong>{year}</strong></article>)}</div><div className="about-cards"><article className="journey-card"><h3>How I got here</h3><div className="quote"><Flag /><p>I applied to Freshworks because of financial struggle. It was a turning point that changed my life and career.</p></div></article><article className="journey-card"><h3>What drives me</h3>{[[Heart, 'Solving meaningful problems that create real impact.'], [Users, 'Collaborating and learning from amazing people.'], [Target, 'Growing continuously and building a better future.']].map(([Icon, text]) => <div className="drive" key={text}><Icon /><p>{text}</p></div>)}</article></div></div></section>
      <section className="content-section skills" id="skills"><div className="skills-main"><div className="skills-copy"><p className="eyebrow">Capabilities</p><h2>Tech skills</h2><p>A blend of technologies and tools I use to build clean, efficient and impactful web experiences.</p><div className="skill-grid">{skills.map(([Icon, name, level]) => <article className="skill" key={name}><span className="skill-symbol"><Icon /></span><div><span>{name}</span><strong>{level}%</strong></div><span className="skill-track"><span className={`skill-level-${level}`} /></span></article>)}</div></div><div className="skills-visual"><img src={skillsIllustration} alt="Laptop displaying code with web development symbols" /></div></div><div className="tools-strip"><h3>Tools &amp; Others</h3><div>{tools.map(([Icon, tool]) => <article key={tool}><Icon /><span>{tool}</span></article>)}</div></div></section>
    <section className="content-section works" id="works">
      <div className="works-inner">
        <div className="works-heading">
          <div>
            <p className="works-eyebrow"><Code2 /> My Work</p>
            <h2>Projects I&apos;ve <span>Built</span></h2>
            <p className="works-summary">A selection of my real-world and personal projects, built to solve problems and explore new ideas.</p>
          </div>
          <div className="works-emblem" aria-hidden="true"><Code2 /></div>
        </div>
        <div className="project-filters" role="group" aria-label="Filter projects">
          {projectFilters.map(filter => <button type="button" key={filter} aria-pressed={projectFilter === filter} onClick={() => setProjectFilter(filter)}>{filter} ({filter === 'All Projects' ? projects.length : projects.filter(project => project.categories.includes(filter)).length})</button>)}
        </div>
        <div className="project-grid" aria-live="polite">
          {projects.filter(project => projectFilter === 'All Projects' || project.categories.includes(projectFilter)).map(project => <article className="project-card" key={project.name}>
            <a className="project-preview" href={project.demo || project.source} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>
              <img src={project.preview} alt={project.previewAlt} loading="lazy" />
            </a>
            <div className="project-body">
              <div className="project-meta"><span><Layers /> {project.category}</span><a href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.name} source code`} title="Source code"><FaGithub /></a></div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul className="project-technologies" aria-label={`${project.name} technologies`}>{project.technologies.map(([Icon, name, color]) => <li key={name} title={name}><Icon style={{ color }} aria-hidden="true" /><span>{name}</span></li>)}</ul>
              <div className="project-actions">
                {project.demo && <a className="button button-primary" href={project.demo} target="_blank" rel="noreferrer"><ArrowUpRight /> Live Demo</a>}
                <a className="button button-secondary" href={project.source} target="_blank" rel="noreferrer"><FaGithub /> {project.demo ? 'Source Code' : 'View on GitHub'}</a>
              </div>
            </div>
          </article>)}
        </div>
        <div className="works-github"><FaGithub /><div><h3>Explore More on GitHub</h3><p>More projects and experiments from my development journey.</p></div><a className="button button-secondary" href="https://github.com/vajesh-005" target="_blank" rel="noreferrer">Visit My GitHub <ArrowUpRight /></a></div>
      </div>
    </section>
    <section className="content-section contact" id="contact">
      <div className="contact-inner">
        <div className="contact-copy">
          <p className="contact-eyebrow"><span /> Get in Touch</p>
          <h2>Have a project<br />in mind? <span>Let&apos;s talk.</span></h2>
          <p className="contact-summary">I&apos;m always open to discussing new ideas, collaborations, or opportunities. Feel free to reach out.</p>
          <div className="contact-details">
            <article className="contact-detail">
              <span className="contact-icon"><Mail /></span>
              <div><h3>Email</h3><a href={`mailto:${contactEmail}`}>{contactEmail}</a><span className="copy-status" role="status">{copyStatus}</span></div>
              <button className="copy-email" type="button" onClick={copyEmail} aria-label="Copy email address" title={copyStatus === 'Email copied' ? 'Email copied' : 'Copy email address'}>{copyStatus === 'Email copied' ? <Check /> : <Copy />}</button>
            </article>
            <article className="contact-detail"><span className="contact-icon"><MapPin /></span><div><h3>Location</h3><p>Chennai, Tamil Nadu, India</p></div></article>
            <article className="contact-detail"><span className="contact-icon"><FileText /></span><div><h3>Resume</h3><p>{resumeUrl ? 'Download my latest resume' : 'PDF coming soon'}</p></div>{resumeUrl ? <a className="resume-download" href={resumeUrl} download="Vajesh-Babu-Resume.pdf">Download <Download /></a> : <button className="resume-download" type="button" disabled title="Resume PDF coming soon">Download <Download /></button>}</article>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} onChange={() => setIsSubmitted(false)}>
          <div className="contact-form-heading"><span className="contact-icon"><Mail /></span><div><h3>Send a Message</h3><p>I&apos;ll get back to you as soon as possible.</p></div></div>
          <label htmlFor="contact-name">Name</label><div className="contact-input"><User aria-hidden="true" /><input id="contact-name" name="name" placeholder="Your name" autoComplete="name" maxLength={100} required /></div>
          <label htmlFor="contact-email">Email</label><div className="contact-input"><Mail aria-hidden="true" /><input id="contact-email" name="email" type="email" placeholder="Your email" autoComplete="email" maxLength={254} required /></div>
          <label htmlFor="contact-message">Message</label><div className="contact-input contact-textarea"><MessageCircle aria-hidden="true" /><textarea id="contact-message" name="message" placeholder="Tell me about your idea, project, or opportunity..." rows="4" maxLength={3000} required /></div>
          <button className="button button-primary contact-send" type="submit">Send Message <Send /></button>
          {isSubmitted && <p className="contact-form-status" role="status">Email draft prepared. Your message has not been sent yet.</p>}
        </form>
      </div>
    </section>
  </main>;
}
export default App;