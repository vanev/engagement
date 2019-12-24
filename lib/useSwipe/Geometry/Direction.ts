import { Eq, eq, eqNumber } from "fp-ts/lib/Eq";
import { flow } from "fp-ts/lib/function";
import { Semigroup, semigroupSum } from "fp-ts/lib/Semigroup";
import { between as ordBetween, ordNumber } from "fp-ts/lib/Ord";

export type Direction = number;

const mod = (base: number) => (target: number): number => target % base;

const makePositive = (x: number): number => (x < 0 ? 360 + x : x);

export const toCommon = flow(mod(360), makePositive);

export const fromRadians = (radians: number): Direction =>
  toCommon((radians * 180) / Math.PI);

export const toRadians = (degrees: Direction): number =>
  (degrees * Math.PI) / 180;

export const eqDirection: Eq<Direction> = eq.contramap(eqNumber, toCommon);

export const semigroupDirection: Semigroup<Direction> = {
  concat: flow(semigroupSum.concat, toCommon),
};

const betweenNumbers = ordBetween(ordNumber);

export const between = (low: Direction, high: Direction) => (
  x: Direction,
): boolean => {
  let l = toCommon(low);
  const h = toCommon(high);
  let n = toCommon(x);

  if (l > h) {
    return betweenNumbers(0, h)(n) || betweenNumbers(l, 360)(n);
  }

  return betweenNumbers(l, h)(n);
};
