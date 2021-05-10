import BlockDesign from '../interface/BlockDesign.ts';
import { generateArray1th, generateArray0th } from '../utils.ts';
import { vectors } from '../interface/types.ts';
import { ERROR } from '../interface/options.ts';

export default class CyclicBlockDesign extends BlockDesign {
  constructor(protected order: number) {
    super(order);
  }

  get incidenceMatrix(): vectors {
    const BD = this.blockDesign;
    return generateArray0th(BD.length).map(i => generateArray0th(this.order).map(j => (BD[i].includes(j) ? 1 : 0)));
  }

  get blockDesign(): number[][] {
    const B0 = this.perfectDifferentialSet;
    return generateArray0th(this.order).map(i => B0.map(el => (el + i) % this.order));
  }

  private get perfectDifferentialSet(): number[] {
    const generator2 = this.fieldGenerator ** 2 % this.order;
    return generateArray1th((this.order - 1) / 2).map(index => generator2 ** index % this.order);
  }

  private get fieldGenerator(): number {
    const multiGroup: number[] = generateArray1th(this.order - 1);
    for (let i = 2; i < this.order; ++i) {
      const tempSet: number[] = [1, i];
      let cyclicEl = i;
      while (tempSet.length !== multiGroup.length || cyclicEl === 1) {
        cyclicEl = (cyclicEl * i) % this.order;
        tempSet.push(cyclicEl);
      }
      tempSet.sort((a, b) => a - b);
      if (multiGroup.length === tempSet.length && JSON.stringify(multiGroup) === JSON.stringify(tempSet)) return i;
    }
    throw new Error(ERROR.FIELD_GENERATOR);
  }

  // cyclic BD is a symmetric BD - using theorem
  get minDist(): number {
    const BD = this.blockDesign;
    const k = BD[0].length;
    const r2 = (k * (k - 1)) / (this.order - 1);
    return 2 * (k - r2);
  }
}
