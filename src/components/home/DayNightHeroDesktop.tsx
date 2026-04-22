import { Moon, SunMedium } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import dayImage from "../../assets/img/elpenon.jpg";
import nightImage from "../../assets/img/themoon.webp";
import {
  buildDesktopScene,
  copy,
  easeInOut,
  getCopyPanelStyle,
  getEyebrowStyle,
  getLeadStyle,
  getTitleStyle,
  type DayNightHeroProps,
} from "./DayNightHeroShared";

export default function DayNightHeroDesktop({
  locale,
  eyebrow,
  title,
  lead,
}: DayNightHeroProps) {
  const [isNight, setIsNight] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);

  const labels = copy[locale];
  const scene = useMemo(() => buildDesktopScene(progress), [progress]);
  const eyebrowStyle = getEyebrowStyle(progress);
  const titleStyle = getTitleStyle(progress);
  const leadStyle = getLeadStyle(progress);
  const copyPanelStyle = getCopyPanelStyle(progress);

  const toggleClassName = isNight
    ? "border-transparent bg-white/20 text-[#f6f8ff] shadow-[0_0_18px_rgba(214,229,255,0.72),0_0_34px_rgba(130,176,255,0.3)]"
    : "border border-amber-300/35 bg-white/18 text-amber-200 shadow-[0_10px_24px_rgba(122,92,26,0.16)] backdrop-blur-sm";

  const togglePositionClassName = isNight
    ? "left-5 top-5 xl:left-7 xl:top-7"
    : "bottom-4 right-4 xl:bottom-6 xl:right-6";

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const animateTo = (target: number) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const start = performance.now();
    const from = progressRef.current;
    const duration = 1050;

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const next = from + (target - from) * easeInOut(elapsed);
      progressRef.current = next;
      setProgress(next);

      if (elapsed < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = target;
        setProgress(target);
        setIsNight(target === 1);
        setIsTransitioning(false);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  const handleToggle = () => {
    if (isTransitioning) return;
    const nextTarget = targetRef.current === 1 ? 0 : 1;
    targetRef.current = nextTarget;
    setIsTransitioning(true);
    animateTo(nextTarget);
  };

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[calc(100vh-79px)] min-h-[calc(100vh-88px)] w-screen overflow-hidden bg-[#08111b] text-white">
      <img
        src={dayImage.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <img
        src={nightImage.src}
        alt=""
        className="absolute inset-0 h-full w-full object-contain [will-change:clip-path]"
        style={{ clipPath: scene.nightClipPath }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15" />

      <div className="relative z-10 flex h-full w-full flex-col justify-start px-4 py-5 lg:px-7 lg:py-8">
        <div className="w-full max-w-[32rem] pt-10 pl-8 xl:max-w-[38rem] xl:pt-14 xl:pl-12">
          <div
            className="rounded-[1.75rem] border px-5 py-5 xl:px-8 xl:py-7"
            style={copyPanelStyle}
          >
            <p
              className="mb-2 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] xl:mb-3"
              style={eyebrowStyle}
            >
              {eyebrow}
            </p>
            <h1
              className="max-w-[13ch] text-4xl leading-none tracking-[-0.035em] xl:text-7xl"
              style={titleStyle}
            >
              {title} DESKTOP
            </h1>
            <p
              className="mt-4 max-w-2xl text-base leading-7 xl:text-lg xl:leading-8"
              style={leadStyle}
            >
              {lead}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={labels.action}
        title={labels.action}
        className={`absolute z-20 inline-flex h-9 w-9 items-center justify-center rounded-full transition-[opacity,transform,box-shadow,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${toggleClassName} ${togglePositionClassName} ${isTransitioning ? "pointer-events-none scale-95 opacity-0" : "opacity-100"}`}
      >
        {isNight ? (
          <Moon size={14} strokeWidth={1.9} aria-hidden="true" />
        ) : (
          <SunMedium size={14} strokeWidth={1.9} aria-hidden="true" />
        )}
      </button>
    </section>
  );
}