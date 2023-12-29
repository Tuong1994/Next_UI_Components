"use client";

import React from "react";
import { DropdownItems } from "./type";
import { ComponentPlacement } from "@/common/type";
import useRender from "@/hooks/useRender";
import useClickOutside from "@/hooks/useClickOutside";
import utils from "@/utils";

type TriggerType = "click" | "hover";

export interface DropdownProps {
  rootClassName?: string;
  titleClassName?: string;
  dropdownClassName?: string;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  items: DropdownItems;
  placement?: Exclude<ComponentPlacement, "top" | "bottom">;
  trigger?: TriggerType;
}

const Dropdown: React.ForwardRefRenderFunction<HTMLDivElement, DropdownProps> = (
  {
    rootClassName = "",
    titleClassName = "",
    dropdownClassName = "",
    style,
    titleStyle,
    dropdownStyle,
    children,
    items = [],
    placement = "left",
    trigger = "click",
  },
  ref
) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const render = useRender(open);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, setOpen);

  const placementClassName = `dropdown-${placement}`;

  const openClassName = open ? "dropdown-wrap-active" : "";

  const hoverClassName = trigger === "hover" ? "dropdown-hover" : "";

  const isRender = trigger === "click" ? render : true;

  const mainClassName = utils.formatClassName("dropdown", placementClassName, hoverClassName, rootClassName);

  const dropdownTitleClassName = utils.formatClassName("dropdown-title", titleClassName);

  const dropdownListClassName = utils.formatClassName("dropdown-wrap", openClassName, dropdownClassName);

  const renderItems = () => {
    return items.map((item) => (
      <div key={item.id} className="wrap-item">
        {item.label}
      </div>
    ));
  };

  const handleOpen = () => setOpen(!open);

  const handleClick = () => trigger === "click" && handleOpen();

  return (
    <div ref={dropdownRef}>
      <div ref={ref} style={style} className={mainClassName}>
        <div className={dropdownTitleClassName} style={titleStyle} onClick={handleClick}>
          {children}
        </div>

        {isRender && (
          <div style={dropdownStyle} className={dropdownListClassName}>
            {renderItems()}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(Dropdown);
