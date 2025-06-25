import type { Metadata } from "next";
import { Geist, Geist_Mono, Island_Moments } from "next/font/google";
import "@/styles/globals.css";
import Header from '@/components/header';
import Footer from '@/components/footer';

import { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const islandMoments = Island_Moments({
  variable: '--font-island-moments',
  subsets: ['latin'],
  weight: "400"
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurilia",
  description: "Welcome to Aurilia Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${islandMoments.variable} antialiased`}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="App">
            <Header/>
            <main>
              {children}
              </main>
            <Footer/>
          </div>
        </SkeletonTheme>
      </body>
    </html>
  );
}
