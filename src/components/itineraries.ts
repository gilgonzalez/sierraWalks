import type { Locale } from "../i18n/translations";
import { itinerariesRouteSlug } from "../i18n/translations";
import routeMap from "../assets/360/ruta-1.png";
import image360 from "../assets/360/pano5.jpg";

export type Difficulty = "easy" | "moderate" | "challenging";

export interface ItineraryNode {
  id: string;
  label: string;
  x: number;
  y: number;
  panoramaSrc: string;
  description?: string;
}

export interface ItineraryDetail {
  slug: string;
  locale: Locale;
  title: string;
  area: string;
  duration: string;
  difficulty: Difficulty;
  format: string;
  priceFrom: string;
  summary: string;
  highlights: string[];
  season: string;
  steps: string[];
  isCircular: boolean;
  mapImageSrc: string;
  nodes: ItineraryNode[];
}

const itinerariesByLocale: Record<Locale, ItineraryDetail[]> = {
  en: [
    {
      slug: "white-villages-grazalema",
      locale: "en",
      title: "White villages and Grazalema trails",
      area: "Sierra de Grazalema",
      duration: "5 days / 4 nights",
      difficulty: "moderate",
      format: "Self-guided",
      priceFrom: "From €620",
      summary:
        "A slower-paced itinerary combining panoramic walks, white villages and charming stays in the mountains.",
      highlights: ["Zahara", "Pinsapar", "Village-to-village routes", "Boutique stays"],
      season: "Spring and autumn",
      steps: ["Ronda", "Zahara", "Grazalema", "Pinsapar"],
      isCircular: true,
      mapImageSrc: routeMap.src,
      nodes: [
        { id: "ronda", label: "Ronda", x: 18, y: 24, panoramaSrc: image360.src },
        { id: "zahara", label: "Zahara", x: 37, y: 40, panoramaSrc: image360.src },
        { id: "grazalema", label: "Grazalema", x: 56, y: 35, panoramaSrc: image360.src },
      ],
    },
  ],
  es: [
    {
      slug: "pueblos-blancos-grazalema",
      locale: "es",
      title: "Pueblos Blancos y senderos de Grazalema",
      area: "Sierra de Grazalema",
      duration: "5 días / 4 noches",
      difficulty: "moderate",
      format: "Autoguiado",
      priceFrom: "Desde 620 €",
      summary:
        "Un itinerario pensado para combinar caminatas panorámicas con noches en pueblos blancos, gastronomía local y un ritmo tranquilo.",
      highlights: ["Zahara", "Pinsapar", "Rutas entre pueblos", "Alojamientos con encanto"],
      season: "Primavera y otoño",
      steps: ["Ronda", "Zahara", "Grazalema", "Pinsapar"],
      isCircular: true,
      mapImageSrc: routeMap.src,
      nodes: [
        { id: "ronda", label: "Ronda", x: 18, y: 24, panoramaSrc: image360.src },
        { id: "zahara", label: "Zahara", x: 37, y: 40, panoramaSrc: image360.src },
        { id: "grazalema", label: "Grazalema", x: 56, y: 35, panoramaSrc: image360.src },
      ],
    },
  ],
  de: [
    {
      slug: "weisse-doerfer-grazalema",
      locale: "de",
      title: "Weiße Dörfer und Wege in Grazalema",
      area: "Sierra de Grazalema",
      duration: "5 Tage / 4 Nächte",
      difficulty: "moderate",
      format: "Selbstgeführt",
      priceFrom: "Ab 620 €",
      summary:
        "Eine ruhigere Reise mit Panoramawanderungen, weißen Dörfern und charmanten Unterkünften in den Bergen.",
      highlights: ["Zahara", "Pinsapar", "Wege zwischen Dörfern", "Charmante Unterkünfte"],
      season: "Frühling und Herbst",
      steps: ["Ronda", "Zahara", "Grazalema", "Pinsapar"],
      isCircular: true,
      mapImageSrc: routeMap.src,
      nodes: [
        { id: "ronda", label: "Ronda", x: 18, y: 24, panoramaSrc: image360.src },
        { id: "zahara", label: "Zahara", x: 37, y: 40, panoramaSrc: image360.src },
        { id: "grazalema", label: "Grazalema", x: 56, y: 35, panoramaSrc: image360.src },
      ],
    },
  ],
};

export function getItineraryPath(locale: Locale, slug: string): string {
  const base = locale === "en" ? `/${itinerariesRouteSlug[locale]}` : `/${locale}/${itinerariesRouteSlug[locale]}`;
  return `${base}/${slug}`;
}

export function getLocalizedItineraryPath(targetLocale: Locale, itinerary: ItineraryDetail): string {
  const sourceItems = itinerariesByLocale[itinerary.locale];
  const itemIndex = sourceItems.findIndex((item) => item.slug === itinerary.slug);
  const localizedItem = itemIndex >= 0 ? itinerariesByLocale[targetLocale][itemIndex] : undefined;

  return getItineraryPath(targetLocale, localizedItem?.slug ?? itinerary.slug);
}

export function getItineraryBySlug(locale: Locale, slug: string): ItineraryDetail | undefined {
  return itinerariesByLocale[locale].find((item) => item.slug === slug);
}