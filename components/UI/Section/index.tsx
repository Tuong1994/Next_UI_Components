'use client'

import React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const Section: React.ForwardRefRenderFunction<HTMLDivElement, SectionProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  return (
    <section {...restProps} ref={ref} className={`section ${rootClassName}`}>
      {children}
    </section>
  );
};

export default React.forwardRef(Section);
