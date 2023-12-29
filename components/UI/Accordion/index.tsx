"use client";

import React from "react";
import { HiOutlineChevronDown as ArrowDown } from "react-icons/hi2";
import utils from "@/utils";

type AccordionType = "default" | "group";

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  bordered?: boolean;
  hasArrow?: boolean;
  type?: AccordionType;
  isCollapsed?: boolean;
  extra?: React.ReactNode | React.ReactNode[];
  label?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
  expandIcon?: (collapse: boolean) => React.ReactNode;
  onCollapse?: (collapse: boolean) => void;
}

const Accordion: React.ForwardRefRenderFunction<HTMLDivElement, AccordionProps> = (
  {
    rootClassName = "",
    bordered = true,
    hasArrow = true,
    label,
    children,
    extra,
    type = "default",
    isCollapsed = false,
    expandIcon,
    onCollapse,
    ...restProps
  },
  ref
) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);

  const panelRef = React.useRef<HTMLDivElement>(null);

  const collapsed = type === "default" ? collapse : isCollapsed;

  const borderedClassName = bordered ? "accordion-bordered" : "";

  const activeClassName = collapsed ? `accordion-active ${!bordered ? "accordion-no-bordered" : ""}` : "";

  const className = utils.formatClassName("accordion", borderedClassName, activeClassName, rootClassName);

  React.useEffect(() => {
    onCollapse?.(collapse);
  }, [collapse]);

  React.useEffect(() => {
    if (!panelRef.current) return;
    if (panelRef.current === null) return;

    const panel = panelRef.current;
    if (!isCollapsed) panel.style.maxHeight = "";
    else panel.style.maxHeight = `${panel.scrollHeight}px`;
  }, [isCollapsed]);

  const handleCollapse = () => {
    utils.collapse(panelRef);
    setCollapse(!collapse);
  };

  const handleAction = () => {
    if (!children) return;
    if (type === "default") handleCollapse();
  };

  return (
    <div ref={ref} {...restProps} className={className}>
      <div className="accordion-head" onClick={handleAction}>
        <div className="head-label">
          {hasArrow && (
            <div className="label-icon">
              {expandIcon ? expandIcon(collapse) : <ArrowDown size={16} className="icon" />}
            </div>
          )}
          <div>{label}</div>
        </div>
        {extra && <div className="head-extra">{extra}</div>}
      </div>

      {children && (
        <div ref={panelRef} className="accordion-panel">
          <div className="panel-inner">{children}</div>
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(Accordion);
