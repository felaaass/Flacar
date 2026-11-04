import React from 'react';

interface StepItem {
  num: number;
  title: string;
  description: string;
  caption: string;
}

const STEPS: readonly StepItem[] = [
  {
    num: 1,
    title: 'Você chama',
    description: 'Pelo WhatsApp ou pelo formulário desta página. Leva menos de um minuto.',
    caption: 'Canal preferido: WhatsApp',
  },
  {
    num: 2,
    title: 'Confirmamos na hora',
    description: 'Conferimos o endereço de coleta e entrega e informamos o valor antes de sair.',
    caption: 'Sem surpresas no preço',
  },
  {
    num: 3,
    title: 'Coletamos na sua loja',
    description: 'Nosso motoboy chega em até 30 minutos e cuida do produto como se fosse seu.',
    caption: 'Coleta em até 30 min',
  },
  {
    num: 4,
    title: 'Entregamos e avisamos',
    description: 'Você recebe a confirmação quando o pedido chega ao cliente, com comprovante.',
    caption: 'Comprovante de entrega',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 bg-navy-card" id="como-funciona">
      <div className="shell-container">
        <div className="section-head">
          <span className="eyebrow-badge">Como funciona</span>
          <h2>Do seu balcão até o cliente, em quatro passos</h2>
          <p>Simples como uma conversa: você chama, a gente busca, e você acompanha cada etapa.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {STEPS.map((step) => (
            <div key={step.num} className="card-soft text-left">
              <div className="w-11 h-11 rounded-full grid place-items-center bg-brand-orange text-white font-extrabold text-[1.1rem] mb-3.5 shadow-[0_6px_18px_rgba(255,107,0,0.45)]">
                {step.num}
              </div>
              <h3 className="text-[1.12rem] font-bold text-white mb-2">{step.title}</h3>
              <p className="text-[0.95rem] text-brand-muted m-0">{step.description}</p>
              <div className="mt-3.5 text-[0.8rem] text-brand-yellow font-medium">
                {step.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
