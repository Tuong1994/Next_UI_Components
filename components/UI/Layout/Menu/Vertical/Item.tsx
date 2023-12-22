import React from "react";
import { MenuItem } from "../type";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { Tooltip } from "@/components/UI";
import { LayoutColor } from "../../Context";
import useLayoutStore from "../../LayoutStore";

interface MenuVerticalItemProps {
  item: MenuItem;
  activeId: string[];
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  color?: LayoutColor;
  handleSelectMenu: (id: string) => void;
}

const MenuVerticalItem: React.FC<MenuVerticalItemProps> = ({
  item,
  activeId,
  itemClassName = "",
  itemStyle,
  color = "blue",
  handleSelectMenu,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const shrinked = useLayoutStore((state) => state.shrinked);

  const hasChild = item.children && item.children.length > 0;

  const actived = hasChild ? open : activeId.includes(item.id);

  const showTooltipContent = shrinked && item.isRoot && !hasChild;

  const rootLabelClassName = item.isRoot ? "item-label-root" : "";

  const rootChildClassName =
    item.isRoot && !open ? "item-children-root" : "item-children-root item-children-root-active";

  const labelActiveClassName = actived && !hasChild ? "item-label-active" : "";

  const childActiveClassName = actived && hasChild ? "item-children-active" : "";

  const iconActiveClassName = actived && hasChild ? "label-arrow-active" : "";

  const shrinkClassName = shrinked ? "vertical-item-shrinked" : "";

  const handleOpen = (e: any) => {
    if (e.type === "click") return hasChild ? setOpen(!open) : handleSelectMenu(item.id);
    if (shrinked && item.isRoot) setOpen(!open);
  };

  return (
    <div
      style={itemStyle}
      className={`vertical-item ${shrinkClassName} ${itemClassName}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleOpen}
    >
      <Tooltip
        placement="right"
        color={color}
        label={showTooltipContent ? item.label : ""}
        rootClassName="item-tooltip-wrap"
        titleClassName={`item-label ${rootLabelClassName} ${labelActiveClassName}`}
        onClick={handleOpen}
      >
        <div className="label-content">
          {item.icon && <div className="content-icon">{item.icon}</div>}
          <div className="content-text">{item.label}</div>
        </div>

        {hasChild && (
          <div className={`label-arrow ${iconActiveClassName}`}>
            <HiOutlineChevronDown className="arrow-icon" />
          </div>
        )}
      </Tooltip>

      {hasChild && (
        <div className={`item-children ${rootChildClassName} ${childActiveClassName}`}>
          {item.children &&
            item.children.map((item) => (
              <MenuVerticalItem
                key={item.id}
                item={item}
                color={color}
                activeId={activeId}
                itemStyle={itemStyle}
                itemClassName={itemClassName}
                handleSelectMenu={handleSelectMenu}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuVerticalItem;
