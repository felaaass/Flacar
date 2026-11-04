import React from 'react';

interface FaqEntry {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const FAQ_ITEMS: readonly FaqEntry[] = [
  {
    question: 'Preciso assinar contrato?',
    answer: 'Não. Você não tem mensalidade nem contrato. Paga apenas pelas entregas feitas.',
    defaultOpen: true,
  },
  {
    question: 'Como sei que o pedido chegou?',
    answer: 'Você recebe o comprovante de entrega com foto e horário, direto no WhatsApp.',
  },
  {
    question: 'E se o item for frágil ou de valor alto?',
    answer:
      'Informe nas observações. Oferecemos cuidado redobrado e seguro para cargas declaradas.',
  },
];

export const FaqSection: React.FC = () => {
  return (
    <section className="py-20 bg-navy-card" id="faq">
      <div className="shell-container">
        <div className="section-head">
          <span className="eyebrow-badge">Dúvidas</span>
          <h2>Perguntas frequentes</h2>
          <p>Respostas rápidas para as dúvidas mais comuns de quem está começando.</p>
        </div>

        <div className="max-w-[780px] mx-auto space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              open={item.defaultOpen}
              className="faq-item bg-navy border border-white/[0.08] rounded-2xl overflow-hidden"
            >
              <summary className="px-5 py-4 font-bold text-white cursor-pointer list-none flex justify-between items-center focus-ring">
                <span>{item.question}</span>
                <span className="faq-icon text-brand-orange text-xl font-extrabold select-none" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-[18px] m-0 text-brand-muted text-[0.95rem]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
