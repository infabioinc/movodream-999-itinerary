import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Amritsar — Smart Travel System | ₹999",
  description:
    "Experience Amritsar like an insider with personalized smart itineraries, hidden gems, crowd intelligence, and dynamic route optimization. Premium travel planning for ₹999.",
  keywords: [
    "Amritsar travel",
    "Golden Temple itinerary",
    "Amritsar travel guide",
    "smart travel planner",
    "Amritsar hidden gems",
    "Royal Amritsar",
  ],
  openGraph: {
    title: "Royal Amritsar — Smart Travel System | ₹999",
    description:
      "A premium smart itinerary system with hidden gems, crowd intelligence, optimized routes, live updates — designed for an unforgettable Amritsar experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Fonts — preconnect then load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
