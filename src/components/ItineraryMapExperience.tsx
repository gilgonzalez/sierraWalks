import { useEffect, useMemo, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import "@photo-sphere-viewer/core/index.css";
import type { ItineraryNode } from "./itineraries";


interface Labels {
  eyebrow: string;
  title: string;
  intro: string;
  open360: string;
  close360: string;
  modalHint: string;
}

interface Props {
  itineraryTitle: string;
  mapImageSrc: string;
  nodes: ItineraryNode[];
  labels: Labels;
}

export default function ItineraryMapExperience({
  itineraryTitle,
  mapImageSrc,
  nodes,
  labels,
}: Props) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const activeNode = useMemo(
    () => nodes.find((node) => node.id === activeNodeId) ?? null,
    [nodes, activeNodeId],
  );

  useEffect(() => {
    if (!activeNode) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveNodeId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeNode]);

  return (
    <>
      <div className="rounded-[1.6rem] border border-black/5 bg-white p-5 shadow-[0_14px_30px_rgba(23,49,38,0.06)] sm:p-6">
        <div className="max-w-3xl">
          <p className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-[#7a5c1a]">
            {labels.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#10251c] sm:text-[2rem]">
            {labels.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#173126]/72 sm:text-base">
            {labels.intro}
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#173126]/8 bg-[#10251c]">
          <div className="relative aspect-[16/10] w-full">
            <img
              src={mapImageSrc}
              alt={`Mapa base de ${itineraryTitle}`}
              className="h-full w-full object-cover opacity-90"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,25,0.08),rgba(7,16,25,0.22))]" />

            {nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                aria-label={`${labels.open360}: ${node.label}`}
                title={node.label}
                onClick={() => setActiveNodeId(node.id)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3d78b]/35 blur-md transition-transform duration-300 group-hover:scale-110" />
                <span className="relative flex h-5 w-5 items-center justify-center rounded-full border border-white/70 bg-[radial-gradient(circle_at_35%_35%,#fff_0%,#fff6cf_22%,#f3d78b_48%,#c08f2b_100%)] shadow-[0_0_0_6px_rgba(243,215,139,0.18),0_10px_22px_rgba(0,0,0,0.28)] transition-transform duration-300 group-hover:scale-110">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                </span>
                <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#10251c] px-3 py-1 text-[0.68rem] font-semibold text-white opacity-0 shadow-[0_10px_24px_rgba(8,17,27,0.28)] transition-opacity duration-200 group-hover:opacity-100">
                  {node.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeNode ? (
        <div className="fixed inset-0 z-[90] bg-[rgba(6,12,18,0.82)] p-3 backdrop-blur-md sm:p-6">
          <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#08111b] shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#f3d78b]">
                  {itineraryTitle}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                  {activeNode.label}
                </h3>
                <p className="mt-1 text-sm text-white/64">{labels.modalHint}</p>
              </div>

              <button
                type="button"
                onClick={() => setActiveNodeId(null)}
                className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {labels.close360}
              </button>
            </div>

            <div className="min-h-0 flex-1">
              <ReactPhotoSphereViewer
                src={activeNode.panoramaSrc}
                width="100%"
                height="100%"
                defaultZoomLvl={0}
                moveSpeed={1}
                mousewheel={true}
                touchmoveTwoFingers={false}
                navbar={["zoom", "move", "fullscreen"]}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}