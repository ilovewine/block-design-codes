import BlockDesign, { Binary } from '../interface/BlockDesign.ts';

export default class AffinePlane implements BlockDesign {
  constructor(readonly order: number) {
  }

  get incidenceMatrix(): Binary[][] {
    return [[0]];
  }

  get minDist(): number {
    return 0;
  }

  correct(vectors: Binary[][]): Binary[][] {
    return [[0]]
  }
}
