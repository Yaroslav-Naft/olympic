import { api } from '@/services/api/api';
import { parse } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

interface Weather {
  outdoorAirTemp: string;
  status: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather>({
    outdoorAirTemp: '',
    status: '',
  });
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherTemp = useCallback(async () => {
    setWeatherLoading(true);
    try {
      const result = await api.getWeatherTemp();
      if (result.kind === 'ok') {
        setWeather((prev) => ({ ...prev, outdoorAirTemp: result.data }));
      } else {
        setError('Failed to load Weather data');
      }
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  const fetchWeatherStatus = useCallback(async () => {
    setWeatherLoading(true);
    try {
      const result = await api.getWeatherStatus();
      if (result.kind === 'ok') {
        setWeather((prev) => ({ ...prev, status: result.data }));
      } else {
        setError('Failed to load Weather data');
      }
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  return {
    weather,
    setWeather,
    weatherLoading,
    setWeatherLoading,
    error,
    setError,
    fetchWeatherTemp,
    fetchWeatherStatus,
  };
};
