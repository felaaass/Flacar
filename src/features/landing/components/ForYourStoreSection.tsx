import React from 'react';

export const ForYourStoreSection: React.FC = () => {
  return (
    <section className="py-20 bg-navy" id="para-sua-loja">
      <div className="shell-container">
        <div className="section-head">
          <span className="eyebrow-badge">Para sua loja</span>
          <h2>Feito para o comércio da sua cidade</h2>
          <p>
            Você não assina contrato nem paga mensalidade. Paga só quando usa, com quem já conhece
            sua rua.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          <div className="card-soft">
            <div className="icon-tile">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="text-[1.12rem] font-bold text-white mb-2">Sem mensalidade</h3>
            <p className="text-[0.95rem] text-brand-muted m-0">
              Nada de taxa fixa mensal. Você paga apenas pelas entregas que realizar.
            </p>
            <div className="mt-3.5 text-[0.8rem] text-brand-yellow font-medium">
              Zero custo parado
            </div>
          </div>

          <div className="card-soft">
            <div className="icon-tile">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-[1.12rem] font-bold text-white mb-2">Você paga por entrega</h3>
            <p className="text-[0.95rem] text-brand-muted m-0">
              Valor por faixa de distância, informado antes de confirmar o pedido.
            </p>
            <div className="mt-3.5 text-[0.8rem] text-brand-yellow font-medium">
              Preço claro e previsível
            </div>
          </div>

          <div className="card-soft">
            <div className="icon-tile">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M8.2 12.5 7 22l5-2.5 5 2.5-1.2-9.5" />
              </svg>
            </div>
            <h3 className="text-[1.12rem] font-bold text-white mb-2">Motoboy fixo de confiança</h3>
            <p className="text-[0.95rem] text-brand-muted m-0">
              Quase sempre a mesma pessoa atende sua loja. Ela conhece o balcão e o seu cliente.
            </p>
            <div className="mt-3.5 text-[0.8rem] text-brand-yellow font-medium">
              Relação que dura
            </div>
          </div>

          <div className="card-soft">
            <div className="icon-tile">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="m9 15 2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-[1.12rem] font-bold text-white mb-2">Comprovante de entrega</h3>
            <p className="text-[0.95rem] text-brand-muted m-0">
              Foto e horário da entrega enviados para você. Nada fica sem registro.
            </p>
            <div className="mt-3.5 text-[0.8rem] text-brand-yellow font-medium">
              Prova em cada pedido
            </div>
          </div>

          <div className="card-soft">
            <div className="icon-tile">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="text-[1.12rem] font-bold text-white mb-2">
              Suporte com uma pessoa real
            </h3>
            <p className="text-[0.95rem] text-brand-muted m-0">
              Dúvida ou problema? Você fala com a equipe da Flacar, sem robô no meio.
            </p>
            <div className="mt-3.5 text-[0.8rem] text-brand-yellow font-medium">
              Atendimento humano
            </div>
          </div>

          <div className="card-soft">
            <div className="icon-tile">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M3 10.5 12 3l9 7.5V21H3z" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <h3 className="text-[1.12rem] font-bold text-white mb-2">Atendimento na sua cidade</h3>
            <p className="text-[0.95rem] text-brand-muted m-0">
              Nossos motoboys circulam pela sua região, então a entrega chega rápido.
            </p>
            <div className="mt-3.5 text-[0.8rem] text-brand-yellow font-medium">Perto de você</div>
          </div>
        </div>
      </div>
    </section>
  );
};
