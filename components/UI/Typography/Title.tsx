import React from "react";
import { TypographyAlign, TypographyVariant } from "./type";

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  weight?: number;
  level?: TitleLevel;
  underline?: boolean;
  remove?: boolean;
  italic?: boolean;
  align?: TypographyAlign;
  variant?: TypographyVariant;
}

const Title: React.ForwardRefRenderFunction<HTMLHeadingElement, TitleProps> = (
  {
    rootClassName = "",
    level = 1,
    children,
    underline,
    remove,
    italic,
    style,
    weight = 500,
    align = "left",
    variant = "default",
    ...restProps
  },
  ref
) => {
  const variantClassName = `title-${variant}`;

  const alignClassName = `title-${align}`;

  const underlineClassName = underline ? "title-underline" : "";

  const removeClassName = remove ? "title-remove" : "";

  const italicClassName = italic ? "title-italic" : "";

  const commonProps = {
    ...restProps,
    ref,
    style: { ...style, fontWeight: weight },
    className: `title title-${level} ${alignClassName} ${removeClassName} ${italicClassName} ${underlineClassName} ${variantClassName} ${rootClassName}`,
  };

  return (
    <React.Fragment>
      {level === 1 && <h1 {...commonProps}>{children}</h1>}
      {level === 2 && <h2 {...commonProps}>{children}</h2>}
      {level === 3 && <h3 {...commonProps}>{children}</h3>}
      {level === 4 && <h4 {...commonProps}>{children}</h4>}
      {level === 5 && <h5 {...commonProps}>{children}</h5>}
      {level === 6 && <h6 {...commonProps}>{children}</h6>}
    </React.Fragment>
  );
};

export default React.forwardRef(Title);
