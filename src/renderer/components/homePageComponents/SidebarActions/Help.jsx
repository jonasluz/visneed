import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HelpPage() {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      category: "Geral",
      question: "O que é o VisNeed?",
      answer:
        "VisNeed é uma plataforma interativa para edição e visualização de árvores de decisão genéricas e flexíveis.",
    },
    {
      category: "Projetos",
      question: "Como criar um novo projeto?",
      answer:
        "Vá até a página de novo projeto, defina um nome para o projeto e clique no botão '+ Create'.",
    },
    {
      category: "Exportação",
      question: "Como exportar uma árvore?",
      answer:
        "Há duas formas de exportar sua árvore. Ela pode ser exportada na página inicial, clicando no botão 'Export' do projeto que você quer o JSON, ou na tela de edição do projeto, clicando no botão de export localizado no canto superior direito ao lado da barra de informações.",
    },
    {
      category: "Projetos",
      question: "Como deletar um projeto?",
      answer:
        "Vá até a tela de deleção de projeto, coloque o cursor em cima do projeto que deseja deletar e clique em 'Confirmar'.",
    },
  ];

  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="flex flex-col h-auto p-5 mx-10 text-white">
      <p className="font-semibold text-2xl mb-5">Help Page</p>
      <p className="font-semibold text-lg mb-5">FAQs sobre o projeto</p>

      {Object.entries(groupedFaqs).map(([category, faqs], sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <p className="text-xl font-semibold mb-3">{category}</p>
          {faqs.map((faq, index) => {
            const globalIndex = `${sectionIndex}-${index}`;
            return (
              <div
                key={globalIndex}
                className="border-b border-gray-600 py-4 cursor-pointer"
                onClick={() => toggleExpand(globalIndex)}
              >
                <p className="font-medium">{faq.question}</p>
                {expanded === globalIndex && (
                  <p className="mt-2 text-gray-300">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default HelpPage;
