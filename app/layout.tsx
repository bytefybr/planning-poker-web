import "./globals.css";

import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import { cn } from "../lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Poker Plan",
  description: "Poker Planning Online",
};

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          "flex flex-col min-h-screen bg-background font-sans antialiased",
          GeistSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-1 flex-col w-full items-center justify-center px-4 2xl:px-0">
            <div className="flex flex-col max-w-[1400px]">{children}</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
