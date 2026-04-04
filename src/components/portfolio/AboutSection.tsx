import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <ScrollFadeIn>
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle title="Profile" />
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Computer Engineering student at{" "}
            <span className="text-foreground font-medium">
              Thapar Institute of Engineering & Technology
            </span>{" "}
            (2023–2027) with strong foundations in C++, Python, and Machine Learning.
            Interested in building intelligent systems, solving complex problems,
            and developing impactful real-world software.
          </p>
        </div>
      </ScrollFadeIn>
    </section>
  );
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <div className="h-px flex-1 max-w-[60px] bg-border" />
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-zen">
        {title}
      </h2>
      <div className="h-px flex-1 max-w-[60px] bg-border" />
    </div>
  );
}