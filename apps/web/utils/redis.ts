import { Redis } from "@upstash/redis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

const redis =
  globalForRedis.redis ??
  new Redis({
    url: "https://sweet-labrador-5972.upstash.io",
    token: "ARdUAAIjcDE1MDI4MmRmN2QxMDE0NTJhYWQwY2Q5ZTg2ZjM0MTJmNXAxMA",
  });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

export default redis;
