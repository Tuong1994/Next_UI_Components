"use client";

import React from "react";
import LayoutContext, { LayoutColor, LayoutContextState, LayoutTheme } from "../Context";
import utils from "@/utils";

export interface LayoutContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  theme?: LayoutTheme;
  color?: LayoutColor;
}

const LayoutContainer: React.ForwardRefRenderFunction<HTMLDivElement, LayoutContainerProps> = (
  { rootClassName = "", theme = "dark", color = "blue", children, ...restProps },
  ref
) => {
  const initialValue: LayoutContextState = { theme, color, layouted: true };

  const className = utils.formatClassName("container", rootClassName);

  return (
    <LayoutContext.Provider value={initialValue}>
      <main ref={ref} {...restProps} className={className}>
        {children}
      </main>
    </LayoutContext.Provider>
  );
};

export default React.forwardRef(LayoutContainer);
