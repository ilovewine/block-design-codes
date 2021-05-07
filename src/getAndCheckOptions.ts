import ArgsOptions, { ERROR } from './interface/options.ts';

function isPrime(n: number): boolean {
  for (let i = 2; i <= Math.sqrt(n); ++i) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function getAndCheckOptions(): ArgsOptions {
  const args = Deno.args;
  if (args[0] !== '-type') throw new Error(ERROR.INCOMPATIBLE);
  if (isNaN(+args[2]) || !isPrime(+args[2]) || (args[1] === 'C' && (+args[2] + 1) % 4 !== 0)) throw new Error(ERROR.INCOMPATIBLE);
  if (args.length === 4 && args[3] !== '-mindist') throw new Error(ERROR.INCOMPATIBLE);
  if (args.length === 5 && args[3] !== '-correct') throw new Error(ERROR.INCOMPATIBLE);
  switch (args[1]) {
    case 'A':
    case 'P':
    case 'C':
      break;
    default:
      throw new Error(ERROR.INCOMPATIBLE);
  }

  return {
    type: args[1],
    order: +args[2],
    minDist: args[3] === '-mindist',
    correct: args[3] === '-correct' && args[4],
  };
}
