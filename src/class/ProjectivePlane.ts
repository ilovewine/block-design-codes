import BlockDesign from '../interface/BlockDesign.ts';
import { line, vectors } from '../interface/types.ts';
import AffinePlane from './AffinePlane.ts';
import { generateArray0th } from '../utils.ts';

export default class ProjectivePlane extends BlockDesign {
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
      points.push(Symbol(x).toString());
    }
    points.push(Symbol(this.order).toString());
    return generateArray0th(BD.length).map(i =>
      generateArray0th(points.length).map(j => (JSON.stringify(BD[i]).includes(JSON.stringify(points[j])) ? 1 : 0))
    );
  }

  get blockDesign(): line[] {
    const AP = new AffinePlane(this.order);
    const parallel: line[][] = AP.parallelQuotientSet.map((equivalenceClass: line[], index: number) =>
      equivalenceClass.map((line: line) => [...line, Symbol(index).toString()])
    );
    parallel.push([generateArray0th(parallel.length).map(i => Symbol(i).toString())]);
    return parallel.flat();
  }

  // analogically to affine planes
  get minDist(): number {
    return 2 * this.order;
  }
}
