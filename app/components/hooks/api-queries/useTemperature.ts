import { api } from '@/services/api/api';
import { useCallback, useState } from 'react';

export interface TemperatureResponse {
  kind: 'ok' | 'error';
  data?: number;
  error?: string;
}

export const useTemperature = () => {
  const [temperature, setTemperature] = useState<number | null>();
  const [tempLoading, setTempIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTemp = useCallback(async () => {
    setTempIsLoading(true);
    try {
      const result = await api.getTemp();
      if (result.kind === 'ok') {
        setTemperature(result.data);
      } else {
        setError('Failed to load Temperature data');
        setTemperature(null);
      }
    } catch (err) {
      setError(`Error: ${err}`);
      setTemperature(null);
    } finally {
      setTempIsLoading(false);
    }
  }, []);

  return {
    temperature,
    setTemperature,
    tempLoading,
    setTempIsLoading,
    error,
    setError,
    fetchTemp,
  };
};
