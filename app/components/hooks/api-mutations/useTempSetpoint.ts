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
    let newValue: null | number = null;

    //abstracted logic outside
    setTempSetpoint((prev) => {
      if (prev !== null && prev !== undefined) {
        newValue = prev + increment;
        return newValue;
      }
      //if undefined or null return previous value
      return prev;
    });

    if (newValue === null) return;

    try {
      const result = await api.postTempSetpoint(newValue?.toFixed(1));
      if (result.kind !== 'ok') {
        throw new Error('Failed to update');
      }
    } catch (err) {
      setError(`Error: ${err}`);
      console.error(`Error: ${err}`);
    }
    return;
  }

  async function decrementTempSp(decrement: number) {
    let newValue: null | number = null;

    //abstracted logic outside
    setTempSetpoint((prev) => {
      if (prev !== null && prev !== undefined) {
        newValue = prev - decrement;
        return newValue;
      }
      //if undefined or null return previous value
      return prev;
    });

    if (newValue === null) return;

    try {
      const result = await api.postTempSetpoint(newValue?.toFixed(1));
      if (result.kind !== 'ok') {
        throw new Error('Failed to update');
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
