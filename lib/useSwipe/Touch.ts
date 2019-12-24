import { Vector, Angle } from "./Geometry";

export interface Touch {
  origin: Vector.Vector;
  start: number;
  vector: Vector.Vector;
}

export const touch = (
  origin: Vector.Vector,
  start: number,
  vector: Vector.Vector,
): Touch => ({
  origin,
  start,
  vector,
});

export const start = (v: Vector.Vector): Touch =>
  touch(v, Date.now(), Vector.ring.zero);

export const direction = ({ vector }: Touch): Angle.Angle =>
  Vector.direction(vector);

export const magnitude = ({ vector }: Touch): number =>
  Vector.magnitude(vector);

export const duration = ({ start }: Touch): number => Date.now() - start;

export const speed = (t: Touch): number => magnitude(t) / duration(t);

export const snoc = (v: Vector.Vector) => (t: Touch): Touch =>
  touch(
    t.origin,
    t.start,
    Vector.ring.add(t.vector, Vector.ring.sub(v, t.origin)),
  );
