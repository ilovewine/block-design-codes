import { EOL } from 'https://deno.land/std@0.95.0/fs/mod.ts';
import { line } from './interface/types.ts';
import { ERROR } from './interface/options.ts';

function ascendingOrderSort(a: number | number[], b: number | number[]): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'object' && typeof b === 'object') return a[0] - b[0];
  throw new Error(ERROR.INCOMPATIBLE);
}

export function generateArray1th(n: number): number[] {
  return generateArray0th(n).map(el => el + 1);
}

export function generateArray0th(n: number): number[] {
  return [...Array(n).keys()];
}

export function areIdentical(array1: number[], array2: number[]): boolean {
  const a = array1.sort(ascendingOrderSort);
  const b = array2.sort(ascendingOrderSort);
  return a.length === b.length && JSON.stringify(a) === JSON.stringify(b);
}

export function areParallel(a: line, b: line): boolean {
  const bAsString = JSON.stringify(b);
  const intersection = a.filter(el => bAsString.includes(JSON.stringify(el)));
  return !intersection.length;
}

export function OS_EOL() {
  return Deno.build.os === 'linux' ? EOL.LF : EOL.CRLF;
}
