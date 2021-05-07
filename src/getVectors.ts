import { EOL, detect } from 'https://deno.land/std@0.95.0/fs/mod.ts';
import { vectors } from './interface/types.ts';
import { ERROR } from './interface/options.ts';

export default async function getVectors(): Promise<vectors> {
  const message: string = await Deno.readTextFile(Deno.args[4]);
  let strings: string[] = message.split(EOL.CRLF);
  if (detect(strings[0]) === EOL.LF) strings = message.split(EOL.LF).filter(string => string !== '');
  const vectors: vectors = strings.map((string: string) =>
    string.split(' ').map(el => {
      if (+el !== 1 && +el !== 0) throw new Error(ERROR.WRONG_FILE_CONTENTS);
      return +el === 1 ? 1 : 0;
    })
  );
  return vectors;
}
