import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import { Suspense } from "react";
import { cn } from "../lib/utils";

import Analytics from "@/components/ui/analytics";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SupportButton from "@/components/ui/support-button";
import SchemaMarkup from "@/components/ui/schema-markup";
import GoogleAdsense from "@/components/GoogleAdsense/GoogleAdsense";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Planning Poker Online - Ferramenta Gratuita para Times Ágeis | PlanPoker",
    template: "%s | PlanPoker - Planning Poker Online"
  },
  description:
    "✅ Planning Poker Online GRÁTIS para times ágeis. Estimativas precisas com Scrum e metodologias ágeis. Crie salas ilimitadas e convide seu time. Sem instalação!",
  keywords: [
    "planning poker",
    "planning poker online",
    "estimativas ágeis",
    "scrum",
    "metodologias ágeis",
    "times ágeis", 
    "story points",
    "estimativas scrum",
    "planning poker gratis",
    "ferramenta agile",
    "reunião de planning",
    "poker planning",
    "agile estimation",
    "scrum poker"
  ],
  authors: [{ name: "PlanPoker Team" }],
  creator: "PlanPoker",
  publisher: "PlanPoker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://planpoker.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Planning Poker Online - Ferramenta Gratuita para Times Ágeis",
    description: "✅ Planning Poker Online GRÁTIS para times ágeis. Estimativas precisas com Scrum e metodologias ágeis. Crie salas ilimitadas e convide seu time.",
    url: "https://planpoker.com.br",
    siteName: "PlanPoker",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "PlanPoker - Planning Poker Online para Times Ágeis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planning Poker Online - Ferramenta Gratuita para Times Ágeis",
    description: "✅ Planning Poker Online GRÁTIS para times ágeis. Estimativas precisas com Scrum.",
    images: ["/logo.png"],
    creator: "@planpoker",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  verification: {
    google: "7483b9ecf9f5b3ee2923a31d0d53a2ff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#10b981" />
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PlanPoker" />
        <meta name="application-name" content="PlanPoker" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "flex flex-col min-h-screen bg-background font-sans antialiased touch-manipulation",
          GeistSans.variable
        )}
      >
        <Analytics />
        <SchemaMarkup />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-1 flex-col w-full items-center justify-center px-4 2xl:px-0 pt-16">
            <Suspense>
              <div className="flex flex-col max-w-[1400px]">{children}</div>
            </Suspense>
          </main>
          <Toaster />
          <SupportButton />
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleAdsense pId="6377885454629583" />
    </html>
  );
}
