"use client";

import React from "react";
import { ComponentColor, ComponentSize } from "@/common/type";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  sizes?: ComponentSize;
  color?: Exclude<ComponentColor, "black" | "white" | "gray">;
}

const Switch: React.ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (
  { rootClassName = "", sizes = "md", color = "blue", ...restProps },
  ref
) => {
  const sizeClassName = `switch-${sizes}`;

  const colorClassName = `switch-${color}`;

  return (
    <input
      {...restProps}
      ref={ref}
      type="checkbox"
      className={`switch ${colorClassName} ${sizeClassName} ${rootClassName}`}
    />
  );
};

export default React.forwardRef(Switch);
