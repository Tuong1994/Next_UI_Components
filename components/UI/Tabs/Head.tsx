import React from "react";
import { TabsItem } from "./type";
import utils from "@/utils";

interface TabsHeadProps {
  item: TabsItem;
  tabActiveClassName: string;
  setTabActive: React.Dispatch<React.SetStateAction<string>>;
}

const TabsHead: React.FC<TabsHeadProps> = ({ item, tabActiveClassName, setTabActive }) => {
  const className = utils.formatClassName("head-item", tabActiveClassName);

  return (
    <div className={className} onClick={() => setTabActive(item.id)}>
      <div className="item-inner">{item.title}</div>
    </div>
  );
};

export default TabsHead;
