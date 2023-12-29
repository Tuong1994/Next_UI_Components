"use client";

import React from "react";
import { ComponentColor, ComponentPlacement } from "@/common/type";
import utils from "@/utils";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  titleClassName?: string;
  labelClassName?: string;
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

  const mainClassName = utils.formatClassName("tooltip", placementClassName, colorClassName, rootClassName);

  const tooltipTitleClassName = utils.formatClassName("tooltip-title", titleClassName);

  const toolTipContentClassName = utils.formatClassName("tooltip-content", labelClassName);

  const tooltipArrowClassName = utils.formatClassName("title-arrow", arrowColorClassName);

  return (
    <div ref={ref} {...restProps} className={mainClassName}>
      <div style={titleStyle} className={tooltipTitleClassName}>
        {children}
        {label && <span className={tooltipArrowClassName}></span>}
      </div>
      {label && (
        <div style={labelStyle} className={toolTipContentClassName}>
          {label}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(Tooltip);
