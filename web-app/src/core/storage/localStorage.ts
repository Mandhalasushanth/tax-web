/** Browser localStorage wrapper with memory fallback and error protection. */
const memoryStore = new Map<string, string>()

const isStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

export const localStore = {
  get<T>(key: string): T | null {
    if (isStorageAvailable()) {
      try {
        const item = window.localStorage.getItem(key)
        if (item !== null) {
          return JSON.parse(item) as T
        }
      } catch {
        /* fallback to memory store if localStorage read fails */
      }
    }
    const memRaw = memoryStore.get(key)
    if (!memRaw) return null
    try {
      return JSON.parse(memRaw) as T
    } catch {
      return null
    }
  },
  set<T>(key: string, value: T): void {
    const serialized = JSON.stringify(value)
    if (isStorageAvailable()) {
      try {
        window.localStorage.setItem(key, serialized)
      } catch {
        /* quota exceeded or blocked */
      }
    }
    memoryStore.set(key, serialized)
  },
  remove(key: string): void {
    if (isStorageAvailable()) {
      try {
        window.localStorage.removeItem(key)
      } catch {}
    }
    memoryStore.delete(key)
  },
  clear(): void {
    if (isStorageAvailable()) {
      try {
        window.localStorage.clear()
      } catch {}
    }
    memoryStore.clear()
  },
}
