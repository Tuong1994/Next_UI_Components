"use client";

import React from "react";
import LayoutContext, { LayoutColor, LayoutContextState, LayoutTheme } from "../Context";

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

  return (
    <LayoutContext.Provider value={initialValue}>
      <main {...restProps} ref={ref} className={`container ${rootClassName}`}>
        {children}
      </main>
    </LayoutContext.Provider>
  );
};

export default React.forwardRef(LayoutContainer);
