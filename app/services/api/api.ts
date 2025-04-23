import { ApiResponse, ApisauceInstance, create } from 'apisauce';
import Config from '../../config';
import { GeneralApiProblem, getGeneralApiProblem } from './apiProblem';
import type { ApiConfig, TemperatureResponse } from './api.types';
import type { EpisodeSnapshotIn } from '../../models/Episode';

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */

type GetTResult<T> =
  | { kind: 'ok'; data: T }
  | { kind: 'bad-data' }
  | { kind: 'error'; error: string };

type PostTResult = { kind: 'ok' } | { kind: 'bad-data' } | { kind: 'error'; error: string };

interface DateTimeResponse {
  timeZone: string;
  time: string;
  date: string;
}

export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  //GET
  async getTemp(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/temp');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const temperatureValue = parseFloat(response.data);
      return { kind: 'ok', data: temperatureValue };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getDateTime(): Promise<GetTResult<DateTimeResponse>> {
    try {
      const response: ApiResponse<DateTimeResponse> = await this.apisauce.get('/dateTime');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getTempSetpoint(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/tempSetpoint');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const tempSpValue = parseFloat(response.data);
      return { kind: 'ok', data: tempSpValue };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getWeatherTemp(): Promise<GetTResult<string>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/weatherTemp');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Weather Temp' };
      }
      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getWeatherStatus(): Promise<GetTResult<string>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/weatherStatus');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Weather Temp' };
      }
      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getOccupancy(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/occupancy');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Occupancy' };
      }
      const occupancyValue = parseFloat(response.data);
      return { kind: 'ok', data: occupancyValue };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getWaterShutoffValve(): Promise<GetTResult<string>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/WaterShutoffValve');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }

      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getLeakStatus(): Promise<GetTResult<string>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/LeakStatus');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch leak status' };
      }

      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getWaterDetectorStatus(): Promise<GetTResult<string>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/WaterDetectorStatus');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Water Detector Status data' };
      }
      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getBTUAccumulatedConsumption(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuAccumulatedConsumption');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }
  async getBTUMonthlyCost(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuMonthlyCost');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }
  async getBTURate(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuRate');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }
  async getBTUMeterSupplyTemp(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuMeterSupplyTemp');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  //POST
  async postTempSetpoint(value: string): Promise<PostTResult> {
    try {
      const response: ApiResponse<string> = await this.apisauce.post('/postTempSetpoint', {
        value,
      });

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to post Temp Setpoint data' };
      }
      return { kind: 'ok' };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async postOccupancy(value: string): Promise<PostTResult> {
    try {
      const response: ApiResponse<string> = await this.apisauce.post('/postOccupancy', {
        value,
      });

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to Post Occupancy data' };
      }
      return { kind: 'ok' };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async postWaterShutoffValve(value: string): Promise<PostTResult> {
    try {
      const response: ApiResponse<string> = await this.apisauce.post('/postWaterShutoffValve', {
        value,
      });

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to Post Water Shutoff Valve' };
      }
      return { kind: 'ok' };
    } catch (error: unknown) {
      console.log('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api();
