import { api } from '@/services/api/api';
import { useCallback, useEffect, useState } from 'react';

export const useOccupancy = () => {
  const [occupancy, setOccupancy] = useState<string | null>('0');
  const [error, setError] = useState('');
  const [spLoading, setSpLoading] = useState(false);

  const fetchOccupancy = useCallback(async () => {
    setSpLoading(true);
    try {
      const result = await api.getOccupancy();

      if (result.kind === 'ok') {
        setOccupancy(result.data);
      } else {
        setError('Failed to load Temperature data');
        setOccupancy(null);
      }
    } catch (err) {
      setError(`Error: ${err}`);
      setOccupancy(null);
    } finally {
      setSpLoading(false);
    }
  }, []);

  async function changeOccupancy(value: string): Promise<void> {
    try {
      const result = await api.postOccupancy(value);
      if (result.kind === 'ok') {
        setOccupancy(value);
      }
    } catch (err) {
      setOccupancy('');
      setError(`Error: ${err}`);
      console.error(`Error: ${err}`);
    }
    return;
  }

  return {
    occupancy,
    setOccupancy,
    error,
    setError,
    changeOccupancy,
    fetchOccupancy,
    spLoading,
  };
};
