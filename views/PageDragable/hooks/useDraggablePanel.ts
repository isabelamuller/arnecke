import { useRef, useState } from "react";
import { TOffset } from "../types";

export function useDraggablePanel() {
  const [offset, setOffset] = useState<TOffset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const hasDraggedRef = useRef(false);

  const dragStartRef = useRef({
    pointerX: 0,
    pointerY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    hasDraggedRef.current = false;

    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;

    const deltaX = event.clientX - dragStartRef.current.pointerX;
    const deltaY = event.clientY - dragStartRef.current.pointerY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasDraggedRef.current = true;
    }

    setOffset({
      x: dragStartRef.current.offsetX + deltaX,
      y: dragStartRef.current.offsetY + deltaY,
    });
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return {
    offset,
    isDragging,
    hasDraggedRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
