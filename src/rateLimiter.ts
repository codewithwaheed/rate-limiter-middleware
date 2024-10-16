import { Request, Response, NextFunction } from "express";
import MemoryStore from "./memoryStore";
import RedisStore from "./redisStore";

interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
  redisClient?: any; // Optional Redis client
}

const rateLimiter = (options: RateLimiterOptions) => {
  const store = options.redisClient
    ? new RedisStore({
        windowMs: options.windowMs,
        redisClient: options.redisClient,
      })
    : new MemoryStore({ windowMs: options.windowMs });

  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip; // Use IP address as the key

    try {
      const { count, ttlRemaining } = await store.increment(key);

      if (count > options.maxRequests) {
        return res.status(429).json({
          error: "Too many requests, please try again later.",
          retryAfter: ttlRemaining,
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default rateLimiter;
