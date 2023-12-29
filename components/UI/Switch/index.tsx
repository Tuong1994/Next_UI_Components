"use client";

import React from "react";
import { ComponentColor, ComponentSize } from "@/common/type";
import utils from "@/utils";

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

  const className = utils.formatClassName("switch", colorClassName, sizeClassName, rootClassName);

  return <input ref={ref} type="checkbox" {...restProps} className={className} />;
};

export default React.forwardRef(Switch);
