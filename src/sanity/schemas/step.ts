import { defineField, defineType } from "sanity";

export const step = defineType({
  name: "step",
  title: "How It Works Step",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Step Number (e.g. 01)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (r) => r.required(),
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
    select: { title: "title.en", subtitle: "number" },
    prepare({ title, subtitle }) {
      return { title: title || "Untitled Step", subtitle: `Step ${subtitle}` };
    },
  },
});
