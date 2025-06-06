import { api } from '@/services/api/api';
import { useCallback, useEffect, useRef, useState } from 'react';

export enum DefaultDeviceState {
  Active = 'Active',
  Inactive = 'Inactive',
}

interface WaterMeterData {
  valveStatus: DefaultDeviceState | null;
  detectorStatus: DefaultDeviceState | null;
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
        setWaterData((prev) => ({ ...prev, detectorStatus: result.data }) as WaterMeterData);
        setErrors((prev) => ({ ...prev, detectorStatus: '' }));
      } else if (result.kind === 'error') {
        setErrors((prev) => ({ ...prev, detectorStatus: result.error }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, detectorStatus: `Error: ${err}` }));
    }
  }, []);

  const postWaterShutoffValve = useCallback(async (value: string) => {
    try {
      const result = await api.postWaterShutoffValve(value);
      if (result.kind === 'ok') {
        setWaterData((prev) => ({ ...prev, valveStatus: value }) as WaterMeterData);
        setErrors((prev) => ({ ...prev, valveStatus: '' }));
      } else if (result.kind === 'error') {
        setErrors((prev) => ({ ...prev, valveStatus: result.error }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, valveStatus: `Error ${err}` }));
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
    return;
  }, [refreshAllWaterData, refreshInterval]);

  return {
    waterData,
    fetchShutoffValveStatus,
    fetchDetectorStatus,
    postWaterShutoffValve,
    isLoading,
    errors,
    refreshAllWaterData,
  };
};
