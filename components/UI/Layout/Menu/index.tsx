import React from "react";
import { MenuItems } from "./type";
import { LayoutColor } from "../Context";
import Horizontal from "./Horizontal";
import Vertical from "./Vertical";

type MenuType = "horizontal" | "vertical";

export interface LayoutMenuProps {
  rootClassName?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  items?: MenuItems;
  type?: MenuType;
  color?: LayoutColor;
}

const LayoutMenu: React.ForwardRefRenderFunction<HTMLDivElement, LayoutMenuProps> = (
  { type = "horizontal", color = "blue", ...restProps },
  ref
) => {
  return (
    <React.Fragment>
      {type === "horizontal" && <Horizontal ref={ref} color={color} {...restProps} />}
      {type === "vertical" && <Vertical ref={ref} color={color} {...restProps} />}
    </React.Fragment>
  );
};

export default React.forwardRef(LayoutMenu);
