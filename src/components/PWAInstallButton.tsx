import React, { useState } from 'react';
import {
  DownloadSimpleIcon,
  ExportIcon,
  XIcon,
} from '@phosphor-icons/react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="min-h-[40px] flex items-center gap-2 rounded-lg bg-[#263B2C] px-3.5 py-2 text-xs font-medium text-[#F7F4EE] hover:bg-[#1E2F23] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
        title="Salvar Guia no Celular (Acesso Offline)"
      >
        <DownloadSimpleIcon className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>Salvar no Celular</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="min-h-[40px] flex items-center gap-1.5 rounded-lg border border-[#D8CFBE] bg-white/80 px-3 py-2 text-xs font-medium text-[#1E2F23] hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <DownloadSimpleIcon className="w-3.5 h-3.5 text-[#6E472B]" />
          <span>Instalar App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#F7F4EE] border border-[#D8CFBE] p-6 shadow-xl text-[#1C1917]">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-[#1E2F23]">
                  Salvar Guia no iPhone
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="min-h-[40px] min-w-[40px] -mr-2 -mt-2 flex items-center justify-center rounded-lg text-[#57534E] hover:text-[#1C1917]"
                  aria-label="Fechar instruções"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Tenha o guia da Estalagem Mandeville sempre à mão no seu chalé, mesmo sem internet:
              </p>
              <ol className="mt-4 space-y-2.5 text-sm text-[#1C1917]">
                <li className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-medium text-[#6E472B]">01.</span>
                  <span>
                    Toque no botão <strong>Compartilhar</strong>{' '}
                    <ExportIcon className="inline w-3.5 h-3.5 text-[#6E472B] mx-0.5" /> na barra do Safari.
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-medium text-[#6E472B]">02.</span>
                  <span>
                    Role para baixo e escolha <strong>Adicionar à Tela de Início</strong>.
                  </span>
                </li>
              </ol>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full min-h-[44px] rounded-xl bg-[#1E2F23] py-2.5 text-sm font-medium text-[#F7F4EE] hover:bg-[#263B2C] transition-colors cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
