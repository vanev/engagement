import { useRef, useEffect } from "react";
import { isNonEmpty } from "fp-ts/lib/Array";
import { flow } from "fp-ts/lib/function";
import { head } from "fp-ts/lib/NonEmptyArray";
import { Option, map, some, none, isSome } from "fp-ts/lib/Option";
import { Direction, fromAngle } from "./Direction";
import * as Touch from "./Touch";

type Handler = (event: TouchEvent) => void;

type SwipeMap = { [key in Direction]?: Handler };

const direction: (t: Touch.Touch) => Direction = flow(
  Touch.direction,
  fromAngle,
);

const useSwipe = (swipemap: SwipeMap): void => {
  const touchRef = useRef<Option<Touch.Touch>>(none);

  const onTouchStart = (event: TouchEvent) => {
    const touches = Array.from(event.touches);

    if (isNonEmpty(touches)) {
      const { clientX, clientY } = head(touches);
      touchRef.current = some(Touch.start([clientX, clientY]));
    }
  };

  const onTouchMove = (event: TouchEvent) => {
    const touches = Array.from(event.touches);

    if (isNonEmpty(touches)) {
      const { clientX, clientY } = head(touches);
      touchRef.current = map(Touch.snoc([clientX, clientY]))(touchRef.current);
    }
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (isSome(touchRef.current)) {
      const touch = touchRef.current.value;
      if (Touch.speed(touch) < 1) return;
      swipemap[direction(touch)](event);
    }

    touchRef.current = none;
  };

  const onTouchCancel = (event: TouchEvent) => {
    touchRef.current = none;
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
  }, []);
};

export default useSwipe;
