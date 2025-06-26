"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MetodologiasAgeis() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Metodologias Ágeis: Guia Completo
            </h1>
            <p className="text-lg text-muted-foreground">
              Entenda as principais metodologias ágeis e como elas podem transformar o desenvolvimento de software
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">O que são Metodologias Ágeis?</h2>
            <p className="text-muted-foreground mb-4">
              As metodologias ágeis são um conjunto de práticas e princípios para desenvolvimento de software que 
              priorizam a entrega contínua de valor, colaboração entre equipes e adaptação rápida às mudanças. 
              Surgidas como resposta aos métodos tradicionais de desenvolvimento, essas metodologias revolucionaram 
              a forma como os projetos de software são conduzidos.
            </p>
            <p className="text-muted-foreground">
              O movimento ágil foi formalizado em 2001 com o Manifesto Ágil, que estabeleceu quatro valores fundamentais 
              e doze princípios que orientam o desenvolvimento de software mais eficiente e centrado no usuário.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Os 4 Valores do Manifesto Ágil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {manifestoValues.map((value, index) => (
                <div key={index} className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Principais Metodologias Ágeis</h2>
            <div className="space-y-8">
              {methodologies.map((methodology, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-3">{methodology.name}</h3>
                  <p className="text-muted-foreground mb-4">{methodology.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Características principais:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {methodology.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Quando usar:</h4>
                    <p className="text-sm text-muted-foreground">{methodology.whenToUse}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Benefícios das Metodologias Ágeis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Papéis em Times Ágeis</h2>
            <div className="space-y-6">
              {agileRoles.map((role, index) => (
                <div key={index} className="bg-accent/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{role.title}</h3>
                  <p className="text-muted-foreground mb-3">{role.description}</p>
                  <div>
                    <h4 className="font-medium mb-2">Responsabilidades:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {role.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Ferramentas Essenciais para Times Ágeis</h2>
            <p className="text-muted-foreground mb-6">
              Para implementar metodologias ágeis com sucesso, é importante utilizar as ferramentas adequadas 
              que suportem a colaboração, comunicação e organização do time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <div key={index} className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{tool.category}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {tool.examples.map((example, idx) => (
                      <li key={idx}>• {example}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/room?type=create"
              className="inline-block px-8 py-4 bg-primary dark:text-black text-white rounded-lg font-medium button-hover"
            >
              Comece a Usar Planning Poker
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const manifestoValues = [
  {
    title: "Indivíduos e interações",
    description: "Mais do que processos e ferramentas, valorizamos as pessoas e como elas trabalham juntas."
  },
  {
    title: "Software funcionando",
    description: "Mais do que documentação abrangente, priorizamos entregar software que realmente funciona."
  },
  {
    title: "Colaboração com cliente",
    description: "Mais do que negociação de contratos, focamos em trabalhar junto com o cliente."
  },
  {
    title: "Responder a mudanças",
    description: "Mais do que seguir um plano, nos adaptamos rapidamente às mudanças necessárias."
  }
];

const methodologies = [
  {
    name: "Scrum",
    description: "Framework ágil mais popular, baseado em sprints de desenvolvimento e papéis bem definidos.",
    features: [
      "Sprints de 1-4 semanas",
      "Papéis: Product Owner, Scrum Master, Development Team",
      "Eventos: Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective",
      "Artefatos: Product Backlog, Sprint Backlog, Increment"
    ],
    whenToUse: "Ideal para projetos com requisitos que podem mudar frequentemente e equipes que precisam de estrutura clara."
  },
  {
    name: "Kanban",
    description: "Método visual para gerenciar trabalho, focado no fluxo contínuo e limitação de trabalho em progresso.",
    features: [
      "Quadro visual com colunas (To Do, Doing, Done)",
      "Limite de WIP (Work in Progress)",
      "Fluxo contínuo sem sprints fixos",
      "Métricas: Lead Time, Cycle Time, Throughput"
    ],
    whenToUse: "Perfeito para times que precisam de flexibilidade e trabalham com demandas contínuas ou suporte."
  },
  {
    name: "Extreme Programming (XP)",
    description: "Metodologia focada em práticas de engenharia de software e qualidade do código.",
    features: [
      "Pair Programming",
      "Test-Driven Development (TDD)",
      "Refactoring contínuo",
      "Integração contínua",
      "Releases pequenos e frequentes"
    ],
    whenToUse: "Recomendado para projetos que exigem alta qualidade de código e times técnicos experientes."
  },
  {
    name: "Lean Software Development",
    description: "Baseado nos princípios do Lean Manufacturing, foca na eliminação de desperdícios.",
    features: [
      "Eliminar desperdícios",
      "Amplificar aprendizado",
      "Decidir o mais tarde possível",
      "Entregar o mais rápido possível",
      "Empoderar o time"
    ],
    whenToUse: "Adequado para organizações que buscam otimização de processos e redução de custos."
  }
];

const benefits = [
  {
    title: "Entrega Mais Rápida",
    description: "Releases frequentes permitem entregar valor ao cliente mais rapidamente."
  },
  {
    title: "Maior Qualidade",
    description: "Testes contínuos e feedback constante resultam em software de melhor qualidade."
  },
  {
    title: "Adaptabilidade",
    description: "Capacidade de responder rapidamente a mudanças nos requisitos do projeto."
  },
  {
    title: "Transparência",
    description: "Visibilidade completa do progresso e dos impedimentos do projeto."
  },
  {
    title: "Colaboração",
    description: "Melhora significativa na comunicação entre time e stakeholders."
  },
  {
    title: "Satisfação do Cliente",
    description: "Envolvimento contínuo do cliente resulta em maior satisfação com o produto final."
  }
];

const agileRoles = [
  {
    title: "Product Owner",
    description: "Responsável por definir e priorizar as funcionalidades do produto.",
    responsibilities: [
      "Gerenciar o Product Backlog",
      "Definir critérios de aceitação",
      "Priorizar funcionalidades baseado no valor de negócio",
      "Comunicar com stakeholders",
      "Aceitar ou rejeitar incrementos do produto"
    ]
  },
  {
    title: "Scrum Master",
    description: "Facilitador que ajuda o time a seguir os princípios ágeis e remove impedimentos.",
    responsibilities: [
      "Facilitar eventos do Scrum",
      "Remover impedimentos",
      "Proteger o time de distrações externas",
      "Coaching do time em práticas ágeis",
      "Promover melhoria contínua"
    ]
  },
  {
    title: "Development Team",
    description: "Time multifuncional responsável por desenvolver o produto.",
    responsibilities: [
      "Estimar esforço das tarefas",
      "Desenvolver funcionalidades",
      "Garantir qualidade do código",
      "Participar de cerimônias ágeis",
      "Auto-organização e colaboração"
    ]
  }
];

const tools = [
  {
    category: "Gestão de Projeto",
    examples: ["Jira", "Azure DevOps", "Trello", "Asana"]
  },
  {
    category: "Comunicação",
    examples: ["Slack", "Microsoft Teams", "Discord", "Zoom"]
  },
  {
    category: "Desenvolvimento",
    examples: ["Git", "GitHub", "GitLab", "Jenkins"]
  },
  {
    category: "Estimativas",
    examples: ["Planning Poker", "Story Points", "T-shirt Sizing"]
  },
  {
    category: "Monitoramento",
    examples: ["Burndown Charts", "Velocity Charts", "CFD"]
  },
  {
    category: "Documentação",
    examples: ["Confluence", "Notion", "Wiki", "Miro"]
  }
]; 