import { SectionTitle } from "./AboutSection";
import { Code, Brain, Wrench, BarChart3 } from "lucide-react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5" />,
    skills: ["Python", "C++", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Machine Learning & AI",
    icon: <Brain className="w-5 h-5" />,
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "LightGBM", "NumPy", "Pandas"],
  },
  {
    title: "GenAI",
    icon: <Brain className="w-5 h-5" />,
    skills: ["LangChain", "Hugging Face Transformers", "Sentence Transformers", "FAISS", "Ollama", "RAG", "Prompt Engineering"],
  },
  {
    title: "Computer Vision",
    icon: <Brain className="w-5 h-5" />,
    skills: ["OpenCV", "Ultralytics YOLOv8", "MediaPipe"],
  },
  {
    title: "Web Development",
    icon: <Code className="w-5 h-5" />,
    skills: ["React", "Vite", "REST APIs", "Streamlit"],
  },
  {
    title: "Developer Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: ["Git", "GitHub", "VS Code", "Google Colab", "Jupyter Notebook"],
  },
  {
    title: "Core Concepts",
    icon: <BarChart3 className="w-5 h-5" />,
    skills: ["Data Structures & Algorithms", "OOP", "Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing", "DBMS"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <ScrollFadeIn>
          <SectionTitle title="Technical Skills" />
        </ScrollFadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <ScrollFadeIn key={index} delay={index * 100}>
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-serif font-bold text-foreground text-lg">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}