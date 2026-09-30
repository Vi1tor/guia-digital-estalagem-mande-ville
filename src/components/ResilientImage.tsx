import React, { useState } from 'react';
import {
  MountainsIcon,
} from '@phosphor-icons/react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel = 'Estalagem Mandeville · Monte Verde',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1E2F23] via-[#2A4030] to-[#3E2A1D] text-[#F7F4EE] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <MountainsIcon className="w-10 h-10 text-[#C5A059] mb-2 opacity-80" />
        <span className="font-display text-lg tracking-wide text-[#F7F4EE]/90">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
