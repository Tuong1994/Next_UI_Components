"use client"

import React from "react";
import { HiOutlineChevronDown as ArrowDown } from "react-icons/hi2";
import utils from "@/utils";

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  bordered?: boolean;
  hasArrow?: boolean;
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
    expandIcon,
    onCollapse,
    ...restProps
  },
  ref
) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);

  const panelRef = React.useRef<HTMLDivElement>(null);

  const borderedClassName = bordered ? "accordion-bordered" : "";

  const activeClassName = collapse ? `accordion-active ${!bordered ? "accordion-no-bordered" : ""}` : "";

  React.useEffect(() => {
    onCollapse?.(collapse);
  }, [collapse]);

  const handleCollapse = () => {
    if (!children) return;
    utils.collapse(panelRef);
    setCollapse(!collapse);
  };

  return (
    <div
      {...restProps}
      ref={ref}
      className={`accordion ${borderedClassName} ${activeClassName} ${rootClassName}`}
    >
      <div className="accordion-head" onClick={handleCollapse}>
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
