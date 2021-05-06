// @ts-ignore
import BlockDesign, { Binary } from './src/interface/BlockDesign.ts';
import chooseBD from './src/chooseBD.ts';
import getVectors from './src/getVectors.ts';

const BD: BlockDesign = chooseBD();

(async () => {
  let result: Binary[][] | number;
  switch (Deno.args.length) {
    case 3:
      result = BD.incidenceMatrix;
      console.log(result)
      break;
    case 4:
      result = BD.minDist;
      console.log(result)
      break;
    case 5:
      const vectors = await getVectors();
      result = BD.correct(vectors);
      console.log(result)
  }
})();
