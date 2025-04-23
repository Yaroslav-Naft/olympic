import { api } from '@/services/api/api';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useHumidity = (refreshInterval = 10000) => {
  const [humidity, setHumidity] = useState<number | null>();
  const [humidityLoading, setHumidityLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHumidity = useCallback(async () => {
    setHumidityLoading(true);
    try {
      const result = await api.getHumidity();
      if (result.kind === 'ok') {
        const convertedToNum = parseFloat(result.data);
        setHumidity(convertedToNum);
      } else {
        setError('Failed to load Temperature data');
        setHumidity(null);
      }
    } catch (err) {
      setError(`Error: ${err}`);
      setHumidity(null);
    } finally {
      setHumidityLoading(false);
    }
  }, []);

  return {
    humidity,
    setHumidity,
    humidityLoading,
    setHumidityLoading,
    error,
    setError,
    fetchHumidity,
  };
};
