import {
  TemperatureResponse,
  HumidityResponse,
  DateTimeResponse,
  WeatherResponse,
  BTUData,
  OccupancyMode,
} from './api';

export interface UseTemperatureHook {
  temperature: number | null;
  loading: boolean;
  fetchTemp: () => Promise<void>;
}

export interface UseHumidityHook {
  humidity: number | null;
  loading: boolean;
  fetchHumidity: () => Promise<void>;
}

export interface UseTempSetpointHook {
  tempSetpoint: number | null;
  loading: boolean;
  incrementTempSp: (value: number) => Promise<void>;
  decrementTempSp: (value: number) => Promise<void>;
  fetchTempSp: () => Promise<void>;
}

export interface UseOccupancyHook {
  occupancy: OccupancyMode | null;
  changeOccupancy: (mode: OccupancyMode) => Promise<void>;
  fetchOccupancy: () => Promise<void>;
}

export interface UseBTUMeterHook {
  btuData: BTUData;
  fetchRate: () => Promise<void>;
  fetchMonthlyCost: () => Promise<void>;
  fetchSupplyTemp: () => Promise<void>;
  fetchAccumulatedConsumption: () => Promise<void>;
}

export interface UseWeatherHook {
  weather: {
    outdoorAirTemp: number | null;
    status: string | null;
  };
  fetchWeatherTemp: () => Promise<void>;
  fetchWeatherStatus: () => Promise<void>;
}

export interface UseDateTimeHook {
  dateTime: {
    date: string | null;
    time: string | null;
  };
  loading: boolean;
  fetchDateTime: () => Promise<void>;
}

export interface UseWaterMeterHook {
  status: string | null;
  lastUpdated: string | null;
  fetchShutoffValveStatus: () => Promise<void>;
  fetchDetectorStatus: () => Promise<void>;
}
