import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HelpPage() {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      category: "General",
      question: "What is VisNeed?",
      answer:
        "VisNeed is an interactive platform for editing and visualizing generic and flexible decision trees.",
    },
    {
      category: "Projects",
      question: "How do I create a new project?",
      answer:
        "Go to the new project page, enter a name for your project, and click the '+ Create' button.",
    },
    {
      category: "Projects",
      question: "How do I delete a project?",
      answer:
        "Navigate to the project deletion screen, hover over the project you want to delete, and click 'Confirm'.",
    },
    {
      category: "Information",
      question: "How can I view the details of a node or connection?",
      answer:
        "Click on a node or connection to display its details in the sidebars.",
    },
    {
      category: "Actions",
      question: "How do I add a new node?",
      answer:
        "Click the '+' button at the bottom corner of the screen. Fill in the required information and click 'Create'.",
    },
    {
      category: "Actions",
      question: "How do I edit a node?",
      answer:
        "First, click the node you want to edit. Then click the pencil icon at the bottom corner of the screen. Choose the information you wish to update and click 'Save'.",
    },
    {
      category: "Actions",
      question: "How do I delete a node?",
      answer:
        "Click the node you want to delete, then click the trash icon at the bottom of the screen. Select how to handle the child nodes of the one being deleted, then click 'Delete'.",
    },
    {
      category: "Actions",
      question: "How do I add more predicates?",
      answer:
        "There are two ways: either click the connection and use the 'Add' button in the right sidebar under predicates, or edit the source node and click 'Add Predicate' while editing a predicate.",
    },
    {
      category: "Actions",
      question: "How do I delete a predicate?",
      answer:
        "Click the connection, then in the right sidebar under predicates, select the predicate you want to remove and click the delete icon.",
    },
    {
      category: "Actions",
      question: "How do I add to the dictionary?",
      answer:
        "In the search bar, click the '+' icon and fill in the required information.",
    },
    {
      category: "Actions",
      question: "How do I remove an entry from the dictionary?",
      answer:
        "Click the delete icon on the right side of the dictionary key you want to remove.",
    },
    {
      category: "Actions",
      question: "How do I create a scenario?",
      answer:
        "Click the 'Create new scenario' button and give it a name.",
    },
    {
      category: "Actions",
      question: "How do I add elements to a scenario?",
      answer:
        "In the desired scenario, click the add icon, fill in the required information, and then click 'Save'.",
    },
    {
      category: "Actions",
      question: "How do I add elements hierarchically to a scenario?",
      answer:
        "Click the add icon on the parent element, provide the required information, and then click 'Save'.",
    },
    {
      category: "Import",
      question: "How do I import a JSON tree structure to use in a new project?",
      answer:
        "Click 'Import' in the bottom-left corner of the screen and select a JSON file with the required VisNeed structure.",
    },
    {
      category: "Export",
      question: "How do I export a tree?",
      answer:
        "There are two ways to export your tree: from the homepage by clicking the 'Export' button on the desired project, or from the project editor screen by clicking the export button at the top right next to the information bar.",
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
    <div className="flex flex-col h-auto p-5 mx-10 text-white overflow-auto">
      <p className="font-semibold text-2xl mb-5">Help Page</p>

      {Object.entries(groupedFaqs).map(([category, faqs], sectionIndex) => (
        <div key={sectionIndex} className="mb-6 mt-4">
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
