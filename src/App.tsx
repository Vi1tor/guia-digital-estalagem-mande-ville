import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BedIcon,
  BookOpenTextIcon,
  CaretRightIcon,
  CheckIcon,
  ClockIcon,
  CoffeeIcon,
  CopyIcon,
  FireIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  SquaresFourIcon,
  SuitcaseRollingIcon,
  WifiHighIcon,
  WineIcon,
  XIcon,
  type Icon,
} from '@phosphor-icons/react';
import {
  CategoryId,
  GUIDE_CATEGORIES,
  LOCATION_INFO,
  POUSADA_INFO,
  WIFI_NETWORKS,
} from './data/guideData';
import { GoogleMapsIcon, WazeIcon } from './components/BrandIcons';
import { HeroCarousel } from './components/HeroCarousel';
import { WeatherWidget } from './components/WeatherWidget';
import { CategoryDetailView } from './components/CategoryDetailView';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { WhatsAppWidget } from './components/WhatsAppWidget';

type ScreenView = 'home' | 'menu' | 'detail';

const CATEGORY_ICONS: Record<CategoryId, Icon> = {
  'checkin-checkout': ClockIcon,
  wifi: WifiHighIcon,
  'cafe-da-manha': CoffeeIcon,
  frigobar: WineIcon,
  lareira: FireIcon,
  arrumacao: BedIcon,
  'itens-esquecidos': SuitcaseRollingIcon,
  localizacao: MapPinIcon,
  'resumo-geral': BookOpenTextIcon,
};

