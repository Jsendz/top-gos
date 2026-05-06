import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Only instantiate the client when a projectId is present; otherwise the
// createClient call throws at module-load time and crashes the server.
const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;

/**
 * Fetches data from Sanity. Returns null if Sanity is not configured
 * (so the site falls back to next-intl translations gracefully).
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error("[Sanity] fetch error:", err);
    return null;
  }
}
