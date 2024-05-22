"use client";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import { Suspense, useEffect } from "react";
import { cn } from "../lib/utils";

import Adsense from "@/components/ui/adsense";
import Analytics from "@/components/ui/analytics";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Head from "next/head";
import Script from "next/script";

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
    <html lang="pt-br" suppressHydrationWarning={true}>
      <Head>
        <title>Planning Poker Online</title>
        <meta
          name="google-adsense-account"
          content="ca-pub-4362319088561782"
        ></meta>
      </Head>
      <Script
        type="text/javascript"
        src="https://player.viads.com/tag/load-107816.js?tag_id=v107816"
        async
      ></Script>
      <body
        suppressHydrationWarning={true}
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
      <Adsense pId="4362319088561782" />
    </html>
  );
}
