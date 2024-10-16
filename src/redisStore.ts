import { createClient, RedisClientType } from "redis";

interface RedisStoreOptions {
  windowMs: number;
  redisClient: RedisClientType;
}

class RedisStore {
  private redisClient: RedisClientType;
  private windowMs: number;

  constructor(options: RedisStoreOptions) {
    this.windowMs = options.windowMs;
    this.redisClient = options.redisClient;
  }

  async increment(key: string) {
    const currentTime = Date.now();
    const ttl = Math.ceil(this.windowMs / 1000);

    const count = await this.redisClient.incr(key);
    if (count === 1) {
      await this.redisClient.expire(key, ttl);
    }

    const ttlRemaining = await this.redisClient.ttl(key);
    return { count, ttlRemaining };
  }
}

export default RedisStore;
