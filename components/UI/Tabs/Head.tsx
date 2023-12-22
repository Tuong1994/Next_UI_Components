import React from "react";
import { TabsItem } from "./type";

interface TabsHeadProps {
  item: TabsItem;
  itemStyle: React.CSSProperties;
  tabActiveClassName: string;
  setTabActive: React.Dispatch<React.SetStateAction<string>>;
}

const TabsHead: React.FC<TabsHeadProps> = ({
  item,
  itemStyle,
  tabActiveClassName,
  setTabActive,
}) => {
  return (
    <div
      style={itemStyle}
      className={`head-item ${tabActiveClassName}`}
      onClick={() => setTabActive(item.id)}
    >
      <div className="item-inner">{item.title}</div>
    </div>
  );
};

export default TabsHead;
