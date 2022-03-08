import { hashSync } from 'bcrypt';

export function ToHashFromStringTransformer() {
  return {
    to: (value: string) => hashSync(value, 8),
    from: (value: string) => value,
  };
}
