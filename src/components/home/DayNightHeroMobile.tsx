import { Moon, SunMedium } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import dayImage from "../../assets/img/elpenon.jpg";
import nightImage from "../../assets/img/themoon.webp";
import {
  copy,
  easeInOut,
  getEyebrowStyle,
  getLeadStyle,
  getTitleStyle,
  mix,
  type DayNightHeroProps,
} from "./DayNightHeroShared";

const buildMobileScene = (progress: number) => {
  const orbitAngle = Math.PI * (0.18 + progress * 0.58);
  const maskX = 82 + Math.cos(orbitAngle) * 8;
  const maskY = 72 - Math.sin(orbitAngle) * 18;
  const maskSize = 12 + progress * 162;

  return {
    nightClipPath: `circle(${maskSize.toFixed(2)}% at ${maskX.toFixed(
      2
    )}% ${maskY.toFixed(2)}%)`,
  };
};

export default function DayNightHeroMobile({
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
  const scene = useMemo(() => buildMobileScene(progress), [progress]);
  const eyebrowStyle = getEyebrowStyle(progress);
  const titleStyle = getTitleStyle(progress);
  const leadStyle = getLeadStyle(progress);
  const copyPanelStyle = {
    background: `linear-gradient(180deg, rgba(248, 244, 236, ${mix(0.24, 0.08, progress).toFixed(3)}), rgba(255, 255, 255, ${mix(0.08, 0.022, progress).toFixed(3)}))`,
    borderColor: `rgba(255, 255, 255, ${mix(0.11, 0.055, progress).toFixed(3)})`,
    boxShadow: `0 10px 22px rgba(12, 24, 20, ${mix(0.12, 0.04, progress).toFixed(3)})`,
    backdropFilter: `blur(${mix(4, 2, progress).toFixed(2)}px)`,
  };
  const dayImageStyle = {
    transform: `scale(${mix(1.18, 1.08, progress).toFixed(3)}) translate(${mix(-3, -1, progress).toFixed(2)}%, ${mix(0, 2, progress).toFixed(2)}%)`,
  };
  const nightImageStyle = {
    transform: `scale(${mix(1.12, 1.03, progress).toFixed(3)}) translate(${mix(6, 0, progress).toFixed(2)}%, ${mix(-4, 0, progress).toFixed(2)}%)`,
  };

  const toggleClassName = isNight
    ? "border-transparent bg-white/18 text-[#f6f8ff] shadow-[0_0_16px_rgba(214,229,255,0.52),0_0_26px_rgba(130,176,255,0.22)]"
    : "border border-amber-300/30 bg-white/16 text-amber-200 shadow-[0_10px_22px_rgba(122,92,26,0.14)] backdrop-blur-sm";

  const togglePositionClassName = isNight
    ? "left-3 top-3 sm:left-4 sm:top-4"
    : "bottom-5 right-3 sm:bottom-6 sm:right-4";

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const animateTo = (target: number) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const start = performance.now();
    const from = progressRef.current;
    const duration = 780;

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
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[calc(100svh-79px)] min-h-[38rem] w-screen overflow-hidden bg-[#08111b] text-white sm:h-[calc(100svh-88px)] sm:min-h-[44rem] lg:hidden">
      <img
        src={dayImage.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[76%_center] [will-change:transform]"
        style={dayImageStyle}
      />

      <img
        src={nightImage.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[68%_22%] [will-change:clip-path,transform]"
        style={{ clipPath: scene.nightClipPath, ...nightImageStyle }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,17,0.03)_0%,rgba(7,11,17,0.08)_24%,rgba(7,11,17,0.24)_50%,rgba(7,11,17,0.84)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#08111b]/92 via-[#08111b]/58 to-transparent" />

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-3 pb-20 pt-10 sm:px-5 sm:pb-24 sm:pt-14">
        <div className="w-full max-w-[13.5rem] pr-14 sm:max-w-[15.5rem] sm:pr-16">
          <div
            className="rounded-[1.05rem] border px-3.5 py-3 sm:rounded-[1.25rem] sm:px-4 sm:py-3.5"
            style={copyPanelStyle}
          >
            <p
              className="mb-2 text-[0.66rem] font-extrabold uppercase tracking-[0.16em] sm:text-[0.72rem]"
              style={eyebrowStyle}
            >
              {eyebrow}
            </p>

            <h1
              className="max-w-[6.8ch] text-[1.72rem] leading-[0.9] tracking-[-0.045em] sm:max-w-[7.4ch] sm:text-[2.05rem]"
              style={titleStyle}
            >
              {title}
            </h1>

            <p
              className="mt-2 max-w-[12rem] text-[0.8rem] leading-[1.4] sm:mt-2.5 sm:max-w-[13.5rem] sm:text-[0.88rem] sm:leading-[1.46]"
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
        className={`absolute z-20 inline-flex h-9 w-9 items-center justify-center rounded-full transition-[opacity,transform,box-shadow,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-10 sm:w-10 ${toggleClassName} ${togglePositionClassName} ${isTransitioning ? "pointer-events-none scale-95 opacity-0" : "opacity-100"}`}
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