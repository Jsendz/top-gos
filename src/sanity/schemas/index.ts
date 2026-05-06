import { localeString } from "./localeString";
import { localeText } from "./localeText";
import { homepage } from "./homepage";
import { service } from "./service";
import { testimonial } from "./testimonial";
import { step } from "./step";

export const schemaTypes = [
  // Shared types (must come before documents that reference them)
  localeString,
  localeText,
  // Documents
  homepage,
  service,
  testimonial,
  step,
];
