import BlockDesign, { Binary } from '../interface/BlockDesign.ts';

export default class CyclicBlockDesign implements BlockDesign {
  constructor(readonly order: number) {}

  get incidenceMatrix(): Binary[][] {
    console.log(this.order);
    return [[0]];
  }

  get minDist(): number {
    return 0;
  }

  correct(vectors: Binary[][]): Binary[][] {
    return [[0]]
  }
}
