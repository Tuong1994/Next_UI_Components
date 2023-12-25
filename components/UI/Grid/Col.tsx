"use client";

import React from "react";
import { ColSpan } from "./type";
import { GridAppContext, GridRowContext } from "./Context";

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  isFill?: boolean;
  span?: ColSpan;
  xs?: ColSpan;
  md?: ColSpan;
  lg?: ColSpan;
}

const GridCol: React.ForwardRefRenderFunction<HTMLDivElement, GridColProps> = (
  { rootClassName = "", style, children, span, xs, md, lg, isFill, ...restProps },
  ref
) => {
  const { isPhone, isTablet, isLaptop, isDesktop } = React.useContext(GridAppContext);

  const { gutters } = React.useContext(GridRowContext);

  const [hide, setHide] = React.useState<boolean>(false);

  const [width, setWidth] = React.useState<string>("auto");

  const fillClassName = isFill ? "grid-col-fill" : "";

  const gapSize = !gutters.length ? 10 : gutters[0];

  const calculateWidth = (span: ColSpan) => `calc((100% / 24) * ${span} - ${gapSize}px)`;

  const inlineStyle = { ...style, width };

  React.useEffect(() => {
    if (hide) setHide(false);

    if (isDesktop) {
      if (span === undefined) return setWidth("auto");
      if (span === 0) return setHide(true);
      if (span === 24) return setWidth("100%");
      return setWidth(calculateWidth(span));
    }

    if (isPhone) {
      if (xs === undefined) return setWidth("auto");
      if (xs === 0) return setHide(true);
      if (xs && xs !== 24) return setWidth(calculateWidth(xs));
    }

    if (isTablet) {
      if (md === undefined) return setWidth("auto");
      if (md === 0) return setHide(true);
      if (md && md !== 24) return setWidth(calculateWidth(md));
    }

    if (isLaptop) {
      if (lg === undefined) return setWidth("auto");
      if (lg === 0) return setHide(true);
      if (lg && lg !== 24) return setWidth(calculateWidth(lg));
    }

    if (xs === 24 || md === 24 || lg === 24) return setWidth("100%");
  }, [span, xs, md, lg, isPhone, isTablet, isLaptop, isDesktop]);

  return !hide ? (
    <div
      {...restProps}
      ref={ref}
      style={inlineStyle}
      className={`grid-col ${fillClassName} ${rootClassName}`}
    >
      {children}
    </div>
  ) : null;
};

export default React.forwardRef(GridCol);
