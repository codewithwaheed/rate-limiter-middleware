
# rate-limiter-middleware

A simple and flexible rate-limiting middleware for Node.js that supports both Redis and in-memory storage. This package can be used to limit the number of requests made by users within a certain time frame, preventing abuse and protecting your application from being overwhelmed by traffic.

## Features

- **Redis-based** rate limiting (for distributed systems)
- **In-memory** rate limiting (for local environments)
- Customizable limit and window duration
- Middleware integration with Express.js
- Easy setup and usage

## Installation

Install the package via npm:

```bash
npm install rate-limiter-middleware
```
````

## Usage

You can use the middleware in two modes: **Redis** and **In-memory**.

### Example File Structure

```
.
├── src
│   ├── middleware
│   │   └── rateLimiter.ts
│   └── server.ts
└── example
    └── exampleServer.ts
```

### 1. In-memory rate limiting

```typescript
// src/middleware/rateLimiter.ts
import rateLimiter from "rate-limiter-middleware";

const limiter = rateLimiter({
  limit: 100, // Limit of requests
  window: 60 * 1000, // Time window in milliseconds (1 minute)
});

export default limiter;

// src/server.ts
import express from "express";
import limiter from "./middleware/rateLimiter";

const app = express();

app.use(limiter); // Apply rate limiting middleware to all routes

app.get("/", (req, res) => {
  res.send("Welcome! You are within rate limits.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### 2. Redis-based rate limiting

For Redis-based rate limiting, make sure you have Redis installed and running. You will also need the `redis` package.

```bash
npm install redis
```

```typescript
// src/middleware/rateLimiter.ts
import rateLimiter from "rate-limiter-middleware";
import Redis from "redis";

// Initialize Redis client
const redisClient = Redis.createClient({
  url: "redis://localhost:6379",
});

const limiter = rateLimiter({
  limit: 100, // Limit of requests
  window: 60 * 1000, // Time window in milliseconds (1 minute)
  redisClient, // Redis client for distributed rate limiting
});

export default limiter;
```

### 3. Example Application

```typescript
// example/exampleServer.ts
import express from "express";
import limiter from "../src/middleware/rateLimiter";

const app = express();

// Apply rate limiter middleware
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Rate limit applied. Welcome!");
});

app.listen(3000, () => {
  console.log("Example server running on port 3000");
});
```

## Configuration

The `rateLimiter` function accepts the following options:

| Option        | Type          | Default                                        | Description                                               |
| ------------- | ------------- | ---------------------------------------------- | --------------------------------------------------------- |
| `limit`       | `number`      | `60`                                           | Maximum number of requests allowed within the time window |
| `window`      | `number`      | `60000`                                        | Time window in milliseconds (default is 60 seconds)       |
| `redisClient` | `RedisClient` | `null`                                         | An optional Redis client for distributed rate limiting    |
| `message`     | `string`      | `"Too many requests, please try again later."` | Custom message for when the limit is exceeded             |

### In-Memory Example:

```typescript
const limiter = rateLimiter({
  limit: 50, // 50 requests
  window: 30000, // 30 seconds
});
```

### Redis Example:

```typescript
const limiter = rateLimiter({
  limit: 100, // 100 requests
  window: 60 * 1000, // 1 minute
  redisClient, // Redis client for distributed storage
});
```

## Custom Error Message

You can specify a custom error message when the request limit is exceeded:

```typescript
const limiter = rateLimiter({
  limit: 100,
  window: 60000,
  message: "Too many requests from this IP, please try again after 1 minute.",
});
```

## Redis Configuration

If you use Redis for distributed rate limiting, ensure your Redis server is running and configured properly. You can pass the `redisClient` as part of the options.

```typescript
import Redis from "redis";

const redisClient = Redis.createClient({
  url: "redis://localhost:6379",
});

const limiter = rateLimiter({
  limit: 100,
  window: 60000,
  redisClient, // Pass the Redis client
});
```

## Example Application

To run the example server:

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Navigate to the example folder:

```bash
cd example
```

4. Run the example server:

```bash
node exampleServer.js
```

## License

This project is licensed under the MIT License.

```

This `README.md` provides details on installation, configuration, and examples for using your `rate-limiter-middleware` package. You can further adjust it to match your specific use cases!
```
