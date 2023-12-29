"use client";

import React from "react";
import TabsHead from "./Head";
import { TabsItems } from "./type";
import { ComponentColor } from "@/common/type";
import utils from "@/utils";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  headClassName?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  items: TabsItems;
  color?: Exclude<ComponentColor, "black" | "white" | "gray">;
}

const Tabs: React.ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (
  {
    rootClassName = "",
    headClassName = "",
    contentClassName = "",
    style,
    headStyle,
    contentStyle,
    color = "blue",
    items = [],
    ...restProps
  },
  ref
) => {
  const [tabActive, setTabActive] = React.useState<string>("1");

  const colorClassName = `tabs-${color}`;

  const mainClassName = utils.formatClassName("tabs", colorClassName, rootClassName);

  const tabsHeadClassName = utils.formatClassName("tabs-head", headClassName);

  const tabsContentClassName = utils.formatClassName("tabs-content", contentClassName);

  const renderTitles = () => {
    return items.map((item) => {
      const tabActiveClassName = tabActive === item.id ? "head-item-active" : "";
      const commonProps = { item, tabActiveClassName, setTabActive };
      return <TabsHead key={item.id} {...commonProps} />;
    });
  };

  const renderContents = () => {
    return items.map((item) => {
      const actived = tabActive === item.id;
      const tabActiveClassName = actived ? "content-item-active" : "";
      if (actived) {
        return (
          <div key={item.id} className={utils.formatClassName("content-item", tabActiveClassName)}>
            {item.content}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div ref={ref} style={style} {...restProps} className={mainClassName}>
      <div style={headStyle} className={tabsHeadClassName}>
        {renderTitles()}
      </div>

      <div style={contentStyle} className={tabsContentClassName}>
        {renderContents()}
      </div>
    </div>
  );
};

export default React.forwardRef(Tabs);
