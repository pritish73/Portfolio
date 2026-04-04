import { SectionTitle } from "./AboutSection";
import { GraduationCap } from "lucide-react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const BAMBOO_BG = "https://mgx-backend-cdn.metadl.com/generate/images/1075346/2026-03-31/1853af0e-de14-4d37-ad19-837f8760022e.png";

interface EducationItem {
  institution: string;
  degree: string;
  year: string;
  grade: string;
  coursework?: string;
}

const educationData: EducationItem[] = [
  {
    institution: "Thapar Institute of Engineering and Technology, Patiala",
    degree: "B.E. in Computer Engineering",
    year: "2023–2027",
    grade: "CGPA: 8.15 / 10.00",
    coursework:
      "Data Structure, Algorithms, Database Systems, Machine Learning, Deep Learning",
  },
  {
    institution: "BCM Arya Model School, Ludhiana",
    degree: "12th Grade",
    year: "2023",
    grade: "89.8%",
  },
  {
    institution: "Delhi Public School, Ludhiana",
    degree: "10th Grade",
    year: "2021",
    grade: "90.1%",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-24 px-6 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <img
          src={BAMBOO_BG}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <ScrollFadeIn>
          <SectionTitle title="Education" />
        </ScrollFadeIn>

        <div className="space-y-0">
          {educationData.map((item, index) => (
            <ScrollFadeIn key={index} delay={index * 150}>
              <div className="relative pl-8 pb-10 last:pb-0">
                {/* Timeline line */}
                {index < educationData.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-secondary border-2 border-accent flex items-center justify-center">
                  <GraduationCap className="w-3 h-3 text-accent" />
                </div>

                {/* Content */}
                <div className="bg-card border border-border rounded-lg p-5 ml-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-serif font-bold text-foreground text-base">
                      {item.institution}
                    </h3>
                    <span className="text-xs text-accent font-medium shrink-0">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {item.degree}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {item.grade}
                  </p>
                  {item.coursework && (
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      <span className="font-medium text-foreground/80">
                        Relevant Coursework:{" "}
                      </span>
                      {item.coursework}
                    </p>
                  )}
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}