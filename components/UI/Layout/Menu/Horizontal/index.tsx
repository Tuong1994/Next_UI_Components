"use client";

import React from "react";
import { MenuItems } from "../type";
import LayoutContext, { LayoutColor } from "../../Context";
import MenuHorizontalItem from "./Item";

export interface MenuHorizontalProps {
  rootClassName?: string;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  items?: MenuItems;
  color?: LayoutColor;
}

const MenuHorizontal: React.ForwardRefRenderFunction<HTMLDivElement, MenuHorizontalProps> = (
  { rootClassName = "", itemClassName, itemStyle, items = [], color = "blue", ...restProps },
  ref
) => {
  const { layouted, color: layoutColor } = React.useContext(LayoutContext);

  const [activeId, setActiveId] = React.useState<string[]>([]);

  const colorClassName = `menu-horizontal-${layouted ? layoutColor : color}`;

  const layoutClassName = layouted ? "menu-horizontal-layout" : "";

  const handleOpenMenu = (id: string) => {
    const idx = activeId.indexOf(id);
    if (idx === -1) setActiveId((prev) => [...prev, id]);
    else setActiveId((prev) => [...prev].filter((active) => active !== id));
  };

  return (
    <div
      {...restProps}
      ref={ref}
      className={`menu-horizontal ${colorClassName} ${layoutClassName} ${rootClassName}`}
    >
      {items.map((item) => (
        <MenuHorizontalItem
          key={item.id}
          item={item}
          activeId={activeId}
          itemClassName={itemClassName}
          itemStyle={itemStyle}
          handleOpenMenu={handleOpenMenu}
        />
      ))}
    </div>
  );
};

export default React.forwardRef(MenuHorizontal);
