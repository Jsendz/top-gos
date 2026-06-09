import { defineField, defineType } from "sanity";

export const groomingPackage = defineType({
  name: "groomingPackage",
  title: "Grooming Package",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Package Name",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price (e.g. €80)",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Included Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "text", title: "Feature Text", type: "localeString" }),
          ],
          preview: {
            select: { title: "text.en" },
            prepare({ title }: { title?: string }) {
              return { title: title || "Untitled feature" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Package Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name.en", subtitle: "price", media: "image" },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: unknown }) {
      return { title: title || "Untitled Package", subtitle, media };
    },
  },
});
