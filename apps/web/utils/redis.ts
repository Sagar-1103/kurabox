import { Redis } from "@upstash/redis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

const redis =
  globalForRedis.redis ??
  new Redis({
    url: `${process.env.NEXT_PUBLIC_REDIS_URL}`,
    token: `${process.env.NEXT_PUBLIC_REDIS_TOKEN}`,
  });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

export default redis;
