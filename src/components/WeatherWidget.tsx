import {
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudMoonIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  UmbrellaIcon,
  type Icon,
} from '@phosphor-icons/react';
import { useWeather } from '../hooks/useWeather';

// WMO weather codes: https://open-meteo.com/en/docs
function describe(code: number, isDay: boolean): { label: string; icon: Icon } {
  if (code === 0) return { label: isDay ? 'Ensolarado' : 'Céu limpo', icon: isDay ? SunIcon : MoonIcon };
  if (code === 1) return { label: 'Poucas nuvens', icon: isDay ? SunIcon : MoonIcon };
  if (code === 2) return { label: 'Parcialmente nublado', icon: isDay ? CloudSunIcon : CloudMoonIcon };
  if (code === 3) return { label: 'Nublado', icon: CloudIcon };
  if (code === 45 || code === 48) return { label: 'Neblina', icon: CloudFogIcon };
  if (code >= 51 && code <= 57) return { label: 'Garoa', icon: CloudRainIcon };
  if (code === 61 || code === 66) return { label: 'Chuva fraca', icon: CloudRainIcon };
  if (code === 63) return { label: 'Chuva', icon: CloudRainIcon };
  if (code === 65 || code === 67) return { label: 'Chuva forte', icon: CloudRainIcon };
  if (code >= 80 && code <= 82) return { label: 'Pancadas de chuva', icon: CloudRainIcon };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { label: 'Neve', icon: CloudSnowIcon };
  if (code >= 95) return { label: 'Tempestade', icon: CloudLightningIcon };
  return { label: 'Tempo instável', icon: CloudIcon };
}

const deg = (value: number) => `${Math.round(value)}°`;

export function WeatherWidget({ variant }: { variant: 'chip' | 'card' }) {
  const weather = useWeather();
  if (!weather) return null;

  const { label, icon: WeatherIcon } = describe(weather.weatherCode, weather.isDay);

  if (variant === 'chip') {
    return (
      <div
        className="inline-flex items-center gap-2 rounded-full border border-[#F7F4EE]/25 bg-[#141E17]/40 backdrop-blur-sm px-3 py-1.5 text-xs text-[#F7F4EE]"
        aria-label={`Agora em Monte Verde: ${deg(weather.temperature)}, ${label}`}
      >
        <WeatherIcon className="w-4 h-4 text-[#E6C786]" />
        <span className="font-mono tabular-nums font-medium">{deg(weather.temperature)}</span>
        <span className="text-[#E5DEC9]/90">{label}</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#1E2F23] text-[#E6C786] flex items-center justify-center shrink-0">
          <WeatherIcon className="w-8 h-8" />
        </div>
        <div>
          <div className="text-xs font-medium text-[#6E472B]">Agora em Monte Verde</div>
          <div className="flex flex-wrap items-baseline gap-x-2 mt-0.5">
            <span className="text-3xl font-semibold text-[#1E2F23] font-mono tabular-nums">
              {deg(weather.temperature)}
            </span>
            <span className="text-base font-medium text-[#1E2F23]">{label}</span>
          </div>
          <div className="text-xs text-[#57534E] mt-0.5">
            Sensação de {deg(weather.apparentTemperature)}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#EFECE4] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#57534E]">
        <div>
          <span className="text-[#6E472B]">Mín.</span>{' '}
          <span className="font-mono tabular-nums font-medium text-[#1E2F23]">{deg(weather.min)}</span>
        </div>
        <div>
          <span className="text-[#6E472B]">Máx.</span>{' '}
          <span className="font-mono tabular-nums font-medium text-[#1E2F23]">{deg(weather.max)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <UmbrellaIcon className="w-4 h-4 text-[#6E472B]" />
          <span>
            Chance de chuva hoje:{' '}
            <span className="font-mono tabular-nums font-medium text-[#1E2F23]">{weather.rainChance}%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
