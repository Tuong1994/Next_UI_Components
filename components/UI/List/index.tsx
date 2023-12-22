"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";
import ListContext, { ListContextState } from "./ListContext";

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
      head = "Title",
      icon = <FaCheck />,
      children,
      ...restProps
    },
    ref: React.Ref<HTMLUListElement>
  ) => {
    const initialValue: ListContextState = { icon };

    return (
      <ListContext.Provider value={initialValue}>
        <div style={rootStyle} className={`list ${rootClassName}`}>
          <h4 style={headStyle} className={`list-title ${headClassName}`}>
            {head}
          </h4>
          <ul {...restProps} ref={ref} className={`list-inner ${contentClassName}`}>
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

    return (
      <li {...restProps} ref={ref} className={`list-item ${rootClassName}`}>
        <div className="item-icon">{icon}</div>
        <div style={contentStyle} className={`item-content ${contentClassName}`}>
          {children}
        </div>
      </li>
    );
  }
);
