import { vectors, vector } from './types.ts';
import dist from '../hammingMetric.ts';
import { OS_EOL } from '../utils.ts';

export default abstract class BlockDesign {
  protected constructor(protected order: number) {}
  abstract incidenceMatrix: vectors;
  abstract blockDesign: number[][];

  get minDist(): number {
    const BD = this.blockDesign;
    const k = BD[0].length;
    const r2 = (k * (k - 1)) / (this.order - 1);
    return 2 * (k - r2);
  }

  correct(vectors: vectors): string {
    const codes = this.incidenceMatrix;
    const result: vectors = [];
    vectors.forEach((vector: vector) => {
      const allDists = new Map();
      for (let i = 0; i < codes.length; ++i) {
        allDists.set(codes[i], dist(vector, codes[i]));
      }
      const minDists = [];
      let min = codes[0].length;
      for (let dist of allDists.values()) {
        if (dist < min) min = dist;
      }
      for (let [code, dist] of allDists) {
        if (dist === min) minDists.push(code);
      }
      result.push(minDists.length > 1 ? 'ERROR' : minDists[0].join(' '));
    });
    return result.join(OS_EOL());
  }

  printMatrix() {
    const matrix = this.incidenceMatrix.map((vector: vector) => vector.join(' ')).join(OS_EOL());
    console.log(matrix);
  }
}
