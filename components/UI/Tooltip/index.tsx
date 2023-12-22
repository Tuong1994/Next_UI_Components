"use client";

import React from "react";
import { ComponentColor, ComponentPlacement } from "@/common/type";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  titleClassName?: string;
  labelClassName?: string;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  label?: React.ReactNode | React.ReactNode[];
  placement?: ComponentPlacement;
  color?: Exclude<ComponentColor, "white" | "gray">;
}

const Tooltip: React.ForwardRefRenderFunction<HTMLDivElement, TooltipProps> = (
  {
    rootClassName = "",
    titleClassName = "",
    labelClassName = "",
    style,
    titleStyle,
    labelStyle,
    children,
    placement = "bottom",
    color = "black",
    label,
    ...restProps
  },
  ref
) => {
  const placementClassName = `tooltip-${placement}`;

  const colorClassName = `tooltip-${color}`;

  const arrowColorClassName = `title-arrow-${color}`;

  return (
    <div
      {...restProps}
      ref={ref}
      style={style}
      className={`tooltip ${placementClassName} ${colorClassName} ${rootClassName}`}
    >
      <div style={titleStyle} className={`tooltip-title ${titleClassName}`}>
        {children}
        {label && <span className={`title-arrow ${arrowColorClassName}`}></span>}
      </div>
      {label && (
        <div style={labelStyle} className={`tooltip-content ${labelClassName}`}>
          {label}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(Tooltip);
