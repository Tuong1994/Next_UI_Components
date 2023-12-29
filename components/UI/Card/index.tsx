"use client";

import React from "react";
import utils from "@/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  headClassName?: string;
  bodyClassName?: string;
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  head?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
  hoverable?: boolean;
}

const Card: React.ForwardRefRenderFunction<HTMLDivElement, CardProps> = (
  {
    rootClassName = "",
    headClassName = "",
    bodyClassName = "",
    headStyle,
    bodyStyle,
    head,
    children,
    hoverable,
    ...restProps
  },
  ref
) => {
  const hoverClassName = hoverable ? "card-hover" : "";

  const mainClassName = utils.formatClassName("card", hoverClassName, rootClassName);

  const cardHeadClassName = utils.formatClassName("card-head", headClassName);

  const cardBodyClassName = utils.formatClassName("card-body", bodyClassName);

  return (
    <div ref={ref} {...restProps} className={mainClassName}>
      {head && (
        <div style={headStyle} className={cardHeadClassName}>
          {head}
        </div>
      )}

      <div style={bodyStyle} className={cardBodyClassName}>
        {children}
      </div>
    </div>
  );
};

export default React.forwardRef(Card);
