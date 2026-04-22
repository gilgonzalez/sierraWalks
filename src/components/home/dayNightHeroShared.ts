import { type CSSProperties } from "react";
import { type Locale } from "../../i18n/translations";

export type DayNightHeroProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
};

export const copy = {
  en: { modeDay: "Sunlight", modeNight: "Moonlight", action: "Change scene" },
  es: { modeDay: "Luz de día", modeNight: "Luz de luna", action: "Cambiar escena" },
  de: { modeDay: "Tageslicht", modeNight: "Mondlicht", action: "Szene wechseln" },
} as const;

export const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export const mix = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

export const mixColor = (
  from: [number, number, number],
  to: [number, number, number],
  amount: number,
  alpha = 1
) =>
  `rgba(${Math.round(mix(from[0], to[0], amount))}, ${Math.round(
    mix(from[1], to[1], amount)
  )}, ${Math.round(mix(from[2], to[2], amount))}, ${alpha})`;

export const buildDesktopScene = (progress: number) => {
  const orbitAngle = Math.PI * (0.2 + progress * 0.76);
  const maskX = 90 + Math.cos(orbitAngle) * 30;
  const maskY = 100 - Math.sin(orbitAngle) * 56;
  const maskSize = progress * 148;

  return {
    nightClipPath: `circle(${maskSize.toFixed(2)}% at ${maskX.toFixed(
      2
    )}% ${maskY.toFixed(2)}%)`,
  };
};

export const buildMobileScene = (progress: number) => {
  const orbitAngle = Math.PI * (0.16 + progress * 0.84);
  const maskX = 82 + Math.cos(orbitAngle) * 22;
  const maskY = 94 - Math.sin(orbitAngle) * 46;
  const maskSize = progress * 176;

  return {
    nightClipPath: `circle(${maskSize.toFixed(2)}% at ${maskX.toFixed(
      2
    )}% ${maskY.toFixed(2)}%)`,
  };
};

export const getEyebrowStyle = (progress: number): CSSProperties => ({
  color: mixColor([18, 34, 26], [232, 241, 255], progress, 0.92 - progress * 0.04),
  textShadow: `0 1px 0 rgba(255, 255, 255, ${(0.18 * (1 - progress)).toFixed(
    3
  )}), 0 0 12px rgba(215, 232, 255, ${(0.16 * progress).toFixed(3)})`,
});

export const getTitleStyle = (progress: number): CSSProperties => ({
  color: mixColor([8, 20, 15], [248, 251, 255], progress),
  textShadow: [
    `0 1px 0 rgba(255, 255, 255, ${(0.22 * (1 - progress)).toFixed(3)})`,
    `0 10px 24px rgba(23, 49, 38, ${(0.1 * (1 - progress)).toFixed(3)})`,
    `0 0 10px rgba(255, 255, 255, ${(0.55 * progress).toFixed(3)})`,
    `0 0 22px rgba(186, 218, 255, ${(0.4 * progress).toFixed(3)})`,
    `0 0 40px rgba(118, 168, 255, ${(0.24 * progress).toFixed(3)})`,
  ].join(", "),
});

export const getLeadStyle = (progress: number): CSSProperties => ({
  color: mixColor([14, 30, 23], [236, 244, 255], progress, 0.94 - progress * 0.02),
  textShadow: `0 1px 0 rgba(255, 255, 255, ${(0.14 * (1 - progress)).toFixed(
    3
  )}), 0 0 12px rgba(215, 232, 255, ${(0.16 * progress).toFixed(3)})`,
});

export const getCopyPanelStyle = (progress: number): CSSProperties => ({
  background: `linear-gradient(135deg, rgba(248, 244, 236, ${mix(
    0.54,
    0.1,
    progress
  ).toFixed(3)}), rgba(255, 255, 255, ${mix(0.22, 0.04, progress).toFixed(3)}))`,
  borderColor: `rgba(255, 255, 255, ${mix(0.18, 0.08, progress).toFixed(3)})`,
  boxShadow: `0 16px 40px rgba(23, 49, 38, ${mix(0.1, 0.025, progress).toFixed(3)})`,
  backdropFilter: `blur(${mix(8, 3, progress).toFixed(2)}px)`,
});