import { vectors } from '../interface/types.ts';
import BlockDesign from '../interface/BlockDesign.ts';

export default class AffinePlane extends BlockDesign {
  constructor(protected order: number) {
    super(order);
  }

  get incidenceMatrix(): vectors {
    return [[0]];
  }

  // we need another formula since an affine plane is not a symmetric BD
  get minDist(): number {
    return 0;
  }

  get blockDesign(): number[][] {
    return [[1]];
  }
}
