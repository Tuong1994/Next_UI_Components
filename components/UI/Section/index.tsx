"use client";

import React from "react";
import utils from "@/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const Section: React.ForwardRefRenderFunction<HTMLDivElement, SectionProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  const className = utils.formatClassName("section", rootClassName);

  return (
    <section ref={ref} {...restProps} className={className}>
      {children}
    </section>
  );
};

export default React.forwardRef(Section);
