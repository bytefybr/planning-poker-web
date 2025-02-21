"use client";

import { motion } from "framer-motion";

import Link from "next/link";

const HowToPlay = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          ← Voltar para página inicial
        </Link>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">
            Como Jogar Planning Poker
          </h1>

          {/* Introduction */}
          <section className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              O que é Planning Poker?
            </h2>
            <p className="text-muted-foreground mb-4">
              Planning Poker é uma técnica de estimativa ágil onde membros da
              equipe usam cartas numeradas para votar no esforço necessário para
              completar uma tarefa. É uma forma divertida e eficaz de obter
              consenso em estimativas de projeto.
            </p>
          </section>

          {/* Step by Step Guide */}
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * idx, duration: 0.8 }}
                className="glass-card p-8 rounded-xl"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    {step.tips && (
                      <div className="bg-accent/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Dicas:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {step.tips.map((tip, index) => (
                            <li key={`${step.id}-tip-${index}`}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Card Values Guide */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="glass-card p-8 rounded-xl mt-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Valores das Cartas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cardSections.map((section) => (
                <div key={section.id} className="bg-accent/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <span className="w-12 h-8 bg-primary/20 rounded flex items-center justify-center font-mono">
                          {item.value}
                        </span>
                        <span>{item.meaning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Best Practices */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="glass-card p-8 rounded-xl mt-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Melhores Práticas</h2>
            <div className="grid gap-6">
              {bestPractices.map((practice) => (
                <div key={practice.id} className="bg-accent/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">
                    {practice.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {practice.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-bold mb-4 ">Pronto para começar?</h2>
            <Link
              href="/room?type=create"
              className="inline-block px-8 py-4 bg-primary dark:text-black text-white rounded-lg font-medium button-hover"
            >
              Comece a jogar agora
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const steps = [
  {
    id: 'preparation',
    title: "Preparação",
    description:
      "O facilitador (geralmente o Scrum Master) cria uma sala e convida os membros da equipe. Cada participante recebe um conjunto de cartas com valores específicos.",
    tips: [
      "Certifique-se de que todos têm acesso à sala",
      "Verifique se todos conhecem a escala de pontos utilizada",
      "Prepare a lista de histórias/tarefas a serem estimadas",
    ],
  },
  {
    id: 'presentation',
    title: "Apresentação da História",
    description:
      "O Product Owner apresenta a história do usuário ou tarefa a ser estimada, fornecendo todos os detalhes necessários para que a equipe possa avaliá-la.",
    tips: [
      "Seja claro e conciso na descrição",
      "Responda a todas as dúvidas da equipe",
      "Mantenha o foco nos requisitos essenciais",
    ],
  },
  {
    id: 'initial-discussion',
    title: "Discussão Inicial",
    description:
      "A equipe discute a história brevemente para garantir que todos entendam o que precisa ser feito. Este é o momento para esclarecer dúvidas.",
    tips: [
      "Limite o tempo de discussão inicial",
      "Foque em entender o escopo",
      "Identifique possíveis riscos e dependências",
    ],
  },
  {
    id: 'voting',
    title: "Votação",
    description:
      "Cada membro da equipe seleciona uma carta que representa sua estimativa para o esforço necessário. As cartas permanecem ocultas até que todos tenham votado.",
    tips: [
      "Vote baseado no entendimento atual",
      "Considere complexidade, riscos e incertezas",
      "Não se deixe influenciar pelos outros",
    ],
  },
  {
    id: 'reveal',
    title: "Revelação",
    description:
      "Todas as cartas são reveladas simultaneamente. Se houver consenso (todos escolheram o mesmo valor ou valores próximos), a estimativa é registrada.",
    tips: [
      "Observe os valores mais divergentes",
      "Prepare-se para explicar sua estimativa",
      "Mantenha a mente aberta para outros pontos de vista",
    ],
  },
  {
    id: 'discussion-and-new-voting',
    title: "Discussão e Nova Votação",
    description:
      "Se houver divergências significativas, os membros com as estimativas mais altas e mais baixas explicam seu raciocínio. Após a discussão, uma nova rodada de votação é realizada.",
    tips: [
      "Foque nas diferenças de entendimento",
      "Compartilhe experiências relevantes",
      "Busque chegar a um consenso",
    ],
  },
];

const cardSections = [
  {
    id: 'fibonacci',
    title: "Sequência Fibonacci",
    items: [
      { id: 'f0', value: "0", meaning: "Tarefa trivial ou já realizada" },
      { id: 'f1', value: "1", meaning: "Tarefa muito simples" },
      { id: 'f2', value: "2", meaning: "Tarefa simples" },
      { id: 'f3', value: "3", meaning: "Tarefa pequena" },
      { id: 'f5', value: "5", meaning: "Tarefa média" },
      { id: 'f8', value: "8", meaning: "Tarefa grande" },
      { id: 'f13', value: "13", meaning: "Tarefa muito grande" },
      { id: 'f21', value: "21", meaning: "Tarefa extremamente grande" },
    ],
  },
  {
    id: 'special-cards',
    title: "Cartas Especiais",
    items: [
      { id: 'special-question', value: "?", meaning: "Muita incerteza, precisa de mais informações" },
      { id: 'special-infinity', value: "∞", meaning: "Tarefa muito grande, precisa ser dividida" },
      { id: 'special-coffee', value: "☕", meaning: "Precisamos de uma pausa" },
    ],
  },
];

const bestPractices = [
  {
    id: 'rhythm',
    title: "Mantenha o Ritmo",
    description:
      "Estabeleça um tempo limite para discussões e votações. Isso mantém a sessão dinâmica e produtiva.",
  },
  {
    id: 'focus',
    title: "Foco na Complexidade Relativa",
    description:
      "Estime baseado na complexidade relativa entre as histórias, não em tempo absoluto.",
  },
  {
    id: 'divide',
    title: "Divida Histórias Grandes",
    description:
      "Se uma história recebe muitas estimativas altas, considere dividi-la em partes menores.",
  },
  {
    id: 'document',
    title: "Documente Decisões",
    description:
      "Mantenha um registro das estimativas e das razões por trás das decisões importantes.",
  },
];

export default HowToPlay;