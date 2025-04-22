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

  async function incrementTempSp(increment: number) {
    const newSetpoint = tempSetpoint && tempSetpoint + increment;

    try {
      const result = await api.postTempSetpoint(newSetpoint ? newSetpoint?.toFixed(1) : '0');
      if (result.kind === 'ok') {
        setTempSetpoint((x) => (x !== null && x !== undefined ? x + increment : null));
      }
    } catch (err) {
      setError(`Error: ${err}`);
      console.error(`Error: ${err}`);
    }
    return;
  }

  async function decrementTempSp(decrement: number) {
    const newSetpoint = tempSetpoint && tempSetpoint + decrement;

    try {
      const result = await api.postTempSetpoint(newSetpoint!.toFixed(1));
      if (result.kind === 'ok') {
        setTempSetpoint((x) => (x !== null && x !== undefined ? x - decrement : null));
      }
    } catch (err) {
      setError(`Error: ${err}`);
      console.error(`Error: ${err}`);
    }
    return;
  }

  return {
    tempSetpoint,
    setTempSetpoint,
    spLoading,
    setSpLoading,
    error,
    setError,
    incrementTempSp,
    decrementTempSp,
    fetchTempSp,
  };
};
