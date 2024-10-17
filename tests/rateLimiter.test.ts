import request from "supertest";
import express from "express";
import rateLimiter from "../src/index";

describe("Rate Limiting Middleware", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(rateLimiter({ windowMs: 60 * 1000, maxRequests: 2 })); // Allow max 2 requests per minute

    app.get("/test", (_: express.Request, res: express.Response) => {
      res.status(200).send("OK");
    });
  });

  it("should allow requests under the rate limit", async () => {
    const res1 = await request(app).get("/test");
    expect(res1.status).toBe(200);
    expect(res1.text).toBe("OK");

    const res2 = await request(app).get("/test");
    expect(res2.status).toBe(200);
  });

  it("should block requests over the rate limit", async () => {
    await request(app).get("/test");
    await request(app).get("/test");

    const res3 = await request(app).get("/test");
    expect(res3.status).toBe(429); // 429 Too Many Requests
  });
});
