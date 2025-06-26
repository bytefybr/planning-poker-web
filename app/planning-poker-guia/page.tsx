"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function PlanningPokerGuia() {
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
          <Breadcrumb />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Planning Poker: Guia Completo
            </h1>
            <p className="text-lg text-muted-foreground">
              Aprenda tudo sobre Planning Poker e como aplicar esta técnica para melhorar as estimativas do seu time
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">O que é Planning Poker?</h2>
            <p className="text-muted-foreground mb-4">
              Planning Poker, também conhecido como Scrum Poker, é uma técnica de estimativa ágil baseada em consenso 
              que utiliza cartas numeradas para estimar o esforço necessário para completar tarefas ou histórias de usuário. 
              Desenvolvida por James Grenning em 2002 e popularizada por Mike Cohn, esta técnica combina análise de 
              especialistas, analogia e decomposição para criar estimativas mais precisas.
            </p>
            <p className="text-muted-foreground">
              A técnica é baseada na sequência de Fibonacci modificada, onde cada carta representa um nível de 
              complexidade ou esforço. O processo envolve discussão, votação secreta e consenso, eliminando o 
              viés de ancoragem e promovendo a participação de todos os membros do time.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">História e Origem</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">2002 - Criação</h3>
                <p className="text-muted-foreground">
                  James Grenning cria o Planning Poker como uma evolução do Wideband Delphi, 
                  incorporando elementos lúdicos para tornar as estimativas mais engajantes.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">2004 - Popularização</h3>
                <p className="text-muted-foreground">
                  Mike Cohn populariza a técnica através de seu livro "User Stories Applied" 
                  e depois em "Agile Estimating and Planning".
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">2010+ - Era Digital</h3>
                <p className="text-muted-foreground">
                  Surgem ferramentas online que permitem sessões remotas de Planning Poker, 
                  especialmente importantes para times distribuídos.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Como Funciona o Planning Poker</h2>
            <div className="space-y-6">
              {planningPokerSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-2">{step.description}</p>
                    {step.tips && (
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <p className="text-sm"><strong>Dica:</strong> {step.tips}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Valores das Cartas</h2>
            <p className="text-muted-foreground mb-6">
              O Planning Poker utiliza diferentes escalas de valores. A mais comum é baseada na sequência de Fibonacci modificada:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {cardValues.map((card, index) => (
                <div key={index} className="bg-primary/10 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary mb-2">{card.value}</div>
                  <div className="text-sm text-muted-foreground">{card.meaning}</div>
                </div>
              ))}
            </div>
            <div className="bg-accent/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Cartas Especiais:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>?</strong> - Não tenho informações suficientes para estimar</li>
                <li><strong>∞</strong> - Esta tarefa é muito grande e deve ser dividida</li>
                <li><strong>☕</strong> - Preciso de uma pausa antes de continuar</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Benefícios do Planning Poker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-accent/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-primary">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Melhores Práticas</h2>
            <div className="space-y-4">
              {bestPractices.map((practice, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{practice.title}</h3>
                    <p className="text-sm text-muted-foreground">{practice.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Erros Comuns e Como Evitá-los</h2>
            <div className="space-y-6">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border-l-4 border-red-500">
                  <h3 className="font-semibold mb-2 text-red-700 dark:text-red-400">{mistake.title}</h3>
                  <p className="text-muted-foreground mb-3">{mistake.description}</p>
                  <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      <strong>Solução:</strong> {mistake.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Variações e Adaptações</h2>
            <div className="space-y-6">
              {variations.map((variation, index) => (
                <div key={index} className="bg-accent/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{variation.name}</h3>
                  <p className="text-muted-foreground mb-3">{variation.description}</p>
                  <div className="text-sm">
                    <strong>Quando usar:</strong> <span className="text-muted-foreground">{variation.whenToUse}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/room?type=create"
              className="inline-block px-8 py-4 bg-primary dark:text-black text-white rounded-lg font-medium button-hover"
            >
              Experimente o Planning Poker Online
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const planningPokerSteps = [
  {
    title: "Preparação da Sessão",
    description: "O Product Owner ou Scrum Master prepara uma lista de histórias de usuário ou tarefas para serem estimadas. Cada item deve ter uma descrição clara e critérios de aceitação definidos.",
    tips: "Certifique-se de que todos os participantes tenham acesso às informações necessárias antes da sessão."
  },
  {
    title: "Apresentação do Item",
    description: "O Product Owner apresenta uma história de usuário, explicando o contexto, requisitos e critérios de aceitação. Os desenvolvedores podem fazer perguntas para esclarecer dúvidas.",
    tips: "Mantenha as explicações concisas, mas completas. Permita discussões, mas evite análises muito profundas."
  },
  {
    title: "Discussão Inicial",
    description: "A equipe discute brevemente a complexidade técnica, dependências e possíveis abordagens para implementar a funcionalidade.",
    tips: "Foque nas principais considerações técnicas, sem entrar em detalhes de implementação."
  },
  {
    title: "Votação Secreta",
    description: "Cada membro da equipe escolhe uma carta que representa sua estimativa de esforço e a mantém virada para baixo até que todos tenham votado.",
    tips: "A votação secreta evita o viés de ancoragem e garante que todos opinem independentemente."
  },
  {
    title: "Revelação das Cartas",
    description: "Todas as cartas são reveladas simultaneamente. Se houver consenso (todos escolheram o mesmo valor ou valores próximos), a estimativa é aceita.",
    tips: "Valores próximos (como 3 e 5) podem ser considerados consenso, dependendo do contexto."
  },
  {
    title: "Discussão de Divergências",
    description: "Se houver grande divergência entre as estimativas, os membros com as estimativas mais altas e mais baixas explicam seu raciocínio.",
    tips: "Foque nas diferenças de entendimento sobre a complexidade e esclareça pontos específicos."
  },
  {
    title: "Nova Rodada de Votação",
    description: "Após a discussão, uma nova rodada de votação é realizada. O processo se repete até que haja consenso.",
    tips: "Limite o número de rodadas para evitar análise excessiva. 2-3 rodadas são geralmente suficientes."
  },
  {
    title: "Registro da Estimativa",
    description: "A estimativa final é registrada na história de usuário e o time passa para o próximo item da lista.",
    tips: "Documente também os principais pontos discutidos para referência futura."
  }
];

const cardValues = [
  { value: "1", meaning: "Muito Simples" },
  { value: "2", meaning: "Simples" },
  { value: "3", meaning: "Moderado" },
  { value: "5", meaning: "Complexo" },
  { value: "8", meaning: "Muito Complexo" },
  { value: "13", meaning: "Extremamente Complexo" },
  { value: "21", meaning: "Épico" },
  { value: "?", meaning: "Incerteza" }
];

const benefits = [
  {
    title: "Estimativas Mais Precisas",
    description: "A combinação de múltiplas perspectivas resulta em estimativas mais confiáveis do que estimativas individuais."
  },
  {
    title: "Engajamento da Equipe",
    description: "Todos os membros participam ativamente do processo de planejamento, aumentando o comprometimento."
  },
  {
    title: "Compartilhamento de Conhecimento",
    description: "Discussões durante a estimativa permitem que o conhecimento seja compartilhado entre os membros."
  },
  {
    title: "Identificação de Riscos",
    description: "Divergências nas estimativas frequentemente revelam riscos e dependências não identificados."
  },
  {
    title: "Eliminação de Viés",
    description: "A votação secreta evita que membros influenciem uns aos outros prematuramente."
  },
  {
    title: "Melhoria da Comunicação",
    description: "O processo força discussões importantes sobre requisitos e implementação."
  }
];

const bestPractices = [
  {
    title: "Mantenha Sessões Focadas",
    description: "Limite as sessões a 2-3 horas para manter a concentração e produtividade da equipe."
  },
  {
    title: "Prepare as Histórias",
    description: "Certifique-se de que as histórias estão bem definidas e prontas para estimativa antes da sessão."
  },
  {
    title: "Inclua Toda a Equipe",
    description: "Todos os membros que implementarão as funcionalidades devem participar das estimativas."
  },
  {
    title: "Use Referências",
    description: "Estabeleça histórias de referência para cada valor da escala para calibrar as estimativas."
  },
  {
    title: "Documente Decisões",
    description: "Registre as estimativas e os principais pontos discutidos para consultas futuras."
  },
  {
    title: "Revise Regularmente",
    description: "Compare estimativas com o tempo real gasto para melhorar a precisão ao longo do tempo."
  }
];

const commonMistakes = [
  {
    title: "Transformar Estimativas em Compromissos",
    description: "Tratar as estimativas como promessas fixas de entrega, gerando pressão desnecessária na equipe.",
    solution: "Enfatize que estimativas são aproximações baseadas no conhecimento atual e podem mudar conforme mais informações são descobertas."
  },
  {
    title: "Estimar Tarefas Muito Grandes",
    description: "Tentar estimar épicos ou funcionalidades muito grandes que deveriam ser decompostas primeiro.",
    solution: "Decomponha histórias grandes em partes menores antes de estimar. Use a carta ∞ para indicar quando algo é muito grande."
  },
  {
    title: "Discussões Muito Longas",
    description: "Permitir que as discussões se estendam demais, perdendo o foco e cansando a equipe.",
    solution: "Use um timer para discussões e limite cada rodada. Se não houver consenso após 3 rodadas, considere decompor a história."
  },
  {
    title: "Ignorar Divergências",
    description: "Aceitar a primeira estimativa sem explorar diferenças significativas de opinião.",
    solution: "Sempre explore divergências grandes. Elas frequentemente revelam aspectos importantes não considerados."
  }
];

const variations = [
  {
    name: "T-Shirt Sizing",
    description: "Usa tamanhos de camiseta (XS, S, M, L, XL) em vez de números para estimativas mais intuitivas.",
    whenToUse: "Útil para estimativas de alto nível ou quando o time tem dificuldade com números."
  },
  {
    name: "Bucket System",
    description: "Histórias são colocadas em 'baldes' representando diferentes níveis de esforço, sem discussão individual.",
    whenToUse: "Eficiente para estimar grandes volumes de histórias rapidamente."
  },
  {
    name: "Dot Voting",
    description: "Cada participante recebe pontos (dots) para distribuir entre as histórias baseado na complexidade relativa.",
    whenToUse: "Bom para priorização e estimativa relativa de muitos itens simultaneamente."
  },
  {
    name: "Async Planning Poker",
    description: "Estimativas são feitas de forma assíncrona, com discussões em ferramentas de chat ou vídeo.",
    whenToUse: "Ideal para times distribuídos em fusos horários muito diferentes."
  }
]; 