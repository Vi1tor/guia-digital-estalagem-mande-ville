import { useEffect, useState } from 'react';
import { LAT, LNG } from '../data/guideData';

export interface Weather {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  isDay: boolean;
  min: number;
  max: number;
  rainChance: number;
  fetchedAt: number;
}

const CACHE_KEY = 'mandeville_weather';
const REFRESH_MS = 15 * 60 * 1000;
const MAX_CACHE_AGE_MS = 60 * 60 * 1000;

const API_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}` +
  '&current=temperature_2m,apparent_temperature,weather_code,is_day' +
  '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
  '&timezone=America%2FSao_Paulo&forecast_days=1';

function readCache(): Weather | null {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (!saved) return null;
    const weather: Weather = JSON.parse(saved);
    return Date.now() - weather.fetchedAt < MAX_CACHE_AGE_MS ? weather : null;
  } catch {
    return null;
  }
}

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(readCache);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (document.hidden) return;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) return;
        const data = await response.json();
        const next: Weather = {
          temperature: data.current.temperature_2m,
          apparentTemperature: data.current.apparent_temperature,
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1,
          min: data.daily.temperature_2m_min[0],
          max: data.daily.temperature_2m_max[0],
          rainChance: data.daily.precipitation_probability_max[0] ?? 0,
          fetchedAt: Date.now(),
        };
        if (cancelled) return;
        setWeather(next);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(next));
        } catch {
          // ignore storage errors
        }
      } catch {
        // offline or API unavailable: keep last known value
      }
    };

    load();
    const timer = window.setInterval(load, REFRESH_MS);
    document.addEventListener('visibilitychange', load);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', load);
    };
  }, []);

  return weather;
}
