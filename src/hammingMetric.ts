import { vector } from './interface/types.ts';
import { ERROR } from './interface/options.ts';

export default function dist(a: vector, b: vector): number {
  if (a.length !== b.length) throw new Error(ERROR.VECTORS_DIFF_SIZE);
  let sum = 0;
  for (let i = 0; i < a.length; ++i) {
    sum += +(a[i] !== b[i]);
  }
  return sum;
}
