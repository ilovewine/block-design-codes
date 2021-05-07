// @ts-ignore
import BlockDesign, { binary } from './src/interface/BlockDesign.ts';
import chooseBD from './src/chooseBD.ts';
import getVectors from './src/getVectors.ts';
import { vectors } from './src/interface/types.ts';

const BD: BlockDesign = chooseBD();

(async () => {
  let result: vectors | number | string;
  switch (Deno.args.length) {
    case 3:
      BD.printMatrix();
      break;
    case 4:
      result = BD.minDist;
      console.log(result);
      break;
    case 5:
      const vectors = await getVectors();
      result = BD.correct(vectors);
      console.log(result);
  }
})();
