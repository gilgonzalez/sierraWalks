import { useLayoutEffect, useState } from "react";
import DayNightHeroDesktop from "./DayNightHeroDesktop";
import DayNightHeroMobile from "./DayNightHeroMobile";
import type { DayNightHeroProps } from "./DayNightHeroShared";

const DESKTOP_QUERY = "(min-width: 1024px)";

export default function DayNightHero(props: DayNightHeroProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const update = () => {
      setIsDesktop(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (isDesktop === null) return null;

  return isDesktop ? <DayNightHeroDesktop {...props} /> : <DayNightHeroMobile {...props} />;
}