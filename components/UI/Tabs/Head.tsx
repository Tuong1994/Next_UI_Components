import React from "react";
import { TabsItem } from "./type";

interface TabsHeadProps {
  item: TabsItem;
  tabActiveClassName: string;
  setTabActive: React.Dispatch<React.SetStateAction<string>>;
}

const TabsHead: React.FC<TabsHeadProps> = ({ item, tabActiveClassName, setTabActive }) => {
  return (
    <div className={`head-item ${tabActiveClassName}`} onClick={() => setTabActive(item.id)}>
      <div className="item-inner">{item.title}</div>
    </div>
  );
};

export default TabsHead;
