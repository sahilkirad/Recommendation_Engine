import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TrackingProvider from "@/components/TrackingProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UrbanTrendz Demo Store",
  description: "Powered by NexusAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TrackingProvider>
          {children}
        </TrackingProvider>
      </body>
    </html>
  );
}