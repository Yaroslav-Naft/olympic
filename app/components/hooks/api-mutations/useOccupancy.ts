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
      console.log(`occupancy we got ${result.data}`);

      if (result.kind === 'ok') {
        console.log(`setting occupancy result.data`);
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

  async function changeOccupancy(value: string) {
    console.log(`got in with ${value}`);
    try {
      const result = await api.postOccupancy(value);
      console.log(`after result changed to ${value}`);
      if (result.kind === 'ok') {
        setOccupancy(value);
        console.log(`success occupancy changed to ${value}`);
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
