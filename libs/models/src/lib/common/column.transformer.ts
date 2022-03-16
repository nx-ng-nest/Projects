import { ValueTransformer } from 'typeorm';

/**
 * Transform json data to string when writing,
 * and string to json when reading.
 * @returns
 */
export function jsonStringTransformer(): ValueTransformer {
  return {
    to: (value: any) => value && JSON.stringify(value),
    from: (value: any) => value && JSON.parse(value),
  };
}

