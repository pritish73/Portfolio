import { MapPin, Phone, Mail, Linkedin, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HERO_BG = "https://mgx-backend-cdn.metadl.com/generate/images/1075346/2026-03-31/17148953-5935-475f-ba29-0936ea75904e.png";

export default function HeroSection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const linksRef = useRef(null);
  const networkRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(titleRef.current, { opacity: 0, y: 60, duration: 1, ease: "power3.out" })
      .from(subtitleRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.5")
      .from(descRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
      .from(linksRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5");

    const canvas = networkRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    const nodes = Array.from({ length: 34 }, () => ({
      x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00016, vy: (Math.random() - 0.5) * 0.00016,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouseX = -1000; mouseY = -1000; };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((node) => {
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > 1) node.vx *= -1;
        if (node.y < 0 || node.y > 1) node.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.x * width, ay = a.y * height;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bx = b.x * width, by = b.y * height;
          const distance = Math.hypot(ax - bx, ay - by);
          if (distance < 145) {
            const opacity = (1 - distance / 145) * 0.13;
            ctx.strokeStyle = `hsl(var(--accent) / ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
          }
        }
        const mouseDistance = Math.hypot(ax - mouseX, ay - mouseY);
        const radius = mouseDistance < 120 ? 2.2 : 1.25;
        ctx.fillStyle = `hsl(var(--accent) / ${mouseDistance < 120 ? 0.45 : 0.22})`;
        ctx.beginPath(); ctx.arc(ax, ay, radius, 0, Math.PI * 2); ctx.fill();
      }
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    draw();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <canvas ref={networkRef} className="absolute inset-0 w-full h-full pointer-events-auto" aria-hidden="true" />
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
  const content = <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">{icon}{text}</span>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  return content;
}