import { NonEmptyArray, snoc as neaSnoc } from "fp-ts/lib/NonEmptyArray";
import { Point } from "./Geometry";

interface Inactive {
  _type: "Inactive";
}
export const inactive: Inactive = { _type: "Inactive" };

interface Active {
  _type: "Active";
  path: NonEmptyArray<Point.Point>;
}
export const active = (path: NonEmptyArray<Point.Point>): Active => ({
  _type: "Active",
  path,
});

export type Touch = Inactive | Active;

export const isInactive = (t: Touch): t is Inactive => t._type === "Inactive";
export const isActive = (t: Touch): t is Active => t._type === "Active";

export const snoc = (point: Point.Point) => (t: Touch): Touch =>
  isInactive(t) ? t : active(neaSnoc(t.path, point));
