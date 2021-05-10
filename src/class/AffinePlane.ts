import { line, point, vectors } from '../interface/types.ts';
import BlockDesign from '../interface/BlockDesign.ts';
import { areParallel, generateArray0th } from '../utils.ts';

export default class AffinePlane extends BlockDesign {
  constructor(protected order: number) {
    super(order);
  }

  get incidenceMatrix(): vectors {
    const BD = this.blockDesign;
    const points: line = [];
    for (let x = 0; x < this.order; ++x) {
      for (let y = 0; y < this.order; ++y) {
        points.push([x, y]);
      }
    }
    return generateArray0th(BD.length).map(i =>
      generateArray0th(points.length).map(j => (JSON.stringify(BD[i]).includes(JSON.stringify(points[j])) ? 1 : 0))
    );
  }

  get blockDesign(): line[] {
    const lines: line[] = [];
    for (let b = 0; b < this.order; ++b) {
      for (let a = 0; a < this.order; ++a) {
        const line: line = [];
        for (let x = 0; x < this.order; ++x) {
          const y = (a * x + b) % this.order;
          const point: point = [x, y];
          line.push(point);
        }
        lines.push(line);
      }
      const horizontal: line = generateArray0th(this.order).map(y => [b, y]);
      lines.push(horizontal);
    }
    return lines;
  }

  get parallelQuotientSet(): line[][] {
    let blocks: line[] = this.blockDesign;
    const result: line[][] = generateArray0th(this.order).map(() => {
      const parallel: line = blocks[0];
      blocks.shift();
      const array: line[] = [parallel];
      for (let i = 0; i < blocks.length; ++i) {
        if (areParallel(parallel, blocks[i])) {
          array.push(blocks.splice(i, 1)[0]);
        }
      }
      return array;
    });
    result.push(blocks);
    return result;
  }

  // the amount of different points between two different lines in a plane is always the same
  get minDist(): number {
    return 2 * (this.order - 1);
  }
}
