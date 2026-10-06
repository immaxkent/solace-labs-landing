import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LAST_UPDATED = "6 October 2026";

// The address is assembled in the browser so the literal string never appears in
// the server-rendered markup. Scrapers that execute JavaScript will still find it
// — this only defeats the ones that grep the HTML, which is most of them. Visitors
// without JavaScript still get the readable "[at]" form rendered on the server.
const MAIL_USER = "privacy";
const MAIL_HOST = "solacelabs.org";

function PrivacyEmail() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setAddress(`${MAIL_USER}@${MAIL_HOST}`);
  }, []);

  if (!address) {
    return (
      <span className="font-mono">
        {MAIL_USER} [at] {MAIL_HOST}
      </span>
    );
  }

  return (
    <a
      href={`mailto:${address}`}
      className="font-mono underline underline-offset-4 transition-colors hover:text-foreground"
    >
      {address}
    </a>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h3 className="font-mono text-[10px] tracking-[0.28em] text-foreground uppercase">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function PrivacyPolicy() {
  return (
    <Dialog>
      <DialogTrigger className="pointer-events-auto cursor-pointer font-mono text-[9px] tracking-[0.3em] text-muted-foreground/70 uppercase underline-offset-4 transition-colors hover:text-foreground hover:underline">
        Privacy Policy
      </DialogTrigger>

      <DialogContent className="max-h-[85svh] max-w-2xl overflow-y-auto border-border bg-background p-8 sm:p-10">
        <DialogTitle className="font-mono text-sm tracking-[0.2em] text-foreground uppercase">
          Privacy Policy
        </DialogTitle>
        <DialogDescription className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
          Last updated {LAST_UPDATED}
        </DialogDescription>

        <div className="mt-2">
          <Section title="Who we are">
            <p>
              Solace Laboratories Ltd is a technology company registered in the United Kingdom,
              trading as Good Paper. This policy covers this website, solacelabs.org. It is the
              controller of any personal data described below.
            </p>
          </Section>

          <Section title="The short version">
            <p>
              This website does not collect personal data about you. There are no cookies, no
              analytics, no tracking scripts, no advertising, no accounts and no forms. We do not
              build profiles of visitors, and we have nothing to sell or share.
            </p>
          </Section>

          <Section title="What happens when you visit">
            <p>
              Two things are unavoidable in serving a web page, and we would rather name them than
              claim nothing happens at all.
            </p>
            <p>
              <span className="text-foreground">Hosting.</span> The site is hosted by Vercel. Like
              any web host, Vercel processes the technical details of each request — including your
              IP address, the page requested, and your browser's user-agent string — in order to
              deliver the page and protect the service from abuse. We do not use this for analytics
              and we do not combine it with anything else.
            </p>
            <p>
              <span className="text-foreground">Fonts.</span> The site loads the IBM Plex typefaces
              from Google Fonts. Your browser requests those font files directly from Google, which
              means Google receives your IP address as part of that request. We receive nothing from
              Google in return, and no cookie is set by it.
            </p>
          </Section>

          <Section title="What we do not do">
            <p>
              We do not set cookies or use local storage. We do not run analytics or measurement
              tools of any kind. We do not use advertising or retargeting pixels. We do not have
              user accounts, logins, newsletters or contact forms. We do not sell, rent or share
              personal data, and we do not transfer it outside the UK or EEA ourselves.
            </p>
          </Section>

          <Section title="Our apps and other services">
            <p>
              This policy covers this website only. Our applications and other products are
              published separately and each has its own privacy policy describing the data that
              product collects and why. Please refer to the policy supplied with the app or service
              you are using — it governs that product, not this page.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Under UK data protection law you have rights over personal data we hold about you,
              including the right to access it, correct it, have it erased, restrict or object to
              its processing, and to receive a copy of it. Because this website does not collect
              personal data, in practice there is usually nothing for us to retrieve or delete — but
              if you believe otherwise, contact us and we will look into it.
            </p>
            <p>
              You also have the right to complain to the Information Commissioner's Office, the UK
              supervisory authority, at ico.org.uk.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For any privacy question or request, write to <PrivacyEmail /> and we will respond.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If this policy changes we will update the date shown at the top. This version is dated{" "}
              {LAST_UPDATED}.
            </p>
          </Section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
