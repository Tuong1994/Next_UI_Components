"use client";

import React from "react";
import { BreadcrumbItems } from "./type";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  items?: BreadcrumbItems;
  separator?: React.ReactNode | React.ReactNode[];
}

const Breadcrumb: React.ForwardRefRenderFunction<HTMLDivElement, BreadcrumbProps> = (
  { rootClassName = "", itemClassName = "", itemStyle, items = [], separator = "/", ...restProps },
  ref
) => {
  const renderItems = () => {
    return items.map((item, idx) => (
      <div key={item.id} style={itemStyle} className={`breadcrumb-item ${itemClassName}`}>
        <div className="item-label">{item.label}</div>
        {idx !== items.length - 1 && <div className="item-separator">{separator}</div>}
      </div>
    ));
  };

  return (
    <div {...restProps} ref={ref} className={`breadcrumb ${rootClassName}`}>
      {renderItems()}
    </div>
  );
};

export default React.forwardRef(Breadcrumb);
