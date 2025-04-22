import { api } from '@/services/api/api';
import { useCallback, useEffect, useRef, useState } from 'react';

interface WaterMeterData {
  valveStatus: string | null;
  detectorStatus: string | null;
}

export const useWaterMeter = (refreshInterval = 10000) => {
  const [waterData, setWaterData] = useState<WaterMeterData>({
    valveStatus: null,
    detectorStatus: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const intervalRef = useRef<NodeJS.Timeout>();

  const fetchShutoffValveStatus = useCallback(async () => {
    try {
      const result = await api.getWaterShutoffValve();
      if (result.kind === 'ok') {
        setWaterData((prev) => ({ ...prev, valveStatus: result.data }));
        setErrors((prev) => ({ ...prev }));
      } else if (result.kind === 'error') {
        setErrors((prev) => ({ ...prev, valveStatus: '' }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, valveStatus: `Error: ${err}` }));
    }
  }, []);

  const fetchDetectorStatus = useCallback(async () => {
    try {
      const result = await api.getWaterDetectorStatus();
      if (result.kind === 'ok') {
        setWaterData((prev) => ({ ...prev, detectorStatus: result.data }));
        setErrors((prev) => ({ ...prev, detectorStatus: '' }));
      } else if (result.kind === 'error') {
        setErrors((prev) => ({ ...prev, detectorStatus: result.error }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, detectorStatus: `Error: ${err}` }));
    }
  }, []);

  // Fetch all Water meter data
  const refreshAllWaterData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchShutoffValveStatus(), fetchDetectorStatus()]);
    } catch (err) {
      console.error('Error fetching Water data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchShutoffValveStatus, fetchDetectorStatus]);

  // Set up auto-refresh
  useEffect(() => {
    refreshAllWaterData();

    if (refreshInterval > 0) {
      intervalRef.current = setInterval(refreshAllWaterData, refreshInterval);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
    return undefined;
  }, [refreshAllWaterData, refreshInterval]);

  return {
    waterData,
    // Individual fetch functions (useful for granular refreshes)
    fetchShutoffValveStatus,
    fetchDetectorStatus,
    isLoading,
    errors,
    refreshAllWaterData,
  };
};
