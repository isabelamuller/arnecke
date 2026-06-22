import { useCallback, useEffect, useRef, useState } from "react";

type TPoint = {
  x: number;
  y: number;
};

export function useDraggablePanel() {
  const [offset, setOffset] = useState<TPoint>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const hasDraggedRef = useRef(false);
  const isDraggingRef = useRef(false);

  const offsetRef = useRef<TPoint>({ x: 0, y: 0 });
  const startPointerRef = useRef<TPoint>({ x: 0, y: 0 });
  const startOffsetRef = useRef<TPoint>({ x: 0, y: 0 });
  const nextOffsetRef = useRef<TPoint>({ x: 0, y: 0 });

  const frameRef = useRef<number | null>(null);

  const commitOffset = useCallback(() => {
    frameRef.current = null;

    offsetRef.current = nextOffsetRef.current;
    setOffset(nextOffsetRef.current);
  }, []);

  const scheduleOffset = useCallback(
    (nextOffset: TPoint) => {
      nextOffsetRef.current = nextOffset;

      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(commitOffset);
    },
    [commitOffset],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      hasDraggedRef.current = false;

      setIsDragging(true);

      startPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      startOffsetRef.current = offsetRef.current;
      nextOffsetRef.current = offsetRef.current;

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - startPointerRef.current.x;
      const deltaY = event.clientY - startPointerRef.current.y;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        hasDraggedRef.current = true;
      }

      scheduleOffset({
        x: startOffsetRef.current.x + deltaX,
        y: startOffsetRef.current.y + deltaY,
      });
    },
    [scheduleOffset],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      setIsDragging(false);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;

        offsetRef.current = nextOffsetRef.current;
        setOffset(nextOffsetRef.current);
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return {
    offset,
    isDragging,
    hasDraggedRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
