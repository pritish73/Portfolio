import { MapPin, Phone, Mail, Linkedin, Github } from "lucide-react";

const HERO_BG = "https://mgx-backend-cdn.metadl.com/generate/images/1075346/2026-03-31/17148953-5935-475f-ba29-0936ea75904e.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Zen garden background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Decorative element */}
        <div className="flex items-center justify-center mb-8 opacity-0 animate-fade-in">
          <div className="h-px w-16 bg-accent" />
          <div className="mx-4 w-2 h-2 rounded-full bg-accent" />
          <div className="h-px w-16 bg-accent" />
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4 opacity-0 animate-fade-in-up">
          Pritish Dutta
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-light tracking-zen mb-8 opacity-0 animate-fade-in-up animation-delay-200">
          Computer Engineering Student · AI/ML Enthusiast
        </p>

        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up animation-delay-400">
          Building intelligent systems, solving complex problems, and developing impactful real-world software.
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-0 animate-fade-in-up animation-delay-600">
          <ContactLink icon={<MapPin className="w-4 h-4" />} text="Ludhiana, Punjab" />
          <ContactLink icon={<Phone className="w-4 h-4" />} text="+91 94656 26661" />
          <ContactLink
            icon={<Mail className="w-4 h-4" />}
            text="Email"
            href="mailto:pritish3473@gmail.com"
          />
          <ContactLink
            icon={<Linkedin className="w-4 h-4" />}
            text="LinkedIn"
            href="https://www.linkedin.com/in/pritish-dutta-06aa43247/"
          />
          <ContactLink
            icon={<Github className="w-4 h-4" />}
            text="GitHub"
            href="https://github.com/pritish73"
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-600">
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
    <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
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