import { api } from '@/services/api/api';
import { useCallback, useEffect, useRef, useState } from 'react';

// export interface BTUMeterData {
//   supplyTemp: number | null;
//   monthlyCost: number | null;
//   rate: number | null;
//   accumulatedConsumption: number | null;
// }

interface BTUMeterData {
  supplyTemp: number | null;
  monthlyCost: number | null;
  rate: number | null;
  accumulatedConsumption: number | null;
}

export const useBTUMeter = (refreshInterval = 10000) => {
  const [btuData, setBtuData] = useState<BTUMeterData>({
    supplyTemp: null,
    monthlyCost: null,
    rate: null,
    accumulatedConsumption: null,
  });

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // For auto-refresh
  const intervalRef = useRef<NodeJS.Timeout>();

  // Individual fetch functions
  const fetchSupplyTemp = useCallback(async () => {
    try {
      const result = await api.getBTUMeterSupplyTemp();
      if (result.kind === 'ok') {
        setBtuData((prev) => ({ ...prev, supplyTemp: result.data }));
        setErrors((prev) => ({ ...prev, supplyTemp: '' }));
      } else if (result.kind === 'error') {
        setErrors((prev) => ({ ...prev, supplyTemp: result.error }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, supplyTemp: `Error: ${err}` }));
    }
  }, []);

  const fetchMonthlyCost = useCallback(async () => {
    try {
      const result = await api.getBTUMonthlyCost();
      if (result.kind === 'ok') {
        setBtuData((prev) => ({ ...prev, monthlyCost: result.data }));
        setErrors((prev) => ({ ...prev, monthlyCost: '' }));
      } else if (result.kind === 'error') {
        setErrors((prev) => ({ ...prev, monthlyCost: result.error }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, monthlyCost: `Error: ${err}` }));
    }
  }, []);

  const fetchRate = useCallback(async () => {
    try {
      const result = await api.getBTURate();

      if (result.kind === 'ok') {
        setBtuData((prev) => ({ ...prev, rate: result.data }));
        setErrors((prev) => ({ ...prev, rate: '' }));
      } else if (result.kind === 'error') {
        setErrors((prev) => ({ ...prev, rate: result.error }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, rate: `Error: ${err}` }));
    }
  }, []);

  const fetchAccumulatedConsumption = useCallback(async () => {
    try {
      const result = await api.getBTUAccumulatedConsumption();
      if (result.kind === 'ok') {
        setBtuData((prev) => ({ ...prev, accumulatedConsumption: result.data }));
        setErrors((prev) => ({ ...prev, accumulatedConsumption: '' }));
      } else if (result.kind === 'error') {
        setErrors((prev) => ({ ...prev, accumulatedConsumption: result.error }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, accumulatedConsumption: `Error: ${err}` }));
    }
  }, []);

  // Fetch all BTU meter data
  const refreshAllBTUData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchSupplyTemp(),
        fetchMonthlyCost(),
        fetchRate(),
        fetchAccumulatedConsumption(),
      ]);
    } catch (err) {
      console.error('Error fetching BTU data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchSupplyTemp, fetchMonthlyCost, fetchRate, fetchAccumulatedConsumption]);

  // Set up auto-refresh
  useEffect(() => {
    refreshAllBTUData();

    if (refreshInterval > 0) {
      intervalRef.current = setInterval(refreshAllBTUData, refreshInterval);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
    return undefined;
  }, [refreshAllBTUData, refreshInterval]);

  return {
    btuData,
    isLoading,
    errors,
    refreshAllBTUData,
    // Individual fetch functions (useful for granular refreshes)
    fetchSupplyTemp,
    fetchMonthlyCost,
    fetchRate,
    fetchAccumulatedConsumption,
  };
};
