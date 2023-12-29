"use client";

import React from "react";
import { MenuItems } from "../type";
import LayoutContext, { LayoutColor } from "../../Context";
import MenuVerticalItem from "./Item";
import utils from "@/utils";

export interface MenuVerticalProps {
  rootClassName?: string;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  items?: MenuItems;
  color?: LayoutColor;
}

const MenuVertical: React.ForwardRefRenderFunction<HTMLDivElement, MenuVerticalProps> = (
  { rootClassName = "", itemClassName, itemStyle, items = [], color = "blue", ...restProps },
  ref
) => {
  const { theme, layouted, color: layoutColor } = React.useContext(LayoutContext);

  const [activeId, setActiveId] = React.useState<string[]>([]);

  const themeClassName = theme === "dark" ? "menu-vertical-dark" : "";

  const colorClassName = `menu-vertical-${layouted ? layoutColor : color}`;

  const className = utils.formatClassName("menu-vertical", themeClassName, colorClassName, rootClassName);

  const handleSelectMenu = (id: string) => {
    if (activeId.length) setActiveId([]);
    setActiveId([id]);
  };

  return (
    <div ref={ref} {...restProps} className={className}>
      {items.map((item) => (
        <MenuVerticalItem
          key={item.id}
          item={item}
          color={layoutColor}
          activeId={activeId}
          itemStyle={itemStyle}
          itemClassName={itemClassName}
          handleSelectMenu={handleSelectMenu}
        />
      ))}
    </div>
  );
};

export default React.forwardRef(MenuVertical);
