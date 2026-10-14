import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/i18n";

const PATHS = ["/", "/vuelos", "/nosotros", "/galeria", "/contacto", "/checkout", "/terminos"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = PATHS.map((p) => {
          const es = `${SITE_URL}${p}`;
          const en = `${es}?lang=en`;
          const alt = `<xhtml:link rel="alternate" hreflang="es-MX" href="${es}"/><xhtml:link rel="alternate" hreflang="en" href="${en.replace("&", "&amp;")}"/>`;
          return `<url><loc>${es}</loc>${alt}<priority>${p === "/" ? "1.0" : "0.8"}</priority></url><url><loc>${en}</loc>${alt}<priority>0.6</priority></url>`;
        }).join("");
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
          { headers: { "Content-Type": "application/xml" } },
        );
      },
    },
  },
});
