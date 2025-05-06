import { ImageSourcePropType } from 'react-native';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export interface TemperatureResponse {
  temperature: number | null;
  loading: boolean;
}

export interface HumidityResponse {
  humidity: number | null;
  loading: boolean;
}

export interface DateTimeResponse {
  date: string | null;
  time: string | null;
  loading: boolean;
}

export interface WeatherResponse {
  outdoorAirTemp: number | null;
  status: string | null;
  loading: boolean;
}

export interface BTUData {
  rate: number | null;
  monthlyCost: number | null;
  accumulatedConsumption: number | null;
  supplyTemp: number | null;
}

// Occupancy Types
export type OccupancyMode = '7' | '1' | '2' | '4';

// Device Types
export interface DeviceMetric {
  label: string;
  value: number | string;
}

export interface DeviceConfig {
  name: string;
  imageSrc: ImageSourcePropType;
  metrics?: DeviceMetric[];
  component?: React.ReactNode;
}
