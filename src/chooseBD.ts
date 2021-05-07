import BlockDesign from "./interface/BlockDesign.ts";
import AffinePlane from "./class/AffinePlane.ts";
import ProjectivePlane from "./class/ProjectivePlane.ts";
import CyclicBlockDesign from "./class/CyclicBlockDesign.ts";
import getOptions from "./getOptions.ts";

const options = getOptions();

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
      throw new Error('GIVEN ARGUMENTS ARE INCOMPATIBLE.');
  }
  return BD;
}