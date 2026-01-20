"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, stagger, createTimeline, svg } from "animejs";

// CV Data
const cvData = {
  personal: {
    name: "OGUZ NURLU",
    title: "MSc in Electronic & Computer Technology (IoT)",
    location: "Dublin, Ireland",
    email: "nurluoguz03@gmail.com",
    phone: "+353 85 151 6418",
    linkedin: "https://linkedin.com/in/oguz-nurlu",
    github: "https://github.com/Thnorty",
    summary:
      "Full Stack Developer and MSc student specializing in IoT, Data Analysis, and Machine Learning. Experienced in building cybersecurity platforms and automated content generation systems.",
  },
  education: [
    {
      school: "Dublin City University",
      location: "Dublin, IE",
      date: "Sep 2025 ‐ Present",
      degree: "MSc in Electronic & Computer Technology (IoT)",
      details: ["Courses: Data Analysis, Machine Learning, Wireless Communications"],
    },
    {
      school: "TOBB University of Economics and Technology",
      location: "Ankara, TR",
      date: "2021 – 2025",
      degree: "Bachelor’s in Computer Engineering",
      details: [
        "GPA: 2.88 / 4.00",
        "Courses: Big Data, Parallel Processing, Deep Learning, Machine Learning, Computer Vision",
      ],
    },
  ],
  experience: [
    {
      company: "STM",
      role: "Full Stack Developer Intern",
      date: "Sep – Dec 2024",
      duration: "3 months",
      details: [
        "Contributed to CyThreat, STM’s cyber threat intelligence portal.",
        "Worked on frontend and backend, ensuring compatibility with existing code.",
        "Enhanced authentication systems, logging mechanisms, and service integrations.",
        "Technologies: React, Docker, Django REST APIs, 2FA, Logstash, Vulners API.",
      ],
    },
    {
      company: "STM",
      role: "Full Stack Developer Intern",
      date: "Jan – Apr 2024",
      duration: "3 months",
      details: [
        "Developed and maintained frontend and backend components of CyThreat.",
        "Implemented UI features, optimized performance, and integrated backend services.",
        "Collaborated with the cybersecurity team to improve threat detection and response.",
        "Technologies: React, Django, MySQL, Elasticsearch.",
      ],
    },
    {
      company: "Jotform",
      role: "Frontend Developer Intern",
      date: "May – Aug 2023",
      duration: "3 months",
      details: [
        "Developed UI components for Jotform Salesforce app.",
        "Technologies: React, HTML, CSS, JavaScript, SOQL.",
      ],
    },
    {
      company: "BTK Akademi",
      role: "Instructor",
      date: "Jan – Feb 2023",
      details: [
        "Taught 'Introduction to Programming Using Java' to ~50 university students.",
        "Created educational materials available on GitHub.",
      ],
    },
  ],
  projects: [
    {
      name: "Thalia App",
      description:
        "Automated system creating new episodes for a cartoon show using fine-tuned LLMs, image generation, and voice synthesis.",
    },
    {
      name: "ETUPedia App",
      description:
        "Mobile app for students/teachers at TOBB ETÜ. 300+ users. Features forum and academic info.",
      link: "https://play.google.com/store/apps/details?id=com.thnorty.etupedia",
    },
    {
      name: "Yanındayım App",
      description:
        "2nd place in MobileAction Hackathon. Emergency assistance app for older adults/health conditions with AI chatbot.",
    },
  ],
  skills: {
    languages: ["Java", "Python", "C", "SQL", "JavaScript", "TypeScript"],
    technologies: [
      "Elasticsearch",
      "Spark",
      "Docker",
      "Django",
      "React",
      "React Native",
      "REST API",
      "Git",
    ],
    humanLanguages: ["English (Native/Fluent)", "Turkish (Native)", "German (A2)"],
  },
};

