"use client";

import React from "react";
import LayoutContext from "../Context";
import useLayoutStore from "../LayoutStore";
import utils from "@/utils";

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

  const className = utils.formatClassName("content", layoutClassName, shrinkClassName, rootClassName);

  return (
    <div ref={ref} {...restProps} className={className}>
      {children}
    </div>
  );
};

export default React.forwardRef(LayoutContent);
