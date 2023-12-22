"use client";

import React from "react";
import LayoutContext from "../Context";

export interface LayoutHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  fixed?: boolean;
}

const LayoutHead: React.ForwardRefRenderFunction<HTMLDivElement, LayoutHeadProps> = (
  { rootClassName = "", children, fixed, ...restProps },
  ref
) => {
  const { theme, layouted } = React.useContext(LayoutContext);

  const themeClassName = `head-${theme}`;

  const fixedClassName = fixed || layouted ? `head-fixed` : "";

  return (
    <header {...restProps} ref={ref} className={`head ${fixedClassName} ${themeClassName} ${rootClassName}`}>
      {children}
    </header>
  );
};

export default React.forwardRef(LayoutHead);
