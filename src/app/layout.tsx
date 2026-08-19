import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Top Gos – Your Trusted Pet Caregivers",
  description:
    "Professional dog walking and grooming services. Tailored care for your furry companions, 24/7.",
  // Next.js auto-serves src/app/favicon.ico at "/favicon.ico" via its
  // metadata file convention, so it doesn't need to be listed here.
  // The other sizes previously referenced (favicon-16x16.png,
  // favicon-32x32.png, android-chrome-192x192.png) didn't exist in
  // public/ and were 404ing — only list files that are actually
  // present at these paths.
  icons: {
    apple: { url: "/apple-touch-icon.png" },
    other: [
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={plusJakarta.variable}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
