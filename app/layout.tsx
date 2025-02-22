import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import { Suspense } from "react";
import { cn } from "../lib/utils";

import Analytics from "@/components/ui/analytics";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import GoogleAdsense from "@/components/GoogleAdsense/GoogleAdsense";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planning Poker Online",
  description:
    "Execute a cerimônia de Planning Poker sem limitações, crie ou acesse uma sala e convide seu time.",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    other: {
      'site-verification': '7483b9ecf9f5b3ee2923a31d0d53a2ff',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
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
      <GoogleAdsense pId="6377885454629583" />
    </html>
  );
}
