import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "topgos",
  title: "Top Gos CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("🏠 Homepage")
              .id("homepage")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
              ),
            S.divider(),
            S.documentTypeListItem("service").title("🐕 Services"),
            S.documentTypeListItem("testimonial").title("💬 Testimonials"),
            S.documentTypeListItem("step").title("🔢 How It Works Steps"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
