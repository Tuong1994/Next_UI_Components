"use client";

import React from "react";
import { ComponentColor, ComponentShape } from "@/common/type";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  ghost?: boolean;
  shape?: Exclude<ComponentShape, "circle">;
  color?: Exclude<ComponentColor, "white" | "gray">;
}

const Badge: React.ForwardRefRenderFunction<HTMLDivElement, BadgeProps> = (
  { rootClassName = "", ghost, color, shape = "round", children, ...restProps },
  ref
) => {
  const shapeClassName = `badge-${shape}`;

  const colorClassName = () => {
    if (ghost && !color) return "badge-ghost";
    if (!ghost && color) return `badge-color badge-${color}`;
    if (ghost && color) return `badge-ghost badge-ghost-${color}`;
    return "";
  };

  return (
    <div {...restProps} ref={ref} className={`badge ${colorClassName()} ${shapeClassName} ${rootClassName}`}>
      {children}
    </div>
  );
};

export default React.forwardRef(Badge);
