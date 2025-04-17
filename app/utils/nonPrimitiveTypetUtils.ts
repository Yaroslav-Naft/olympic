//Non-Primitive Type Utils

//isArray(value)
export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

//isFunction()
export function isFunction(value: unknown): boolean {
  return typeof value === 'function';
}

//isObject(value)
export function isObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null;
}

//isPlainObject(value) -- axny object whose prototype is Object.prototype
// or object create with Object.create(null)
export function isPlainObject(value: unknown): boolean {
  //use previous util to check if object
  if (!isObject(value)) return false;

  const proto = Object.getPrototypeOf(value);

  return proto === Object.prototype || proto === null;
}
