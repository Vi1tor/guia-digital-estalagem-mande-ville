import React, { useState, useEffect } from 'react';
import {
  ArrowCounterClockwiseIcon,
  ArrowLeftIcon,
  ArrowSquareOutIcon,
  BedIcon,
  BookOpenTextIcon,
  CallBellIcon,
  CaretRightIcon,
  CheckIcon,
  ClockIcon,
  CoffeeIcon,
  CopyIcon,
  FireIcon,
  InfoIcon,
  KeyIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  SquaresFourIcon,
  SuitcaseRollingIcon,
  WifiHighIcon,
  WineIcon,
} from '@phosphor-icons/react';
import { GoogleMapsIcon, WazeIcon, WhatsAppIcon } from './BrandIcons';
import {
  CategoryId,
  GUIDE_CATEGORIES,
  POUSADA_INFO,
  WIFI_NETWORKS,
  MINIBAR_ITEMS,
  CHECKOUT_CHECKLIST,
  LOCATION_INFO,
  BREAKFAST_IMAGE_PATH,
  FIREPLACE_IMAGE_PATH,
} from '../data/guideData';
import { ResilientImage } from './ResilientImage';

interface CategoryDetailViewProps {
  categoryId: CategoryId;
  onBackToMenu: () => void;
  onSelectCategory: (id: CategoryId) => void;
  onOpenWhatsApp: (topicId: string) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  categoryId,
  onBackToMenu,
  onSelectCategory,
  onOpenWhatsApp,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Persistent Minibar calculator state (offline-friendly via localStorage)
  const [minibarCounts, setMinibarCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mandeville_minibar_counts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persistent Luggage & Belongings checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mandeville_luggage_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mandeville_minibar_counts', JSON.stringify(minibarCounts));
    } catch {
      // ignore storage errors
    }
  }, [minibarCounts]);

  useEffect(() => {
    try {
      localStorage.setItem('mandeville_luggage_checklist', JSON.stringify(checkedItems));
    } catch {
      // ignore storage errors
    }
  }, [checkedItems]);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      setCopiedKey(null);
    }
  };

  const updateMinibarCount = (id: string, delta: number) => {
    setMinibarCounts((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const resetMinibar = () => setMinibarCounts({});

  const minibarTotal = MINIBAR_ITEMS.reduce(
    (sum, item) => sum + item.price * (minibarCounts[item.id] || 0),
    0
  );

  const toggleChecklist = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentIndex = GUIDE_CATEGORIES.findIndex((c) => c.id === categoryId);
  const currentCategory = GUIDE_CATEGORIES[currentIndex] || GUIDE_CATEGORIES[0];
  const nextCategory = GUIDE_CATEGORIES[(currentIndex + 1) % GUIDE_CATEGORIES.length];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-24">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#E5DEC9]">
        <button
          type="button"
          onClick={onBackToMenu}
          className="min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-white border border-[#D8CFBE] px-4 py-2.5 text-sm font-medium text-[#1E2F23] hover:bg-[#EFECE4] hover:border-[#C5A059] transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4 text-[#6E472B]" />
          <span>Voltar ao Menu Principal</span>
        </button>

        <div className="text-xs text-[#78716C] font-mono tabular-nums hidden sm:block">
          Seção {currentCategory.number} / {String(GUIDE_CATEGORIES.length).padStart(2, '0')}
        </div>
      </div>

      {/* Category Header */}
      <div className="mt-5 sm:mt-6">
        <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#6E472B] font-medium">
          <span className="font-mono">{currentCategory.number}.</span>
          <span>·</span>
          <span>Estalagem Mandeville</span>
          <span>·</span>
          <span>Guia do Hóspede</span>
        </div>
        <h1 className="text-[28px] leading-tight sm:text-4xl font-semibold text-[#1E2F23] mt-1 tracking-tight">
          {currentCategory.title}
        </h1>
        <p className="text-[15px] sm:text-base text-[#57534E] mt-1.5 leading-relaxed">
          {currentCategory.subtitle}
        </p>
      </div>

      {/* Category Specific Content */}
      <div className="mt-6 sm:mt-8 space-y-6">
        {categoryId === 'checkin-checkout' && (
          <>
            <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 sm:p-8">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#EFECE4] flex items-center justify-center text-[#1E2F23] shrink-0">
                  <CallBellIcon className="w-5 h-5 text-[#6E472B]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#1E2F23]">
                    {POUSADA_INFO.welcomeTitle}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[#44403C] leading-relaxed">
                    {POUSADA_INFO.welcomeText}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#EFECE4]">
                <div className="rounded-xl bg-[#F7F4EE] p-5 border border-[#E5DEC9]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#6E472B]">Horário de Entrada</span>
                    <ClockIcon className="w-4 h-4 text-[#6E472B]" />
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-[#1E2F23] font-mono tabular-nums">
                    15h00
                  </div>
                  <p className="mt-1 text-xs text-[#57534E]">
                    Check-in a partir das 15 horas na recepção.
                  </p>
                </div>

                <div className="rounded-xl bg-[#F7F4EE] p-5 border border-[#E5DEC9]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#6E472B]">Horário de Saída</span>
                    <ClockIcon className="w-4 h-4 text-[#6E472B]" />
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-[#1E2F23] font-mono tabular-nums">
                    Até às 12h00
                  </div>
                  <p className="mt-1 text-xs text-[#57534E]">
                    Check-out e entrega da chave na recepção até o meio-dia.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#EFECE4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#57534E] leading-relaxed">
                  Antes de realizar o check-out, recomendamos conferir o checklist de bagagem e pertences do seu chalé.
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCategory('itens-esquecidos')}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#EFECE4] hover:bg-[#E5DEC9] px-4 py-2.5 text-xs font-semibold text-[#1E2F23] transition-colors text-center shrink-0 cursor-pointer"
                >
                  <SuitcaseRollingIcon className="w-4 h-4 text-[#6E472B]" />
                  <span>Ver Checklist de Saída</span>
                </button>
              </div>
            </div>
          </>
        )}

        {categoryId === 'wifi' && (
          <>
            <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 sm:p-8 space-y-6">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#EFECE4] flex items-center justify-center shrink-0">
                  <WifiHighIcon className="w-5 h-5 text-[#1E2F23]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#1E2F23]">
                    Redes Wi-Fi Gratuitas
                  </h2>
                  <p className="mt-1 text-sm text-[#57534E] leading-relaxed">
                    Disponibilizamos duas opções de rede para sua comodidade. Toque em <strong>Copiar Senha</strong> para conectar seu celular ou notebook rapidamente.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {WIFI_NETWORKS.map((net, idx) => {
                  const passKey = `pass-${net.id}`;
                  const ssidKey = `ssid-${net.id}`;
                  return (
                    <div
                      key={net.id}
                      className="rounded-xl bg-[#F7F4EE] border border-[#D8CFBE] p-4 sm:p-5"
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#6E472B] font-medium">
                        <span className="font-mono">Rede 0{idx + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span>{net.coverage}</span>
                      </div>

                      <dl className="mt-3 rounded-lg bg-white border border-[#E5DEC9] p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="min-w-0">
                          <dt className="text-[11px] text-[#78716C]">Nome da Rede (SSID)</dt>
                          <dd className="font-mono text-base font-semibold text-[#1C1917] break-all mt-0.5">
                            {net.ssid}
                          </dd>
                        </div>
                        <div className="min-w-0">
                          <dt className="text-[11px] text-[#78716C]">Senha de Acesso</dt>
                          <dd className="font-mono text-base font-semibold text-[#1E2F23] break-all mt-0.5">
                            {net.password}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-3 grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleCopy(net.ssid, ssidKey)}
                          className="min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium bg-white border border-[#D8CFBE] hover:bg-[#EFECE4] text-[#1E2F23] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedKey === ssidKey ? (
                            <>
                              <CheckIcon className="w-4 h-4 text-[#1E5E3A]" />
                              <span>Copiado</span>
                            </>
                          ) : (
                            <>
                              <CopyIcon className="w-4 h-4 text-[#6E472B]" />
                              <span>Copiar rede</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(net.password, passKey)}
                          className="min-h-[44px] px-3 py-2 rounded-lg text-xs font-semibold bg-[#1E2F23] hover:bg-[#263B2C] text-[#F7F4EE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedKey === passKey ? (
                            <>
                              <CheckIcon className="w-4 h-4 text-[#C5A059]" />
                              <span>Copiada!</span>
                            </>
                          ) : (
                            <>
                              <CopyIcon className="w-4 h-4 text-[#C5A059]" />
                              <span>Copiar senha</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="mt-3 text-xs text-[#57534E]">{net.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {categoryId === 'cafe-da-manha' && (
          <>
            <div className="rounded-2xl bg-white border border-[#E5DEC9] overflow-hidden">
              <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#1E2F23]">
                <ResilientImage
                  src={BREAKFAST_IMAGE_PATH}
                  alt="Mesa de café da manhã colonial na serra na Estalagem Mandeville"
                  className="w-full h-full object-cover"
                  fallbackLabel="Café da Manhã na Serra · Estalagem Mandeville"
                />
              </div>

              <div className="p-5 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-[#6E472B] font-medium">
                  <CoffeeIcon className="w-4 h-4" />
                  <span>Salão de Café</span>
                  <span>·</span>
                  <span>Incluso na diária</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E2F23] mt-2">
                  Sabor e aconchego nas manhãs da serra
                </h2>

                <div className="mt-5 rounded-xl bg-[#F7F4EE] border border-[#D8CFBE] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#6E472B] font-medium">Horário de Atendimento</div>
                    <div className="text-2xl font-semibold text-[#1E2F23] font-mono tabular-nums mt-1">
                      08h30 às 10h30
                    </div>
                    <div className="text-xs text-[#57534E] mt-1">
                      Servido diariamente no <strong>Salão de Café</strong> da pousada.
                    </div>
                  </div>
                  <div className="text-xs text-[#57534E] sm:text-right max-w-xs">
                    Preparamos tudo fresquinho pela manhã para você aproveitar os passeios em Monte Verde com energia.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {categoryId === 'frigobar' && (
          <>
            <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#EFECE4] flex items-center justify-center shrink-0">
                    <WineIcon className="w-5 h-5 text-[#6E472B]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1E2F23]">
                      Cardápio do Frigobar
                    </h2>
                    <p className="mt-1 text-sm text-[#57534E] leading-relaxed">
                      Confira os valores dos itens disponíveis no frigobar do seu chalé. Você também pode usar o controle abaixo para anotar seu próprio consumo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Table */}
              <div className="mt-6 divide-y divide-[#EFECE4] border-t border-b border-[#EFECE4]">
                {MINIBAR_ITEMS.map((item) => {
                  const count = minibarCounts[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="py-4 flex items-center justify-between gap-3 sm:gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-base font-medium text-[#1C1917]">
                          {item.name}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#78716C] mt-0.5">
                          <span>{item.volume}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.category}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-4 shrink-0">
                        <div className="font-mono text-base font-semibold text-[#1E2F23] tabular-nums whitespace-nowrap">
                          {item.priceFormatted}
                        </div>

                        {/* Optional Guest Tally Control */}
                        <div className="flex items-center gap-1 bg-[#F7F4EE] border border-[#D8CFBE] rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => updateMinibarCount(item.id, -1)}
                            disabled={count === 0}
                            aria-label={`Diminuir quantidade de ${item.name}`}
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#1C1917] hover:bg-white disabled:opacity-35 transition-colors cursor-pointer"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="w-7 text-center font-mono text-sm font-semibold tabular-nums text-[#1E2F23]" aria-live="polite">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateMinibarCount(item.id, 1)}
                            aria-label={`Aumentar quantidade de ${item.name}`}
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#1C1917] hover:bg-white transition-colors cursor-pointer"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tally Summary & Request Button */}
              <div className="mt-6 rounded-xl bg-[#F7F4EE] border border-[#D8CFBE] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <div>
                    <div className="text-xs text-[#57534E]">
                      Estimativa anotada por você (opcional)
                    </div>
                    <div className="text-xl font-semibold text-[#1E2F23] font-mono tabular-nums mt-0.5">
                      R$ {minibarTotal.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                  {minibarTotal > 0 && (
                    <button
                      type="button"
                      onClick={resetMinibar}
                      className="min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-medium text-[#6E472B] hover:bg-[#EFECE4] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowCounterClockwiseIcon className="w-3.5 h-3.5" />
                      <span>Zerar anotação</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenWhatsApp('frigobar')}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E2F23] hover:bg-[#263B2C] px-4 py-2.5 text-xs font-semibold text-[#F7F4EE] transition-colors text-center cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>Solicitar Reposição no WhatsApp</span>
                </button>
              </div>
            </div>
          </>
        )}

        {categoryId === 'lareira' && (
          <>
            <div className="rounded-2xl bg-white border border-[#E5DEC9] overflow-hidden">
              <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#1E2F23]">
                <ResilientImage
                  src={FIREPLACE_IMAGE_PATH}
                  alt="Lareira acesa em chalé rústico elegante na serra"
                  className="w-full h-full object-cover"
                  fallbackLabel="Lareira & Aconchego · Estalagem Mandeville"
                />
              </div>

              <div className="p-5 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-[#6E472B] font-medium">
                  <FireIcon className="w-4 h-4" />
                  <span>Clima de Montanha</span>
                  <span>·</span>
                  <span>Aquecimento no Chalé</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E2F23] mt-2">
                  Lenha para Lareira
                </h2>

                <p className="mt-2 text-sm sm:text-base text-[#44403C] leading-relaxed">
                  Para deixar suas noites na serra ainda mais acolhedoras, você pode solicitar lenha para a lareira do seu chalé diretamente na recepção.
                </p>

                <div className="mt-6 rounded-xl bg-[#F7F4EE] border border-[#D8CFBE] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#6E472B] font-medium">Valor por solicitação</div>
                    <div className="text-2xl sm:text-3xl font-semibold text-[#1E2F23] font-mono tabular-nums mt-1">
                      R$ 30,00
                    </div>
                    <div className="text-xs text-[#57534E] mt-1">
                      Feixe de lenha seca selecionada para lareira.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenWhatsApp('lenha')}
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#6E472B] hover:bg-[#583821] px-5 py-3 text-sm font-semibold text-[#F7F4EE] transition-colors text-center cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span>Pedir Lenha via WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {categoryId === 'arrumacao' && (
          <>
            <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 sm:p-8">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#EFECE4] flex items-center justify-center shrink-0">
                  <BedIcon className="w-5 h-5 text-[#1E2F23]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#1E2F23]">
                    Solicitação de Arrumação do Chalé
                  </h2>
                  <p className="mt-1 text-sm text-[#57534E] leading-relaxed">
                    Respeitamos sua total privacidade e descanso. A arrumação é realizada mediante sua solicitação.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#F7F4EE] border border-[#D8CFBE] p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6E472B]">
                  <KeyIcon className="w-4 h-4" />
                  <span>Regra de Solicitação</span>
                </div>
                <p className="mt-2 text-base sm:text-lg font-medium text-[#1E2F23] leading-relaxed">
                  “Para solicitar arrumação, pedimos a gentileza de deixar a chave na recepção até às <span className="font-mono font-semibold underline decoration-[#C5A059] underline-offset-4">13h30</span>.”
                </p>
                <p className="mt-2 text-xs text-[#57534E] leading-relaxed">
                  Caso prefira não ter o chalé arrumado no dia, basta manter a chave com você durante seus passeios.
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#EFECE4]">
                <span className="text-xs text-[#57534E]">
                  Deseja avisar a recepção que deixará a chave para arrumação?
                </span>
                <button
                  type="button"
                  onClick={() => onOpenWhatsApp('arrumacao')}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E2F23] hover:bg-[#263B2C] px-4 py-2.5 text-xs font-semibold text-[#F7F4EE] transition-colors text-center cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>Avisar Recepção no WhatsApp</span>
                </button>
              </div>
            </div>
          </>
        )}

        {categoryId === 'itens-esquecidos' && (
          <>
            <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 sm:p-8">
              {/* Warm Header with Luggage (Mala) & Magnifying Glass (Lupa) icons as requested */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EFECE4] border border-[#D8CFBE] flex items-center justify-center shrink-0">
                  <SuitcaseRollingIcon className="w-6 h-6 text-[#1E2F23]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6E472B] font-medium">
                    <span>Cuidado com seus pertences</span>
                    <span>·</span>
                    <span>Antes do Check-out</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-[#1E2F23] mt-0.5">
                    Conferência de Mala & Pertences
                  </h2>
                </div>
              </div>

              {/* Official Notice Box */}
              <div className="mt-6 rounded-xl bg-[#F7F4EE] border border-[#C5A059]/60 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <InfoIcon className="w-5 h-5 text-[#6E472B] shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base font-medium text-[#1C1917] leading-relaxed">
                      Informamos que a cidade de <strong>Monte Verde não possui agência dos Correios</strong> para envio de objetos esquecidos.
                    </p>
                    <p className="text-sm text-[#44403C] leading-relaxed">
                      Por isso, pedimos a gentileza de sempre conferirem seus pertences com carinho antes do check-out. Queremos que você leve apenas boas lembranças da nossa serra!
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Inspection Checklist with Mala/Lupa theme */}
              <div className="mt-8">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <SuitcaseRollingIcon className="w-4 h-4 text-[#6E472B]" />
                    <h3 className="text-lg font-semibold text-[#1E2F23]">
                      Checklist Rápido de Inspeção no Chalé
                    </h3>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-[#78716C]">
                    {Object.values(checkedItems).filter(Boolean).length} / {CHECKOUT_CHECKLIST.length} conferidos
                  </span>
                </div>

                <div className="divide-y divide-[#EFECE4] border-t border-b border-[#EFECE4]">
                  {CHECKOUT_CHECKLIST.map((item) => {
                    const isChecked = Boolean(checkedItems[item.id]);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleChecklist(item.id)}
                        className="w-full min-h-[56px] py-3.5 flex items-center justify-between gap-4 text-left hover:bg-[#F7F4EE]/60 px-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked
                                ? 'bg-[#1E2F23] border-[#1E2F23] text-[#F7F4EE]'
                                : 'bg-white border-[#C5A059]'
                            }`}
                          >
                            {isChecked && <CheckIcon className="w-3.5 h-3.5" />}
                          </div>
                          <div className="min-w-0">
                            <div
                              className={`text-sm font-medium transition-colors ${
                                isChecked ? 'line-through text-[#78716C]' : 'text-[#1C1917]'
                              }`}
                            >
                              {item.label}
                            </div>
                            <div className="text-xs text-[#78716C] mt-0.5">{item.area}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {categoryId === 'localizacao' && (
          <div className="rounded-2xl bg-white border border-[#E5DEC9] overflow-hidden">
            <div className="aspect-[4/3] sm:aspect-[16/9] w-full bg-[#EFECE4]">
              <iframe
                src={LOCATION_INFO.embedUrl}
                title="Mapa da Estalagem Mandeville"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-2 text-xs text-[#6E472B] font-medium">
                <MapPinIcon className="w-4 h-4" />
                <span>{LOCATION_INFO.region}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E2F23] mt-2">
                Como chegar à Estalagem
              </h2>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Abra a rota no aplicativo de sua preferência. Coordenadas:{' '}
                <span className="font-mono tabular-nums text-[#1E2F23]">{LOCATION_INFO.coordinates}</span>
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={LOCATION_INFO.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E2F23] hover:bg-[#263B2C] px-5 py-3 text-sm font-semibold text-[#F7F4EE] transition-colors text-center"
                >
                  <WazeIcon className="w-5 h-5 text-[#33CCFF]" />
                  <span>Ir com o Waze</span>
                  <ArrowSquareOutIcon className="w-3.5 h-3.5 opacity-70" />
                </a>
                <a
                  href={LOCATION_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#EFECE4] border border-[#D8CFBE] px-5 py-3 text-sm font-semibold text-[#1E2F23] transition-colors text-center"
                >
                  <GoogleMapsIcon className="w-5 h-5 text-[#4285F4]" />
                  <span>Ir com o Google Maps</span>
                  <ArrowSquareOutIcon className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        )}

        {categoryId === 'resumo-geral' && (
          <>
            <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 sm:p-8 space-y-6">
              <div className="text-center border-b border-[#EFECE4] pb-6">
                <div className="inline-flex items-center gap-3 text-xs font-medium tracking-widest text-[#6E472B]">
                  <span aria-hidden="true" className="h-px w-8 bg-[#C5A059]" />
                  <span>INFORMAÇÕES IMPORTANTES – CHECK-IN</span>
                  <span aria-hidden="true" className="h-px w-8 bg-[#C5A059]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E2F23] mt-2">
                  Sejam muito bem-vindos à Estalagem Mandeville!
                </h2>
                <p className="mt-2 text-sm text-[#57534E] max-w-xl mx-auto leading-relaxed">
                  Preparamos algumas informações importantes para tornar sua estadia ainda mais confortável.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Frigobar */}
                <div className="rounded-xl bg-[#F7F4EE] border border-[#E5DEC9] p-5">
                  <div className="flex items-center gap-2 text-base font-semibold text-[#1E2F23]">
                    <WineIcon className="w-4 h-4 text-[#6E472B]" />
                    <span>Frigobar</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-[#1C1917]">
                    {MINIBAR_ITEMS.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-2">
                        <span>• {item.name} {item.id === 'agua-mineral' || item.id === 'coca-cola' ? item.volume : ''}</span>
                        <span className="font-mono font-medium text-[#1E2F23] tabular-nums">
                          {item.priceFormatted}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lareira & Café */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-[#F7F4EE] border border-[#E5DEC9] p-5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-base font-semibold text-[#1E2F23]">
                        <FireIcon className="w-4 h-4 text-[#6E472B]" />
                        <span>Lenha para lareira</span>
                      </div>
                      <span className="font-mono font-semibold text-[#1E2F23] tabular-nums">
                        R$ 30,00
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#F7F4EE] border border-[#E5DEC9] p-5">
                    <div className="flex items-center gap-2 text-base font-semibold text-[#1E2F23]">
                      <CoffeeIcon className="w-4 h-4 text-[#6E472B]" />
                      <span>Café da manhã</span>
                    </div>
                    <p className="mt-1.5 text-sm text-[#44403C]">
                      Servido das <strong className="font-mono tabular-nums">08h30 às 10h30</strong> no salão de café.
                    </p>
                  </div>
                </div>

                {/* Arrumação & Horários */}
                <div className="rounded-xl bg-[#F7F4EE] border border-[#E5DEC9] p-5">
                  <div className="flex items-center gap-2 text-base font-semibold text-[#1E2F23]">
                    <BedIcon className="w-4 h-4 text-[#6E472B]" />
                    <span>Arrumação do chalé</span>
                  </div>
                  <p className="mt-2 text-sm text-[#44403C] leading-relaxed">
                    Para solicitar arrumação, pedimos a gentileza de deixar a chave na recepção até às <strong className="font-mono tabular-nums">13h30</strong>.
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#E5DEC9] flex items-center justify-between text-sm">
                    <div>
                      <span className="text-[#57534E]">Check-in:</span>{' '}
                      <strong className="font-mono tabular-nums text-[#1E2F23]">15h00</strong>
                    </div>
                    <div>
                      <span className="text-[#57534E]">Check-out:</span>{' '}
                      <strong className="font-mono tabular-nums text-[#1E2F23]">Até às 12h00</strong>
                    </div>
                  </div>
                </div>

                {/* Wi-Fi */}
                <div className="rounded-xl bg-[#F7F4EE] border border-[#E5DEC9] p-5">
                  <div className="flex items-center gap-2 text-base font-semibold text-[#1E2F23]">
                    <WifiHighIcon className="w-4 h-4 text-[#6E472B]" />
                    <span>Wi-Fi</span>
                  </div>
                  <div className="mt-3 space-y-2.5 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[#57534E]">Rede:</span>{' '}
                        <strong className="font-mono">Estalagemmandeville</strong>
                      </div>
                      <div className="font-mono text-xs bg-white px-2.5 py-1 rounded border border-[#D8CFBE]">
                        Senha: <strong>Ville123</strong>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[#57534E]">Rede:</span>{' '}
                        <strong className="font-mono">Starlink</strong>
                      </div>
                      <div className="font-mono text-xs bg-white px-2.5 py-1 rounded border border-[#D8CFBE]">
                        Senha: <strong>a1314b**</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Itens esquecidos */}
              <div className="rounded-xl bg-[#EFECE4] border border-[#D8CFBE] p-5 flex items-start gap-3.5">
                <SuitcaseRollingIcon className="w-5 h-5 text-[#6E472B] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-[#1E2F23]">
                    Itens esquecidos
                  </h3>
                  <p className="mt-1 text-sm text-[#44403C] leading-relaxed">
                    Informamos que a cidade de Monte Verde não possui agência dos Correios para envio de objetos esquecidos. Por isso, pedimos a gentileza de sempre conferirem seus pertences antes do check-out.
                  </p>
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="font-display text-2xl font-semibold text-[#1E2F23]">
                  Desejamos uma excelente estadia!
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation Actions: Back to Menu + Next Category */}
      <div className="mt-8 pt-6 border-t border-[#E5DEC9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToMenu}
          className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E2F23] hover:bg-[#263B2C] px-5 py-3 text-sm font-semibold text-[#F7F4EE] transition-colors cursor-pointer"
        >
          <SquaresFourIcon className="w-4 h-4 text-[#C5A059]" />
          <span>Voltar ao Menu Principal</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory(nextCategory.id)}
          className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#EFECE4] border border-[#D8CFBE] px-5 py-3 text-sm font-medium text-[#1C1917] transition-colors cursor-pointer"
        >
          <span>Próximo: {nextCategory.title}</span>
          <CaretRightIcon className="w-4 h-4 text-[#6E472B]" />
        </button>
      </div>
    </div>
  );
};
