"use client";

import React from "react";
import { TypographyAlign, TypographyVariant } from "./type";

export interface ParagraphyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  weight?: number;
  size?: number;
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
    weight = 400,
    size = 14,
    style,
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

  const inlineStyle = () => {
    if(strong) return ({ ...style, fontSize: `${size}px` })
    return ({ ...style, fontWeight: weight, fontSize: `${size}px` })
  };

  return (
    <p
      {...restProps}
      ref={ref}
      style={inlineStyle()}
      className={`paragraphy ${alignClassName} ${underlineClassName} ${strongClassName} ${removeClassName} ${italicClassName} ${variantClassName} ${rootClassName}`}
    >
      {mark ? <mark>{children}</mark> : children}
    </p>
  );
};

export default React.forwardRef(Paragraphy);
