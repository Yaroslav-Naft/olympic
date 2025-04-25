//Non-Primitive Type Utils

/**
 * Checks if the given value is an array.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is an array, false otherwise.
 */
export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

/**
 * Checks if the given value is a function.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is a function, false otherwise.
 */
export function isFunction(value: unknown): boolean {
  return typeof value === 'function';
}

/**
 * Checks if the given value is an object (not null).
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is an object and not null, false otherwise.
 */
export function isObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null;
}

/**
 * Checks if the given value is a plain object (created by {} or Object.create(null)).
 * A plain object is one whose prototype is Object.prototype or null.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is a plain object, false otherwise.
 */
export function isPlainObject(value: unknown): boolean {
  //use previous util to check if object
  if (!isObject(value)) return false;

  const proto = Object.getPrototypeOf(value);

  return proto === Object.prototype || proto === null;
}
