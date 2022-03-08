export function ToStringFromJSONTransformer<T = unknown>() {
  return {
    to: (value: T) => {
      return JSON.stringify(value);
    },
    from: (value: string) => {
      return JSON.parse(value);
    },
  };
}
