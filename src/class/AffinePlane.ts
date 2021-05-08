import { point, vectors } from '../interface/types.ts';
import BlockDesign from '../interface/BlockDesign.ts';
import { generateArray0th } from '../utils.ts';

export default class AffinePlane extends BlockDesign {
  constructor(protected order: number) {
    super(order);
  }

  get incidenceMatrix(): vectors {
    const BD = this.blockDesign;
    const points: point[] = [];
    for (let x = 0; x < this.order; ++x) {
      for (let y = 0; y < this.order; ++y) {
        points.push([x, y]);
      }
    }
    return generateArray0th(BD.length).map(i =>
      generateArray0th(points.length).map(j => (JSON.stringify(BD[i]).includes(JSON.stringify(points[j])) ? 1 : 0))
    );
  }

  // we need another formula since an affine plane is not a symmetric BD
  get minDist(): number {
    return 0;
  }

  get blockDesign(): point[][] {
    const lines: point[][] = [];
    for (let b = 0; b < this.order; ++b) {
      for (let a = 0; a < this.order; ++a) {
        const line: point[] = [];
        for (let x = 0; x < this.order; ++x) {
          const y = (a * x + b) % this.order;
          const point: point = [x, y];
          line.push(point);
        }
        lines.push(line);
      }
      const horizontal: point[] = [];
      for (let x = 0; x < this.order; ++x) {
        const point: point = [x, b];
        horizontal.push(point);
      }
      lines.push(horizontal);
    }
    return lines;
  }
}
