"use client";

import React from "react";
import { CgArrowsShrinkH as ShrinkIcon } from "react-icons/cg";
import LayoutContext from "../Context";
import Button from "@/components/UI/Button";
import useLayoutStore from "../LayoutStore";
import utils from "@/utils";

export interface LayoutSideProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const LayoutSide: React.ForwardRefRenderFunction<HTMLDivElement, LayoutSideProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  const { theme, color, layouted } = React.useContext(LayoutContext);

  const [shrinked, onShrinked] = useLayoutStore((state) => [state.shrinked, state.onShrinked]);

  const themeClassName = `side-${theme}`;

  const shrinkClassName = shrinked ? `side-shrinked` : "";

  const layoutClassName = layouted ? "side-layout" : "";

  const className = utils.formatClassName(
    "side",
    shrinkClassName,
    layoutClassName,
    themeClassName,
    rootClassName
  );

  return (
    <aside ref={ref} {...restProps} className={className}>
      <div className="side-content">{children}</div>
      <div className="side-action">
        <Button color={color} rootClassName="action-btn" onClick={onShrinked}>
          <ShrinkIcon size={20} />
        </Button>
      </div>
    </aside>
  );
};

export default React.forwardRef(LayoutSide);
