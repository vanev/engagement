import { useState, useEffect } from "react";
import { isNonEmpty } from "fp-ts/lib/Array";
import { head, reduce } from "fp-ts/lib/NonEmptyArray";
import { Option, map, some, none, getShow } from "fp-ts/lib/Option";
import { Point, Vector } from "./Geometry";
import { Direction, fromGeometricDirection } from "./Direction";
import * as Touch from "./Touch";

type Handler = (event: TouchEvent) => void;

type SwipeMap = { [key in Direction]?: Handler };

const getDirection = (t: Touch.Touch): Option<Direction> => {
  if (Touch.isInactive(t)) return none;

  const initial: [Point.Point, number] = [head(t.path), 0];

  const reducer = (
    [lastPoint, direction]: [Point.Point, number],
    point: Point.Point,
  ): [Point.Point, number] => [
    point,
    direction + Vector.direction([lastPoint, point]),
  ];

  const [_, direction] = reduce<Point.Point, [Point.Point, number]>(
    initial,
    reducer,
  )(t.path);

  return some(fromGeometricDirection(direction));
};

const useSwipe = (swipemap: SwipeMap): void => {
  const [state, setState] = useState<Touch.Touch>(Touch.inactive);

  const onTouchStart = (event: TouchEvent) => {
    const touches = Array.from(event.touches);

    if (isNonEmpty(touches)) {
      const { clientX, clientY } = head(touches);
      setState(Touch.active([[clientX, clientY]]));
    }
  };

  const onTouchMove = (event: TouchEvent) => {
    const touches = Array.from(event.touches);

    if (isNonEmpty(touches)) {
      const { clientX, clientY } = head(touches);
      setState(Touch.snoc([clientX, clientY]));
    }
  };

  const onTouchEnd = (event: TouchEvent) => {
    console.log({ state });

    const direction = getDirection(state);
    console.log(direction);

    map((direction: Direction) => swipemap[direction](event))(direction);

    setState(Touch.inactive);
  };

  const onTouchCancel = (event: TouchEvent) => {
    setState(Touch.inactive);
  };

  useEffect(() => {
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchCancel);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [state]);
};

export default useSwipe;
