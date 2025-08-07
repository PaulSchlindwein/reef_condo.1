import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reef Condo | Luxury Paradise Island Vacation Rental at Atlantis",
  description: "Experience paradise at our stunning oceanfront condo in The Reef Atlantis. Premium vacation rental with breathtaking views, luxury amenities, and full resort access.",
  keywords: "Atlantis, Paradise Island, Bahamas, vacation rental, luxury condo, reef atlantis, nassau, caribbean",
  authors: [{ name: "Reef Condo" }],

  robots: "index, follow",
  openGraph: {
    title: "Reef Condo | Luxury Paradise Island Vacation Rental",
    description: "Experience paradise at our stunning oceanfront condo in The Reef Atlantis with full resort access.",
    type: "website",
    locale: "en_US",
    siteName: "Reef Condo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reef Condo | Luxury Paradise Island Vacation Rental",
    description: "Experience paradise at our stunning oceanfront condo in The Reef Atlantis with full resort access.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
