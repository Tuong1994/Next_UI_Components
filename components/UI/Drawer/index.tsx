"use client";

import React from "react";
import { HiXMark } from "react-icons/hi2";
import { useOverflow, useRender } from "@/hooks";
import Portal from "@/components/Portal";
import utils from "@/utils";

export interface DrawerProps {
  rootClassName?: string;
  headClassName?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  open?: boolean;
  hasHead?: boolean;
  head?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
  onClose?: () => void;
}

const Drawer: React.ForwardRefRenderFunction<HTMLDivElement, DrawerProps> = (
  {
    rootClassName = "",
    headClassName = "",
    bodyClassName = "",
    style,
    headStyle,
    bodyStyle,
    head = "Drawer",
    children,
    open = false,
    hasHead = true,
    onClose,
  },
  ref
) => {
  const render = useRender(open);

  useOverflow(open);

  const backdropActiveClassName = open ? "drawer-backdrop-active" : "";

  const drawerActiveClassName = open ? "drawer-active" : "";

  const mainClassName = utils.formatClassName("drawer", drawerActiveClassName, rootClassName);

  const backdropClassName = utils.formatClassName("drawer-backdrop", backdropActiveClassName);

  const drawerHeadClassName = utils.formatClassName("drawer-head", headClassName);

  const drawerBodyClassName = utils.formatClassName("drawer-body", bodyClassName);

  return (
    <Portal>
      {render && (
        <React.Fragment>
          <div className={backdropClassName} onClick={onClose} />

          <div ref={ref} style={style} className={mainClassName}>
            {hasHead && (
              <div style={headStyle} className={drawerHeadClassName}>
                {head}
                <HiXMark size={18} className="head-icon" onClick={onClose} />
              </div>
            )}
            <div style={bodyStyle} className={drawerBodyClassName}>
              {children}
            </div>
          </div>
        </React.Fragment>
      )}
    </Portal>
  );
};

export default React.forwardRef(Drawer);
