import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Exclude /studio and static files from i18n middleware
  matcher: ["/((?!studio|api|_next|_vercel|.*\\..*).*)", "/"],
};
