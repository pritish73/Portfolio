import VanillaTilt from "vanilla-tilt";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./AboutSection";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { ExternalLink, Briefcase, Award, Users, MapPin, Phone, Mail, Linkedin, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AI_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1075346/2026-03-31/c3fa4a6a-e958-4363-a375-eddff9422923.png";
const CODE_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1075346/2026-03-31/7aa47ae3-2ddc-4a1e-b223-dd3c903c157d.png";

interface Project { title: string; tech: string; points: string[]; image?: string; github: string; }

const projects: Project[] = [
  { title: "AI Research Copilot", tech: "Python, LangChain, FAISS, Sentence Transformers, Hugging Face, Ollama, PyMuPDF", points: ["Developed an AI-powered research assistant that extracts, indexes, and semantically searches research papers using Retrieval-Augmented Generation (RAG).", "Reduced manual research effort by integrating FAISS vector search with CrossEncoder reranking, enabling faster, more relevant, and context-aware retrieval across multiple research papers."], image: AI_IMG, github: "https://github.com/pritish73/AI-Research-Copilot" },
  { title: "Multi-Agent Research Assistant", tech: "Python, LangChain, LangChain Core, OpenAI API, Streamlit, Web Search Tools", points: ["Built an AI-powered research automation system using specialized Search, Reader, Writer, and Critic agents to divide and automate the research workflow.", "Implemented web information retrieval, content extraction and analysis, AI-powered report generation, and quality review through a modular multi-agent pipeline."], image: AI_IMG, github: "https://github.com/pritish73/Multi-Agent-Research-Assistant" },
  { title: "Home Robot Language Control", tech: "Python, Groq GPT-OSS-120B, OpenCV, NumPy, JSON, Robotics", points: ["Designed a language-controlled robotic system that translates natural language instructions into structured robot commands.", "Supports autonomous navigation, object manipulation, and task execution through structured command generation."], image: AI_IMG, github: "https://github.com/pritish73/Home-Robot-Language-Control" },
  { title: "Intracranial Hemorrhage Detection using Deep Learning", tech: "Python, PyTorch, EfficientNet-B0, OpenCV, NumPy, Pandas, Scikit-learn", points: ["Built a deep learning model for automated intracranial hemorrhage detection from CT brain scans using EfficientNet-B0 transfer learning.", "Achieved 95.7% accuracy with 97.3% specificity, demonstrating reliable automated CT scan classification for intracranial hemorrhage detection."], image: CODE_IMG, github: "https://github.com/pritish73/pritish73-ICH-Detection-EfficientNet" }
];

function MagneticLink({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: MouseEvent) => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.18, y: (e.clientY - (r.top + r.height / 2)) * 0.18, duration: 0.3, ease: "power3.out" }); };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.5)" });
    el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); gsap.killTweensOf(el); };
  }, []);
  return <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 px-3 py-2 rounded-md border border-border text-xs font-medium text-accent hover:bg-accent hover:text-accent-foreground transition-colors will-change-transform">{children}</a>;
}

