import React from "react";

export interface LayoutBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const LayoutBody: React.ForwardRefRenderFunction<HTMLDivElement, LayoutBodyProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  return (
    <div {...restProps} ref={ref} className={`body ${rootClassName}`}>
      {children}
    </div>
  );
};

export default React.forwardRef(LayoutBody);
