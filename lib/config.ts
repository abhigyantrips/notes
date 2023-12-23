import { getEnv } from './get-config-value';

export const redisHost: string | null = getEnv('REDIS_HOST');
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
