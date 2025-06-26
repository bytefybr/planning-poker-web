"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";

interface BreadcrumbItem {
  href: string;
  label: string;
}

const Breadcrumb = () => {
  const pathname = usePathname();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { href: "/", label: "Início" }
    ];

    switch (pathname) {
      case "/planning-poker-guia":
        breadcrumbs.push({ href: pathname, label: "Planning Poker: Guia Completo" });
        break;
      case "/metodologias-ageis":
        breadcrumbs.push({ href: pathname, label: "Metodologias Ágeis" });
        break;
      case "/scrum-guide":
        breadcrumbs.push({ href: pathname, label: "Guia Scrum" });
        break;
      case "/estimativas-ageis":
        breadcrumbs.push({ href: pathname, label: "Estimativas Ágeis" });
        break;
      case "/melhores-praticas-reunioes":
        breadcrumbs.push({ href: pathname, label: "Melhores Práticas para Reuniões" });
        break;
      case "/historias-usuario":
        breadcrumbs.push({ href: pathname, label: "Histórias de Usuário" });
        break;
      case "/how-to-play":
        breadcrumbs.push({ href: pathname, label: "Como Jogar" });
        break;
      default:
        return breadcrumbs;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-1">
          {index === 0 ? (
            <Link
              href={item.href}
              className="flex items-center hover:text-foreground transition-colors"
            >
              <HomeIcon className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <ChevronRightIcon className="h-4 w-4" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-foreground font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb; 