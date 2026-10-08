import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ContourField } from "@/components/ContourField";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solace Laboratories" },
      {
        name: "description",
        content:
          "Solace Laboratories is a UK technology company operating under the trading name Good Paper.",
      },
      { property: "og:title", content: "Solace Laboratories" },
      {
        property: "og:description",
        content:
          "Solace Laboratories is a UK technology company operating under the trading name Good Paper.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://solacelabs.org" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

// Apps sits between these two on purpose: collapsing a sibling on each side
// shrinks the row symmetrically, so Apps stays centred without being moved.
const WORLDS_LEFT = { label: "FinTech", href: "https://goodpaper.io/worlds/technology" };
const WORLDS_RIGHT = { label: "Sustainability", href: "https://goodpaper.io/worlds/solace" };

const APPS = [
  { label: "BigBooth", href: "https://bigbooth.xyz" },
  { label: "Syndicaite", href: "https://syndicaite.xyz" },
];

const navItem =
  "group relative inline-block font-mono text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase transition-[color,letter-spacing] duration-500 ease-out hover:tracking-[0.42em] hover:text-foreground";

const navUnderline =
  "absolute -bottom-1.5 left-1/2 block h-px w-0 -translate-x-1/2 bg-foreground/50 transition-all duration-500 ease-out group-hover:w-full group-hover:bg-foreground/80";

function Index() {
  const [leaving, setLeaving] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);

  useEffect(() => {
    if (!appsOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAppsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [appsOpen]);

  // Collapsed siblings keep their box in the layout until the transition ends,
  // so take them out of the tab order and the accessibility tree meanwhile.
  const sibling = (link: { label: string; href: string }) => (
    <span
      aria-hidden={appsOpen}
      className={`inline-block transition-all duration-700 ease-out motion-reduce:transition-none ${
        appsOpen ? "max-w-0 overflow-hidden opacity-0" : "max-w-[14rem] opacity-100"
      }`}
    >
      <a
        href={link.href}
        onClick={() => setLeaving(true)}
        tabIndex={appsOpen ? -1 : undefined}
        className={navItem}
      >
        {link.label}
        <span className={navUnderline} />
      </a>
    </span>
  );

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-background text-foreground">
      <ContourField />

      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-6">
        <header
          className="lab-enter font-mono text-[10px] leading-relaxed tracking-[0.34em] text-muted-foreground uppercase"
          style={{ animationDelay: "120ms" }}
        >
          <p className="text-center">Solace Laboratories</p>
          <p className="text-center">United Kingdom</p>
        </header>

        <div
          className="lab-enter mt-12 flex w-full flex-col items-center"
          style={{ animationDelay: "260ms" }}
        >
          <nav className="flex items-baseline justify-center gap-6 sm:gap-8" aria-label="Worlds">
            {sibling(WORLDS_LEFT)}

            <button
              type="button"
              onClick={() => setAppsOpen((open) => !open)}
              aria-expanded={appsOpen}
              aria-controls="apps-panel"
              className={`${navItem} cursor-pointer ${appsOpen ? "tracking-[0.42em] text-foreground" : ""}`}
            >
              Apps
              <span className={`${navUnderline} ${appsOpen ? "w-full bg-foreground/80" : ""}`} />
            </button>

            {sibling(WORLDS_RIGHT)}
          </nav>

          <div
            id="apps-panel"
            className={`grid w-full transition-all duration-700 ease-out motion-reduce:transition-none ${
              appsOpen ? "mt-9 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <ul className="flex flex-col items-center gap-5">
                {APPS.map(({ label, href }, index) => (
                  <li
                    key={label}
                    style={{ transitionDelay: appsOpen ? `${180 + index * 130}ms` : "0ms" }}
                    className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
                      appsOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                    }`}
                  >
                    <a
                      href={href}
                      onClick={() => setLeaving(true)}
                      tabIndex={appsOpen ? undefined : -1}
                      className={navItem}
                    >
                      {label} <span aria-hidden="true">↗</span>
                      <span className={navUnderline} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <h1
          className="lab-enter mt-12 font-mono text-4xl font-medium tracking-tight sm:text-5xl"
          style={{ animationDelay: "480ms" }}
        >
          Welcome.
        </h1>

        <p
          className="lab-enter mt-6 max-w-md text-center text-sm leading-relaxed text-muted-foreground"
          style={{ animationDelay: "640ms" }}
        >
          Solace Laboratories is a UK technology company operating under the trading name Good
          Paper.
        </p>

        <div className="lab-enter mt-14" style={{ animationDelay: "860ms" }}>
          <a
            href="https://goodpaper.io"
            onClick={() => setLeaving(true)}
            className="group relative inline-flex flex-col items-center font-mono text-xs tracking-[0.28em] uppercase transition-[letter-spacing] duration-500 ease-out hover:tracking-[0.42em]"
          >
            <span>
              goodpaper.io <span aria-hidden="true">↗</span>
            </span>
            <span className="mt-3 block h-px w-8 bg-foreground/40 transition-all duration-700 ease-out group-hover:w-40 group-hover:bg-foreground/70" />
          </a>
        </div>
      </div>

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-8">
        <div
          className="lab-enter font-mono text-[9px] leading-relaxed tracking-[0.3em] text-muted-foreground/70 uppercase"
          style={{ animationDelay: "1100ms" }}
        >
          <p className="text-center">Solace Laboratories Ltd</p>
          <p className="text-center">United Kingdom</p>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>© 2026 Solace Laboratories Ltd</span>
            <span aria-hidden="true" className="hidden text-muted-foreground/40 sm:inline">
              ·
            </span>
            <PrivacyPolicy />
          </p>
        </div>
      </footer>

      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 bg-background transition-opacity duration-500 ease-out ${
          leaving ? "opacity-100" : "opacity-0"
        }`}
      />
    </main>
  );
}
