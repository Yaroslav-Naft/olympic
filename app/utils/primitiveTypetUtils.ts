//Primitive Type Utils

//isBoolean(value)
export function isBoolean(value: unknown): boolean {
  return value === true || value === false;
}

//isNumber(value)
export function isNumber(value: unknown): boolean {
  return typeof value === 'number';
}

//isNull(value)
export function isNull(value: unknown): boolean {
  return value === null;
}

//isString(value)
export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

//isSymbol(value)
export function isSymbol(value: unknown): boolean {
  return typeof value === 'symbol';
}

//isUndefined(value)
export function isUndefined(value: unknown): boolean {
  return value === undefined;
}
