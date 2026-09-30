import React from 'react';
import {
  WifiSlashIcon,
} from '@phosphor-icons/react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-4 z-40 flex items-center gap-2 rounded-xl bg-[#6E472B] px-3.5 py-2 text-xs font-medium text-[#F7F4EE] shadow-lg"
    >
      <WifiSlashIcon className="w-3.5 h-3.5 text-[#E6C786] shrink-0" />
      <span>Modo Offline · Guia disponível para consulta</span>
    </div>
  );
};
