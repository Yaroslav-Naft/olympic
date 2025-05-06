import { useCallback } from 'react';

export const useRefreshAllData = ({
  fetchTemp,
  fetchHumidity,
  fetchOccupancy,
  fetchTempSp,
  fetchDateTime,
  fetchShutoffValveStatus,
  fetchDetectorStatus,
  fetchSupplyTemp,
  fetchMonthlyCost,
  fetchRate,
  fetchAccumulatedConsumption,
  fetchWeatherTemp,
  fetchWeatherStatus,
}: RefreshAllDeps) => {
  return useCallback(async () => {
    try {
      await Promise.all([
        fetchTemp(),
        fetchHumidity(),
        fetchOccupancy(),
        fetchTempSp(),
        fetchDateTime(),
        fetchShutoffValveStatus(),
        fetchDetectorStatus(),
        fetchSupplyTemp(),
        fetchMonthlyCost(),
        fetchRate(),
        fetchAccumulatedConsumption(),
        fetchWeatherTemp(),
        fetchWeatherStatus(),
      ]);
    } catch (err) {
      console.error('🔴 Error during data refresh:', err);
    }
  }, [
    fetchTemp,
    fetchHumidity,
    fetchOccupancy,
    fetchTempSp,
    fetchDateTime,
    fetchShutoffValveStatus,
    fetchDetectorStatus,
    fetchSupplyTemp,
    fetchMonthlyCost,
    fetchRate,
    fetchAccumulatedConsumption,
    fetchWeatherTemp,
    fetchWeatherStatus,
  ]);
};
