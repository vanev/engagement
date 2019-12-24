import { Eq, getTupleEq, eqNumber } from "fp-ts/lib/Eq";
import {
  Semigroup,
  getTupleSemigroup,
  semigroupSum,
} from "fp-ts/lib/Semigroup";

export type Point = [number, number];

export const x = (c: Point): number => c[0];

export const y = (c: Point): number => c[1];

export const eqPoint: Eq<Point> = getTupleEq(eqNumber, eqNumber);

export const semigroupPoint: Semigroup<Point> = getTupleSemigroup(
  semigroupSum,
  semigroupSum,
);
