import React, { useState } from 'react';
import {
  ArrowSquareOutIcon,
  BedIcon,
  CheckIcon,
  CopyIcon,
  FireIcon,
  QuestionIcon,
  WineIcon,
  XIcon,
} from '@phosphor-icons/react';
import { WhatsAppIcon } from './BrandIcons';
import { POUSADA_INFO } from '../data/guideData';

interface WhatsAppWidgetProps {
  initialTopic?: string | null;
  onCloseTopic?: () => void;
}

const QUICK_TOPICS = [
  {
    id: 'lenha',
    label: 'Pedir Lenha para Lareira',
    detail: 'Cesta/feixe adicional — R$ 30,00',
    message: 'Olá, recepção da Estalagem Mandeville! Gostaria de solicitar lenha para a lareira (R$ 30,00)',
    icon: FireIcon,
  },
  {
    id: 'arrumacao',
    label: 'Arrumação do Chalé',
    detail: 'Lembrar entrega da chave até 13h30',
    message: 'Olá! Gostaria de solicitar a arrumação do meu chalé hoje (deixarei a chave na recepção até às 13h30)',
    icon: BedIcon,
  },
  {
    id: 'frigobar',
    label: 'Reposição de Frigobar',
    detail: 'Água, refrigerantes ou Heineken',
    message: 'Olá! Gostaria de solicitar a reposição de itens do frigobar no meu chalé',
    icon: WineIcon,
  },
  {
    id: 'recepcao',
    label: 'Falar com a Recepção',
    detail: 'Dúvidas sobre estadia ou check-out',
    message: 'Olá, recepção da Estalagem Mandeville! Preciso de um auxílio durante minha estadia',
    icon: QuestionIcon,
  },
];

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  initialTopic = null,
  onCloseTopic,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('recepcao');
  const [chaleNumber, setChaleNumber] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const activeOpen = isOpen || Boolean(initialTopic);
  const effectiveTopicId = initialTopic || selectedTopicId;
  const activeTopic = QUICK_TOPICS.find((t) => t.id === effectiveTopicId) || QUICK_TOPICS[3];

  const fullMessage = `${activeTopic.message}${chaleNumber.trim() ? ` — Chalé: ${chaleNumber.trim()}.` : '.'}`;
  const whatsappUrl = `https://wa.me/${POUSADA_INFO.whatsappPhone}?text=${encodeURIComponent(fullMessage)}`;

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseTopic) onCloseTopic();
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Contato rápido com a recepção via WhatsApp"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1EBE5A] text-white shadow-lg transition-transform duration-150 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
        >
          <WhatsAppIcon className="w-7 h-7" />
        </button>
      </div>

      {/* Bottom Sheet / Modal */}
      {activeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-xs p-0 sm:p-4"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-md rounded-t-3xl sm:rounded-2xl bg-[#F7F4EE] border-t sm:border border-[#D8CFBE] p-6 shadow-2xl text-[#1C1917]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle on mobile */}
            <div className="w-10 h-1.5 bg-[#D8CFBE] rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#6E472B] font-medium">
                  Atendimento ao Hóspede · Estalagem Mandeville
                </p>
                <h3 className="text-2xl font-semibold text-[#1E2F23] mt-0.5">
                  Como podemos ajudar?
                </h3>
              </div>
              <button
                onClick={handleClose}
                aria-label="Fechar atendimento WhatsApp"
                className="min-h-[44px] min-w-[44px] -mr-2 -mt-2 flex items-center justify-center rounded-xl text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFECE4] transition-colors cursor-pointer"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Optional Chalet Input */}
            <div className="mt-4">
              <label htmlFor="chale-input" className="block text-xs font-medium text-[#57534E] mb-1.5">
                Número ou nome do seu Chalé (opcional)
              </label>
              <input
                id="chale-input"
                type="text"
                value={chaleNumber}
                onChange={(e) => setChaleNumber(e.target.value)}
                placeholder="Ex.: Chalé 03"
                className="w-full min-h-[44px] rounded-xl border border-[#D8CFBE] bg-white px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1E2F23] focus:outline-none"
              />
            </div>

            {/* Quick Topic Selector */}
            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium text-[#57534E]">
                Selecione o assunto para agilizar:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {QUICK_TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  const isSelected = topic.id === effectiveTopicId;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => {
                        if (onCloseTopic) onCloseTopic();
                        setSelectedTopicId(topic.id);
                      }}
                      className={`w-full min-h-[52px] flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-[#1E2F23] text-[#F7F4EE] border-[#1E2F23]'
                          : 'bg-white text-[#1C1917] border-[#E5DEC9] hover:border-[#C5A059]'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-[#C5A059]' : 'text-[#6E472B]'
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{topic.label}</div>
                        <div
                          className={`text-xs truncate ${
                            isSelected ? 'text-[#D8CFBE]' : 'text-[#78716C]'
                          }`}
                        >
                          {topic.detail}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message preview & actions */}
            <div className="mt-4 rounded-xl bg-[#EFECE4] p-3 border border-[#E5DEC9]">
              <p className="text-xs text-[#57534E] leading-relaxed">
                “{fullMessage}”
              </p>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-[#1E5E3A] hover:bg-[#17492D] px-4 py-3 text-sm font-semibold text-[#F7F4EE] transition-colors whitespace-nowrap"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Abrir no WhatsApp</span>
                <ArrowSquareOutIcon className="w-3.5 h-3.5 opacity-80" />
              </a>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="min-h-[48px] flex items-center justify-center gap-2 rounded-xl border border-[#D8CFBE] bg-white hover:bg-[#EFECE4] px-4 py-3 text-xs font-medium text-[#1C1917] transition-colors whitespace-nowrap cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 text-[#1E5E3A]" />
                    <span>Mensagem Copiada</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4 text-[#6E472B]" />
                    <span>Copiar Texto</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
