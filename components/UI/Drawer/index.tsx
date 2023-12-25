"use client";

import React from "react";
import { HiXMark } from "react-icons/hi2";
import Portal from "@/components/Portal";
import useRender from "@/hooks/useRender";

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

  const backdropActiveClassName = open ? "drawer-backdrop-active" : "";

  const drawerActiveClassName = open ? "drawer-active" : "";

  return (
    <Portal>
      {render && (
        <React.Fragment>
          <div className={`drawer-backdrop ${backdropActiveClassName}`} onClick={onClose} />

          <div ref={ref} style={style} className={`drawer ${drawerActiveClassName} ${rootClassName}`}>
            {hasHead && (
              <div style={headStyle} className={`drawer-head ${headClassName}`}>
                {head}
                <HiXMark size={18} className="head-icon" onClick={onClose} />
              </div>
            )}
            <div style={bodyStyle} className={`drawer-body ${bodyClassName}`}>
              {children}
            </div>
          </div>
        </React.Fragment>
      )}
    </Portal>
  );
};

export default React.forwardRef(Drawer);
