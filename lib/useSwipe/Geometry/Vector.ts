import { Eq, getTupleEq, eqNumber } from "fp-ts/lib/Eq";
import { fieldNumber } from "fp-ts/lib/Field";
import { Ord, ordNumber, contramap } from "fp-ts/lib/Ord";
import { Ring, getTupleRing } from "fp-ts/lib/Ring";
import { Angle, fromRadians } from "./Angle";

export type Vector = [number, number];

export const direction = (v: Vector): Angle => {
  const [x, y] = v;

  if (0 === x && 0 < y) return 0;
  if (0 === x && 0 > y) return 180;

  if (0 === y && 0 < x) return 90;
  if (0 === y && 0 > x) return 270;

  const angle = fromRadians(Math.atan(y / x));

  if (0 > x && 0 > y) return angle + 180;
  if (0 < x && 0 > y) return angle - 180;

  return angle;
};

export const magnitude = ([x, y]: Vector): number => Math.sqrt(y ** 2 + x ** 2);

export const eq: Eq<Vector> = getTupleEq(eqNumber, eqNumber);

export const byMagnitude: Ord<Vector> = contramap(magnitude)(ordNumber);

export const ring: Ring<Vector> = getTupleRing(fieldNumber, fieldNumber);
