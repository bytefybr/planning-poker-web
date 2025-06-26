"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EstimativasAgeis() {
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
              Estimativas Ágeis: Guia Prático
            </h1>
            <p className="text-lg text-muted-foreground">
              Aprenda as melhores técnicas de estimativa para times ágeis e melhore a precisão dos seus projetos
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">O que são Estimativas Ágeis?</h2>
            <p className="text-muted-foreground mb-4">
              Estimativas ágeis são técnicas utilizadas por times de desenvolvimento para prever o esforço, 
              tempo ou complexidade necessários para completar tarefas, histórias de usuário ou funcionalidades. 
              Diferente das estimativas tradicionais, as estimativas ágeis são colaborativas, iterativas e 
              focam na complexidade relativa ao invés de tempo absoluto.
            </p>
            <p className="text-muted-foreground">
              Essas estimativas são fundamentais para o planejamento de sprints, releases e para comunicação 
              com stakeholders sobre o progresso e capacidade da equipe.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Princípios das Estimativas Ágeis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {estimationPrinciples.map((principle, index) => (
                <div key={index} className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-primary">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Técnicas de Estimativa</h2>
            <div className="space-y-8">
              {estimationTechniques.map((technique, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold">{technique.name}</h3>
                    <span className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm">
                      {technique.difficulty}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{technique.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Vantagens:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {technique.pros.map((pro, idx) => (
                          <li key={idx}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-red-600">Desvantagens:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {technique.cons.map((con, idx) => (
                          <li key={idx}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <p className="text-sm"><strong>Quando usar:</strong> {technique.whenToUse}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Story Points vs Tempo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold mb-4 text-green-700 dark:text-green-400">Story Points</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Baseado em complexidade relativa</li>
                  <li>• Não influenciado por fatores externos</li>
                  <li>• Melhora ao longo do tempo</li>
                  <li>• Facilita comparações entre histórias</li>
                  <li>• Reduz pressão sobre estimativas</li>
                </ul>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold mb-4 text-orange-700 dark:text-orange-400">Estimativas de Tempo</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Mais intuitivo para stakeholders</li>
                  <li>• Facilita planejamento de releases</li>
                  <li>• Pode ser influenciado por pressão</li>
                  <li>• Varia com experiência individual</li>
                  <li>• Dificulta comparações objetivas</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Escalas de Estimativa</h2>
            <div className="space-y-6">
              {estimationScales.map((scale, index) => (
                <div key={index} className="bg-accent/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{scale.name}</h3>
                  <p className="text-muted-foreground mb-3">{scale.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {scale.values.map((value, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {value}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Melhor para:</strong> {scale.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Fatores que Afetam Estimativas</h2>
            <div className="space-y-4">
              {estimationFactors.map((factor, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{factor.name}</h3>
                    <p className="text-muted-foreground mb-2">{factor.description}</p>
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <p className="text-sm"><strong>Como mitigar:</strong> {factor.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Métricas e Acompanhamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trackingMetrics.map((metric, index) => (
                <div key={index} className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{metric.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{metric.description}</p>
                  <div className="text-sm">
                    <strong>Como calcular:</strong> <span className="text-muted-foreground">{metric.calculation}</span>
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
              Comece a Estimar
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const estimationPrinciples = [
  {
    title: "Estimativas são aproximações",
    description: "Não são promessas ou compromissos, mas sim a melhor estimativa baseada no conhecimento atual."
  },
  {
    title: "Complexidade relativa",
    description: "Foco na comparação entre tarefas ao invés de valores absolutos de tempo."
  },
  {
    title: "Colaboração da equipe",
    description: "Toda a equipe participa do processo para aproveitar diferentes perspectivas."
  },
  {
    title: "Refinamento contínuo",
    description: "As estimativas melhoram com o tempo e experiência da equipe."
  },
  {
    title: "Transparência",
    description: "O processo de estimativa deve ser transparente e compreensível para todos."
  },
  {
    title: "Baseado em dados históricos",
    description: "Utiliza dados de sprints anteriores para calibrar e melhorar estimativas."
  }
];

const estimationTechniques = [
  {
    name: "Planning Poker",
    difficulty: "Fácil",
    description: "Técnica colaborativa usando cartas numeradas para estimar esforço de histórias de usuário.",
    pros: [
      "Elimina viés de ancoragem",
      "Promove discussão",
      "Engaja toda a equipe",
      "Identifica riscos escondidos"
    ],
    cons: [
      "Pode ser demorado",
      "Requer participação de todos",
      "Pode gerar análise excessiva"
    ],
    whenToUse: "Ideal para times Scrum que precisam estimar histórias de usuário regularmente."
  },
  {
    name: "T-Shirt Sizing",
    difficulty: "Muito Fácil",
    description: "Usa tamanhos de camiseta (XS, S, M, L, XL, XXL) para categorizar complexidade.",
    pros: [
      "Muito intuitivo",
      "Rápido de aplicar",
      "Bom para estimativas iniciais",
      "Funciona bem com não-técnicos"
    ],
    cons: [
      "Menos preciso",
      "Limitado em granularidade",
      "Difícil conversão para velocity"
    ],
    whenToUse: "Melhor para estimativas de alto nível ou quando precisão não é crítica."
  },
  {
    name: "Bucket System",
    difficulty: "Médio",
    description: "Histórias são colocadas em 'baldes' representando diferentes níveis de esforço.",
    pros: [
      "Muito rápido para muitas histórias",
      "Estimativa relativa natural",
      "Minimiza discussões longas",
      "Funciona bem para backlogs grandes"
    ],
    cons: [
      "Menos discussão sobre requisitos",
      "Pode perder nuances importantes",
      "Requer calibração inicial"
    ],
    whenToUse: "Excelente para refinar grandes volumes de histórias rapidamente."
  },
  {
    name: "Dot Voting",
    difficulty: "Fácil",
    description: "Cada membro recebe pontos para distribuir entre histórias baseado na complexidade.",
    pros: [
      "Visualização clara",
      "Processo democrático",
      "Identifica consenso rapidamente",
      "Funciona para priorização também"
    ],
    cons: [
      "Menos preciso que outras técnicas",
      "Difícil para histórias muito similares",
      "Pode não gerar discussão suficiente"
    ],
    whenToUse: "Bom para priorização rápida e estimativas de alto nível."
  }
];

const estimationScales = [
  {
    name: "Fibonacci Modificado",
    description: "Sequência baseada em Fibonacci adaptada para estimativas: números crescem exponencialmente.",
    values: ["1", "2", "3", "5", "8", "13", "21", "?", "∞"],
    bestFor: "Planning Poker e estimativas detalhadas de story points."
  },
  {
    name: "Potências de 2",
    description: "Escala baseada em potências de 2, oferecendo progressão clara.",
    values: ["1", "2", "4", "8", "16", "32", "64"],
    bestFor: "Times que preferem progressão matemática clara."
  },
  {
    name: "Linear",
    description: "Escala linear simples, mais intuitiva mas menos eficaz para diferenciação.",
    values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    bestFor: "Iniciantes em estimativas ágeis ou para simplicidade."
  },
  {
    name: "T-Shirt",
    description: "Tamanhos de roupas para estimativas mais intuitivas e menos precisas.",
    values: ["XS", "S", "M", "L", "XL", "XXL"],
    bestFor: "Estimativas de alto nível e comunicação com stakeholders."
  }
];

const estimationFactors = [
  {
    name: "Complexidade Técnica",
    description: "Nível de dificuldade técnica para implementar a funcionalidade.",
    mitigation: "Quebrar histórias complexas em partes menores e mais gerenciáveis."
  },
  {
    name: "Conhecimento do Domínio",
    description: "Familiaridade da equipe com a área de negócio ou tecnologia envolvida.",
    mitigation: "Incluir spikes de pesquisa e sessões de compartilhamento de conhecimento."
  },
  {
    name: "Dependências Externas",
    description: "Dependências de outras equipes, sistemas ou recursos externos.",
    mitigation: "Identificar e gerenciar dependências antecipadamente no planejamento."
  },
  {
    name: "Qualidade dos Requisitos",
    description: "Clareza e completude dos critérios de aceitação e requisitos.",
    mitigation: "Investir tempo em refinamento de backlog e Definition of Ready."
  },
  {
    name: "Risco e Incerteza",
    description: "Elementos desconhecidos que podem afetar a implementação.",
    mitigation: "Usar técnicas como spikes e protótipos para reduzir incertezas."
  }
];

const trackingMetrics = [
  {
    name: "Velocity",
    description: "Quantidade de story points completados por sprint.",
    calculation: "Soma dos story points das histórias concluídas no sprint."
  },
  {
    name: "Accuracy Rate",
    description: "Precisão das estimativas comparadas com esforço real.",
    calculation: "Percentual de histórias estimadas corretamente (dentro de margem aceitável)."
  },
  {
    name: "Commitment Reliability",
    description: "Capacidade da equipe de cumprir compromissos do sprint.",
    calculation: "Percentual de story points planejados que foram efetivamente entregues."
  },
  {
    name: "Estimation Variance",
    description: "Variação entre tempo estimado e tempo real gasto.",
    calculation: "Diferença média entre estimativas e tempo real para histórias concluídas."
  }
]; 