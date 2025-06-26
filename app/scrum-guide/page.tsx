"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ScrumGuide() {
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
              Scrum: Guia Definitivo
            </h1>
            <p className="text-lg text-muted-foreground">
              Tudo que você precisa saber sobre o framework Scrum para transformar sua equipe
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">O que é Scrum?</h2>
            <p className="text-muted-foreground mb-4">
              Scrum é um framework ágil para desenvolvimento de produtos complexos, especialmente software. 
              Criado por Ken Schwaber e Jeff Sutherland nos anos 1990, o Scrum é baseado na teoria de 
              controle de processo empírico, enfatizando transparência, inspeção e adaptação.
            </p>
            <p className="text-muted-foreground">
              O framework é fundamentado em sprints iterativos, papéis bem definidos e cerimônias específicas 
              que promovem colaboração, entrega contínua de valor e melhoria constante da qualidade do produto 
              e do processo de desenvolvimento.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Os 3 Pilares do Scrum</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scrumPillars.map((pillar, index) => (
                <div key={index} className="bg-primary/5 p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-3">{pillar.name}</h3>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Papéis no Scrum</h2>
            <div className="space-y-8">
              {scrumRoles.map((role, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-3">{role.name}</h3>
                  <p className="text-muted-foreground mb-4">{role.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Principais Responsabilidades:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {role.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <p className="text-sm"><strong>Características importantes:</strong> {role.keyTraits}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Eventos do Scrum</h2>
            <div className="space-y-6">
              {scrumEvents.map((event, index) => (
                <div key={index} className="bg-accent/5 p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {event.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Objetivos:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {event.objectives.map((obj, idx) => (
                          <li key={idx}>• {obj}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Dicas para sucesso:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {event.tips.map((tip, idx) => (
                          <li key={idx}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Artefatos do Scrum</h2>
            <div className="space-y-6">
              {scrumArtifacts.map((artifact, index) => (
                <div key={index} className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{artifact.name}</h3>
                  <p className="text-muted-foreground mb-3">{artifact.description}</p>
                  <div className="mb-3">
                    <h4 className="font-medium mb-1">Características:</h4>
                    <p className="text-sm text-muted-foreground">{artifact.characteristics}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Compromisso associado:</h4>
                    <p className="text-sm text-primary font-medium">{artifact.commitment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/planning-poker-guia"
              className="inline-block px-8 py-4 bg-primary dark:text-black text-white rounded-lg font-medium button-hover mr-4"
            >
              Aprenda Planning Poker
            </Link>
            <Link
              href="/room?type=create"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium button-hover"
            >
              Comece uma Sessão
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const scrumPillars = [
  {
    name: "Transparência",
    description: "Todos os aspectos do processo devem ser visíveis para os responsáveis pelos resultados."
  },
  {
    name: "Inspeção",
    description: "Os artefatos e o progresso devem ser inspecionados frequentemente para detectar variações."
  },
  {
    name: "Adaptação",
    description: "Quando desvios são identificados, ajustes devem ser feitos o mais rapidamente possível."
  }
];

const scrumRoles = [
  {
    name: "Product Owner",
    description: "Responsável por maximizar o valor do produto resultante do trabalho da Development Team.",
    responsibilities: [
      "Gerenciar o Product Backlog de forma eficaz",
      "Expressar claramente os itens do Product Backlog",
      "Ordenar os itens do Product Backlog para alcançar metas",
      "Otimizar o valor do trabalho realizado pela Development Team",
      "Garantir visibilidade e transparência do Product Backlog"
    ],
    keyTraits: "Deve ter autoridade para tomar decisões sobre o produto e ser acessível para esclarecer dúvidas."
  },
  {
    name: "Scrum Master",
    description: "Responsável por promover e apoiar o Scrum, ajudando todos a entender a teoria, práticas e valores.",
    responsibilities: [
      "Facilitar eventos Scrum conforme solicitado",
      "Treinar a Development Team em autogerenciamento",
      "Ajudar a Development Team a criar produtos de alto valor",
      "Remover impedimentos ao progresso da Development Team",
      "Facilitar colaboração dos stakeholders conforme solicitado"
    ],
    keyTraits: "Atua como servant-leader para o Scrum Team, coaching e facilitação são habilidades essenciais."
  },
  {
    name: "Development Team",
    description: "Profissionais que fazem o trabalho de entregar um Incremento potencialmente liberável do produto.",
    responsibilities: [
      "Criar um plano para o Sprint (Sprint Backlog)",
      "Incorporar qualidade aderindo à Definition of Done",
      "Adaptar o plano a cada dia em direção à Sprint Goal",
      "Responsabilizar-se mutuamente como profissionais",
      "Executar o trabalho planejado no Sprint Backlog"
    ],
    keyTraits: "Auto-organizável, multifuncional e coletivamente responsável por todo o trabalho."
  }
];

const scrumEvents = [
  {
    name: "Sprint",
    duration: "1-4 semanas",
    description: "Container para todos os outros eventos, período onde um Incremento potencialmente utilizável do produto é criado.",
    objectives: [
      "Criar um Incremento do produto",
      "Manter foco através de duração fixa",
      "Permitir inspeção e adaptação"
    ],
    tips: [
      "Mantenha duração consistente",
      "Proteja o Sprint de mudanças",
      "Foque na Sprint Goal"
    ]
  },
  {
    name: "Sprint Planning",
    duration: "8h para Sprint de 1 mês",
    description: "Evento que dá início ao Sprint, onde o trabalho a ser realizado no Sprint é planejado colaborativamente.",
    objectives: [
      "Definir o que pode ser entregue no Sprint",
      "Definir como o trabalho será realizado",
      "Criar a Sprint Goal"
    ],
    tips: [
      "Prepare o Product Backlog antes",
      "Inclua toda a Development Team",
      "Seja realista nas estimativas"
    ]
  },
  {
    name: "Daily Scrum",
    duration: "15 minutos",
    description: "Evento diário para a Development Team sincronizar atividades e criar um plano para as próximas 24 horas.",
    objectives: [
      "Sincronizar o trabalho da equipe",
      "Identificar impedimentos",
      "Adaptar o plano para atingir Sprint Goal"
    ],
    tips: [
      "Mantenha foco no objetivo",
      "Seja breve e objetivo",
      "Resolva problemas após a reunião"
    ]
  },
  {
    name: "Sprint Review",
    duration: "4h para Sprint de 1 mês",
    description: "Evento no final do Sprint para inspecionar o Incremento e adaptar o Product Backlog se necessário.",
    objectives: [
      "Demonstrar o trabalho concluído",
      "Coletar feedback dos stakeholders",
      "Revisar o que foi alcançado"
    ],
    tips: [
      "Prepare demonstrações práticas",
      "Convide stakeholders relevantes",
      "Foque no valor entregue"
    ]
  },
  {
    name: "Sprint Retrospective",
    duration: "3h para Sprint de 1 mês",
    description: "Oportunidade para o Scrum Team inspecionar a si próprio e criar um plano de melhorias para o próximo Sprint.",
    objectives: [
      "Inspecionar o último Sprint",
      "Identificar melhorias potenciais",
      "Criar plano de implementação"
    ],
    tips: [
      "Crie ambiente seguro para feedback",
      "Foque em melhorias acionáveis",
      "Acompanhe implementação das ações"
    ]
  }
];

const scrumArtifacts = [
  {
    name: "Product Backlog",
    description: "Lista ordenada de tudo que é conhecido ser necessário no produto. É a única fonte de requisitos para qualquer mudança a ser feita no produto.",
    characteristics: "Emergente, ordenado por valor e refinado continuamente pelo Product Owner e Development Team.",
    commitment: "Product Goal - Meta de longo prazo para o Scrum Team."
  },
  {
    name: "Sprint Backlog",
    description: "Conjunto de itens do Product Backlog selecionados para o Sprint, mais um plano para entregar o Incremento do produto.",
    characteristics: "Plano criado pela Development Team, visível e atualizado em tempo real durante o Sprint.",
    commitment: "Sprint Goal - Objetivo singular que fornece orientação para a Development Team."
  },
  {
    name: "Incremento",
    description: "Soma de todos os itens do Product Backlog completados durante um Sprint e o valor dos incrementos de todos os Sprints anteriores.",
    characteristics: "Deve estar em condição utilizável independentemente se o Product Owner decide liberá-lo ou não.",
    commitment: "Definition of Done - Comprometimento formal com a qualidade necessária para o Incremento."
  }
]; 