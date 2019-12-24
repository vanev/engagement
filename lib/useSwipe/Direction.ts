import { Angle } from "./Geometry";

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

const isUp = Angle.between(-90, 90);
const isDown = Angle.between(90, -90);
const isLeft = Angle.between(180, 0);
const isRight = Angle.between(0, 180);

export const fromAngle = (a: Angle.Angle): Direction => {
  if (isLeft(a)) return Direction.Left;
  if (isRight(a)) return Direction.Right;
};
