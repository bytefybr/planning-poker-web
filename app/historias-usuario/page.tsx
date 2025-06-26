"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HistoriasUsuario() {
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
              Histórias de Usuário: Guia Completo
            </h1>
            <p className="text-lg text-muted-foreground">
              Aprenda a escrever histórias de usuário eficazes que conectam desenvolvimento com valor de negócio
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">O que são Histórias de Usuário?</h2>
            <p className="text-muted-foreground mb-4">
              Histórias de usuário são descrições simples e concisas de uma funcionalidade escrita da perspectiva 
              da pessoa que irá usar essa funcionalidade. Elas servem como uma ferramenta de comunicação entre 
              a equipe de desenvolvimento e os stakeholders, focando no valor que será entregue ao usuário final.
            </p>
            <p className="text-muted-foreground">
              Introduzidas pelo Extreme Programming (XP) e amplamente adotadas pelo Scrum e outras metodologias 
              ágeis, as histórias de usuário substituem documentos de requisitos extensos por conversas 
              colaborativas e iterativas sobre o que realmente importa para o usuário.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Anatomia de uma História de Usuário</h2>
            <div className="bg-primary/5 p-6 rounded-lg mb-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Formato Padrão</h3>
              </div>
              <div className="bg-background/50 p-4 rounded-lg font-mono text-sm">
                <span className="text-primary">Como</span> [tipo de usuário],<br />
                <span className="text-primary">Eu quero</span> [alguma funcionalidade]<br />
                <span className="text-primary">Para que</span> [algum benefício/valor]
              </div>
            </div>
            <div className="space-y-6">
              {storyComponents.map((component, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold mb-2">{component.part}</h3>
                  <p className="text-muted-foreground mb-3">{component.description}</p>
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <p className="text-sm"><strong>Exemplo:</strong> {component.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Características de Boas Histórias - INVEST</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investCriteria.map((criterion, index) => (
                <div key={index} className="bg-accent/5 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {criterion.letter}
                    </div>
                    <h3 className="font-semibold">{criterion.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{criterion.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Dica:</strong> {criterion.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Tipos de Histórias de Usuário</h2>
            <div className="space-y-6">
              {storyTypes.map((type, index) => (
                <div key={index} className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{type.name}</h3>
                  <p className="text-muted-foreground mb-3">{type.description}</p>
                  <div className="mb-3">
                    <h4 className="font-medium mb-1">Exemplo:</h4>
                    <div className="bg-background/50 p-2 rounded text-sm font-mono">
                      {type.example}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Quando usar:</strong> {type.whenToUse}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Critérios de Aceitação</h2>
            <p className="text-muted-foreground mb-6">
              Critérios de aceitação definem as condições que uma história deve satisfazer para ser considerada 
              concluída. Eles fornecem contexto específico e testável para a implementação.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Formato Cenário (Gherkin)</h3>
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="font-mono text-sm space-y-1">
                    <div><span className="text-green-600">Dado que</span> [contexto inicial]</div>
                    <div><span className="text-green-600">Quando</span> [evento ocorre]</div>
                    <div><span className="text-green-600">Então</span> [resultado esperado]</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Formato Lista</h3>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ul className="text-sm space-y-1">
                    <li>• O sistema deve permitir...</li>
                    <li>• O usuário pode visualizar...</li>
                    <li>• Quando o erro ocorre...</li>
                    <li>• A validação deve impedir...</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Estimativa de Histórias</h2>
            <p className="text-muted-foreground mb-6">
              A estimativa de histórias de usuário é crucial para o planejamento de sprints e releases. 
              Diferentes técnicas podem ser utilizadas dependendo do contexto e maturidade da equipe.
            </p>
            <div className="space-y-6">
              {estimationMethods.map((method, index) => (
                <div key={index} className="border-l-4 border-accent pl-6">
                  <h3 className="font-semibold mb-2">{method.name}</h3>
                  <p className="text-muted-foreground mb-3">{method.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1 text-green-600">Vantagens:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {method.pros.map((pro, idx) => (
                          <li key={idx}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-orange-600">Considerações:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {method.considerations.map((con, idx) => (
                          <li key={idx}>• {con}</li>
                        ))}
                      </ul>
                    </div>
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
                  <h3 className="font-semibold mb-2 text-red-700 dark:text-red-400">{mistake.mistake}</h3>
                  <p className="text-muted-foreground mb-3">{mistake.description}</p>
                  <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-medium mb-1 text-green-700 dark:text-green-400">Como fazer melhor:</h4>
                    <p className="text-sm text-muted-foreground">{mistake.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Ferramentas e Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((category, index) => (
                <div key={index} className="bg-accent/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        <strong>{item.name}:</strong> <span className="text-muted-foreground">{item.description}</span>
                      </li>
                    ))}
                  </ul>
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

const storyComponents = [
  {
    part: "Como [Persona]",
    description: "Define quem é o usuário ou tipo de usuário que se beneficiará da funcionalidade.",
    example: "Como cliente do e-commerce"
  },
  {
    part: "Eu quero [Funcionalidade]",
    description: "Descreve a ação ou funcionalidade desejada de forma clara e específica.",
    example: "Eu quero filtrar produtos por categoria"
  },
  {
    part: "Para que [Benefício]",
    description: "Explica o valor ou benefício que o usuário obtém com essa funcionalidade.",
    example: "Para que eu possa encontrar produtos relevantes mais rapidamente"
  }
];

const investCriteria = [
  {
    letter: "I",
    name: "Independent",
    description: "A história deve ser independente de outras histórias para poder ser desenvolvida em qualquer ordem.",
    tip: "Evite dependências desnecessárias entre histórias."
  },
  {
    letter: "N",
    name: "Negotiable",
    description: "Os detalhes da história são negociáveis e podem ser refinados através de conversas.",
    tip: "Foque no 'o quê' e 'por quê', deixe o 'como' para discussão."
  },
  {
    letter: "V",
    name: "Valuable",
    description: "A história deve entregar valor claro para o usuário ou negócio.",
    tip: "Sempre inclua o benefício esperado na história."
  },
  {
    letter: "E",
    name: "Estimable",
    description: "A equipe deve conseguir estimar o esforço necessário para implementar a história.",
    tip: "Forneça informações suficientes para estimativa."
  },
  {
    letter: "S",
    name: "Small",
    description: "A história deve ser pequena o suficiente para ser completada em um sprint.",
    tip: "Divida histórias grandes em partes menores."
  },
  {
    letter: "T",
    name: "Testable",
    description: "Deve ser possível testar se a história foi implementada corretamente.",
    tip: "Defina critérios de aceitação claros e testáveis."
  }
];

const storyTypes = [
  {
    name: "Funcionalidade do Usuário",
    description: "Histórias que descrevem funcionalidades diretas que os usuários finais irão interagir.",
    example: "Como usuário registrado, eu quero fazer login no sistema para que eu possa acessar minha conta pessoal.",
    whenToUse: "Para a maioria das funcionalidades voltadas ao usuário final."
  },
  {
    name: "Spike (Investigação)",
    description: "Histórias técnicas focadas em pesquisa, prototipagem ou investigação de soluções.",
    example: "Como desenvolvedor, eu preciso investigar APIs de pagamento para que possamos escolher a melhor solução.",
    whenToUse: "Quando há incertezas técnicas que precisam ser esclarecidas."
  },
  {
    name: "História Técnica",
    description: "Histórias que abordam aspectos técnicos, infraestrutura ou refatoração necessária.",
    example: "Como desenvolvedor, eu quero refatorar o módulo de autenticação para que o código seja mais maintível.",
    whenToUse: "Para melhorias técnicas que habilitam futuras funcionalidades."
  },
  {
    name: "História de Administrador",
    description: "Funcionalidades específicas para usuários administrativos ou gerenciais.",
    example: "Como administrador, eu quero visualizar relatórios de uso para que possa monitorar a performance do sistema.",
    whenToUse: "Para funcionalidades de back-office e administração."
  }
];

const estimationMethods = [
  {
    name: "Story Points com Planning Poker",
    description: "Utiliza sequência de Fibonacci e votação colaborativa para estimar complexidade relativa.",
    pros: [
      "Elimina viés de ancoragem",
      "Promove discussão da equipe",
      "Foca em complexidade relativa",
      "Melhora com a experiência da equipe"
    ],
    considerations: [
      "Requer calibração inicial",
      "Pode ser demorado para grandes backlogs",
      "Necessita participação de toda equipe"
    ]
  },
  {
    name: "T-Shirt Sizing",
    description: "Categoriza histórias em tamanhos (XS, S, M, L, XL) para estimativas rápidas de alto nível.",
    pros: [
      "Muito rápido de aplicar",
      "Intuitivo para stakeholders",
      "Bom para planejamento inicial",
      "Não requer precisão matemática"
    ],
    considerations: [
      "Menos preciso que story points",
      "Difícil conversão para velocity",
      "Limitado para planejamento detalhado"
    ]
  },
  {
    name: "Estimativa por Horas",
    description: "Estima tempo necessário em horas ou dias para completar a história.",
    pros: [
      "Familiar para stakeholders",
      "Facilita planejamento de recursos",
      "Útil para contratos por tempo",
      "Direto para cálculos financeiros"
    ],
    considerations: [
      "Pode gerar pressão desnecessária",
      "Varia com experiência individual",
      "Influenciado por fatores externos",
      "Menos eficaz para trabalho criativo"
    ]
  }
];

const commonMistakes = [
  {
    mistake: "Histórias muito grandes (Épicos disfarçados)",
    description: "Escrever histórias que são na verdade épicos e não podem ser completadas em um sprint.",
    solution: "Decomponha grandes funcionalidades em histórias menores e independentes que entregam valor incremental."
  },
  {
    mistake: "Foco em soluções ao invés de problemas",
    description: "Descrever como implementar ao invés de focar no que o usuário precisa e por quê.",
    solution: "Concentre-se no problema do usuário e no valor desejado, deixando a solução para discussão da equipe."
  },
  {
    mistake: "Critérios de aceitação vagos ou ausentes",
    description: "Não definir claramente quando a história estará concluída, gerando ambiguidade.",
    solution: "Sempre inclua critérios de aceitação específicos, mensuráveis e testáveis para cada história."
  },
  {
    mistake: "Ignorar o usuário real",
    description: "Escrever histórias genéricas sem considerar personas específicas ou necessidades reais.",
    solution: "Base suas histórias em personas reais e pesquisa de usuário, não em suposições internas."
  },
  {
    mistake: "Histórias dependentes em excesso",
    description: "Criar muitas dependências entre histórias, dificultando o planejamento e desenvolvimento.",
    solution: "Estruture histórias para serem o mais independentes possível, reorganizando quando necessário."
  }
];

const tools = [
  {
    category: "Ferramentas de Gestão",
    items: [
      { name: "Jira", description: "Gestão completa de histórias com epics, sprints e relatórios" },
      { name: "Azure DevOps", description: "Integração com desenvolvimento e CI/CD" },
      { name: "Trello", description: "Gestão visual simples para equipes pequenas" },
      { name: "Linear", description: "Ferramenta moderna focada em velocidade" }
    ]
  },
  {
    category: "Templates e Documentação",
    items: [
      { name: "Story Template", description: "Como [persona], eu quero [funcionalidade] para que [benefício]" },
      { name: "Definition of Ready", description: "Checklist para histórias prontas para desenvolvimento" },
      { name: "Definition of Done", description: "Critérios para considerar história concluída" },
      { name: "Acceptance Criteria", description: "Cenários específicos que devem ser atendidos" }
    ]
  }
]; 