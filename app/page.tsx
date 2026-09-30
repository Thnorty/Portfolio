"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { animate, stagger, createTimeline, svg, type JSAnimation } from "animejs";

// CV Data
type Link = { label: string; href: string };

type Project = {
  name: string;
  subtitle?: string;
  date: string;
  award?: string;
  description: string;
  tech: string[];
  links?: Link[];
};

const cvData = {
  personal: {
    name: "OGUZ NURLU",
    title: "Software engineer based in Dublin",
    location: "Dublin, Ireland",
    email: "nurluoguz03@gmail.com",
    linkedin: "https://linkedin.com/in/oguz-nurlu",
    github: "https://github.com/Thnorty",
    summary:
      "I hold an MSc in Electronic & Computer Technology (IoT) from Dublin City University with First Class Honours, and a BSc in Computer Engineering from TOBB University of Economics and Technology. My work spans full-stack and mobile products, LLM agents and computer vision, and low-level systems, from a hackathon-winning drone intelligence agent to a RISC-V CNN accelerator and eBPF/XDP packet filtering.",
  },
  highlights: [
    { value: "2nd", label: "nationally at ROKETSAN Level Up AI, plus the ROKETSAN AI Award" },
    { value: "1.1", label: "First Class Honours, MSc at Dublin City University" },
    { value: "300+", label: "active users on ETUPedia, published on the Play Store" },
    { value: "4–6×", label: "cycle reduction from my RISC-V CNN accelerator in gem5" },
  ],
  education: [
    {
      school: "Dublin City University",
      location: "Dublin, IE",
      date: "Sep 2025 – Sep 2026",
      degree: "MSc in Electronic & Computer Technology (Major in IoT)",
      honours: "First Class Honours (1.1)",
      details: [
        { label: "Thesis", text: "Hardware Acceleration of Multi-Task Convolutional Neural Networks on RISC-V Architectures" },
        { label: "Coursework", text: "Network Stack Implementation (Linux kernel internals in C), Data Analysis, Machine Learning, Wireless Communications, Security for Edge Networks" },
      ],
    },
    {
      school: "TOBB University of Economics and Technology",
      location: "Ankara, TR",
      date: "2021 – 2025",
      degree: "BSc in Computer Engineering",
      details: [
        { label: "Graduation Project", text: "Automated Story Generation and Multimodal Rendering Engine" },
        { label: "Coursework", text: "Big Data (AWS S3/Lambda, Kubernetes), Parallel Processing, Deep Learning, Machine Learning, Computer Vision" },
      ],
    },
  ],
  experience: [
    {
      company: "Dublin City University",
      role: "Teaching Assistant & Demonstrator",
      location: "Dublin, IE",
      date: "Jan – May 2026",
      details: [
        "Module demonstrator for EEN1037 (Web Application Development).",
        "Led weekly lab sessions, mentored students on full-stack architecture, and managed assignment evaluations.",
      ],
      tech: [],
    },
    {
      company: "STM",
      role: "Full Stack Developer Intern",
      location: "Ankara, TR",
      date: "Sep – Dec 2024",
      details: [
        "Contributed to CyThreat, STM’s cyber threat intelligence portal, keeping frontend and backend compatible.",
        "Enhanced authentication (including 2FA), logging mechanisms, and external threat intelligence API integrations.",
      ],
      tech: ["React", "Docker", "Django REST Framework", "Logstash", "Elasticsearch"],
    },
    {
      company: "STM",
      role: "Full Stack Developer Intern",
      location: "Ankara, TR",
      date: "Jan – Apr 2024",
      details: [
        "Developed and maintained responsive UI features and backend endpoints for the CyThreat platform.",
        "Optimised database queries and API response latencies for large-scale security incident datasets.",
      ],
      tech: ["React", "Django", "MySQL", "Elasticsearch"],
    },
    {
      company: "Jotform",
      role: "Frontend Developer Intern",
      location: "Ankara, TR",
      date: "May – Aug 2023",
      details: ["Developed and optimised user interface components for the Jotform Salesforce integration."],
      tech: ["React", "JavaScript", "HTML5", "CSS3", "SOQL"],
    },
    {
      company: "BTK Akademi",
      role: "Instructor",
      location: "Ankara, TR",
      date: "Jan – Feb 2023",
      details: [
        "Delivered an intensive “Introduction to Programming Using Java” course to 50+ university students.",
        "Designed the curriculum, assignments and sample projects from scratch, and published them open source.",
      ],
      tech: ["Java"],
      link: { label: "Course materials", href: "https://github.com/Thnorty/BTK" },
    },
  ],
  projects: [
    {
      name: "Field-Report-Assisted Risk Agent",
      date: "2026",
      award: "National Hackathon 2nd Place · ROKETSAN AI Award",
      description:
        "Captained a 6-person team at ROKETSAN Level Up AI, a 48-hour national hackathon for 72 engineers selected from ~2,500 applicants. Fused RF-DETR and YOLO with TTA and a WBF ensemble for aerial vehicle detection (0.863 val mAP50), then built an LLM agent that weighs drone detections, vehicle tracks and possibly misleading field reports, with a deterministic core enforcing 8 code-level guardrails. Also shipped a 15-tool chat agent and Karargah Gözü, a Flutter app with live replay, push alerts and Turkish voice questions.",
      tech: ["RF-DETR", "YOLO", "LLM Agents", "Python", "Flutter", "Firebase"],
      links: [{ label: "GitHub", href: "https://github.com/Thnorty/RoketsanLevelUp" }],
    },
    {
      name: "RepForth",
      subtitle: "Exercise Planner & Tracker",
      date: "2026",
      description:
        "Local-first Android training app with a Wear OS companion, released at v1.0.2. A multi-module Gradle project with baseline profiles, a catalogue of 1,324 animated exercises, and full English and Turkish support. No account, no backend and no telemetry.",
      tech: ["Kotlin", "Android", "Wear OS", "Gradle"],
      links: [{ label: "GitHub", href: "https://github.com/Thnorty/RepForth" }],
    },
    {
      name: "Cairn",
      subtitle: "AI-Verified Habit Tracker",
      date: "2026",
      description:
        "Cross-platform habit tracker where every completion is proven by a photo that an AI verifier checks before it counts. Local-first, with Drift/SQLite offline storage and Supabase sync, plus subscriptions, localisation, notifications and home screen widgets.",
      tech: ["Flutter", "Dart", "Supabase", "Riverpod", "Drift"],
      links: [{ label: "GitHub", href: "https://github.com/Thnorty/cairn" }],
    },
    {
      name: "Varlık Defteri",
      subtitle: "Property & Investment Manager",
      date: "2026",
      description:
        "Private asset management system: a React + TypeScript SPA on a Django REST API. Deeds, land, shops and cooperative shares share one abstract base model, and the app is network-isolated with no UI or API data loading before authentication.",
      tech: ["React", "TypeScript", "Vite", "Tailwind", "Django REST"],
    },
    {
      name: "RSVPro",
      subtitle: "Speed Reading App",
      date: "2026",
      description:
        "RSVP reader that flashes words at 100–1000+ WPM with Optimal Recognition Point alignment and pacing that adapts to punctuation and word length. Imports PDFs, tracks reading progress, and syncs accounts through Supabase.",
      tech: ["React Native", "Expo Router", "TypeScript", "Supabase", "Zustand"],
      links: [{ label: "GitHub", href: "https://github.com/Thnorty/RSVPro" }],
    },
    {
      name: "ETUPedia",
      date: "2024",
      description:
        "Social forum and academic directory for university students, grown to 300+ active users. Real-time feeds, push notifications, caching, full internationalisation and animated, themed navigation.",
      tech: ["React Native", "Expo", "Django REST", "PostgreSQL", "Docker"],
      links: [
        { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.thnorty.etupedia" },
        { label: "GitHub", href: "https://github.com/Thnorty/ETUPedia-frontend" },
      ],
    },
    {
      name: "TinyKITTINet",
      subtitle: "Hardware-Accelerated Multi-Task CNN",
      date: "2026",
      description:
        "33.7k-parameter INT8 CNN for road perception on KITTI (classification, bounding box and depth), running on a dedicated Verilog accelerator in a PicoRV32 soft-core SoC. 4–6× fewer cycles than out-of-order x86/RISC-V baselines in gem5, with bit-identical integer results verified from PyTorch QAT through C models to RTL testbenches.",
      tech: ["Verilog", "RISC-V", "gem5", "PyTorch"],
    },
    {
      name: "eBPF/XDP DDoS Mitigation",
      date: "2026",
      description:
        "XDP program in C, loaded through BCC from Python, that drops fragmented ICMP floods at the driver before the kernel network stack allocates for them. Benchmarked against a Netfilter implementation under a Ping of Death style attack, and deployed on a Raspberry Pi.",
      tech: ["C", "eBPF", "XDP", "BCC", "Python", "Linux kernel"],
    },
    {
      name: "Vision-Language-Action Models",
      subtitle: "Robotic Manipulation Research",
      date: "2026 – Present",
      description:
        "Fine-tuning and evaluating OpenVLA and OpenVLA-OFT policies on long-horizon tasks like cooking and dishwashing, and studying modality bias: how visual attention decays across generated action sequences. Also extended the stable-worldmodel harness with a GRU-based world model, benchmarked on MuJoCo cube manipulation.",
      tech: ["OpenVLA", "PyTorch", "MuJoCo"],
    },
    {
      name: "3D Gaussian Splatting",
      subtitle: "Reconstruction Pipeline",
      date: "2026",
      description:
        "End-to-end scene reconstruction: structure-from-motion with COLMAP and GLOMAP on captured image sets, then Gaussian Splatting training and rendering with gsplat and Splatfacto, using Gaussian Grouping for object-level segmentation.",
      tech: ["COLMAP", "GLOMAP", "gsplat", "Splatfacto", "viser"],
    },
    {
      name: "ThalAI",
      subtitle: "Multimodal Cartoon Episode Engine",
      date: "2024 – 2025",
      description:
        "My undergraduate graduation project: a platform that generates complete audiovisual episodes of an animated series. Fine-tuned LLMs write scripts, scene breakdowns and dialogue, served by separate Django, LLM inference, text-to-speech and React Native services.",
      tech: ["Django", "React Native", "Docker", "Generative AI"],
    },
    {
      name: "SensoryPod",
      subtitle: "IoT Companion App",
      date: "2025",
      description:
        "Flutter control app for sensory IoT hardware: music and ambient sound playback, smart lighting scenes and sensor-driven motion control, from one codebase across iOS, Android, Web, Windows, macOS and Linux.",
      tech: ["Flutter", "Dart", "IoT"],
    },
    {
      name: "Yanındayım",
      subtitle: "Elder-Care Emergency Assistant",
      date: "2024",
      award: "Hackathon 2nd Place",
      description:
        "Placed 2nd out of 30+ teams at MobileAction’s 24-hour hackathon. Background accelerometer-based fall detection automatically alerts emergency contacts.",
      tech: ["React Native", "Gemini API"],
      links: [{ label: "GitHub", href: "https://github.com/Thnorty/MobileActionHackathor-frontend" }],
    },
    {
      name: "AI Mood Detector",
      date: "2025",
      description:
        "Full-stack web app that recognises facial emotions in uploaded images, then generates personalised responses through the Gemini API. Built with React 19, Vite, Tailwind and Framer Motion on a Python deep-learning backend.",
      tech: ["React 19", "Vite", "Tailwind", "Deep Learning", "Gemini API"],
    },
    {
      name: "Browser Extensions & Games",
      date: "2023 – 2026",
      description:
        "Published Chrome extensions, including a YouTube video summariser and an AI-detector analysis tool, and 2D games in Unity and Godot: Nine Bowls (a cat puzzle), Re Boot Repair Shop and SlotMatch.",
      tech: ["JavaScript", "Unity", "Godot", "C#"],
    },
  ] as Project[],
  skills: [
    {
      category: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "Dart", "Kotlin", "Java", "C", "C++", "C#", "SQL", "Verilog", "Bash"],
    },
    {
      category: "Web & Mobile",
      items: ["React", "React Native", "Expo", "Flutter", "Django REST Framework", "FastAPI", "REST API design", "Server-Sent Events", "Firebase Cloud Messaging", "Tailwind", "NativeWind", "styled-components", "Zustand", "Riverpod", "i18next"],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "MySQL", "SQLite", "Drift", "Supabase", "Elasticsearch", "Relational modelling", "Query & index optimisation"],
    },
    {
      category: "Cloud & Infrastructure",
      items: ["AWS (S3, Lambda)", "Kubernetes", "Docker", "Nginx", "Linux (Ubuntu, Arch)", "SLURM/HPC", "Gradle"],
    },
    {
      category: "AI & Machine Learning",
      items: ["PyTorch", "Hugging Face", "LLM fine-tuning", "Tool-calling LLM agents", "MCP agent tooling", "Vision-Language-Action models", "Computer Vision", "YOLO", "RF-DETR", "WBF ensembles", "Quantisation-Aware Training", "3D Gaussian Splatting", "MuJoCo"],
    },
    {
      category: "Systems & Low Level",
      items: ["Linux kernel networking", "eBPF/XDP", "Netfilter", "RISC-V (RV32/RV64, PicoRV32)", "Soft-core SoC bring-up", "gem5", "Verilog", "Vivado"],
    },
    {
      category: "Engineering Practice",
      items: ["Git", "Code review", "Automated regression harnesses", "CI workflows", "Agile teams", "Open-source releases"],
    },
    {
      category: "Game Development",
      items: ["Unity", "Godot"],
    },
  ],
  spokenLanguages: ["English (Fluent · TOEFL 97, IELTS 7.0)", "Turkish (Native)", "German (A2)"],
};

