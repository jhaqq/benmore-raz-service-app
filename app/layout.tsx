import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "ServicePro - Professional Home Services",
  description: "Book trusted home service professionals for cleaning, handyman work, and installations. Transparent pricing, instant booking, insured technicians.",
  keywords: ["home services", "cleaning", "handyman", "installation", "repair", "booking"],
  authors: [{ name: "ServicePro" }],
  openGraph: {
    title: "ServicePro - Professional Home Services",
    description: "Book trusted home service professionals with transparent pricing and instant booking.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-gray-50">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}