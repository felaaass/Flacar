import React, { useEffect, useId, useRef } from 'react';
import { EMAIL_CONTATO, HORARIO_EXTENSO, WHATSAPP_EXIBICAO } from '@/config/business';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    const rect = dialog.getBoundingClientRect();
    const isInside =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInside) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby={titleId}
      className="privacy-modal bg-[#102A43] text-white p-0 border border-white/15 rounded-3xl max-w-2xl w-[calc(100vw-32px)] shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      {...({ closedby: 'any' } as any)}
    >
      <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <h2 id={titleId} className="text-xl sm:text-2xl font-extrabold text-white">
            Aviso de Privacidade e Tratamento de Dados (LGPD)
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar aviso de privacidade"
            className="text-brand-muted hover:text-white text-2xl font-bold bg-transparent border-none cursor-pointer p-1 leading-none rounded focus-ring"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            A <strong>Flacar Entregas</strong> preza pela segurança, confidencialidade e respeito à
            privacidade de seus clientes, em estrita conformidade com a Lei Geral de Proteção de
            Dados Pessoais (Lei Federal nº 13.709/2018 — LGPD).
          </p>

          <h3 className="text-base font-bold text-white pt-2">
            1. Dados Coletados e Finalidade Específica (Art. 6º, I e Art. 7º, V)
          </h3>
          <p>
            Coletamos apenas os dados estritamente necessários para a execução dos serviços de
            coleta e entrega expressa de mercadorias:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Nome do comércio e Solicitante:</strong> Para identificação e contato no balcão de retirada.
            </li>
            <li>
              <strong>Número de WhatsApp:</strong> Para confirmação de valores, envio de atualizações e comprovante de entrega com foto e horário.
            </li>
            <li>
              <strong>Endereços de Coleta e Entrega:</strong> Para roteamento e cálculo do trajeto do motoboy.
            </li>
            <li>
              <strong>Tipo de mercadoria e Observações:</strong> Para definição do tipo de baú e cuidados de transporte.
            </li>
          </ul>

          <h3 className="text-base font-bold text-white pt-2">
            2. Armazenamento Local e Segurança da Informação
          </h3>
          <p>
            O histórico de pedidos exibido no site é gravado localmente apenas no navegador do seu
            dispositivo (armazenamento estritamente local), sem envio oculto para bancos de dados de
            terceiros ou corretores de dados. Você pode excluir esse histórico a qualquer momento
            clicando em &quot;Limpar histórico&quot; na tela de pedidos.
          </p>

          <h3 className="text-base font-bold text-white pt-2">
            3. Não Compartilhamento e Não Comercialização
          </h3>
          <p>
            A Flacar Entregas não vende, não aluga e não compartilha dados de clientes com empresas
            de marketing, bureaus de crédito ou plataformas terceiras. O envio de dados via WhatsApp
            ocorre diretamente entre você e o canal oficial de atendimento da Flacar.
          </p>

          <h3 className="text-base font-bold text-white pt-2">
            4. Direitos do Titular de Dados (Art. 18 da LGPD)
          </h3>
          <p>
            Você pode exercer seus direitos de confirmação de existência de tratamento, correção de
            dados incompletos, revogação de consentimento ou eliminação de informações a qualquer
            momento, entrando em contato diretamente com o nosso Encarregado de Dados:
          </p>
          <div className="bg-navy p-4 rounded-xl border border-white/10 text-white space-y-1 text-xs sm:text-sm">
            <p>
              <strong>Canal de Privacidade e DPO:</strong> Flávio Kich
            </p>
            <p>
              <strong>E-mail de Contato:</strong> {EMAIL_CONTATO}
            </p>
            <p>
              <strong>WhatsApp Oficial:</strong> {WHATSAPP_EXIBICAO}
            </p>
            <p>
              <strong>Horário de Atendimento:</strong> {HORARIO_EXTENSO}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-accent !py-2.5 !px-6 !text-sm focus-ring"
          >
            Entendi e estou ciente
          </button>
        </div>
      </div>
    </dialog>
  );
};