const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};

const getThemeSnapshot = () => document.documentElement.classList.contains('dark');

export default function Portfolio() {
  const headerRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const expRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const eduRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  // The inline script in layout.tsx sets the `dark` class before hydration; mirror it here.
  // The server snapshot is null, so the toggle icon renders only after mount.
  const isDarkMode = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => null);
  const mounted = isDarkMode !== null;

  const toggleTheme = () => {
    if (isDarkMode) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
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

    // One scrubbed animation per element, driven by that element's own position,
    // so long sections (e.g. many projects on mobile) reveal items as they scroll into view.
    const animations: { anim: JSAnimation; element: HTMLElement; section: HTMLElement }[] = [];

    sections.forEach(({ ref, selector }) => {
        if (!ref.current) return;
        const section = ref.current;
        
        // Ensure initial state
        section.classList.remove('opacity-0');

        section.querySelectorAll<HTMLElement>(selector).forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';

            const anim = animate(element, {
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 1000,
                ease: 'outQuad',
                autoplay: false
            });

            animations.push({ anim, element, section });
        });
    });

    // Layout position, unaffected by the transforms the animations apply
    const pageOffset = (el: HTMLElement) => {
        let top = 0;
        let left = 0;
        let node: HTMLElement | null = el;
        while (node) {
            top += node.offsetTop;
            left += node.offsetLeft;
            node = node.offsetParent as HTMLElement | null;
        }
        return { top, left };
    };

    const onScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        animations.forEach(({ anim, element, section }) => {
            const el = pageOffset(element);
            const sec = pageOffset(section);
            // Items further right start slightly later, keeping a left-to-right stagger within a row
            const lag = ((el.left - sec.left) / section.offsetWidth) * windowHeight * 0.15;

            const start = el.top - windowHeight * 0.95 + lag; // Start as the item enters the viewport
            const end = start + windowHeight * 0.3; // Fully visible after scrolling a bit further

            let progress = (scrollY - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress));
            
            anim.seek(anim.duration * progress);
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
          <Link href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-bold text-xl tracking-tighter text-neutral-900 dark:text-white cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition-colors">ON.</Link>
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
            <span className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">Hi, I&apos;m</span>
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
          {cvData.personal.title}, building full-stack and mobile products, AI agents, and hardware-accelerated machine learning.
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
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {cvData.highlights.map((item, idx) => (
            <div key={idx} className="anim-item p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <div className="text-3xl md:text-4xl font-extrabold text-green-600 dark:text-green-400 tracking-tight">{item.value}</div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={expRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="text-3xl font-bold mb-12 text-neutral-900 dark:text-white border-l-4 border-green-600 dark:border-green-500 pl-4">Work Experience</h3>
        <div className="space-y-8">
          {cvData.experience.map((job, idx) => (
            <div key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="exp-card opacity-0 grid md:grid-cols-4 gap-4 p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <div className="text-neutral-500 dark:text-neutral-400 text-sm font-semibold tracking-wider uppercase">
                {job.date}
                <p className="mt-1 text-xs font-medium normal-case tracking-normal">{job.location}</p>
              </div>
              <div className="md:col-span-3">
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white">{job.role}</h4>
                <div className="text-green-600 dark:text-green-400 font-medium mb-3">{job.company}</div>
                <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-600 dark:text-neutral-400">
                  {job.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
                {job.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md text-xs font-medium transition-colors">{t}</span>
                    ))}
                  </div>
                )}
                {job.link && (
                  <a href={job.link.href} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-green-600 dark:text-green-400 text-sm font-semibold hover:underline">
                    {job.link.label} &rarr;
                  </a>
                )}
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
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white">{project.name}</h4>
                  <span className="shrink-0 text-xs font-semibold text-neutral-500 dark:text-neutral-400">{project.date}</span>
                </div>
                {project.subtitle && (
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium mt-1">{project.subtitle}</p>
                )}
                {project.award && (
                  <span className="inline-block mt-3 px-2.5 py-1 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900 rounded-full text-xs font-semibold transition-colors">
                    {project.award}
                  </span>
                )}
                <p className="text-neutral-600 dark:text-neutral-400 mt-3 mb-5 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md text-xs font-medium transition-colors">{t}</span>
                  ))}
                </div>
                {project.links && (
                  <div className="flex gap-4 mt-4">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline">
                        {link.label} &rarr;
                      </a>
                    ))}
                  </div>
                )}
              </div>
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
                    {edu.honours && (
                        <p className="text-green-600 dark:text-green-400 text-sm font-semibold mt-1">{edu.honours}</p>
                    )}
                    <div className="mt-4 space-y-2">
                        {edu.details.map((d, i) => (
                            <p key={i} className="text-neutral-600 dark:text-neutral-400 text-sm">
                                <span className="font-semibold text-neutral-700 dark:text-neutral-300">{d.label}:</span> {d.text}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-8 shrink-0 md:text-right">
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
        
        {cvData.skills.map((group) => (
            <div key={group.category} className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, idx) => (
                        <span key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="skill-badge opacity-0 px-4 py-2 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-lg text-sm font-medium border border-neutral-200 dark:border-neutral-800 shadow-sm cursor-default inline-block transition-colors">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        ))}

        <div>
            <h4 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">Spoken Languages</h4>
            <div className="flex flex-wrap gap-2">
                {cvData.spokenLanguages.map((lang, idx) => (
                    <span key={idx} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className="skill-badge opacity-0 px-4 py-2 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-lg text-sm font-medium border border-neutral-200 dark:border-neutral-800 shadow-sm cursor-default inline-block transition-colors">
                        {lang}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-6 max-w-5xl mx-auto opacity-0 transition-opacity duration-500">
        <h3 className="text-3xl font-bold mb-12 border-l-4 border-green-600 dark:border-green-500 pl-4 text-neutral-900 dark:text-white">Let&apos;s Connect</h3>
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
