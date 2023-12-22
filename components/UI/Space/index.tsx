"use client";

import React from "react";
import { ComponentAligns, ComponentJustify } from "@/common/type";

type SpaceSize = "sm" | "md" | "lg" | number

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  size?: SpaceSize;
  justify?: Exclude<ComponentJustify, "between" | "around" | "evenly">;
  align?: Exclude<ComponentAligns, "baseline">;
}

const Space: React.ForwardRefRenderFunction<HTMLDivElement, SpaceProps> = (
  { rootClassName = "", style, children, size = "sm", justify = "left", align = "top", ...restProps },
  ref
) => {
  const justifyClassName = `space-${justify}`;

  const alignClassName = `space-${align}`;

  const rootStyle = () => {
    if (typeof size === "number") return { ...style, gap: `10px ${size}px` };
    if (size === "sm") return { ...style, gap: "10px" };
    if (size === "md") return { ...style, gap: "10px 30px" };
    if (size === "lg") return { ...style, gap: "10px 60px" };
  };

  return (
    <div
      {...restProps}
      ref={ref}
      style={rootStyle()}
      className={`space ${justifyClassName} ${alignClassName} ${rootClassName}`}
    >
      {children}
    </div>
  );
};

export default React.forwardRef(Space);
