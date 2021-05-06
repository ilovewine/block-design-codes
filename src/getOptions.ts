import Options from './interface/Options.ts';

function isPrime(n: number): boolean {
  for (let i = 2; i <= Math.sqrt(n); ++i) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function getOptions(): Options {
  const args = Deno.args;
  if (args[0] !== '-type') throw new Error('GIVEN ARGUMENTS ARE INCOMPATIBLE.');
  if (isNaN(+args[2]) || (!isPrime(+args[2]) || (+args[2] + 1) % 4 !== 0)) throw new Error('GIVEN ARGUMENTS ARE INCOMPATIBLE.');
  if (args.length === 4 && args[3] !== '-mindist') throw new Error('GIVEN ARGUMENTS ARE INCOMPATIBLE.');
  if (args.length === 5 && args[3] !== '-correct') throw new Error('GIVEN ARGUMENTS ARE INCOMPATIBLE.');
  switch (args[1]) {
    case 'A':
    case 'P':
    case 'C':
      break;
    default:
      throw new Error('GIVEN ARGUMENTS ARE INCOMPATIBLE.');
  }

  return {
    type: args[1],
    order: +args[2],
    minDist: args[3] === '-mindist',
    correct: args[3] === '-correct' && args[4],
  };
}
