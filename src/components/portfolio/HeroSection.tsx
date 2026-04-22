import { MapPin, Phone, Mail, Linkedin, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HERO_BG = "https://mgx-backend-cdn.metadl.com/generate/images/1075346/2026-03-31/17148953-5935-475f-ba29-0936ea75904e.png";

export default function HeroSection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
    })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
      }, "-=0.5")
      .from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, "-=0.5")
      .from(linksRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      }, "-=0.5");
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4"
        >
          Pritish Dutta
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground font-light mb-6"
        >
          AI Engineer | Computer Vision | Real-time Systems
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-sm text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Building intelligent real-time systems using AI, deep learning, and computer vision to solve real-world problems.
        </p>

        {/* Links */}
        <div
          ref={linksRef}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <ContactLink icon={<MapPin className="w-4 h-4" />} text="Ludhiana, Punjab" />
          <ContactLink icon={<Phone className="w-4 h-4" />} text="+91 94656 26661" />
          <ContactLink icon={<Mail className="w-4 h-4" />} text="Email" href="mailto:pritish3473@gmail.com" />
          <ContactLink icon={<Linkedin className="w-4 h-4" />} text="LinkedIn" href="https://www.linkedin.com/in/pritish-dutta-06aa43247/" />
          <ContactLink icon={<Github className="w-4 h-4" />} text="GitHub" href="https://github.com/pritish73" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-muted-foreground/60 rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}

function ContactLink({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
      {icon}
      {text}
    </span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}