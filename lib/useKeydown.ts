import { useEffect } from "react";

type Handler = (event: KeyboardEvent) => void;

interface KeyMap {
  [key: string]: Handler;
}

const useKeydown = (keymap: KeyMap): void => {
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      const handler = keymap[event.key];
      if (handler) handler(event);
    };

    window.addEventListener("keydown", onKeydown);

    return () => window.removeEventListener("keydown", onKeydown);
  }, [keymap]);
};

export default useKeydown;
