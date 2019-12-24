import { Eq, getTupleEq } from "fp-ts/lib/Eq";
import { Semigroup, getTupleSemigroup } from "fp-ts/lib/Semigroup";
import { Point, y, x, eqPoint, semigroupPoint } from "./Point";
import { Direction, fromRadians } from "./Direction";

export type Vector = [Point, Point];

const opposite = ([start, end]: Vector): number => y(end) - y(start);

const adjacent = ([start, end]: Vector): number => x(end) - x(start);

export const direction = (v: Vector): Direction => {
  const [start, end] = v;
  const [startX, startY] = start;
  const [endX, endY] = end;

  const o = opposite(v);
  const a = adjacent(v);

  if (eqPoint.equals(start, end)) return 0;

  if (startX === endX && startY < endY) return 0;
  if (startX === endX && startY > endY) return 180;

  if (startY === endY && startX < endX) return 90;
  if (startY === endY && startX > endX) return 270;

  const angle = fromRadians(Math.atan(o / a));

  if (startX < endX && startY < endY) return angle;
  if (startX > endX && startY < endY) return angle;
  if (startX > endX && startY > endY) return angle + 180;
  if (startX < endX && startY > endY) return angle - 180;
};

export const magnitude = (v: Vector): number =>
  Math.sqrt(opposite(v) ** 2 + adjacent(v) ** 2);

export const eqVector: Eq<Vector> = getTupleEq(eqPoint, eqPoint);

export const semigroupVector: Semigroup<Vector> = getTupleSemigroup(
  semigroupPoint,
  semigroupPoint,
);
