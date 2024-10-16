interface MemoryStoreOptions {
  windowMs: number;
}

class MemoryStore {
  private store: Record<string, { count: number; timestamp: number }> = {};
  private windowMs: number;

  constructor(options: MemoryStoreOptions) {
    this.windowMs = options.windowMs;
  }

  increment(key: string) {
    const currentTime = Date.now();
    if (
      !this.store[key] ||
      currentTime - this.store[key].timestamp > this.windowMs
    ) {
      this.store[key] = { count: 1, timestamp: currentTime };
    } else {
      this.store[key].count += 1;
    }
    return this.store[key];
  }
}

export default MemoryStore;
