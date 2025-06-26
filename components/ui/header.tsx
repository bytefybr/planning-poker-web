"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MoonIcon, SunIcon, ChevronDownIcon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLearningMenuOpen, setIsLearningMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const learningResources = [
    {
      href: "/planning-poker-guia",
      title: "Planning Poker",
      description: "Guia completo da técnica",
      icon: "🃏"
    },
    {
      href: "/metodologias-ageis",
      title: "Metodologias Ágeis",
      description: "Scrum, Kanban e mais",
      icon: "⚡"
    },
    {
      href: "/scrum-guide",
      title: "Guia Scrum",
      description: "Framework detalhado",
      icon: "👥"
    },
    {
      href: "/estimativas-ageis",
      title: "Estimativas Ágeis",
      description: "Técnicas e práticas",
      icon: "📊"
    },
    {
      href: "/melhores-praticas-reunioes",
      title: "Reuniões Eficazes",
      description: "Conduza meetings melhores",
      icon: "🎯"
    },
    {
      href: "/historias-usuario",
      title: "Histórias de Usuário",
      description: "Conecte dev com valor",
      icon: "📝"
    }
  ];

  const navigationItems = [
    { href: "/", label: "Início" },
    { href: "/how-to-play", label: "Como Jogar" },
    { href: "/room?type=create", label: "Criar Sala", isButton: true }
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-background/80 backdrop-blur-sm border-b border-border/50"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                className="dark:invert"
                src="/logo.png"
                alt="Plan Poker"
                width={36}
                height={36}
              />
              <p className="font-bold text-lg text-foreground">
                Plan Poker
              </p>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.href}>
                  {item.isButton ? (
                    <Button asChild className="ml-4">
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                        pathname === item.href ? "bg-accent text-accent-foreground" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Learning Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  onMouseEnter={() => setIsLearningMenuOpen(true)}
                  onMouseLeave={() => setIsLearningMenuOpen(false)}
                >
                  Aprender
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>

                <AnimatePresence>
                  {isLearningMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-80 bg-background border border-border rounded-lg shadow-lg overflow-hidden"
                      onMouseEnter={() => setIsLearningMenuOpen(true)}
                      onMouseLeave={() => setIsLearningMenuOpen(false)}
                    >
                      <div className="p-2">
                        <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                          RECURSOS EDUCACIONAIS
                        </div>
                        {learningResources.map((resource, index) => (
                          <Link
                            key={resource.href}
                            href={resource.href}
                            className="flex items-center p-2 rounded-md hover:bg-accent transition-colors group"
                          >
                            <span className="text-lg mr-3">{resource.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-sm group-hover:text-accent-foreground">
                                {resource.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {resource.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-9 h-9">
                    <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-9 h-9"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <Cross1Icon className="h-4 w-4" />
                ) : (
                  <HamburgerMenuIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.href}>
                    {item.isButton ? (
                      <Button asChild className="w-full justify-start">
                        <Link href={item.href}>{item.label}</Link>
                      </Button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                          pathname === item.href ? "bg-accent text-accent-foreground" : ""
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Learning Section */}
                <div className="pt-4 border-t border-border">
                  <div className="text-xs font-semibold text-muted-foreground mb-3 px-3">
                    RECURSOS EDUCACIONAIS
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {learningResources.map((resource) => (
                      <Link
                        key={resource.href}
                        href={resource.href}
                        className="flex items-center p-3 rounded-md hover:bg-accent transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg mr-3">{resource.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {resource.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {resource.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
