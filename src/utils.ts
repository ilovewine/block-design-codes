import { EOL } from 'https://deno.land/std@0.95.0/fs/mod.ts';

export function generateArray1th(n: number): number[] {
  return generateArray0th(n).map(el => el + 1);
}

export function generateArray0th(n: number): number[] {
  return [...Array(n).keys()];
}

export function OS_EOL() {
  return Deno.build.os === 'linux' ? EOL.LF : EOL.CRLF;
}
