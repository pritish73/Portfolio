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
    title: "Languages",
    icon: <Code className="w-5 h-5" />,
    skills: ["Python", "C++", "SQL", "R", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "AI / ML",
    icon: <Brain className="w-5 h-5" />,
    skills: ["TensorFlow", "Keras", "Scikit-Learn", "NumPy", "Pandas"],
  },
  {
    title: "Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: ["VS Code", "RStudio", "Git"],
  },
  {
    title: "Visualization",
    icon: <BarChart3 className="w-5 h-5" />,
    skills: ["Matplotlib", "Seaborn"],
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