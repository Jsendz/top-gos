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
