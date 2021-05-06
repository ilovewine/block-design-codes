export default interface Options {
  type: 'A' | 'P' | 'C';
  order: number;
  minDist: boolean;
  correct: string | false;
}