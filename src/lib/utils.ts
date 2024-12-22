import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dirtyValues<T extends { [key: string]: any }>(
  dirtyFields: boolean | { [key: string]: boolean },
  allValues: T
): T {
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;

  return Object.fromEntries(
    Object.keys(dirtyFields).map((key: string) => [
      key,
      dirtyValues(
        typeof dirtyFields === 'object' ? dirtyFields[key] : false,
        allValues[key]
      ),
    ])
  ) as T;
}
