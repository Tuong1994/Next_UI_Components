import React from "react";
import { TypographyAlign, TypographyVariant } from "./type";

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  lineHeight?: number;
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

const Paragraph: React.ForwardRefRenderFunction<HTMLParagraphElement, ParagraphProps> = (
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
    lineHeight = 25,
    weight = 400,
    size = 14,
    style,
    ...restProps
  },
  ref
) => {
  const variantClassName = `paragraph-${variant}`;

  const alignClassName = `paragraph-${align}`;

  const underlineClassName = underline ? "paragraph-underline" : "";

  const strongClassName = strong ? "paragraph-strong" : "";

  const removeClassName = remove ? "paragraph-remove" : "";

  const italicClassName = italic ? "paragraph-italic" : "";

  const inlineStyle = (): React.CSSProperties => {
    const defaultStyle = { ...style, fontSize: `${size}px`, lineHeight: `${lineHeight}px` };
    if (strong) return defaultStyle;
    return { ...defaultStyle, fontWeight: weight };
  };

  return (
    <p
      ref={ref}
      style={inlineStyle()}
      {...restProps}
      className={`paragraph ${alignClassName} ${underlineClassName} ${strongClassName} ${removeClassName} ${italicClassName} ${variantClassName} ${rootClassName}`}
    >
      {mark ? <mark>{children}</mark> : children}
    </p>
  );
};

export default React.forwardRef(Paragraph);
