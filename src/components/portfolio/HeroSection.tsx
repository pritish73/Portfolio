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
    tl.from(titleRef.current, { opacity: 0, y: 60, duration: 1, ease: "power3.out" })
      .from(subtitleRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.5")
      .from(descRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
      .from(linksRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5");
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4">Pritish Dutta</h1>
        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground font-light mb-6">Computer Engineering Student | AI/ML | GenAI</p>
        <p ref={descRef} className="text-sm text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">Building intelligent systems using machine learning, deep learning, generative AI, and computer vision to solve real-world problems.</p>
        <div ref={linksRef} className="flex flex-wrap items-center justify-center gap-6">
          <ContactLink icon={<MapPin className="w-4 h-4" />} text="Ludhiana, Punjab" />
          <ContactLink icon={<Phone className="w-4 h-4" />} text="+91 94656 26661" />
          <ContactLink icon={<Mail className="w-4 h-4" />} text="Email" href="mailto:pritish3473@gmail.com" />
          <ContactLink icon={<Linkedin className="w-4 h-4" />} text="LinkedIn" href="https://www.linkedin.com/in/pritish-dutta-06aa43247/" />
          <ContactLink icon={<Github className="w-4 h-4" />} text="GitHub" href="https://github.com/pritish73" />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2"><div className="w-5 h-8 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-1"><div className="w-1 h-2 bg-muted-foreground/60 rounded-full animate-bounce" /></div></div>
      </div>
    </section>
  );
}

function ContactLink({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const linkRef = useRef<HTMLAnchorElement | HTMLSpanElement>(null);

  useEffect(() => {
    const element = linkRef.current;
    if (!element || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const strength = 0.28;
    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      gsap.to(element, { x: x * strength, y: y * strength, duration: 0.35, ease: "power3.out" });
    };
    const handleLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    };

    element.addEventListener("mousemove", handleMove);
    element.addEventListener("mouseleave", handleLeave);
    return () => {
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseleave", handleLeave);
      gsap.killTweensOf(element);
    };
  }, []);

  const content = <span ref={linkRef} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 will-change-transform">{icon}{text}</span>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  return <span>{content}</span>;
}