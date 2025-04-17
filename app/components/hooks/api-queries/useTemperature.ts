import { api } from '@/services/api/api';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface TemperatureResponse {
  kind: 'ok' | 'error';
  data?: number;
  error?: string;
}

export const useTemperature = (refreshInterval = 10000) => {
  const [temp, setTemp] = useState<number | null>();
  const [tempLoading, setTempIsLoading] = useState(false);
  const [error, setError] = useState('');
  const intervalRef = useRef<NodeJS.Timeout>();

  const fetchTemp = useCallback(async () => {
    setTempIsLoading(true);
    try {
      const result = await api.getTemp();
      if (result.kind === 'ok') {
        setTemp(result.data);
      } else {
        setError('Failed to load Temperature data');
        setTemp(null);
      }
    } catch (err) {
      setError(`Error: ${err}`);
      setTemp(null);
    } finally {
      setTempIsLoading(false);
    }
  }, []);

  return {
    temp,
    setTemp,
    tempLoading,
    setTempIsLoading,
    error,
    setError,
    fetchTemp,
  };
};