export default function ProjectsSection() {
  const tiltRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    const onSkillHover = (event: Event) => setActiveSkill((event as CustomEvent<string | null>).detail || null);
    window.addEventListener("portfolio:skill-hover", onSkillHover);
    gsap.from(".project-card", { scrollTrigger: { trigger: "#projects", start: "top 80%" }, y: 80, duration: 1, stagger: 0.2 });
    tiltRef.current.forEach((el) => { if (el) VanillaTilt.init(el, { max: 8, speed: 400, glare: true, "max-glare": 0.15, scale: 1.02 }); });
    return () => {
      window.removeEventListener("portfolio:skill-hover", onSkillHover);
      tiltRef.current.forEach((el) => { if (el && (el as any).vanillaTilt) (el as any).vanillaTilt.destroy(); });
    };
  }, []);

  return (
    <>
      <section id="projects" className="py-24 px-6">
        <div className="max-w-4xl mx-auto"><ScrollFadeIn><SectionTitle title="Projects" /></ScrollFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const isMatch = !!activeSkill && project.tech.toLowerCase().includes(activeSkill.toLowerCase());
              const isDimmed = !!activeSkill && !isMatch;
              return <ScrollFadeIn key={index} delay={index * 120}><div ref={(el) => { tiltRef.current[index] = el; }} className={`project-card bg-card border rounded-lg overflow-hidden transition-all duration-300 group h-full ${isMatch ? "border-accent shadow-xl scale-[1.015]" : "border-border hover:shadow-xl"} ${isDimmed ? "opacity-35" : "opacity-100"}`}>
                {project.image && <div className="h-40 overflow-hidden"><img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>}
                <div className="p-5"><h3 className="font-serif font-bold text-foreground text-base mb-1 leading-snug">{project.title}</h3><p className="text-xs text-accent font-medium mb-3">{project.tech}</p><ul className="space-y-1.5">{project.points.map((point, pointIndex) => <li key={pointIndex} className="text-xs text-muted-foreground leading-relaxed flex gap-2"><span className="text-accent mt-1 shrink-0">•</span><span>{point}</span></li>)}</ul>
                  <MagneticLink href={project.github}><Github className="w-3.5 h-3.5" /> View on GitHub <ExternalLink className="w-3.5 h-3.5" /></MagneticLink>
                </div></div></ScrollFadeIn>;
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto"><ScrollFadeIn><SectionTitle title="Experience" /></ScrollFadeIn>
          <div className="relative mt-10">
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            <div className="space-y-10 md:space-y-14">
              <ScrollFadeIn delay={150}><div className="relative grid md:grid-cols-2 md:gap-12 items-start">
                <div className="hidden md:block text-right pr-10"><span className="text-xs font-medium text-accent">Ongoing</span><h3 className="font-serif font-bold text-foreground text-lg mt-1">Research Intern</h3><p className="text-sm text-muted-foreground mt-1">Experiential Learning Centre, TIET</p></div>
                <div className="relative pl-14 md:pl-10"><div className="absolute left-3 md:-left-[57px] top-1 w-5 h-5 rounded-full border-4 border-background bg-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.12)]" /><div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300"><div className="md:hidden mb-3"><span className="text-xs font-medium text-accent">Ongoing</span><h3 className="font-serif font-bold text-foreground text-lg mt-1">Research Intern</h3><p className="text-sm text-muted-foreground mt-1">Experiential Learning Centre, TIET</p></div><ul className="space-y-2"><li className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 shrink-0">•</span><span>Developing an AR-based Scuba Diving Training System using Augmented Reality (AR) to simulate immersive underwater environments.</span></li><li className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 shrink-0">•</span><span>Implementing interactive 3D scenes, user interaction, and training modules to enhance learning and simulation realism.</span></li></ul></div></div>
              </div></ScrollFadeIn>
              <ScrollFadeIn delay={300}><div className="relative grid md:grid-cols-2 md:gap-12 items-start">
                <div className="relative pl-14 md:pl-0 md:pr-10 md:order-1 md:text-right"><div className="absolute left-3 md:-right-[57px] md:left-auto top-1 w-5 h-5 rounded-full border-4 border-background bg-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.12)]" /><div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300"><div className="md:hidden mb-3"><span className="text-xs font-medium text-accent">June 2025 – July 2025</span><h3 className="font-serif font-bold text-foreground text-lg mt-1">AI Intern</h3><p className="text-sm text-muted-foreground mt-1">Experiential Learning Centre, TIET</p></div><ul className="space-y-2 text-left"><li className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 shrink-0">•</span><span>Developed a deep learning pipeline for EEG-based Mind Wandering Detection using CNN-LSTM architecture.</span></li><li className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 shrink-0">•</span><span>Performed EEG preprocessing, spectrogram generation, model training, and evaluation using TensorFlow, Keras, and Python.</span></li></ul></div></div>
                <div className="hidden md:block pl-10 md:order-2"><span className="text-xs font-medium text-accent">June 2025 – July 2025</span><h3 className="font-serif font-bold text-foreground text-lg mt-1">AI Intern</h3><p className="text-sm text-muted-foreground mt-1">Experiential Learning Centre, TIET</p></div>
              </div></ScrollFadeIn>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="py-24 px-6"><div className="max-w-3xl mx-auto"><ScrollFadeIn><SectionTitle title="Certifications" /></ScrollFadeIn><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><ScrollFadeIn delay={100}><div className="bg-card border border-border rounded-lg p-6 h-full"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent"><Award className="w-5 h-5" /></div><h3 className="font-serif font-bold text-foreground text-lg">AI & Networking</h3></div><ul className="space-y-3"><li className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 shrink-0">•</span><span>AI Fundamentals with IBM SkillsBuild – Cisco Networking Academy</span></li><li className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 shrink-0">•</span><span>Introduction to Modern AI – Cisco Networking Academy</span></li></ul></div></ScrollFadeIn><ScrollFadeIn delay={200}><div className="bg-card border border-border rounded-lg p-6 h-full"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent"><Users className="w-5 h-5" /></div><h3 className="font-serif font-bold text-foreground text-lg">Deep Learning & ML</h3></div><ul className="space-y-3"><li className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 shrink-0">•</span><span>Deep Learning with PyTorch: Image Segmentation – Coursera</span></li><li className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 shrink-0">•</span><span>Fine Tune BERT for Text Classification with TensorFlow – Coursera</span></li><li className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 shrink-0">•</span><span>Machine Learning with PySpark: Recommender System – Coursera</span></li></ul></div></ScrollFadeIn></div></div></section>

      <footer className="py-16 px-6 border-t border-border"><ScrollFadeIn><div className="max-w-3xl mx-auto text-center"><div className="flex items-center justify-center mb-8"><div className="h-px w-12 bg-accent/40" /><div className="mx-3 w-1.5 h-1.5 rounded-full bg-accent/40" /><div className="h-px w-12 bg-accent/40" /></div><h2 className="font-serif text-2xl font-bold text-foreground mb-4">Get In Touch</h2><p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">I'm always open to discussing new opportunities, collaborations, or just having a conversation about technology.</p><div className="flex flex-wrap items-center justify-center gap-6 mb-8"><MagneticLink href="mailto:pritish3473@gmail.com"><Mail className="w-4 h-4" />Email</MagneticLink><MagneticLink href="https://www.linkedin.com/in/pritish-dutta-06aa43247/"><Linkedin className="w-4 h-4" />LinkedIn</MagneticLink><MagneticLink href="https://github.com/pritish73"><Github className="w-4 h-4" />GitHub</MagneticLink><span className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="w-4 h-4" />+91 94656 26661</span><span className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" />Ludhiana, Punjab</span></div><p className="text-xs text-muted-foreground/60">© 2025 Pritish Dutta. Crafted with tranquility.</p></div></ScrollFadeIn></footer>
    </>
  );
}