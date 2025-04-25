//Primitive Type Utils

/**
 * Checks if the given value is a boolean.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is a boolean, false otherwise.
 */
export function isBoolean(value: unknown): boolean {
  return value === true || value === false;
}

/**
 * Checks if the given value is a number.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is a number, false otherwise.
 */
export function isNumber(value: unknown): boolean {
  return typeof value === 'number';
}

/**
 * Checks if the given value is null.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is null, false otherwise.
 */
export function isNull(value: unknown): boolean {
  return value === null;
}

/**
 * Checks if the given value is a string.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is a string, false otherwise.
 */
export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

/**
 * Checks if the given value is a symbol.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is a symbol, false otherwise.
 */
export function isSymbol(value: unknown): boolean {
  return typeof value === 'symbol';
}

/**
 * Checks if the given value is undefined.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is undefined, false otherwise.
 */
export function isUndefined(value: unknown): boolean {
  return value === undefined;
}
