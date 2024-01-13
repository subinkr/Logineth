export function getArray<T>(items: T[] = []): T[] {
  const result = [...items];
  return result;
}
