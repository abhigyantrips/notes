import Keyv from '@keyvhq/core';
import KeyvRedis from '@keyvhq/redis';

import { siteConfig } from '@/site.config';

import { isRedisEnabled, redisNamespace, redisUrl } from './config';

let db: Keyv;
if (siteConfig.isRedisEnabled) {
  const keyvRedis = new KeyvRedis(redisUrl);
  db = new Keyv({ store: keyvRedis, namespace: redisNamespace || undefined });
} else {
  db = new Keyv();
}

export { db };
