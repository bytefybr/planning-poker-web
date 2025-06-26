"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MelhoresPraticasReunioes() {
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
              Melhores Práticas para Reuniões de Planning
            </h1>
            <p className="text-lg text-muted-foreground">
              Conduza reuniões de planejamento mais eficazes e engajantes para seu time ágil
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Por que Reuniões Eficazes são Cruciais</h2>
            <p className="text-muted-foreground mb-4">
              Reuniões de planejamento bem conduzidas são o coração de qualquer time ágil bem-sucedido. 
              Elas não apenas definem o trabalho a ser realizado, mas também alinham expectativas, 
              promovem colaboração e criam um entendimento compartilhado sobre objetivos e prioridades.
            </p>
            <p className="text-muted-foreground">
              Uma reunião mal planejada pode desperdiçar tempo valioso da equipe, gerar confusão e 
              desmotivar os participantes. Por outro lado, reuniões bem estruturadas energizam o time, 
              esclarecem objetivos e estabelecem uma base sólida para o sucesso do sprint.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Preparação Antes da Reunião</h2>
            <div className="space-y-6">
              {preparationSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-3">{step.description}</p>
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <h4 className="font-medium mb-1">Dicas práticas:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {step.tips.map((tip, idx) => (
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
            <h2 className="text-2xl font-bold mb-6">Durante a Reunião</h2>
            <div className="space-y-6">
              {duringMeetingPractices.map((practice, index) => (
                <div key={index} className="bg-accent/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">{practice.title}</h3>
                  <p className="text-muted-foreground mb-4">{practice.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">O que fazer:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {practice.dos.map((item, idx) => (
                          <li key={idx}>✓ {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-red-600">O que evitar:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {practice.donts.map((item, idx) => (
                          <li key={idx}>✗ {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Facilitação Eficaz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilitationTips.map((tip, index) => (
                <div key={index} className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-primary">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Técnica:</strong> {tip.technique}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Lidando com Desafios Comuns</h2>
            <div className="space-y-6">
              {commonChallenges.map((challenge, index) => (
                <div key={index} className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-lg font-semibold mb-2 text-orange-700 dark:text-orange-400">
                    {challenge.challenge}
                  </h3>
                  <p className="text-muted-foreground mb-3">{challenge.description}</p>
                  <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">Soluções:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {challenge.solutions.map((solution, idx) => (
                        <li key={idx}>• {solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Ferramentas e Recursos</h2>
            <div className="space-y-6">
              {tools.map((category, index) => (
                <div key={index} className="bg-accent/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="bg-background/50 p-3 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Métricas de Sucesso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successMetrics.map((metric, index) => (
                <div key={index} className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{metric.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{metric.description}</p>
                  <div className="text-sm">
                    <strong>Como medir:</strong> <span className="text-muted-foreground">{metric.measurement}</span>
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

const preparationSteps = [
  {
    title: "Definir Objetivos Claros",
    description: "Estabeleça o que você espera alcançar com a reunião e comunique isso antecipadamente.",
    tips: [
      "Compartilhe a agenda com antecedência",
      "Defina critérios de sucesso mensuráveis",
      "Comunique expectativas de participação"
    ]
  },
  {
    title: "Preparar o Backlog",
    description: "Certifique-se de que os itens estão prontos para discussão e estimativa.",
    tips: [
      "Revise critérios de aceitação",
      "Valide dependências técnicas",
      "Prepare materiais de apoio (protótipos, mockups)"
    ]
  },
  {
    title: "Configurar o Ambiente",
    description: "Prepare o espaço físico ou virtual para maximizar engajamento e colaboração.",
    tips: [
      "Teste ferramentas tecnológicas antes",
      "Prepare materiais visuais (quadros, post-its)",
      "Garanta que todos tenham acesso necessário"
    ]
  },
  {
    title: "Confirmar Participação",
    description: "Verifique disponibilidade e confirme presença dos participantes essenciais.",
    tips: [
      "Identifique papéis críticos para a reunião",
      "Prepare substitutos quando necessário",
      "Comunique importância da participação ativa"
    ]
  }
];

const duringMeetingPractices = [
  {
    title: "Gestão do Tempo",
    description: "Mantenha a reunião focada e dentro do prazo estabelecido.",
    dos: [
      "Use timeboxes para cada tópico",
      "Tenha um facilitador dedicado",
      "Faça pausas regulares para longas sessões"
    ],
    donts: [
      "Permitir discussões sem fim",
      "Ignorar participantes silenciosos",
      "Deixar conversas paralelas dominarem"
    ]
  },
  {
    title: "Participação Ativa",
    description: "Garanta que todos os membros contribuam de forma significativa.",
    dos: [
      "Perguntar diretamente para membros quietos",
      "Usar técnicas como round-robin",
      "Valorizar diferentes perspectivas"
    ],
    donts: [
      "Permitir que uma pessoa domine",
      "Ignorar sinais de desengajamento",
      "Julgar ideias prematuramente"
    ]
  },
  {
    title: "Documentação",
    description: "Registre decisões importantes e próximos passos claramente.",
    dos: [
      "Designar um responsável por atas",
      "Documentar decisões em tempo real",
      "Confirmar entendimento comum"
    ],
    donts: [
      "Deixar pontos importantes sem registro",
      "Assumir que todos lembrarão detalhes",
      "Adiar documentação para depois"
    ]
  }
];

const facilitationTips = [
  {
    title: "Energia Positiva",
    description: "Mantenha o ambiente positivo e colaborativo durante toda a sessão.",
    technique: "Use check-ins regulares e celebre pequenas vitórias durante a reunião."
  },
  {
    title: "Escuta Ativa",
    description: "Demonstre que está ouvindo e valorize as contribuições de todos.",
    technique: "Parafraseie pontos importantes e faça perguntas esclarecedoras."
  },
  {
    title: "Neutralidade",
    description: "Mantenha-se neutro em discussões técnicas para facilitar consenso.",
    technique: "Foque em facilitação ao invés de contribuir com opiniões técnicas."
  },
  {
    title: "Gestão de Conflitos",
    description: "Transforme divergências em oportunidades de aprendizado.",
    technique: "Use técnicas como 'cinco porquês' para entender raízes de discordâncias."
  }
];

const commonChallenges = [
  {
    challenge: "Participantes Desengajados",
    description: "Alguns membros não participam ativamente ou parecem distraídos.",
    solutions: [
      "Use técnicas interativas como votação e breakout rooms",
      "Faça perguntas diretas para envolver pessoas específicas",
      "Varie o formato e ritmo da reunião",
      "Aborde o problema diretamente em conversas 1:1"
    ]
  },
  {
    challenge: "Discussões que se Estendem",
    description: "Conversas ficam longas demais sem chegar a conclusões.",
    solutions: [
      "Use timers visíveis para cada tópico",
      "Aplique a técnica 'parking lot' para tópicos adjacentes",
      "Estabeleça regras claras de discussão",
      "Intervenha educadamente quando necessário"
    ]
  },
  {
    challenge: "Estimativas Muito Divergentes",
    description: "Equipe não consegue chegar a consenso nas estimativas.",
    solutions: [
      "Explore as razões por trás das diferenças",
      "Decomponha histórias grandes em partes menores",
      "Use técnicas de estimativa alternativas",
      "Aceite ranges ao invés de valores únicos"
    ]
  },
  {
    challenge: "Requisitos Pouco Claros",
    description: "Histórias não têm detalhes suficientes para estimativa precisa.",
    solutions: [
      "Pause para refinar requisitos quando necessário",
      "Convide especialistas para esclarecer dúvidas",
      "Use spikes para investigar incertezas",
      "Documente assumptions claramente"
    ]
  }
];

const tools = [
  {
    category: "Ferramentas de Estimativa Online",
    items: [
      { name: "Planning Poker", description: "Ferramenta colaborativa para estimativas" },
      { name: "Scrum Poker", description: "Cartas digitais para planning poker" },
      { name: "Pointing Party", description: "Estimativas em tempo real para times remotos" }
    ]
  },
  {
    category: "Colaboração Visual",
    items: [
      { name: "Miro", description: "Quadros virtuais colaborativos" },
      { name: "Mural", description: "Facilitação visual para workshops" },
      { name: "Figma", description: "Design colaborativo e prototipagem" }
    ]
  },
  {
    category: "Gestão de Reuniões",
    items: [
      { name: "Zoom", description: "Videoconferência com breakout rooms" },
      { name: "Microsoft Teams", description: "Colaboração integrada" },
      { name: "Slack", description: "Comunicação async e integração" }
    ]
  }
];

const successMetrics = [
  {
    name: "Engajamento da Equipe",
    description: "Nível de participação ativa dos membros durante as reuniões.",
    measurement: "Pesquisas de feedback pós-reunião e observação de participação."
  },
  {
    name: "Precisão das Estimativas",
    description: "Quão próximas as estimativas ficam do esforço real gasto.",
    measurement: "Comparação entre story points estimados e velocidade real."
  },
  {
    name: "Duração das Reuniões",
    description: "Eficiência em manter reuniões dentro do tempo planejado.",
    measurement: "Tempo real vs tempo planejado para cada sessão."
  },
  {
    name: "Clareza de Objetivos",
    description: "Quão bem os participantes entendem o que foi decidido.",
    measurement: "Quiz ou questões sobre decisões tomadas ao final da reunião."
  }
]; 