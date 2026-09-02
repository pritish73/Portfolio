import { useEffect, useRef } from "react";

export default function InteractionEffects() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    const progress = progressRef.current;
    if (!spotlight || !progress) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchDevice = window.matchMedia("(pointer: coarse)").matches;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progress.style.transform = `scaleX(${Math.min(100, Math.max(0, percent)) / 100})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    if (touchDevice || reduceMotion) return () => window.removeEventListener("scroll", updateProgress);

    let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    let currentX = targetX, currentY = targetY, frame = 0;
    const move = (event: MouseEvent) => { targetX = event.clientX; targetY = event.clientY; spotlight.style.opacity = "1"; };
    const leave = () => { spotlight.style.opacity = "0"; };
    const animate = () => {
      currentX += (targetX - currentX) * 0.12; currentY += (targetY - currentY) * 0.12;
      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    animate();

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".bg-card.border"));
    const handlers = new Map<HTMLElement, { move: (event: MouseEvent) => void; leave: () => void }>();
    cards.forEach((card) => {
      if (card.classList.contains("project-card")) return;
      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale3d(1.045, 1.045, 1.045) translateY(-4px)`;
        card.style.transition = "transform 100ms ease-out, border-color 250ms ease, box-shadow 250ms ease";
        card.style.transformStyle = "preserve-3d";
        card.style.boxShadow = `${-x * 14}px ${-y * 14}px 35px rgba(0,0,0,0.18)`;
      };
      const onLeave = () => {
        card.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)";
        card.style.boxShadow = "";
        card.style.transition = "transform 350ms cubic-bezier(.2,.8,.2,1), border-color 250ms ease, box-shadow 350ms ease";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      handlers.set(card, { move: onMove, leave: onLeave });
    });

    return () => {
      window.removeEventListener("scroll", updateProgress); window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave); cancelAnimationFrame(frame);
      handlers.forEach((h, card) => { card.removeEventListener("mousemove", h.move); card.removeEventListener("mouseleave", h.leave); });
    };
  }, []);

  return <><div ref={progressRef} aria-hidden="true" className="fixed top-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-accent z-[100] pointer-events-none" /><div ref={spotlightRef} aria-hidden="true" className="fixed top-0 left-0 w-72 h-72 -ml-36 -mt-36 rounded-full pointer-events-none z-40 opacity-0 transition-opacity duration-300 hidden md:block" style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.07) 0%, transparent 68%)" }} /></>;
}
