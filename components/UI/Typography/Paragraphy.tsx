"use client";

import React from "react";
import { TypographyAlign, TypographyVariant } from "./type";

export interface ParagraphyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  underline?: boolean;
  strong?: boolean;
  mark?: boolean;
  remove?: boolean;
  italic?: boolean;
  align?: TypographyAlign;
  variant?: TypographyVariant;
}

const Paragraphy: React.ForwardRefRenderFunction<HTMLParagraphElement, ParagraphyProps> = (
  {
    rootClassName = "",
    children,
    underline,
    strong,
    mark,
    remove,
    italic,
    align = "left",
    variant = "default",
    ...restProps
  },
  ref
) => {
  const variantClassName = `paragraphy-${variant}`;

  const alignClassName = `paragraphy-${align}`;

  const underlineClassName = underline ? "paragraphy-underline" : "";

  const strongClassName = strong ? "paragraphy-strong" : "";

  const removeClassName = remove ? "paragraphy-remove" : "";

  const italicClassName = italic ? "paragraphy-italic" : "";

  return (
    <p
      {...restProps}
      ref={ref}
      className={`paragraphy ${alignClassName} ${underlineClassName} ${strongClassName} ${removeClassName} ${italicClassName} ${variantClassName} ${rootClassName}`}
    >
      {mark ? <mark>{children}</mark> : children}
    </p>
  );
};

export default React.forwardRef(Paragraphy);
