import { useCallback } from 'react';
import { useOccupancy } from '../api-mutations/useOccupancy';
import { useTempSetpoint } from '../api-mutations/useTempSetpoint';
import { useBTUMeter } from './useBTUMeter';
import { useDateTime } from './useDateTime';
import { useHumidity } from './useHumidity';
import { useTemperature } from './useTemperature';
import { useWaterMeter } from './useWaterMeter';
import { useWeather } from './useWeather';

export const useRefreshAllData = () => {
  const { fetchTemp } = useTemperature();
  const { fetchOccupancy } = useOccupancy();
  const { fetchTempSp } = useTempSetpoint();
  const { refetchDateTime } = useDateTime();
  const { fetchShutoffValveStatus, fetchDetectorStatus } = useWaterMeter();
  const { fetchSupplyTemp, fetchMonthlyCost, fetchRate, fetchAccumulatedConsumption } =
    useBTUMeter();
  const { refetchWeatherTemp, refetchWeatherStatus } = useWeather();
  const { fetchHumidity } = useHumidity();

  return useCallback(async () => {
    try {
      await Promise.all([
        fetchTemp(),
        fetchOccupancy(),
        fetchTempSp(),
        refetchDateTime(),
        fetchShutoffValveStatus(),
        fetchDetectorStatus(),
        fetchSupplyTemp(),
        fetchMonthlyCost(),
        fetchRate(),
        fetchAccumulatedConsumption(),
        refetchWeatherTemp(),
        refetchWeatherStatus(),
        fetchHumidity(),
      ]);
    } catch (err) {
      console.error(`error fetching data ${err}`);
    }
  }, []);
};
