import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <ScrollFadeIn>
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle title="Profile" />
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Computer Engineering student at{" "}
            <span className="text-foreground font-medium">Thapar Institute of Engineering and Technology</span>{" "}
            (2023–2027) with strong foundations in Python, C++, Machine Learning,
            Deep Learning, Computer Vision, and Natural Language Processing.
            Interested in building intelligent systems and solving complex real-world problems.
          </p>
        </div>
      </ScrollFadeIn>
    </section>
  );
}

export function SectionTitle({ title }: { title: string }) {
  const { ref, isVisible } = useScrollFadeIn({ threshold: 0.35, rootMargin: "0px 0px -80px 0px" });

  return (
    <div ref={ref} className="flex items-center justify-center gap-4 mb-12" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div className="h-px flex-1 max-w-[60px] bg-border origin-right" style={{ transform: isVisible ? "scaleX(1)" : "scaleX(0)", transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 120ms" }} />
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-zen" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(12px)", letterSpacing: isVisible ? "0.05em" : "0.16em", transition: "opacity 500ms ease 80ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 80ms, letter-spacing 700ms cubic-bezier(0.16, 1, 0.3, 1) 80ms" }}>{title}</h2>
      <div className="h-px flex-1 max-w-[60px] bg-border origin-left" style={{ transform: isVisible ? "scaleX(1)" : "scaleX(0)", transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 120ms" }} />
    </div>
  );
}