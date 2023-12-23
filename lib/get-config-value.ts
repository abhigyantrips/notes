import { siteConfig as rawSiteConfig } from '@/site.config';

if (!rawSiteConfig) {
  throw new Error(`Config error: invalid site.config.ts`);
}

export function getEnv(
  key: string,
  defaultValue?: string,
  env = process.env
): string {
  const value = env[key];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Config error: missing required env variable "${key}"`);
}
