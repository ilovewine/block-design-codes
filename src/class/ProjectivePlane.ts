import BlockDesign from '../interface/BlockDesign.ts';
import { vectors } from '../interface/types.ts';

export default class ProjectivePlane extends BlockDesign {
  constructor(protected order: number) {
    super(order);
  }

  get incidenceMatrix(): vectors {
    return [[0]];
  }

  correct(vectors: vectors): string {
    return '';
  }

  get blockDesign(): number[][] {
    return [[1]];
  }

  // similar to Affine Plane formula, minus infinity point
  get minDist(): number {
    return this.order ** 2 - 2 * (this.order - 2);
  }
}
