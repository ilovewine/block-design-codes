import BlockDesign, { Binary } from '../interface/BlockDesign.ts';
import { generateArray1th, generateArray0th, OS_EOL } from "../utils.ts";

export default class CyclicBlockDesign implements BlockDesign {
  constructor(readonly order: number) {}

  get incidenceMatrix(): Binary[][] {
    const BD = this.blockDesign;
    return generateArray0th(BD.length).map(i => generateArray0th(this.order).map(j => (BD[i].includes(j) ? 1 : 0)));
  }

  printMatrix() {
    const matrix = this.incidenceMatrix.map(vertex => vertex.join(' ')).join(OS_EOL());
    console.log(matrix)
  }

  get minDist(): number {
    return 0;
  }

  correct(vectors: Binary[][]): Binary[][] {
    return [[0]];
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
    throw new Error('COULD NOT CALCULATE FIELD GENERATOR');
  }
}
