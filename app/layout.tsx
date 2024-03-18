import "./globals.css";

import type { Metadata } from "next";

import { useEffect } from "react";
import { Suspense } from "react";
import { GeistSans } from "geist/font/sans";
import { cn } from "../lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Plan Poker",
  description: "Poker Planning Online",
};

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Analytics from "@/components/ui/analytics";
import Adsense from "@/components/ui/adsense";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const disablePinchZoom = (event: any) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", disablePinchZoom, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", disablePinchZoom);
    };
  }, []);

  return (
    <html lang="pt-br">
      <Head>
        <meta
          name="google-adsense-account"
          content="ca-pub-8772352972494567"
        ></meta>
      </Head>
      <body
        className={cn(
          "flex flex-col min-h-screen bg-background font-sans antialiased touch-manipulation",
          GeistSans.variable
        )}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-1 flex-col w-full items-center justify-center px-4 2xl:px-0  py-40">
            <Suspense>
              <div className="flex flex-col max-w-[1400px]">{children}</div>
            </Suspense>
          </main>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
      <Adsense pId="8772352972494567" />
    </html>
  );
}
