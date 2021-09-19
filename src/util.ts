import { dirname } from 'path';

export function workingDir(): string {
  return dirname(process.execPath);
}
