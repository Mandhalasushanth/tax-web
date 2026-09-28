/** Pure in-memory key-value store. */
const memoryStore = new Map<string, string>()

export const localStore = {
  get<T>(key: string): T | null {
    const raw = memoryStore.get(key)
    if (!raw) return null
    try {
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  },
  set<T>(key: string, value: T): void {
    try {
      memoryStore.set(key, JSON.stringify(value))
    } catch {
      /* ignore serialization failure */
    }
  },
  remove(key: string): void {
    memoryStore.delete(key)
  },
  clear(): void {
    memoryStore.clear()
  },
}