export default function App() {
  const [view, setView] = useState<ScreenView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('checkin-checkout');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedWifiId, setCopiedWifiId] = useState<string | null>(null);
  const [whatsAppTopic, setWhatsAppTopic] = useState<string | null>(null);

  // Scroll to top smoothly when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedCategory]);

  const handleOpenCategory = (id: CategoryId) => {
    setSelectedCategory(id);
    setView('detail');
  };

  const handleBackToMenu = () => {
    setView('menu');
  };

  const handleGoHome = () => {
    setView('home');
  };

  const handleQuickCopyWifi = async (password: string, id: string) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedWifiId(id);
      setTimeout(() => setCopiedWifiId(null), 2200);
    } catch {
      setCopiedWifiId(null);
    }
  };

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return GUIDE_CATEGORIES;
    return GUIDE_CATEGORIES.filter(
      (cat) =>
        cat.title.toLowerCase().includes(q) ||
        cat.subtitle.toLowerCase().includes(q) ||
        cat.quickHighlight.toLowerCase().includes(q) ||
        cat.keywords.some((kw) => kw.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-dvh flex flex-col overflow-x-clip bg-[#F7F4EE] text-[#1C1917] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      {/* Sticky Top Bar (Shown on Menu and Detail views, adhering to 3-Zone Top Bar Contract) */}
      {view !== 'home' && (
        <header className="sticky top-0 z-30 box-content h-14 pt-[env(safe-area-inset-top)] bg-[#F7F4EE]/92 backdrop-blur-md border-b border-[#E5DEC9] px-4 sm:px-8 flex items-center justify-between gap-3">
          {/* Zone 1: Single text element Brand Wordmark */}
          <button
            type="button"
            onClick={handleGoHome}
            className="min-w-0 truncate font-display text-lg sm:text-2xl font-semibold tracking-tight text-[#1E2F23] hover:text-[#6E472B] transition-colors cursor-pointer text-left"
          >
            Estalagem Mande Ville
          </button>

          {/* Zone 2: 5 clean single-line navigation links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-medium text-[#57534E]">
            <button
              type="button"
              onClick={handleGoHome}
              className="hover:text-[#1E2F23] hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
            >
              Tela Inicial
            </button>
            <button
              type="button"
              onClick={handleBackToMenu}
              className={`hover:text-[#1E2F23] hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer ${
                view === 'menu' ? 'text-[#1E2F23] font-semibold underline' : ''
              }`}
            >
              Menu Principal
            </button>
            <button
              type="button"
              onClick={() => handleOpenCategory('wifi')}
              className={`hover:text-[#1E2F23] hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer ${
                view === 'detail' && selectedCategory === 'wifi'
                  ? 'text-[#1E2F23] font-semibold underline'
                  : ''
              }`}
            >
              Wi-Fi
            </button>
            <button
              type="button"
              onClick={() => handleOpenCategory('frigobar')}
              className={`hover:text-[#1E2F23] hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer ${
                view === 'detail' && selectedCategory === 'frigobar'
                  ? 'text-[#1E2F23] font-semibold underline'
                  : ''
              }`}
            >
              Frigobar
            </button>
            <button
              type="button"
              onClick={() => handleOpenCategory('itens-esquecidos')}
              className={`hover:text-[#1E2F23] hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer ${
                view === 'detail' && selectedCategory === 'itens-esquecidos'
                  ? 'text-[#1E2F23] font-semibold underline'
                  : ''
              }`}
            >
              Check-out & Mala
            </button>
          </nav>

          {/* Zone 3: 1–2 Primary Actions (Shortcut to Main Menu / Home + PWA Install) */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:block">
              <PWAInstallButton />
            </div>
            {view === 'detail' ? (
              <button
                type="button"
                onClick={handleBackToMenu}
                aria-label="Voltar ao Menu Principal"
                className="min-h-[44px] flex items-center gap-1.5 rounded-lg bg-[#EFECE4] hover:bg-[#E5DEC9] px-3 py-2 text-xs font-semibold text-[#1E2F23] transition-colors whitespace-nowrap cursor-pointer"
              >
                <SquaresFourIcon className="w-4 h-4 text-[#6E472B]" />
                <span className="sm:hidden">Menu</span>
                <span className="hidden sm:inline">Menu Principal</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGoHome}
                aria-label="Voltar para a Tela Inicial"
                className="min-h-[44px] flex items-center gap-1.5 rounded-lg bg-[#EFECE4] hover:bg-[#E5DEC9] px-3 py-2 text-xs font-semibold text-[#1E2F23] transition-colors whitespace-nowrap cursor-pointer"
              >
                <HouseIcon className="w-4 h-4 text-[#6E472B]" />
                <span>Início</span>
              </button>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area with Smooth Compositor Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.section
              key="screen-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-h-dvh w-full flex flex-col justify-between overflow-hidden bg-[#141E17] text-[#F7F4EE]"
            >
              <HeroCarousel>

              {/* Top Subtle Bar on Hero */}
              <div className="relative z-10 max-w-6xl w-full mx-auto px-5 sm:px-8 pt-[calc(1.25rem+env(safe-area-inset-top))] sm:pt-[calc(1.5rem+env(safe-area-inset-top))] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#E5DEC9]/90 tracking-wide">
                  <span>Monte Verde, MG</span>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">Serra da Mantiqueira</span>
                </div>
                <PWAInstallButton />
              </div>

              {/* Center Hero Content */}
              <div className="relative z-10 max-w-3xl w-full mx-auto px-5 sm:px-8 my-auto py-10 sm:py-12 text-center">
                <div className="mb-6 flex justify-center">
                  <WeatherWidget variant="chip" />
                </div>

                <p className="text-xs sm:text-sm font-medium tracking-widest text-[#E6C786] uppercase">
                  {POUSADA_INFO.subtitle}
                </p>

                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-[#F7F4EE] mt-3 tracking-tight leading-[1.08]">
                  {POUSADA_INFO.name}
                </h1>

                <div className="w-16 h-[1px] bg-[#C5A059]/70 mx-auto my-6" />

                <p className="text-[15px] sm:text-lg text-[#EFECE4]/95 max-w-xl mx-auto leading-relaxed font-normal">
                  Sejam muito bem-vindos! Preparamos este guia digital com todas as informações importantes para tornar sua estadia em nosso chalé ainda mais confortável.
                </p>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setView('menu')}
                    className="min-h-[52px] w-full sm:w-auto max-w-xs inline-flex items-center justify-center gap-2.5 rounded-xl bg-transparent hover:bg-[#F7F4EE]/10 border border-[#F7F4EE]/70 hover:border-[#F7F4EE] text-[#F7F4EE] px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 active:scale-98 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6C786]"
                  >
                    <span>Ver Informações</span>
                    <CaretRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              </HeroCarousel>

              {/* Bottom Hero Quick Reference Bar */}
              <div className="relative z-10 border-t border-[#F7F4EE]/15 bg-[#0F1712]/70 backdrop-blur-md">
                <div className="max-w-5xl mx-auto pl-5 pr-20 sm:pl-8 sm:pr-24 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex flex-wrap items-center justify-start sm:justify-between gap-x-6 gap-y-2 text-xs text-[#D8CFBE]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#E6C786] font-medium">Check-in:</span>
                    <span className="font-mono tabular-nums">15h00</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#E6C786] font-medium">Check-out:</span>
                    <span className="font-mono tabular-nums">até 12h00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#E6C786] font-medium">Café da manhã:</span>
                    <span className="font-mono tabular-nums">08h30 às 10h30</span>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-[#E6C786] font-medium">Arrumação:</span>
                    <span>Chave na recepção até 13h30</span>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {view === 'menu' && (
            <motion.section
              key="screen-menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto px-4 sm:px-8 pt-5 sm:pt-8 pb-28"
            >
              {/* Welcome Editorial Banner */}
              <div className="rounded-2xl bg-[#1E2F23] text-[#F7F4EE] p-5 sm:p-8 border border-[#2E4635]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-xs text-[#E6C786] font-medium">
                      <span>Guia Digital do Chalé</span>
                      <span aria-hidden="true">·</span>
                      <span>Monte Verde, MG</span>
                    </div>
                    <h1 className="font-display text-[28px] leading-tight sm:text-4xl font-semibold mt-1 text-[#F7F4EE]">
                      {POUSADA_INFO.welcomeTitle}
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-[#D8CFBE] leading-relaxed">
                      {POUSADA_INFO.welcomeText} Toque em qualquer categoria abaixo para consultar horários, senhas e valores.
                    </p>
                  </div>

                  {/* Quick-Action Complete Summary Button */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenCategory('resumo-geral')}
                      className="w-full md:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] hover:bg-[#D4B26A] text-[#141E17] px-4 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <BookOpenTextIcon className="w-3.5 h-3.5" />
                      <span>Ler Comunicado Completo</span>
                    </button>
                  </div>
                </div>

                {/* Essential Times: 2x2 grid on phones, inline strip from sm */}
                <dl className="mt-5 sm:mt-6 pt-5 border-t border-[#F7F4EE]/15 grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 text-xs text-[#EFECE4]">
                  {[
                    ['Check-in', '15h00'],
                    ['Check-out', 'Até 12h00'],
                    ['Café da manhã', '08h30 – 10h30'],
                    ['Arrumação', 'Chave até 13h30'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-1">
                      <dt className="text-[#E6C786]">{label}:</dt>
                      <dd className="font-mono tabular-nums font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6">
                <WeatherWidget variant="card" />
              </div>

              {/* Search / Filter Bar */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="w-4 h-4 text-[#78716C] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar: Wi-Fi, café, lenha…"
                    aria-label="Buscar informações no guia do hóspede"
                    className="w-full min-h-[48px] pl-11 pr-12 py-2.5 rounded-xl bg-white border border-[#D8CFBE] text-base sm:text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1E2F23] focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Limpar busca"
                      className="min-h-[40px] min-w-[40px] absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#78716C] hover:text-[#1C1917] cursor-pointer"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Cards Grid */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[22px] sm:text-2xl font-semibold text-[#1E2F23]">
                    Categorias do Guia
                  </h2>
                  <span className="text-xs text-[#78716C] font-mono tabular-nums">
                    {filteredCategories.length} {filteredCategories.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                {filteredCategories.length === 0 ? (
                  <div className="rounded-2xl bg-white border border-[#E5DEC9] p-8 text-center">
                    <p className="text-base font-medium text-[#1E2F23]">
                      Nenhuma categoria encontrada para “{searchQuery}”.
                    </p>
                    <p className="text-xs text-[#78716C] mt-1">
                      Tente buscar por termos como Wi-Fi, café, frigobar, lareira ou chave.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="mt-4 min-h-[44px] px-4 py-2 rounded-xl bg-[#EFECE4] text-xs font-semibold text-[#1E2F23] hover:bg-[#E5DEC9] transition-colors cursor-pointer"
                    >
                      Mostrar todas as categorias
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {filteredCategories.map((category) => {
                      const IconComponent = CATEGORY_ICONS[category.id];

                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleOpenCategory(category.id)}
                          className="group text-left rounded-2xl bg-white border border-[#E5DEC9] hover:border-[#6E472B] p-4 sm:p-5 transition-all duration-150 hover:-translate-y-0.5 flex flex-col justify-between sm:min-h-[156px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E2F23]"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-3">
                              <div className="w-11 h-11 rounded-xl bg-[#F7F4EE] border border-[#E5DEC9] group-hover:bg-[#1E2F23] group-hover:border-[#1E2F23] flex items-center justify-center transition-colors">
                                <IconComponent weight="duotone" className="w-6 h-6 text-[#6E472B] group-hover:text-[#C5A059] transition-colors" />
                              </div>

                              <div className="flex items-center gap-1.5 text-xs font-mono text-[#78716C]">
                                <span>{category.number}</span>
                                <CaretRightIcon className="w-4 h-4 text-[#A8A29E] group-hover:text-[#6E472B] group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </div>

                            <h3 className="text-xl font-semibold text-[#1E2F23] mt-3 sm:mt-4 group-hover:text-[#6E472B] transition-colors">
                              {category.title}
                            </h3>
                            <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                              {category.subtitle}
                            </p>
                          </div>

                          <div className="mt-3 sm:mt-4 pt-3 border-t border-[#F7F4EE] flex items-center justify-between text-xs text-[#6E472B] font-medium">
                            <span className="truncate">{category.quickHighlight}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Instant Wi-Fi Copy Bar right on the Menu for 1-Tap Convenience */}
              <div className="mt-8 rounded-2xl bg-[#EFECE4] border border-[#D8CFBE] p-5 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1E2F23] text-[#C5A059] flex items-center justify-center shrink-0 mt-0.5">
                      <WifiHighIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1E2F23]">
                        Acesso Rápido ao Wi-Fi
                      </h3>
                      <p className="text-xs text-[#57534E]">
                        Toque para copiar a senha diretamente sem sair do menu:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {WIFI_NETWORKS.map((net) => {
                      const isCopied = copiedWifiId === net.id;
                      return (
                        <button
                          key={net.id}
                          type="button"
                          onClick={() => handleQuickCopyWifi(net.password, net.id)}
                          className="min-h-[48px] flex items-center justify-between gap-3 rounded-xl bg-white hover:bg-[#F7F4EE] border border-[#D8CFBE] px-4 py-2.5 text-left transition-colors cursor-pointer"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#1E2F23] truncate">
                              {net.ssid}
                            </div>
                            <div className="font-mono text-xs text-[#6E472B]">
                              Senha: {net.password}
                            </div>
                          </div>
                          <div className="shrink-0 flex items-center gap-1 text-xs font-medium text-[#1E2F23]">
                            {isCopied ? (
                              <>
                                <CheckIcon className="w-4 h-4 text-[#1E5E3A]" />
                                <span className="text-[#1E5E3A]">Copiada</span>
                              </>
                            ) : (
                              <>
                                <CopyIcon className="w-3.5 h-3.5 text-[#6E472B]" />
                                <span>Copiar</span>
                              </>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Directions: map + route buttons */}
              <div className="mt-4 rounded-2xl bg-[#EFECE4] border border-[#D8CFBE] overflow-hidden">
                <div className="p-5 sm:p-6 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E2F23] text-[#C5A059] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E2F23]">Como Chegar</h3>
                    <p className="text-xs text-[#57534E]">{LOCATION_INFO.region}</p>
                  </div>
                </div>

                <div className="aspect-[4/3] sm:aspect-[21/9] w-full bg-[#E5DEC9] border-y border-[#D8CFBE]">
                  <iframe
                    src={LOCATION_INFO.embedUrl}
                    title="Mapa da Estalagem Mandeville"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  />
                </div>

                <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={LOCATION_INFO.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] inline-flex items-center justify-center gap-2.5 rounded-xl bg-white hover:bg-[#F7F4EE] border border-[#D8CFBE] px-4 py-2.5 text-sm font-semibold text-[#1E2F23] transition-colors whitespace-nowrap"
                  >
                    <WazeIcon className="w-5 h-5 text-[#33CCFF]" />
                    <span>Ir com o Waze</span>
                  </a>
                  <a
                    href={LOCATION_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] inline-flex items-center justify-center gap-2.5 rounded-xl bg-white hover:bg-[#F7F4EE] border border-[#D8CFBE] px-4 py-2.5 text-sm font-semibold text-[#1E2F23] transition-colors whitespace-nowrap"
                  >
                    <GoogleMapsIcon className="w-5 h-5 text-[#4285F4]" />
                    <span>Ir com o Google Maps</span>
                  </a>
                </div>
              </div>
            </motion.section>
          )}

          {view === 'detail' && (
            <motion.section
              key={`screen-detail-${selectedCategory}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <CategoryDetailView
                categoryId={selectedCategory}
                onBackToMenu={handleBackToMenu}
                onSelectCategory={handleOpenCategory}
                onOpenWhatsApp={(topicId) => setWhatsAppTopic(topicId)}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Quiet Footer when not on full-screen Home */}
      {view !== 'home' && (
        <footer className="border-t border-[#E5DEC9] bg-[#EFECE4]/60 pt-6 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:pb-6 px-4 sm:px-8 text-center text-xs text-[#78716C]">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-display text-base font-semibold text-[#1E2F23]">
              Estalagem Mande Ville · Monte Verde, MG
            </span>
            <span>{POUSADA_INFO.closingText}</span>
          </div>
        </footer>
      )}

      {/* Offline PWA Status Indicator */}
      <OfflineIndicator />

      {/* Floating WhatsApp Quick-Contact Button & Drawer */}
      <WhatsAppWidget
        initialTopic={whatsAppTopic}
        onCloseTopic={() => setWhatsAppTopic(null)}
      />
    </div>
  );
}
