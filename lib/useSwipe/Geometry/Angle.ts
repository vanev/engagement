import { Eq, eqNumber, contramap } from "fp-ts/lib/Eq";
import { flow } from "fp-ts/lib/function";
import { Semigroup, semigroupSum } from "fp-ts/lib/Semigroup";
import { between as ordBetween, ordNumber } from "fp-ts/lib/Ord";

export type Angle = number;

const mod = (base: number) => (target: number): number => target % base;

const makePositive = (x: number): number => (x < 0 ? 360 + x : x);

export const toCommon = flow(mod(360), makePositive);

export const fromRadians = (radians: number): Angle =>
  toCommon((radians * 180) / Math.PI);

export const toRadians = (degrees: Angle): number => (degrees * Math.PI) / 180;

export const eq: Eq<Angle> = contramap(toCommon)(eqNumber);

export const semigroup: Semigroup<Angle> = {
  concat: flow(semigroupSum.concat, toCommon),
};

const betweenNumbers = ordBetween(ordNumber);

export const between = (low: Angle, high: Angle) => (x: Angle): boolean => {
  let l = toCommon(low);
  const h = toCommon(high);
  let n = toCommon(x);

  if (l > h) {
    return betweenNumbers(0, h)(n) || betweenNumbers(l, 360)(n);
  }

  return betweenNumbers(l, h)(n);
};
