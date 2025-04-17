import { api } from '@/services/api/api';
import { useCallback, useEffect, useState } from 'react';

export interface TemperatureSetpointResponse {
  kind: 'ok' | 'error';
  data?: number;
  error?: string;
}

export const useTempSetpoint = () => {
  const [tempSetpoint, setTempSetpoint] = useState<number | null>(0);
  const [spLoading, setSpLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTempSp = useCallback(async () => {
    setSpLoading(true);
    try {
      const result = await api.getTempSetpoint();
      if (result.kind === 'ok') {
        setTempSetpoint(result.data);
      } else {
        setError('Failed to load Temperature data');
        setTempSetpoint(null);
      }
    } catch (err) {
      setError(`Error: ${err}`);
      setTempSetpoint(null);
    } finally {
      setSpLoading(false);
    }
  }, []);

  return {
    tempSetpoint,
    setTempSetpoint,
    spLoading,
    setSpLoading,
    error,
    setError,
    incrementTempSp: () => setTempSetpoint((x) => (x !== null && x !== undefined ? x + 0.5 : null)),
    decrementTempSp: () => setTempSetpoint((x) => (x !== null && x !== undefined ? x - 0.5 : null)),
    fetchTempSp,
  };
};
