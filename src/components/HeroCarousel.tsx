import { useEffect, useState, type ReactNode } from 'react';
import { HERO_SLIDES } from '../data/guideData';
import { ResilientImage } from './ResilientImage';

export function HeroCarousel({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!pageVisible) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [pageVisible]);

  return (
    <div
      role="region"
      aria-label="Conheça a Estalagem Mande Ville"
      className="relative isolate flex flex-1 flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <ResilientImage
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1712]/90 via-[#141E17]/55 to-[#141E17]/30" />
      </div>

      {children}

      <p className="relative z-10 mx-auto mb-6 px-4 text-center text-xs text-[#EFECE4]">
        {HERO_SLIDES[activeIndex].caption}
      </p>
    </div>
  );
}
