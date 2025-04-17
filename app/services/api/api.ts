/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
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

  async getWaterData(): Promise<GetTempSetpointResult> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/');

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

  async getBTUData(): Promise<GetTempSetpointResult> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/tempSetpoint');

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
}

// Singleton instance of the API for convenience
export const api = new Api();
