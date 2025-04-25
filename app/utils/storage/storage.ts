import { MMKV } from 'react-native-mmkv';
export const storage = new MMKV();

/**
 * Loads a string from storage.
 *
 * @param {string} key - The key to fetch.
 * @returns {string | null} The stored string or null if not found/error occurred.
 */
export function loadString(key: string): string | null {
  try {
    return storage.getString(key) ?? null;
  } catch (error) {
    console.error(`Error loading string for key "${key}":`, error);
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param {string} key - The key under which to store the value.
 * @param {string} value - The value to store.
 * @returns {boolean} True if save was successful, false otherwise.
 */
export function saveString(key: string, value: string): boolean {
  try {
    storage.set(key, value);
    return true;
  } catch (error) {
    console.error(`Error saving string for key "${key}":`, error);
    return false;
  }
}

/**
 * Loads data from storage and parses it as JSON.
 *
 * @template T - The expected type of the stored data.
 * @param {string} key - The key to fetch the data from storage.
 * @returns {T | null} - The parsed data or null if loading/parsing fails.
 */
export function load<T>(key: string): T | null {
  try {
    const data = loadString(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error parsing JSON for key "${key}":`, error);
    return null;
  }
}

/**
 * Saves data to storage by converting it to JSON.
 *
 * @param {string} key - The key under which to store the data.
 * @param {unknown} value - The value to store.
 * @returns {boolean} - True if the save was successful, false otherwise.
 */
export function save(key: string, value: unknown): boolean {
  try {
    const jsonString = JSON.stringify(value);
    return saveString(key, jsonString);
  } catch (error) {
    console.error(`Error stringifying JSON for key "${key}":`, error);
    return false;
  }
}

/**
 * Removes an item from storage.
 *
 * @param {string} key - The key to remove.
 * @returns {boolean} - True if removal was successful, false otherwise.
 */
export function remove(key: string): boolean {
  try {
    storage.delete(key);
    return true;
  } catch (error) {
    console.error(`Error removing key "${key}":`, error);
    return false;
  }
}

/**
 * Clears all data from storage.
 *
 * @returns {boolean} - True if clear was successful, false otherwise.
 */
export function clear(): boolean {
  try {
    storage.clearAll();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}
