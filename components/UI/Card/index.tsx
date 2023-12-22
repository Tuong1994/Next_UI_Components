"use client";

import React from "react";

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

  return (
    <div {...restProps} ref={ref} className={`card ${hoverClassName} ${rootClassName}`}>
      {head && (
        <div style={headStyle} className={`card-head ${headClassName}`}>
          {head}
        </div>
      )}

      <div style={bodyStyle} className={`card-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default React.forwardRef(Card);
