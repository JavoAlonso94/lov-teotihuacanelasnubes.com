import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import logo from "@/assets/logo-tnn.png.asset.json";
import { WHATSAPP_PRIMARY, WHATSAPP_SECONDARY, waLink } from "@/lib/tnn";

const NAV = [
  { to: "/", label: "Inicio", icon: "fa-solid fa-house" },
  { to: "/vuelos", label: "Vuelos", icon: "fa-solid fa-fire-flame-curved" },
  { to: "/nosotros", label: "Nosotros", icon: "fa-solid fa-people-group" },
  { to: "/galeria", label: "Galería", icon: "fa-solid fa-images" },
  { to: "/contacto", label: "Contacto", icon: "fa-solid fa-comment-dots" },
] as const;

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("tnn-theme") as "light" | "dark" | null;
    const initial =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("tnn-theme", theme);
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

export function AppShell({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    let cancelled = false;
    (async () => {
      const AOS = (await import("aos")).default;
      if (cancelled) return;
      AOS.init({ duration: 750, easing: "ease-out-cubic", once: true, offset: 60 });
      AOS.refreshHard();
    })();
    return () => {
      cancelled = true;
    };
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <nav className={`tnn-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container tnn-app d-flex align-items-center justify-content-between py-2">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 m-0">
            <img src={logo.url} alt="Teotihuacán en las nubes" />
          </Link>

          <div className="d-none d-lg-flex align-items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`nav-link tnn-link ${path === n.to ? "active" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="tnn-switch btn p-0"
              onClick={toggle}
              aria-label={theme === "dark" ? "Activar modo día" : "Activar modo noche"}
            >
              <span className="knob">
                <i className={theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun"} />
              </span>
            </button>
            <a
              href={waLink("¡Hola! Quiero información de un vuelo en globo.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-tnn d-none d-lg-inline-flex btn-sm"
            >
              <i className="fa-brands fa-whatsapp me-2" />
              Reservar
            </a>
            <button
              className="btn btn-outline-tnn d-lg-none px-3 py-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className={`position-fixed top-0 start-0 w-100 h-100 ${menuOpen ? "" : "d-none"}`}
        style={{ zIndex: 1060, background: "rgba(4,18,30,.55)", backdropFilter: "blur(4px)" }}
        onClick={() => setMenuOpen(false)}
      >
        <aside
          className="tnn-offcanvas position-absolute top-0 end-0 h-100 p-4 animate__animated animate__slideInRight animate__faster"
          style={{ width: "min(86vw, 340px)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="tnn-eyebrow">Menú</span>
            <button className="btn btn-outline-tnn px-3 py-1" onClick={() => setMenuOpen(false)}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`tnn-link ${path === n.to ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <i className={`${n.icon} me-3`} />
              {n.label}
            </Link>
          ))}
          <a
            href={waLink("¡Hola! Quiero reservar un vuelo en globo.")}
            target="_blank"
            rel="noreferrer"
            className="btn btn-tnn w-100 mt-4"
          >
            <i className="fa-brands fa-whatsapp me-2" />
            Reservar por WhatsApp
          </a>
        </aside>
      </div>

      <main>{children}</main>

      <footer className="tnn-footer">
        <div className="container tnn-app">
          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <img src={logo.url} alt="Teotihuacán en las nubes" style={{ height: 72 }} className="tnn-balloon-float" />
              <p className="tnn-muted mt-3 mb-0">
                Vuelos en globo aerostático sobre la Ciudad de los Dioses. Seguridad, calidez y
                amaneceres que no se olvidan.
              </p>
            </div>
            <div className="col-6 col-lg-3">
              <h5 className="mb-3">Explora</h5>
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className="d-block mb-2 text-decoration-none tnn-muted">
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="col-6 col-lg-5">
              <h5 className="mb-3">Contacto</h5>
              <a className="d-block mb-2 text-decoration-none" href={`https://wa.me/${WHATSAPP_PRIMARY}`}>
                <i className="fa-brands fa-whatsapp me-2" />+52 55 2331 7774
              </a>
              <a className="d-block mb-2 text-decoration-none" href={`https://wa.me/${WHATSAPP_SECONDARY}`}>
                <i className="fa-brands fa-whatsapp me-2" />+52 33 2179 6983
              </a>
              <span className="tnn-muted d-block">www.teotihuacanenlasnubes.com</span>
              <div className="d-flex gap-3 mt-3 fs-5">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <i className="fa-brands fa-facebook" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="fa-brands fa-instagram" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                  <i className="fa-brands fa-tiktok" />
                </a>
              </div>
            </div>
          </div>
          <hr style={{ borderColor: "var(--tnn-line)" }} />
          <p className="tnn-muted small mb-0 text-center">
            © {new Date().getFullYear()} Teotihuacán en las nubes. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <a
        className="tnn-wa"
        href={waLink("¡Hola! Quiero información de un vuelo en globo.")}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" />
      </a>

      <nav className="tnn-tabbar d-lg-none">
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className={`tnn-tab ${path === n.to ? "active" : ""}`}>
            <i className={n.icon} />
            {n.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
