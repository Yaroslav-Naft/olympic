import { ApiResponse, ApisauceInstance, create } from 'apisauce';
import Config from '../../config';
import { GeneralApiProblem, getGeneralApiProblem } from './apiProblem';
import type { ApiConfig, TemperatureResponse } from './api.types';
import type { EpisodeSnapshotIn } from '../../models/Episode';
import { DefaultDeviceState } from '@/components/hooks/api-queries/useWaterMeter';

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

/**
 * Represents the possible results of a GET request to the API.
 *
 * @template T The type of data expected from the API.
 * @property {'ok' | 'bad-data' | 'error'} kind - The type of result.
 * @property {T} [data] - The data returned from the API (only present for 'ok' results).
 * @property {string} [error] - The error message (only present for 'error' results).
 */
type GetTResult<T> =
  | { kind: 'ok'; data: T }
  | { kind: 'bad-data' }
  | { kind: 'error'; error: string };

/**
 * Represents the possible results of a POST request to the API.
 *
 * @property {'ok' | 'bad-data' | 'error'} kind - The type of result.
 * @property {string} [error] - The error message (only present for 'error' results).
 */
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
   *
   * @param {ApiConfig} config - The API configuration. Defaults to DEFAULT_API_CONFIG.
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

  /**
   * Utility function to process API responses with consistent error handling.
   *
   * @template T The type of the response data
   * @template R The type of the processed result
   * @param {ApiResponse<T>} response - The API response to process
   * @param {(data: T) => R} processData - Function to process successful response data
   * @param {string} errorMessage - Error message to use if request fails
   * @returns {GetTResult<R>} Processed result with consistent error handling
   */
  private processApiResponse<T, R>(
    response: ApiResponse<T>,
    processData: (data: T) => R,
    errorMessage: string,
  ): GetTResult<R> {
    if (!response.data || !response.ok) {
      return { kind: 'error', error: errorMessage };
    }
    try {
      const result = processData(response.data);
      return { kind: 'ok', data: result };
    } catch (error) {
      console.error('FETCH: Error processing response data', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Utility function to handle API requests with consistent error handling.
   *
   * @template T The type of the response data
   * @template R The type of the processed result
   * @param {() => Promise<ApiResponse<T>>} requestFn - Function that returns the API request
   * @param {(data: T) => R} processData - Function to process successful response data
   * @param {string} errorMessage - Error message to use if request fails
   * @returns {Promise<GetTResult<R>>} Processed result with consistent error handling
   */
  private async handleApiRequest<T, R>(
    requestFn: () => Promise<ApiResponse<T>>,
    processData: (data: T) => R,
    errorMessage: string,
  ): Promise<GetTResult<R>> {
    try {
      const response = await requestFn();
      return this.processApiResponse(response, processData, errorMessage);
    } catch (error) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the current temperature reading from the server.
   *
   * @returns {Promise<GetTResult<number>>} A promise that resolves to the temperature data or an error.
   */
  async getTemp(): Promise<GetTResult<number>> {
    return this.handleApiRequest(
      () => this.apisauce.get<string>('/temp'),
      (data) => parseFloat(data),
      'Failed to fetch temperature data',
    );
  }

  /**
   * Fetches the current humidity reading from the server.
   *
   * @returns {Promise<GetTResult<string>>} A promise that resolves to the humidity data or an error.
   */
  async getHumidity(): Promise<GetTResult<string>> {
    return this.handleApiRequest(
      () => this.apisauce.get<string>('/humidity'),
      (data) => data,
      'Failed to fetch humidity data',
    );
  }

  async getDateTime(): Promise<GetTResult<DateTimeResponse>> {
    return this.handleApiRequest(
      () => this.apisauce.get<DateTimeResponse>('/dateTime'),
      (data) => data,
      'Failed to fetch date/time data',
    );
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
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the current weather temperature from the server.
   *
   * @returns {Promise<GetTResult<string>>} A promise that resolves to the weather temperature data or an error.
   */
  async getWeatherTemp(): Promise<GetTResult<string>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/weatherTemp');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Weather Temp' };
      }
      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the current weather status from the server.
   *
   * @returns {Promise<GetTResult<string>>} A promise that resolves to the weather status data or an error.
   */
  async getWeatherStatus(): Promise<GetTResult<string>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/weatherStatus');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Weather Temp' };
      }
      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
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
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  async getWaterShutoffValve(): Promise<GetTResult<DefaultDeviceState | null>> {
    try {
      const response: ApiResponse<DefaultDeviceState | null> =
        await this.apisauce.get('/WaterShutoffValve');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }

      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the current leak status from the server.
   *
   * @returns {Promise<GetTResult<string>>} A promise that resolves to the leak status data or an error.
   */
  async getLeakStatus(): Promise<GetTResult<string>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/LeakStatus');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch leak status' };
      }

      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the current water detector status from the server.
   *
   * @returns {Promise<GetTResult<string>>} A promise that resolves to the water detector status data or an error.
   */
  async getWaterDetectorStatus(): Promise<GetTResult<string>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/WaterDetectorStatus');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Water Detector Status data' };
      }
      return { kind: 'ok', data: response.data };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the accumulated BTU consumption from the server.
   *
   * @returns {Promise<GetTResult<number>>} A promise that resolves to the accumulated BTU consumption data or an error.
   */
  async getBTUAccumulatedConsumption(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuAccumulatedConsumption');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the monthly BTU cost from the server.
   *
   * @returns {Promise<GetTResult<number>>} A promise that resolves to the monthly BTU cost data or an error.
   */
  async getBTUMonthlyCost(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuMonthlyCost');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the current BTU rate from the server.
   *
   * @returns {Promise<GetTResult<number>>} A promise that resolves to the BTU rate data or an error.
   */
  async getBTURate(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuRate');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the BTU meter supply temperature from the server.
   *
   * @returns {Promise<GetTResult<number>>} A promise that resolves to the BTU meter supply temperature data or an error.
   */
  async getBTUMeterSupplyTemp(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuMeterSupplyTemp');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the BTU meter return temperature from the server.
   *
   * @returns {Promise<GetTResult<number>>} A promise that resolves to the BTU meter return temperature data or an error.
   */
  async getBTUMeterReturnTemp(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuMeterReturnTemp');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Fetches the BTU meter flow rate from the server.
   *
   * @returns {Promise<GetTResult<number>>} A promise that resolves to the BTU meter flow rate data or an error.
   */
  async getBTUMeterFlowRate(): Promise<GetTResult<number>> {
    try {
      const response: ApiResponse<string> = await this.apisauce.get('/btuMeterFlowRate');

      if (!response.data || !response.ok) {
        return { kind: 'error', error: 'Failed to fetch Temp data' };
      }
      const value = parseFloat(response.data);
      return { kind: 'ok', data: value };
    } catch (error: unknown) {
      console.error('FETCH: Error during request', error);
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
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Posts the occupancy status to the server.
   *
   * @param {string} value - The occupancy status to set.
   * @returns {Promise<PostTResult>} A promise that resolves to the result of the operation.
   */
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
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }

  /**
   * Posts the water shutoff valve status to the server.
   *
   * @param {string} value - The valve status to set.
   * @returns {Promise<PostTResult>} A promise that resolves to the result of the operation.
   */
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
      console.error('FETCH: Error during request', error);
      return { kind: 'bad-data' };
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api();
