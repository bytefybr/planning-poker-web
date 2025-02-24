"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnimatedLogo from "@/components/ui/animated-logo";
import Link from "next/link";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <section className="container mx-auto px-4 pt-2 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Planning Poker Online
          </span>
          <div className="flex justify-center items-center pb-12">
            <AnimatedLogo />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            A melhor ferramenta para times ágeis
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Estimativas ágeis precisas e colaborativas para Scrum Masters,
            Product Owners e times de desenvolvimento
          </p>
          <a
            href="/room?type=create"
            className="inline-block px-8 py-4 bg-primary dark:text-black text-white rounded-lg font-medium button-hover"
          >
            Comece Grátis Agora
          </a>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Por que escolher o Plan Poker?
            </h2>
            <p className="text-lg text-muted-foreground">
              A ferramenta preferida por times ágeis em todo o Brasil
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <div key={feature.id} className="glass-card p-6 rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Como funciona?</h2>
            <p className="text-lg text-muted-foreground">
              Simplifique suas reuniões de Planning Poker em 3 passos simples
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{
                  delay: 0.6 + (index * 4) * 0.2,
                  duration: 0.8,
                }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">
                    {step.id.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Section 1 */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 rounded-xl text-center justify-center flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">
              Estimativas mais precisas para seu time ágil
            </h3>
            <p className="text-muted-foreground">
              Experimente gratuitamente o Plan Poker hoje
            </p>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              Recursos exclusivos para times ágeis
            </h2>
            <div className="space-y-12">
              {detailedFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    x: isVisible ? 0 : -20,
                  }}
                  transition={{
                    delay: 0.8 + index * 4 * 0.2,
                    duration: 0.8,
                  }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {feature.benefits.map((benefit) => (
                      <li key={`${feature.id}-${benefit}`}>{benefit}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ad Section 2 */}
      <section className="py-12 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Plan Poker: A escolha certa para seu time ágil
              </h2>
              <p className="text-lg text-muted-foreground">
                Junte-se a milhares de times que já melhoraram suas estimativas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              Perguntas Frequentes
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Comece a usar o Plan Poker hoje mesmo
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experimente gratuitamente e veja como suas estimativas podem
              melhorar
            </p>
            <div className="space-x-4">
              <a
                href="/room?type=create"
                className="inline-block px-8 py-4 bg-primary dark:text-black text-white rounded-lg font-medium button-hover"
              >
                Criar Sala Grátis
              </a>
              <Link
                href="/how-to-play"
                className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium button-hover"
              >
                Como Jogar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    id: "precise-estimates",
    icon: (
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
    title: "Estimativas Precisas",
    description:
      "Utilize o poder do consenso da equipe para criar estimativas mais precisas e confiáveis",
  },
  {
    id: "remote-collab",
    icon: (
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Colaboração Remota",
    description:
      "Realize sessões de Planning Poker com sua equipe em tempo real, independente da localização",
  },
  {
    id: "instant-results",
    icon: (
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    title: "Resultados Instantâneos",
    description:
      "Visualize médias, gráficos e estatísticas em tempo real para tomar decisões informadas",
  },
];

const steps = [
  {
    id: "create-room",
    title: "Crie sua sala",
    description:
      "Configure uma sala de Planning Poker em segundos e convide seu time",
  },
  {
    id: "vote",
    title: "Vote nas histórias",
    description: "Cada membro do time vota usando as cartas do Planning Poker",
  },
  {
    id: "analyze",
    title: "Analise resultados",
    description:
      "Visualize médias, consenso e discuta as estimativas em tempo real",
  },
];

const detailedFeatures = [
  {
    id: "custom-rooms",
    title: "Salas Virtuais Personalizáveis (Em breve)",
    description:
      "Em breve você poderá personalizar suas salas de Planning Poker de acordo com as necessidades do seu time",
    benefits: [
      "Defina seus próprios valores de cartas",
      "Escolha entre diferentes decks (Fibonacci, 1-10, etc)",
      "Personalize o tempo de votação",
      "Controle de acesso e moderação",
    ],
  },
  {
    id: "agile-integration",
    title: "Integração com Metodologias Ágeis",
    description:
      "Perfeito para times que utilizam Scrum, Kanban e outras metodologias ágeis",
    benefits: [
      "Suporte a histórias de usuário",
      "Estimativas em story points",
      "Compatível com sprints e releases",
      "Exportação de resultados para seu board ágil",
    ],
  },
  {
    id: "analytics",
    title: "Análise e Métricas",
    description:
      "Acompanhe e analise o desempenho das suas sessões de Planning Poker",
    benefits: [
      "Histórico completo de estimativas",
      "Gráficos e estatísticas em tempo real",
      "Relatórios de consenso da equipe",
      "Comparação com estimativas anteriores",
    ],
  },
];

const faqs = [
  {
    id: "what-is",
    question: "O que é Planning Poker?",
    answer:
      "Planning Poker é uma técnica de estimativa ágil onde membros do time usam cartas numeradas para votar no esforço necessário para completar uma tarefa ou história de usuário.",
  },
  {
    id: "why-online",
    question: "Por que usar o Plan Poker online?",
    answer:
      "Nossa ferramenta permite que times remotos realizem sessões de Planning Poker de forma eficiente, com recursos como votação em tempo real, análise instantânea e integração com ferramentas ágeis.",
  },
  {
    id: "no-installation",
    question: "É necessário instalar algum software?",
    answer:
      "Não! O Plan Poker é 100% baseado em navegador, sem necessidade de instalação. Basta acessar o site e começar a usar.",
  },
  {
    id: "free-plan",
    question: "Posso usar gratuitamente?",
    answer:
      "Sim! Oferecemos um plano gratuito com todas as funcionalidades essenciais para times realizarem suas sessões de Planning Poker.",
  },
  {
    id: "participants",
    question: "Quantas pessoas podem participar?",
    answer:
      "Não há limite de participantes por sala. Seu time inteiro pode participar das sessões de Planning Poker simultaneamente.",
  },
];
