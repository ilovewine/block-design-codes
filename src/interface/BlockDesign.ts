export type Binary = 0 | 1;

export default interface BlockDesign {
  readonly order: number;
  readonly incidenceMatrix: Binary[][];
  readonly minDist: number;
  readonly blockDesign: number[][];
  printMatrix(): void;
  correct(vectors: Binary[][]): Binary[][];
}
