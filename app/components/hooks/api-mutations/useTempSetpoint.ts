import { api } from '@/services/api/api';
import { useCallback, useState } from 'react';

export interface TemperatureSetpointResponse {
  kind: 'ok' | 'error';
  data?: number;
  error?: string;
}

/**
 * Custom hook for managing temperature setpoint operations.
 * Provides functionality to fetch, increment, and decrement temperature setpoints.
 *
 * @returns {Object} An object containing temperature setpoint state and operations.
 */
export const useTempSetpoint = () => {
  const [tempSetpoint, setTempSetpoint] = useState<number | null>(0);
  const [spLoading, setSpLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Fetches the current temperature setpoint from the API.
   */
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

  /**
   * Increments the temperature setpoint by the specified amount.
   *
   * @param {number} increment - The amount to increase the temperature by.
   */
  const incrementTempSp = useCallback(async (increment: number) => {
    let newValue: number | null = null;

    setTempSetpoint((prev) => {
      if (prev !== null && prev !== undefined) {
        newValue = prev + increment;
        return newValue;
      }
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
  }, []);

  /**
   * Decrements the temperature setpoint by the specified amount.
   *
   * @param {number} decrement - The amount to decrease the temperature by.
   */
  const decrementTempSp = useCallback(async (decrement: number) => {
    let newValue: number | null = null;

    setTempSetpoint((prev) => {
      if (prev !== null && prev !== undefined) {
        newValue = prev - decrement;
        return newValue;
      }
      return prev;
    });

    if (newValue === null) return;

    try {
      //TODO: fix type error
      const result = await api.postTempSetpoint(newValue?.toFixed(1));
      if (result.kind !== 'ok') {
        throw new Error('Failed to update');
      }
    } catch (err) {
      setError(`Error: ${err}`);
      console.error(`Error: ${err}`);
    }
  }, []);

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
