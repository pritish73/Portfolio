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
    title: "Gesture-Based Virtual Whiteboard Using Computer Vision",
    tech: "Python, OpenCV, NumPy, MediaPipe",
    points: [
      "Built a real-time virtual whiteboard enabling drawing through hand gestures without physical contact.",
      "Used MediaPipe for precise hand tracking and gesture interpretation.",
      "Integrated color selection, eraser tools, and canvas controls for intuitive interaction.",
      "Optimized frame processing to ensure smooth, low-latency performance.",
    ],
    image: AI_IMG,
  },
  {
    title: "Predicting Attention with Facial Expression (PAFE)",
    tech: "Python, TensorFlow, OpenCV, Keras",
    points: [
      "Developed a CNN-LSTM model to analyze video streams and predict student attention.",
      "Accelerated inference using TensorRT to support real-time deployment.",
    ],
    image: AI_IMG,
  },
  {
    title: "Mini Search Engine",
    tech: "C++, OOP, Custom Data Structures",
    points: [
      "Engineered a simplified search engine using an inverted index without STL.",
      "Designed an efficient ranking algorithm to retrieve top-k relevant documents.",
    ],
    image: CODE_IMG,
  },
  {
    title: "Personal Portfolio Website",
    tech: "HTML, CSS, JavaScript",
    points: [
      "Created and deployed a responsive portfolio to showcase projects and technical skills.",
      "Ensured cross-device compatibility using modern web design practices.",
    ],
    image: CODE_IMG,
  },
];

export default function ProjectsSection() {
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
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group h-full">
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
                      AI Intern
                    </h3>
                    <span className="text-xs text-accent font-medium">
                      Jun–July 2025
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Experiential Learning Center, TIET
                  </p>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0">•</span>
                      <span>
                        Developed a student attention prediction framework using
                        CNN-LSTM architecture.
                      </span>
                    </li>
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0">•</span>
                      <span>
                        Leveraged TensorFlow and TensorRT for optimized deployment
                        and faster inference.
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
            <SectionTitle title="Achievements & Activities" />
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Achievements */}
            <ScrollFadeIn delay={100}>
              <div className="bg-card border border-border rounded-lg p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground text-lg">
                    Achievements
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    <span>
                      JEE Main: <span className="text-foreground font-medium">94.15 percentile</span> (All India Rank: 66,407)
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    <span>
                      Selected for AI Internship at Experiential Learning Center,
                      TIET
                    </span>
                  </li>
                </ul>
              </div>
            </ScrollFadeIn>

            {/* Extracurriculars */}
            <ScrollFadeIn delay={200}>
              <div className="bg-card border border-border rounded-lg p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground text-lg">
                    Extracurriculars
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    <span>Member, TEDx Society, TIET</span>
                  </li>
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    <span>Member, LEAD Society, TIET</span>
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
            {/* Decorative element */}
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