import VanillaTilt from "vanilla-tilt";
import { useEffect, useRef } from "react";
import { SectionTitle } from "./AboutSection";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import {
  ExternalLink,
  Briefcase,
  Award,
  Users,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AI_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1075346/2026-03-31/c3fa4a6a-e958-4363-a375-eddff9422923.png";
const CODE_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1075346/2026-03-31/7aa47ae3-2ddc-4a1e-b223-dd3c903c157d.png";

interface Project {
  title: string;
  tech: string;
  points: string[];
  image?: string;
}

const projects: Project[] = [
  {
    title: "AI Research Copilot",
    tech: "Python, LangChain, FAISS, Sentence Transformers, Hugging Face, Ollama, PyMuPDF",
    points: [
      "Developed an AI-powered research assistant that extracts, indexes, and semantically searches research papers using Retrieval-Augmented Generation (RAG).",
      "Reduced manual research effort by integrating FAISS vector search with CrossEncoder reranking, enabling faster, more relevant, and context-aware retrieval across multiple research papers.",
    ],
    image: AI_IMG,
  },
  {
    title: "Multi-Agent Research Assistant",
    tech: "Python, LangChain, LangChain Core, OpenAI API, Streamlit, Web Search Tools",
    points: [
      "Built an AI-powered research automation system using specialized Search, Reader, Writer, and Critic agents to divide and automate the research workflow.",
      "Implemented web information retrieval, content extraction and analysis, AI-powered report generation, and quality review through a modular multi-agent pipeline.",
    ],
    image: AI_IMG,
  },
  {
    title: "Home Robot Language Control",
    tech: "Python, Groq GPT-OSS-120B, OpenCV, NumPy, JSON, Robotics",
    points: [
      "Designed a language-controlled robotic system that translates natural language instructions into structured robot commands.",
      "Supports autonomous navigation, object manipulation, and task execution through structured command generation.",
    ],
    image: AI_IMG,
  },
  {
    title: "Intracranial Hemorrhage Detection using Deep Learning",
    tech: "Python, PyTorch, EfficientNet-B0, OpenCV, NumPy, Pandas, Scikit-learn",
    points: [
      "Built a deep learning model for automated intracranial hemorrhage detection from CT brain scans using EfficientNet-B0 transfer learning.",
      "Achieved 95.7% accuracy with 97.3% specificity, demonstrating reliable automated CT scan classification for intracranial hemorrhage detection.",
    ],
    image: CODE_IMG,
  },
];

export default function ProjectsSection() {
  const tiltRefs = useRef<HTMLDivElement[]>([]);
  const tiltRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
      },
      y: 80,
      duration: 1,
      stagger: 0.2,
    });

    tiltRef.current.forEach((el) => {
      if (el) {
        VanillaTilt.init(el, {
          max: 8,
          speed: 400,
          glare: true,
          "max-glare": 0.15,
          scale: 1.02,
        });
      }
    });

    return () => {
      tiltRef.current.forEach((el) => {
        if (el && (el as any).vanillaTilt) {
          (el as any).vanillaTilt.destroy();
        }
      });
    };
  }, []);

  return (
    <>
      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeIn>
            <SectionTitle title="Projects" />
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ScrollFadeIn key={index} delay={index * 120}>
                <div
                  ref={(el) => {
                    if (el) {
                      tiltRefs.current[index] = el;
                      tiltRef.current[index] = el;
                    }
                  }}
                  className="project-card bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl group h-full"
                >
                  {/* Project Image */}
                  {project.image && (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="font-serif font-bold text-foreground text-base mb-1 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-accent font-medium mb-3">
                      {project.tech}
                    </p>
                    <ul className="space-y-1.5">
                      {project.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="text-xs text-muted-foreground leading-relaxed flex gap-2"
                        >
                          <span className="text-accent mt-1 shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    {project.title === "Multi-Agent Research Assistant" && (
                      <a
                        href="https://github.com/pritish73/Multi-Agent-Research-Assistant"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-accent hover:underline"
                      >
                        View on GitHub
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <ScrollFadeIn>
            <SectionTitle title="Experience" />
          </ScrollFadeIn>

          <ScrollFadeIn delay={150}>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-serif font-bold text-foreground text-lg">
                      Research Intern
                    </h3>
                    <span className="text-xs text-accent font-medium">
                      Ongoing
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Experiential Learning Centre, TIET
                  </p>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0">•</span>
                      <span>
                        Developing an AR-based Scuba Diving Training System using Augmented Reality (AR) to simulate immersive underwater environments.
                      </span>
                    </li>
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0">•</span>
                      <span>
                        Implementing interactive 3D scenes, user interaction, and training modules to enhance learning and simulation realism.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn delay={300}>
            <div className="bg-card border border-border rounded-lg p-6 mt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-serif font-bold text-foreground text-lg">
                      AI Intern
                    </h3>
                    <span className="text-xs text-accent font-medium">
                      June 2025 – July 2025
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Experiential Learning Centre, TIET
                  </p>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0">•</span>
                      <span>
                        Developed a deep learning pipeline for EEG-based Mind Wandering Detection using CNN-LSTM architecture.
                      </span>
                    </li>
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0">•</span>
                      <span>
                        Performed EEG preprocessing, spectrogram generation, model training, and evaluation using TensorFlow, Keras, and Python.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Achievements & Extracurriculars */}
      <section id="achievements" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollFadeIn>
            <SectionTitle title="Certifications" />
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollFadeIn delay={100}>
              <div className="bg-card border border-border rounded-lg p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground text-lg">
                    AI & Networking
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    <span>AI Fundamentals with IBM SkillsBuild – Cisco Networking Academy</span>
                  </li>
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    <span>Introduction to Modern AI – Cisco Networking Academy</span>
                  </li>
                </ul>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={200}>
              <div className="bg-card border border-border rounded-lg p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground text-lg">
                    Deep Learning & ML
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    <span>Deep Learning with PyTorch: Image Segmentation – Coursera</span>
                  </li>
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    <span>Fine Tune BERT for Text Classification with TensorFlow – Coursera</span>
                  </li>
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    <span>Machine Learning with PySpark: Recommender System – Coursera</span>
                  </li>
                </ul>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <ScrollFadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-12 bg-accent/40" />
              <div className="mx-3 w-1.5 h-1.5 rounded-full bg-accent/40" />
              <div className="h-px w-12 bg-accent/40" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              I'm always open to discussing new opportunities, collaborations, or
              just having a conversation about technology.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <a
                href="mailto:pritish3473@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/pritish-dutta-06aa43247/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/pritish73"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                +91 94656 26661
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Ludhiana, Punjab
              </span>
            </div>

            <p className="text-xs text-muted-foreground/60">
              © 2025 Pritish Dutta. Crafted with tranquility.
            </p>
          </div>
        </ScrollFadeIn>
      </footer>
    </>
  );
}