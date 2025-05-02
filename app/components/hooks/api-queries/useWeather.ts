import { api } from '@/services/api/api';
import { useCallback, useState } from 'react';

interface Weather {
  refetchWeatherTemp: () => Promise<void>;
  refetchWeatherStatus: () => Promise<void>;
  outdoorAirTemp: string;
  status: string;
}

/**
 * A custom hook that fetches and manages weather information from the API.
 * Provides real-time updates of the outdoor air temperature and weather status.
 *
 * @returns {object} An object containing:
 *   - weather: The current Weather object with outdoor temperature and status
 *   - error: Any error that occurred during the fetch
 *   - isLoading: Boolean indicating if the data is being fetched
 *   - refetchTemp: Function to manually trigger a refresh of the temperature
 *   - refetchStatus: Function to manually trigger a refresh of the status
 */
export function useWeather() {
  const [weather, setWeather] = useState<Weather>({
    outdoorAirTemp: '',
    status: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherTemp = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await api.getWeatherTemp();
      if (result.kind === 'ok') {
        setWeather((prev) => ({ ...prev, outdoorAirTemp: result.data }));
      } else if (result.kind === 'error') {
        setError(result.error);
      } else {
        setError('Failed to process weather temperature data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchWeatherStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await api.getWeatherStatus();
      if (result.kind === 'ok') {
        setWeather((prev) => ({ ...prev, status: result.data }));
      } else if (result.kind === 'error') {
        setError(result.error);
      } else {
        setError('Failed to process weather status data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    weather,
    error,
    isLoading,
    fetchWeatherTemp,
    fetchWeatherStatus,
  };
}
