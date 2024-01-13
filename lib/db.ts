import Keyv from '@keyvhq/core';
import KeyvRedis from '@keyvhq/redis';

import { siteConfig } from '@/site.config';

function getEnv(key: string, defaultValue?: string, env = process.env): string {
  const value = env[key];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Config error: missing required env variable "${key}"`);
}

export const redisHost: string | null = 'REDIS_HOST';
export const redisPassword: string | null = getEnv('REDIS_PASSWORD');
export const redisUser: string = getEnv('REDIS_USER', 'default');
export const redisUrl = getEnv(
  'REDIS_URL',
  `redis://${redisUser}:${redisPassword}@${redisHost}`
);
export const redisNamespace: string | null = getEnv(
  'REDIS_NAMESPACE',
  'preview-images'
);

let db: Keyv;
if (siteConfig.isRedisEnabled) {
  const keyvRedis = new KeyvRedis(redisUrl);
  db = new Keyv({ store: keyvRedis, namespace: redisNamespace || undefined });
} else {
  db = new Keyv();
}

export { db };
