import { defineField, defineType } from "sanity";

export const groomingAddon = defineType({
  name: "groomingAddon",
  title: "Grooming Add-On",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Add-On Name",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price (e.g. €15)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name.en", subtitle: "price" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "Untitled Add-On", subtitle };
    },
  },
});
