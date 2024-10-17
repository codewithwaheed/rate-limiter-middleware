interface MemoryStoreOptions {
  windowMs: number;
}

class MemoryStore {
  private store: Record<string, { count: number; timestamp: number }> = {};

  constructor(private options: { windowMs: number }) {}

  async increment(
    key: string
  ): Promise<{ count: number; ttlRemaining: number }> {
    const now = Date.now();
    const windowStart = now - this.options.windowMs;

    if (!this.store[key] || this.store[key].timestamp < windowStart) {
      this.store[key] = { count: 1, timestamp: now };
    } else {
      this.store[key].count++;
    }

    return {
      count: this.store[key].count,
      ttlRemaining: Math.ceil(
        (windowStart + this.options.windowMs - now) / 1000
      ),
    };
  }
}

export default MemoryStore;
