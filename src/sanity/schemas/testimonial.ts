import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Card Title",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Quote / Body",
      type: "localeText",
    }),
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Client Role",
      type: "localeString",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "name" },
    prepare({ title, subtitle }) {
      return { title: title || "Untitled", subtitle };
    },
  },
});
