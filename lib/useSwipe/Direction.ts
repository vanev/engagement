import * as Geometry from "./Geometry";

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

const isUp = Geometry.Direction.between(-90, 90);
const isDown = Geometry.Direction.between(90, -90);
const isLeft = Geometry.Direction.between(180, 0);
const isRight = Geometry.Direction.between(0, 180);

export const fromGeometricDirection = (
  d: Geometry.Direction.Direction,
): Direction => {
  if (isLeft(d)) return Direction.Left;
  if (isRight(d)) return Direction.Right;
};