export default function Portfolio() {
  const headerRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const expRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const eduRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check system preference on mount
    if (typeof window !== 'undefined') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // Check local storage or default to system
        const storedTheme = localStorage.getItem('theme');
        
        if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDarkMode(false);
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDarkMode(true);
    }
  };

  const handleHover = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1.05,
      duration: 300,
      ease: 'outQuad'
    });
  };

  const handleHoverLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      duration: 300,
      ease: 'outQuad'
    });
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLElement>) => {
     animate(e.currentTarget, {
        translateY: -2,
        duration: 200,
        ease: 'outQuad'
     });
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    animate(target, {
        translateY: 0,
        duration: 200,
        ease: 'outQuad',
        onComplete: () => {
             target.style.transform = '';
        }
     });
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  useEffect(() => {
    // Initial Hero Animation
    if (headerRef.current) {
        animate(headerRef.current.querySelectorAll('.hero-anim'), {
            translateY: [20, 0],
            opacity: [0, 1],
            delay: stagger(100),
            duration: 800,
            ease: 'outExpo'
        });
    }

    // Scroll scrubbing animation logic
    const sections = [
        { ref: aboutRef, selector: '.anim-item' },
        { ref: expRef, selector: '.exp-card' },
        { ref: projectsRef, selector: '.project-card' },
        { ref: skillsRef, selector: '.skill-badge' }, 
        { ref: eduRef, selector: '.edu-item' },
        { ref: contactRef, selector: '.group' }
    ];

    const animations: any[] = [];

    // Create a timeline for each section
    sections.forEach(({ ref, selector }) => {
        if (!ref.current) return;
        const target = ref.current;
        
        // Ensure initial state
        target.classList.remove('opacity-0');
        const elements = target.querySelectorAll(selector);
        
        // Initial setup for scrubbed elements
        elements.forEach((el: any) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
        });

        const tl = createTimeline({
            autoplay: false,
            duration: 1000,
            playbackEase: 'linear'
        });

        tl.add(elements, {
            opacity: [0, 1],
            translateY: [50, 0],
            delay: stagger(100),
            duration: 1000,
            ease: 'outQuad'
        });

        animations.push({ tl, element: target });
    });

    const onScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        animations.forEach(({ tl, element }) => {
            const rect = element.getBoundingClientRect();
            // Start animating when the top of the element enters the bottom of the viewport
            // End when the center of the element is in the center of the viewport (or slightly offset)
            
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            const start = elementTop - windowHeight * 0.9; // Start slightly before it enters
            const end = elementTop + elementHeight * 0.2; // End when scrolled in a bit

            let progress = (scrollY - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress));
            
            tl.seek(tl.duration * progress);
        });
        
        // Parallax for Hero
        if (headerRef.current) {
            const offset = window.scrollY * 0.5;
            headerRef.current.style.transform = `translateY(${offset}px)`;
            headerRef.current.style.opacity = `${1 - window.scrollY / 700}`;
        }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial check

    // Signature Animation
    const signatureTl = createTimeline({
        defaults: { ease: 'easeInOutSine' }
    });
    
    // We need to ensure the svg path exists before animating
    const signaturePath = document.querySelector('.signature-text');
    if (signaturePath) {
        // In Anime.js v4, creates a drawable for stroke animation
        // For text elements, we use CSS stroke-dashoffset primarily, or createDrawable if compatible
        // Let's use the createDrawable helper which is designed for this
        const drawable = svg.createDrawable('.signature-text');
        
        signatureTl.add(drawable, {
            draw: '0 1',
            duration: 4500,
        })
    }

    return () => {
        window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden font-sans transition-colors duration-300">
      {/* Navigation / Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md z-50 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-bold text-xl tracking-tighter text-neutral-900 dark:text-white cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition-colors">ON.</a>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium">
                <a href="#about" onClick={(e) => handleScroll(e, 'about')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-neutral-700 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">About</a>
                <a href="#experience" onClick={(e) => handleScroll(e, 'experience')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-neutral-700 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Experience</a>
                <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-neutral-700 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Projects</a>
                <a href="#education" onClick={(e) => handleScroll(e, 'education')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-neutral-700 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Education</a>
                <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-neutral-700 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Skills</a>
                <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-neutral-700 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Contact</a>
            </nav>
            <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Toggle Dark Mode"
            >
                {!mounted ? (
                   <div className="w-5 h-5" /> // Placeholder to prevent layout shift
                ) : isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={headerRef} className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-[80vh] flex flex-col justify-center">
        <div className="hero-anim opacity-0 mb-6 flex flex-wrap items-baseline gap-4">
            <span className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">Hi, I'm</span>
            <div className="inline-block">
                <svg width="400" height="1" className="overflow-visible w-70 md:w-100">
                     <text x="0" y="0" 
                           className="signature-text text-6xl md:text-8xl font-anta fill-transparent stroke-green-600 dark:stroke-green-400 stroke-2"
                           style={{ fontFamily: 'var(--font-anta)', fillOpacity: 0 }}
                     >
                        {cvData.personal.name}
                     </text>
                </svg>
            </div>
        </div>
        <p className="hero-anim opacity-0 text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed mb-8">
          {cvData.personal.title}. Specialists in IoT, Machine Learning, and Full Stack Development.
        </p>
        <div className="hero-anim opacity-0 flex gap-4">
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="px-8 py-3 bg-green-600 dark:bg-green-600 text-white font-semibold rounded-full shadow-lg shadow-green-600/30 hover:bg-green-700 dark:hover:bg-green-500 transition-colors">
            Get in Touch
          </a>
          <a href={cvData.personal.github} target="_blank" onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="px-8 py-3 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-700 font-semibold rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            GitHub
          </a>
          {cvData.personal.linkedin && (
             <a href={cvData.personal.linkedin} target="_blank" onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="px-8 py-3 bg-white dark:bg-neutral-800 text-green-700 dark:text-green-400 border border-neutral-200 dark:border-neutral-700 font-semibold rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                LinkedIn
             </a>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="anim-item text-3xl font-bold mb-8 text-neutral-900 dark:text-white">About Me</h3>
        <p className="anim-item text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
          {cvData.personal.summary} Currently based in {cvData.personal.location}. 
          I have a passion for building robust full-stack applications and exploring the frontiers of AI and IoT technologies.
        </p>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={expRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="text-3xl font-bold mb-12 text-neutral-900 dark:text-white border-l-4 border-green-600 dark:border-green-500 pl-4">Work Experience</h3>
        <div className="space-y-8">
          {cvData.experience.map((job, idx) => (
            <div key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="exp-card opacity-0 grid md:grid-cols-4 gap-4 p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <div className="text-neutral-500 dark:text-neutral-400 text-sm font-semibold tracking-wider uppercase">
                {job.date}
              </div>
              <div className="md:col-span-3">
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white">{job.role}</h4>
                <div className="text-green-600 dark:text-green-400 font-medium mb-3">{job.company}</div>
                <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-600 dark:text-neutral-400">
                  {job.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="text-3xl font-bold mb-12 border-l-4 border-green-600 dark:border-green-500 pl-4 text-neutral-900 dark:text-white">Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cvData.projects.map((project, idx) => (
            <div key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="project-card opacity-0 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md border border-neutral-100 dark:border-neutral-800 flex flex-col justify-between transition-colors">
              <div>
                <h4 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">{project.name}</h4>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline mt-auto">
                  View Project &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" ref={eduRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="text-3xl font-bold mb-12 border-l-4 border-green-600 dark:border-green-500 pl-4 text-neutral-900 dark:text-white">Education</h3>
        <div className="space-y-8">
          {cvData.education.map((edu, idx) => (
            <div key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="edu-item opacity-0 flex flex-col md:flex-row md:items-start justify-between bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
                <div>
                    <h4 className="text-xl font-bold text-neutral-900 dark:text-white">{edu.school}</h4>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium mt-1">{edu.degree}</p>
                    <div className="mt-4 space-y-1">
                        {edu.details.map((d, i) => <p key={i} className="text-neutral-600 dark:text-neutral-400 text-sm">{d}</p>)}
                    </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                    <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-300 transition-colors">{edu.date}</span>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">{edu.location}</p>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="text-3xl font-bold mb-12 border-l-4 border-green-600 dark:border-green-500 pl-4 text-neutral-900 dark:text-white">Skills</h3>
        
        <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">Core Technologies</h4>
            <div className="flex flex-wrap gap-2">
                {cvData.skills.languages.concat(cvData.skills.technologies).map((skill, idx) => (
                    <span key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="skill-badge opacity-0 px-4 py-2 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-lg text-sm font-medium border border-neutral-200 dark:border-neutral-800 shadow-sm cursor-default inline-block transition-colors">
                        {skill}
                    </span>
                ))}
            </div>
        </div>

        <div>
            <h4 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">Languages</h4>
            <div className="flex flex-wrap gap-2">
                {cvData.skills.humanLanguages.map((lang, idx) => (
                    <span key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="skill-badge opacity-0 px-4 py-2 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-lg text-sm font-medium border border-neutral-200 dark:border-neutral-800 shadow-sm cursor-default inline-block transition-colors">
                        {lang}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="text-3xl font-bold mb-12 border-l-4 border-green-600 dark:border-green-500 pl-4 text-neutral-900 dark:text-white">Let's Connect</h3>
        <div className="grid md:grid-cols-3 gap-6">
            <a href={`mailto:${cvData.personal.email}`} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="flex flex-col items-center text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-md border-2 border-neutral-100 dark:border-neutral-800 transition-colors hover:border-green-200 dark:hover:border-green-800 group">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-full text-green-600 dark:text-green-400 mb-4 group-hover:bg-green-50 dark:group-hover:bg-neutral-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </div>
                <span className="text-neutral-900 dark:text-white font-bold text-lg mb-1">Email</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-sm">{cvData.personal.email}</span>
            </a>
            
            {cvData.personal.linkedin && (
                <a href={cvData.personal.linkedin} target="_blank" onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="flex flex-col items-center text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-md border-2 border-neutral-100 dark:border-neutral-800 transition-colors hover:border-green-200 dark:hover:border-green-800 group">
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-full text-green-600 dark:text-green-400 mb-4 group-hover:bg-green-50 dark:group-hover:bg-neutral-700 transition-colors">
                        <svg fill="currentColor" viewBox="0 0 24 24" className="size-8 w-8 h-8">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </div>
                    <span className="text-neutral-900 dark:text-white font-bold text-lg mb-1">LinkedIn</span>
                    <span className="text-neutral-500 dark:text-neutral-400 text-sm">Professional Profile</span>
                </a>
            )}

            {cvData.personal.github && (
                <a href={cvData.personal.github} target="_blank" onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="flex flex-col items-center text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-md border-2 border-neutral-100 dark:border-neutral-800 transition-colors hover:border-green-200 dark:hover:border-green-800 group">
                     <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-full text-green-600 dark:text-green-400 mb-4 group-hover:bg-green-50 dark:group-hover:bg-neutral-700 transition-colors">
                        <svg fill="currentColor" viewBox="0 0 24 24" className="size-8 w-8 h-8">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </div>
                    <span className="text-neutral-900 dark:text-white font-bold text-lg mb-1">GitHub</span>
                    <span className="text-neutral-500 dark:text-neutral-400 text-sm">Code Repositories</span>
                </a>
            )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-64 py-8 text-center text-neutral-400 dark:text-neutral-600 text-sm">
        <p>&copy; {new Date().getFullYear()} {cvData.personal.name}. All rights reserved.</p>
      </footer>
    </main>
  );
}
