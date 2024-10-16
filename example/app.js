const express = require("express");
const rateLimiter = require("rate-limiter-middleware").default;
const app = express();
console.log(rateLimiter);
// Using in-memory rate limiter
app.use(rateLimiter({ windowMs: 60000, maxRequests: 10 }));

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
