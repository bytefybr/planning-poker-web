import Script from 'next/script';

interface SchemaMarkupProps {
  type?: 'website' | 'article' | 'software';
  title?: string;
  description?: string;
  url?: string;
}

export default function SchemaMarkup({ 
  type = 'website',
  title = "Planning Poker Online - Ferramenta Gratuita para Times Ágeis | PlanPoker",
  description = "Planning Poker Online GRÁTIS para times ágeis. Estimativas precisas com Scrum e metodologias ágeis. Crie salas ilimitadas e convide seu time. Sem instalação!",
  url = "https://planpoker.com.br"
}: SchemaMarkupProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PlanPoker",
    "url": "https://planpoker.com.br",
    "logo": "https://planpoker.com.br/logo.png",
    "sameAs": [
      "https://twitter.com/planpoker",
      "https://linkedin.com/company/planpoker"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-991987000",
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PlanPoker",
    "url": "https://planpoker.com.br",
    "description": description,
    "inLanguage": "pt-BR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://planpoker.com.br/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PlanPoker - Planning Poker Online",
    "description": description,
    "url": url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "featureList": [
      "Planning Poker Online",
      "Estimativas Ágeis",
      "Scrum Planning",
      "Salas Ilimitadas",
      "Colaboração em Tempo Real",
      "Sem Instalação"
    ],
    "screenshot": "https://planpoker.com.br/logo.png"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://planpoker.com.br"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é Planning Poker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Planning Poker é uma técnica de estimativa ágil onde membros do time usam cartas numeradas para votar no esforço necessário para completar uma tarefa ou história de usuário."
        }
      },
      {
        "@type": "Question", 
        "name": "Por que usar o PlanPoker online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nossa ferramenta permite que times remotos realizem sessões de Planning Poker de forma eficiente, com recursos como votação em tempo real, análise instantânea e integração com ferramentas ágeis."
        }
      },
      {
        "@type": "Question",
        "name": "É necessário instalar algum software?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Não! O PlanPoker é 100% baseado em navegador, sem necessidade de instalação. Basta acessar o site e começar a usar."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
} 