"use client";

import React from "react";
import LayoutContext from "../Context";
import useLayoutStore from "../LayoutStore";

export interface LayoutContentProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const LayoutContent: React.ForwardRefRenderFunction<HTMLDivElement, LayoutContentProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  const { layouted } = React.useContext(LayoutContext);

  const shrinked = useLayoutStore((state) => state.shrinked);

  const layoutClassName = layouted ? "content-layout" : "";

  const shrinkClassName = shrinked ? "content-shrinked" : "";

  return (
    <div
      {...restProps}
      ref={ref}
      className={`content ${layoutClassName} ${shrinkClassName} ${rootClassName}`}
    >
      {children}
    </div>
  );
};

export default React.forwardRef(LayoutContent);
