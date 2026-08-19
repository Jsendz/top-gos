import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.topgos.ad";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
