import { localeString } from "./localeString";
import { localeText } from "./localeText";
import { homepage } from "./homepage";
import { service } from "./service";
import { testimonial } from "./testimonial";
import { step } from "./step";
import { groomingPackage } from "./groomingPackage";
import { groomingAddon } from "./groomingAddon";

export const schemaTypes = [
  // Shared types (must come before documents that reference them)
  localeString,
  localeText,
  // Documents
  homepage,
  service,
  testimonial,
  step,
  groomingPackage,
  groomingAddon,
];
