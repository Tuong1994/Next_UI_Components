import React from "react";
import utils from "@/utils";

export interface LayoutBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const LayoutBody: React.ForwardRefRenderFunction<HTMLDivElement, LayoutBodyProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  const className = utils.formatClassName("body", rootClassName);

  return (
    <div ref={ref} {...restProps} className={className}>
      {children}
    </div>
  );
};

export default React.forwardRef(LayoutBody);
