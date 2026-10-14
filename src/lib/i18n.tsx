import { useRouter, useRouterState } from "@tanstack/react-router";

export type Lang = "es" | "en";
export const SITE_URL = "https://cloud-temple-showcase.lovable.app";
export const LANG_COOKIE = "tnn-lang";

export const SPANISH_COUNTRIES = new Set([
  "MX", "ES", "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN",
  "NI", "PA", "PY", "PE", "PR", "UY", "VE",
]);

export function readLangCookie(cookie: string | undefined | null): Lang | null {
  const m = cookie?.match(/(?:^|;\s*)tnn-lang=(es|en)/);
  return (m?.[1] as Lang) ?? null;
}

/** Idioma actual (lo decide el servidor en la primera carga y queda en el contexto del router). */
export function useLang(): Lang {
  return useRouterState({
    select: (s) => ((s.matches[0]?.context as { lang?: Lang } | undefined)?.lang ?? "es"),
  });
}

/** t("texto en español", "English text") */
export function useT() {
  const lang = useLang();
  return <T,>(es: T, en: T): T => (lang === "en" ? en : es);
}

export function useSetLang() {
  const router = useRouter();
  return (lang: Lang) => {
    document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = lang === "en" ? "en" : "es-MX";
    router.invalidate();
  };
}

type Copy = { title: string; description: string };

/** Metadatos SEO bilingües con canonical, hreflang y Open Graph. */
export function seo(
  lang: Lang | undefined,
  path: string,
  copy: { es: Copy; en: Copy },
  extra: { type?: string; image?: string } = {},
) {
  const c = lang === "en" ? copy.en : copy.es;
  const url = `${SITE_URL}${path}${lang === "en" ? "?lang=en" : ""}`;
  const image = extra.image ? `${SITE_URL}${extra.image}` : undefined;
  return {
    meta: [
      { title: c.title },
      { name: "description", content: c.description },
      { property: "og:title", content: c.title },
      { property: "og:description", content: c.description },
      { property: "og:type", content: extra.type ?? "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: lang === "en" ? "en_US" : "es_MX" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(image
        ? [
            { property: "og:image", content: image },
            { name: "twitter:image", content: image },
          ]
        : []),
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "es-MX", href: `${SITE_URL}${path}` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}${path}?lang=en` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${path}` },
    ],
  };
}

export const ctxLang = (match: { context?: unknown }) =>
  (match.context as { lang?: Lang } | undefined)?.lang;
