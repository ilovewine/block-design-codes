import { vector } from './interface/types.ts';

export default function dist(a: vector, b: vector): number {
  if (a.length !== b.length) throw new Error('CANNOT CALCULATE DISTANCE - VECTORS HAVE DIFFERENT SIZES.');
  let sum = 0;
  for (let i = 0; i < a.length; ++i) {
    sum += +(a[i] !== b[i]);
  }
  return sum;
}
