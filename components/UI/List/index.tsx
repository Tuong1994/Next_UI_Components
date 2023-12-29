"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";
import ListContext, { ListContextState } from "./ListContext";
import utils from "@/utils";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  rootClassName?: string;
  headClassName?: string;
  contentClassName?: string;
  rootStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  head?: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
}

export const List: React.FC<ListProps> = React.forwardRef(
  (
    {
      rootClassName = "",
      headClassName = "",
      contentClassName = "",
      rootStyle,
      headStyle,
      head,
      icon = <FaCheck />,
      children,
      ...restProps
    },
    ref: React.Ref<HTMLUListElement>
  ) => {
    const initialValue: ListContextState = { icon };

    const mainClassName = utils.formatClassName("list", rootClassName);

    const listTitleClassName = utils.formatClassName("list-title", headClassName);

    const listContentClassName = utils.formatClassName("list-inner", contentClassName);

    return (
      <ListContext.Provider value={initialValue}>
        <div style={rootStyle} className={mainClassName}>
          {head && (
            <h4 style={headStyle} className={listTitleClassName}>
              {head}
            </h4>
          )}
          <ul ref={ref} {...restProps} className={listContentClassName}>
            {children}
          </ul>
        </div>
      </ListContext.Provider>
    );
  }
);

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  rootClassName?: string;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
}

export const ListItem: React.FC<ListItemProps> = React.forwardRef(
  (
    { rootClassName = "", contentClassName = "", contentStyle, children, ...restProps },
    ref: React.Ref<HTMLLIElement>
  ) => {
    const { icon } = React.useContext(ListContext);

    const mainClassName = utils.formatClassName("list-item", rootClassName);

    const listItemContentClassName = utils.formatClassName("item-content", contentClassName);

    return (
      <li ref={ref} {...restProps} className={mainClassName}>
        {icon && <div className="item-icon">{icon}</div>}
        <div style={contentStyle} className={listItemContentClassName}>
          {children}
        </div>
      </li>
    );
  }
);
