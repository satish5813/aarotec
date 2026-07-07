import LogoMark from "./Logo";

const COLS = [
  { h: "Products", links: ["Posh", "Quartz", "AirTouch", "AirGlass", "AirLock"] },
  { h: "Company", links: ["About", "Careers", "Blog", "Press"] },
  { h: "Support", links: ["Help center", "Installation", "Warranty", "Contact"] },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pradeep-ravulapati-investments",
    path: "M4.98 3.5a2 2 0 1 1 0 4.001 2 2 0 0 1 0-4ZM3 8.75h3.96V21H3V8.75ZM9.5 8.75h3.8v1.67h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-3.96v-5.43c0-1.3-.02-2.97-1.9-2.97-1.9 0-2.19 1.4-2.19 2.87V21H9.5V8.75Z",
  },
  {
    label: "X",
    href: "#",
    path: "M17.53 3h2.94l-6.42 7.34L21.6 21h-5.9l-4.62-6.04L5.78 21H2.84l6.86-7.85L2.4 3h6.05l4.18 5.52L17.53 3Zm-1.03 16.2h1.63L7.6 4.7H5.85L16.5 19.2Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21.58 7.2a2.74 2.74 0 0 0-1.93-1.94C17.95 4.8 12 4.8 12 4.8s-5.95 0-7.65.46A2.74 2.74 0 0 0 2.42 7.2 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .42 4.8 2.74 2.74 0 0 0 1.93 1.94c1.7.46 7.65.46 7.65.46s5.95 0 7.65-.46a2.74 2.74 0 0 0 1.93-1.94A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.42-4.8ZM10 15.02V8.98L15.2 12 10 15.02Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 7.38A4.62 4.62 0 1 0 12 16.62 4.62 4.62 0 0 0 12 7.38Zm0 7.62A3 3 0 1 1 12 9a3 3 0 0 1 0 6Zm5.88-7.81a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0ZM21 8.05c-.05-1.45-.38-2.74-1.44-3.8C18.5 3.18 17.2 2.85 15.76 2.8 14.27 2.72 9.73 2.72 8.24 2.8 6.8 2.85 5.5 3.18 4.44 4.24 3.38 5.3 3.05 6.6 3 8.05c-.08 1.49-.08 6.03 0 7.52.05 1.45.38 2.74 1.44 3.8 1.06 1.06 2.36 1.39 3.8 1.44 1.49.08 6.03.08 7.52 0 1.45-.05 2.74-.38 3.8-1.44 1.06-1.06 1.39-2.35 1.44-3.8.08-1.49.08-6.02 0-7.51Zm-1.92 9.1a3.04 3.04 0 0 1-1.71 1.71c-1.18.47-3.99.36-5.37.36-1.38 0-4.19.11-5.37-.36a3.04 3.04 0 0 1-1.71-1.71c-.47-1.18-.36-3.99-.36-5.37 0-1.38-.11-4.19.36-5.37a3.04 3.04 0 0 1 1.71-1.71c1.18-.47 3.99-.36 5.37-.36 1.38 0 4.19-.11 5.37.36a3.04 3.04 0 0 1 1.71 1.71c.47 1.18.36 3.99.36 5.37 0 1.38.11 4.19-.36 5.37Z",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 rounded-lg" />
              <span className="font-display text-lg font-bold">
                Aaro Tec
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Transforming spaces and enhancing lives — intelligent automation
              for the modern home.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-cta hover:text-cta-fg"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-[18px] w-[18px]"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.h}>
              <h4 className="text-sm font-semibold">{c.h}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted transition hover:text-text"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Aaro Tec. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text">
              Privacy
            </a>
            <a href="#" className="hover:text-text">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
