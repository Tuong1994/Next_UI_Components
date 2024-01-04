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

  const [shrinked, resizeContent] = useLayoutStore((state) => [state.shrinked, state.resizeContent]);

  const layoutClassName = layouted ? "content-layout" : "";

  const resizeClassName = resizeContent ? "content-resize" : "";

  const shrinkClassName = shrinked ? "content-shrinked" : "";

  const className = utils.formatClassName(
    "content",
    layoutClassName,
    shrinkClassName,
    resizeClassName,
    rootClassName
  );

  return (
    <div ref={ref} {...restProps} className={className}>
      {children}
    </div>
  );
};

export default React.forwardRef(LayoutContent);
