"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

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

  useEffect(() => {
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
        color: '#2563eb', // blue-600
        duration: 200,
        ease: 'outQuad'
     });
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
        translateY: 0,
        color: '#374151', // gray-700 or whatever default was
        duration: 200,
        ease: 'outQuad'
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

    // Observer for scrolling animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.remove('opacity-0'); // Revealing logic if needed
          
          if (target.dataset.animated === 'true') return;
          target.dataset.animated = 'true';

          if (target === aboutRef.current) {
            animate(target.querySelectorAll('.anim-item'), {
              translateY: [20, 0],
              opacity: [0, 1],
              delay: stagger(100),
              duration: 800,
              ease: 'outExpo'
            });
          } else if (target === expRef.current) {
            animate(target.querySelectorAll('.exp-card'), {
                translateX: [-20, 0],
                opacity: [0, 1],
                delay: stagger(150),
                duration: 800,
                ease: 'outQuad'
            });
          } else if (target === projectsRef.current) {
             animate(target.querySelectorAll('.project-card'), {
                scale: [0.9, 1],
                opacity: [0, 1],
                delay: stagger(100),
                duration: 800,
                ease: 'outBack'
            });
          } else if (target === skillsRef.current) {
             animate(target.querySelectorAll('.skill-badge'), {
                scale: [0, 1],
                opacity: [0, 1],
                delay: stagger(50),
                duration: 600,
                ease: 'outElastic(1, .6)'
            });
          } else if (target === eduRef.current) {
             animate(target.querySelectorAll('.edu-item'), {
                translateY: [20, 0],
                opacity: [0, 1],
                delay: stagger(150),
                duration: 800,
                ease: 'outQuart'
            });
          }
        }
      });
    }, observerOptions);

    [aboutRef, expRef, projectsRef, skillsRef, eduRef].forEach(ref => {
        if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden font-sans transition-colors duration-300">
      {/* Navigation / Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter text-gray-900 dark:text-white">ON.</div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium">
                <a href="#about" onClick={(e) => handleScroll(e, 'about')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-gray-700 dark:text-gray-300">About</a>
                <a href="#experience" onClick={(e) => handleScroll(e, 'experience')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-gray-700 dark:text-gray-300">Experience</a>
                <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-gray-700 dark:text-gray-300">Projects</a>
                <a href="#education" onClick={(e) => handleScroll(e, 'education')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-gray-700 dark:text-gray-300">Education</a>
                <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-gray-700 dark:text-gray-300">Skills</a>
                <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="text-gray-700 dark:text-gray-300">Contact</a>
            </nav>
            <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle Dark Mode"
            >
                {isDarkMode ? (
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
        <h2 className="hero-anim opacity-0 text-blue-600 dark:text-blue-400 font-bold mb-4 tracking-wide text-sm uppercase">Portfolio</h2>
        <h1 className="hero-anim opacity-0 text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{cvData.personal.name}</span>.
        </h1>
        <p className="hero-anim opacity-0 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-8">
          {cvData.personal.title}. Specialists in IoT, Machine Learning, and Full Stack Development.
        </p>
        <div className="hero-anim opacity-0 flex gap-4">
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="px-8 py-3 bg-blue-600 dark:bg-blue-600 text-white font-semibold rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors">
            Get in Touch
          </a>
          <a href={cvData.personal.github} target="_blank" onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            GitHub
          </a>
          {cvData.personal.linkedin && (
             <a href={cvData.personal.linkedin} target="_blank" onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 border border-gray-200 dark:border-gray-700 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                LinkedIn
             </a>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="anim-item text-3xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h3>
        <p className="anim-item text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
          {cvData.personal.summary} Currently based in {cvData.personal.location}. 
          I have a passion for building robust full-stack applications and exploring the frontiers of AI and IoT technologies.
        </p>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={expRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500 bg-white dark:bg-gray-900 rounded-3xl shadow-sm my-10 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <h3 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white border-l-4 border-blue-600 dark:border-blue-500 pl-4">Work Experience</h3>
        <div className="space-y-12">
          {cvData.experience.map((job, idx) => (
            <div key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="exp-card opacity-0 grid md:grid-cols-4 gap-4 p-4 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wider uppercase">
                {job.date}
              </div>
              <div className="md:col-span-3">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{job.role}</h4>
                <div className="text-blue-600 dark:text-blue-400 font-medium mb-3">{job.company}</div>
                <ul className="list-disc list-outside ml-4 space-y-2 text-gray-600 dark:text-gray-400">
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
        <h3 className="text-3xl font-bold mb-12 border-l-4 border-purple-600 dark:border-purple-500 pl-4 text-gray-900 dark:text-white">Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cvData.projects.map((project, idx) => (
            <div key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="project-card opacity-0 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-col justify-between transition-colors">
              <div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{project.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline mt-auto">
                  View Project &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" ref={eduRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="text-3xl font-bold mb-12 border-l-4 border-green-600 dark:border-green-500 pl-4 text-gray-900 dark:text-white">Education</h3>
        <div className="space-y-8">
          {cvData.education.map((edu, idx) => (
            <div key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="edu-item opacity-0 flex flex-col md:flex-row md:items-start justify-between bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
                <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{edu.school}</h4>
                    <p className="text-gray-800 dark:text-gray-200 font-medium mt-1">{edu.degree}</p>
                    <div className="mt-4 space-y-1">
                        {edu.details.map((d, i) => <p key={i} className="text-gray-600 dark:text-gray-400 text-sm">{d}</p>)}
                    </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 transition-colors">{edu.date}</span>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{edu.location}</p>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="text-3xl font-bold mb-12 border-l-4 border-pink-600 dark:border-pink-500 pl-4 text-gray-900 dark:text-white">Skills</h3>
        
        <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Core Technologies</h4>
            <div className="flex flex-wrap gap-2">
                {cvData.skills.languages.concat(cvData.skills.technologies).map((skill, idx) => (
                    <span key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="skill-badge opacity-0 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 rounded-lg text-sm font-medium cursor-default inline-block transition-colors border border-transparent dark:border-gray-700">
                        {skill}
                    </span>
                ))}
            </div>
        </div>

        <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Languages</h4>
            <div className="flex flex-wrap gap-2">
                {cvData.skills.humanLanguages.map((lang, idx) => (
                    <span key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="skill-badge opacity-0 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 cursor-default inline-block transition-colors">
                        {lang}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" ref={contactRef} className="bg-gray-900 dark:bg-black text-white py-20 px-6 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Let's Connect</h2>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
                <a href={`mailto:${cvData.personal.email}`} className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{cvData.personal.email}</a>
                {cvData.personal.linkedin && <a href={cvData.personal.linkedin} className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">LinkedIn</a>}
                {cvData.personal.github && <a href={cvData.personal.github} className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">GitHub</a>}
            </div>
            <p className="text-gray-500 dark:text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} {cvData.personal.name}. All rights reserved.
            </p>
        </div>
      </footer>
    </main>
  );
}
