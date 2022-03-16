export function createPermission(type: 'READ' | 'WRITE', resource: string) {
  return `${type}:resource.toString()`;
}
