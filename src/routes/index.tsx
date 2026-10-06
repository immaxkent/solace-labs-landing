import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

function Index() {
  const [leaving, setLeaving] = useState(false);

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

        <nav
          className="lab-enter mt-12 flex items-baseline justify-center gap-6 sm:gap-8"
          style={{ animationDelay: "260ms" }}
          aria-label="Worlds"
        >
          {[
            { label: "FinTech", href: "https://goodpaper.io/worlds/technology" },
            { label: "Apps", href: "https://goodpaper.io/worlds/ventures" },
            { label: "Sustainability", href: "https://goodpaper.io/worlds/solace" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setLeaving(true)}
              className="group relative inline-block font-mono text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase transition-[color,letter-spacing] duration-500 ease-out hover:tracking-[0.42em] hover:text-foreground"
            >
              {label}
              <span className="absolute -bottom-1.5 left-1/2 block h-px w-0 -translate-x-1/2 bg-foreground/50 transition-all duration-500 ease-out group-hover:w-full group-hover:bg-foreground/80" />
            </a>
          ))}
        </nav>

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
