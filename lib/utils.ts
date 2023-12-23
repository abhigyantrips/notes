import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function invertMap(map: { [key: string]: string }): {
  [key: string]: string;
} {
  return Object.keys(map).reduce((acc, uri) => {
    const invKey = map[uri];

    return {
      ...acc,
      [invKey]: uri,
    };
  }, {});
}
