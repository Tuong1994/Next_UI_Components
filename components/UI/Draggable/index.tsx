"use client";

import React from "react";

export interface DraggableProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
}

const Draggable: React.FC<DraggableProps> = ({ rootClassName = "", style, children }) => {
  const [touchX, setTouchX] = React.useState<number>(0);

  const [touchY, setTouchY] = React.useState<number>(0);

  const [mouseX, setMouseX] = React.useState<number>(0);

  const [mouseY, setMouseY] = React.useState<number>(0);

  const [dragged, setDragged] = React.useState<boolean>(false);

  const dragElRef = React.useRef<HTMLDivElement>(null);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragged(true);
    setTouchX(e.touches[0].screenX - e.currentTarget.getBoundingClientRect().left);
    setTouchY(e.touches[0].screenY - e.currentTarget.getBoundingClientRect().top);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragged) return;
    if (dragElRef.current && dragElRef.current !== null) {
      const left = e.touches[0].screenX - touchX;
      const top = e.touches[0].screenY - touchY;
      dragElRef.current.style.left = `${left}px`;
      dragElRef.current.style.top = `${top}px`;
    }
  };

  const onTouchEnd = () => setDragged(false);

  const onMouseStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(true);
    setMouseX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setMouseY(e.screenY - e.currentTarget.getBoundingClientRect().top);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragged) return;
    if (dragElRef.current && dragElRef.current !== null) {
      const left = e.screenX - mouseX;
      const top = e.screenY - mouseY;
      dragElRef.current.style.left = `${left}px`;
      dragElRef.current.style.top = `${top}px`;
    }
  };

  const onMouseEnd = () => setDragged(false);

  return (
    <div
      ref={dragElRef}
      style={style}
      className={`draggable ${rootClassName}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseStart}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseEnd}
    >
      {children}
    </div>
  );
};

export default Draggable;
