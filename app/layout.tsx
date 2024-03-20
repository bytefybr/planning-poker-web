import "./globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import { Suspense } from "react";
import { cn } from "../lib/utils";

export const metadata: Metadata = {
  title: "Plan Poker",
  description: "Poker Planning Online",
};

import Adsense from "@/components/ui/adsense";
import Analytics from "@/components/ui/analytics";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Head>
        <meta
          name="google-adsense-account"
          content="ca-pub-4362319088561782"
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
      <Adsense pId="4362319088561782" />
    </html>
  );
}
