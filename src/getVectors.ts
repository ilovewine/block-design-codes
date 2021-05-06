import { EOL, detect } from 'https://deno.land/std@0.95.0/fs/mod.ts';
import { Binary } from './interface/BlockDesign.ts';

export default async function getVectors(): Promise<Binary[][]> {
  const message: string = await Deno.readTextFile(Deno.args[4]);
  let strings: string[] = message.split(EOL.CRLF);
  if (detect(strings[0]) === EOL.LF) strings = message.split(EOL.LF);
  const vectors: Binary[][] = strings.map(string =>
    string.split(' ').map(el => {
      if (+el !== 1 && +el !== 0) throw new Error('THE FILE DOES NOT CONTAIN BINARY VECTORS.');
      return +el === 1 ? 1 : 0;
    })
  );
  return vectors;
}
