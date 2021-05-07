import BlockDesign from './interface/BlockDesign.ts';
import AffinePlane from './class/AffinePlane.ts';
import ProjectivePlane from './class/ProjectivePlane.ts';
import CyclicBlockDesign from './class/CyclicBlockDesign.ts';
import getAndCheckOptions from './getAndCheckOptions.ts';
import { ERROR } from './interface/options.ts';

const options = getAndCheckOptions();

export default function chooseBD(): BlockDesign {
  let BD: BlockDesign;
  switch (options.type) {
    case 'A':
      BD = new AffinePlane(options.order);
      break;
    case 'P':
      BD = new ProjectivePlane(options.order);
      break;
    case 'C':
      BD = new CyclicBlockDesign(options.order);
      break;
    default:
      throw new Error(ERROR.INCOMPATIBLE);
  }
  return BD;
}
