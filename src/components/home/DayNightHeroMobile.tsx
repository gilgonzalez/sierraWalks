import { ChevronDown, Moon, SunMedium } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import dayImage from "../../assets/img/elpenon.jpg";
import nightImage from "../../assets/img/themoon.webp";
import {
  buildMobileScene,
  copy,
  easeInOut,
  getEyebrowStyle,
  getLeadStyle,
  getTitleStyle,
  mix,
  type DayNightHeroProps,
} from "./dayNightHeroShared";

export default function DayNightHeroMobile({
  locale,
  eyebrow,
  title,
  lead,
}: DayNightHeroProps) {
  const [isNight, setIsNight] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);

  const labels = copy[locale];
  const detailLabels = {
    en: { show: "Show details", hide: "Hide details" },
    es: { show: "Ver detalle", hide: "Ocultar detalle" },
    de: { show: "Details anzeigen", hide: "Details ausblenden" },
  }[locale];
  const scene = useMemo(() => buildMobileScene(progress), [progress]);
  const eyebrowStyle = getEyebrowStyle(progress);
  const titleStyle = getTitleStyle(progress);
  const leadStyle = getLeadStyle(progress);
  const chevronStyle = {
    color: `rgba(${Math.round(mix(16, 244, progress))}, ${Math.round(mix(32, 248, progress))}, ${Math.round(mix(24, 255, progress))}, ${mix(0.72, 0.96, progress).toFixed(3)})`,
  };
  const copyPanelStyle = {
    background: `linear-gradient(180deg, rgba(248, 244, 236, ${mix(0.34, 0.12, progress).toFixed(3)}), rgba(255, 255, 255, ${mix(0.16, 0.04, progress).toFixed(3)}))`,
    borderColor: `rgba(255, 255, 255, ${mix(0.16, 0.08, progress).toFixed(3)})`,
    boxShadow: `0 18px 40px rgba(12, 24, 20, ${mix(0.18, 0.06, progress).toFixed(3)})`,
    backdropFilter: `blur(${mix(9, 4, progress).toFixed(2)}px)`,
  };
  const sharedImageStyle = {
    transform: `scale(${mix(1.16, 1.16, progress).toFixed(3)}) translate3d(0, 0, 0)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "62% center",
  };
  const sectionStyle = {
    background: `linear-gradient(180deg, rgba(${Math.round(mix(242, 8, progress))}, ${Math.round(mix(236, 17, progress))}, ${Math.round(mix(226, 33, progress))}, 1) 0%, rgba(${Math.round(mix(228, 8, progress))}, ${Math.round(mix(219, 14, progress))}, ${Math.round(mix(205, 27, progress))}, 1) 100%)`,
  };
  const overlayStyle = {
    background: `linear-gradient(180deg, rgba(${Math.round(mix(255, 7, progress))}, ${Math.round(mix(248, 11, progress))}, ${Math.round(mix(238, 17, progress))}, ${mix(0.16, 0.08, progress).toFixed(3)}) 0%, rgba(${Math.round(mix(244, 7, progress))}, ${Math.round(mix(235, 11, progress))}, ${Math.round(mix(220, 17, progress))}, ${mix(0.22, 0.2, progress).toFixed(3)}) 34%, rgba(${Math.round(mix(196, 7, progress))}, ${Math.round(mix(184, 11, progress))}, ${Math.round(mix(162, 17, progress))}, ${mix(0.28, 0.46, progress).toFixed(3)}) 62%, rgba(${Math.round(mix(110, 8, progress))}, ${Math.round(mix(98, 11, progress))}, ${Math.round(mix(82, 17, progress))}, ${mix(0.42, 0.9, progress).toFixed(3)}) 100%)`,
  };
  const bottomFadeStyle = {
    background: `linear-gradient(180deg, rgba(${Math.round(mix(250, 8, progress))}, ${Math.round(mix(244, 17, progress))}, ${Math.round(mix(236, 33, progress))}, 0) 0%, rgba(${Math.round(mix(232, 8, progress))}, ${Math.round(mix(222, 14, progress))}, ${Math.round(mix(210, 27, progress))}, ${mix(0.18, 0.18, progress).toFixed(3)}) 22%, rgba(${Math.round(mix(210, 8, progress))}, ${Math.round(mix(196, 14, progress))}, ${Math.round(mix(178, 27, progress))}, ${mix(0.52, 0.5, progress).toFixed(3)}) 58%, rgba(${Math.round(mix(242, 8, progress))}, ${Math.round(mix(236, 17, progress))}, ${Math.round(mix(226, 33, progress))}, ${mix(0.94, 0.96, progress).toFixed(3)}) 100%)`,
  };
  const toggleClassName = isNight
    ? "border border-white/15 bg-slate-950/42 text-slate-50 shadow-[0_10px_28px_rgba(6,14,28,0.42)] backdrop-blur-md"
    : "border border-amber-200/30 bg-white/18 text-amber-100 shadow-[0_10px_24px_rgba(122,92,26,0.18)] backdrop-blur-md";

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
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[min(42rem,calc(100vw*1.34))] min-h-[28rem] w-screen overflow-hidden text-white sm:h-[min(46rem,calc(100vw*1.12))] sm:min-h-[32rem] lg:hidden"
      style={sectionStyle}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 [will-change:transform]"
        style={{
          backgroundImage: `url(${dayImage.src})`,
          ...sharedImageStyle,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 [will-change:clip-path,transform]"
        style={{
          backgroundImage: `url(${nightImage.src})`,
          clipPath: scene.nightClipPath,
          ...sharedImageStyle,
        }}
      />

      <div className="absolute inset-0" style={overlayStyle} />
      <div className="absolute inset-x-0 bottom-0 h-[54%]" style={bottomFadeStyle} />

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.85rem,env(safe-area-inset-top))] text-[#102018] sm:px-5 sm:pb-6 sm:pt-5">
        <div className="w-full">
          <button
            id="mobile-hero-details"
            type="button"
            onClick={() => setIsDetailsVisible((current) => !current)}
            aria-label={isDetailsVisible ? detailLabels.hide : detailLabels.show}
            aria-expanded={isDetailsVisible}
            aria-controls="mobile-hero-details-content"
            className="w-full rounded-[1.35rem] border px-4 py-4 text-left sm:rounded-[1.5rem] sm:px-5 sm:py-5"
            style={copyPanelStyle}
          >
            <div className="mb-3 flex w-full items-center justify-between gap-3">
              <p className="inline-flex rounded-full border border-white/12 bg-black/12 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/88 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
                {isNight ? labels.modeNight : labels.modeDay}
              </p>
              <span
                className="inline-flex flex-none items-center justify-center"
                style={chevronStyle}
              >
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${isDetailsVisible ? "rotate-180" : "rotate-0"}`}
                />
              </span>
            </div>
            <h1
              className="min-w-0 w-full text-[clamp(1.45rem,6.6vw,2.2rem)] leading-[0.98] tracking-[-0.035em] sm:text-[clamp(1.8rem,7.4vw,2.55rem)]"
              style={titleStyle}
            >
              {title}
            </h1>
            <div
              id="mobile-hero-details-content"
              className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${isDetailsVisible ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p
                  className="mb-2 text-[0.66rem] font-extrabold uppercase tracking-[0.16em] sm:text-[0.72rem]"
                  style={eyebrowStyle}
                >
                  {eyebrow}
                </p>
                <p
                  className="mt-3  text-[0.92rem] leading-[1.48] text-pretty sm:text-[0.98rem]"
                  style={leadStyle}
                >
                  {lead}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={labels.action}
        title={labels.action}
        className={`absolute right-3 top-[max(0.85rem,env(safe-area-inset-top))] z-20 inline-flex h-10 w-10 items-center justify-center rounded-full transition-[opacity,transform,box-shadow,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-4 sm:top-[max(1rem,env(safe-area-inset-top))] sm:h-11 sm:w-11 ${toggleClassName} ${isTransitioning ? "pointer-events-none scale-95 opacity-70" : "opacity-100"}`}
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