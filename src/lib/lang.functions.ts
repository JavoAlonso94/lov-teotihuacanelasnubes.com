import { createServerFn } from "@tanstack/react-start";
import { getRequest, setCookie } from "@tanstack/react-start/server";
import { LANG_COOKIE, SPANISH_COUNTRIES, readLangCookie, type Lang } from "./i18n";

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|lighthouse/i;

/** Decide el idioma: ?lang= > cookie > buscadores (español) > país > idioma del navegador. */
export const detectLang = createServerFn({ method: "GET" })
  .inputValidator((d: { requested?: string }) => d)
  .handler(async ({ data }): Promise<Lang> => {
    if (data.requested === "es" || data.requested === "en") {
      setCookie(LANG_COOKIE, data.requested, { path: "/", maxAge: 31536000, sameSite: "lax" });
      return data.requested;
    }
    const req = getRequest();
    const saved = readLangCookie(req.headers.get("cookie"));
    if (saved) return saved;
    if (BOT.test(req.headers.get("user-agent") ?? "")) return "es";
    const country = (req.headers.get("cf-ipcountry") ?? "").toUpperCase();
    let lang: Lang;
    if (country && country !== "XX" && country !== "T1") {
      lang = SPANISH_COUNTRIES.has(country) ? "es" : "en";
    } else {
      lang = /^es\b/i.test(req.headers.get("accept-language") ?? "es") ? "es" : "en";
    }
    setCookie(LANG_COOKIE, lang, { path: "/", maxAge: 31536000, sameSite: "lax" });
    return lang;
  });
