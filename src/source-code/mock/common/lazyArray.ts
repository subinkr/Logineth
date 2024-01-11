export async function lazyArray<T>(items: T[] = []): Promise<T[]> {
  const result = [...items];
  return result;
}
