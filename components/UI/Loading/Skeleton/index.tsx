import React from "react";
import {
  ButtonSkeletonProps,
  ImageSkeletonProps,
  ParagraphSkeletonProps,
  SkeletonType,
  TitleSkeletonProps,
} from "./type";
import utils from "@/utils";

interface CommonProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: SkeletonType;
  rootClassName?: string;
}

type SkeletonProps = (
  | TitleSkeletonProps
  | ParagraphSkeletonProps
  | ImageSkeletonProps
  | ButtonSkeletonProps
) &
  CommonProps;

const Skeleton: React.ForwardRefRenderFunction<HTMLDivElement, SkeletonProps> = (
  { rootClassName = "", type, options, style, ...restProps },
  ref
) => {
  const commonProps = { ref, ...restProps };

  const shapeClassName = `skeleton-${options?.shape ?? "round"}`;

  const className = utils.formatClassName("skeleton", shapeClassName, rootClassName);

  const inlineStyle = (): React.CSSProperties => {
    const rootStyle = { ...style };
    if (type !== "image")
      return { ...rootStyle, width: `${options?.width}px`, height: `${options?.height}px` };
    if (type === "image")
      return { ...rootStyle, width: `${options?.size ?? 100}px`, height: `${options?.size ?? 100}px` };
    return rootStyle;
  };

  return (
    <React.Fragment>
      {type === "title" && (
        <div style={inlineStyle()} {...commonProps} className={`${className} skeleton-title`}></div>
      )}

      {type === "paragraph" && (
        <div className="skeleton-paragraph">
          {[...Array(options?.lines ?? 4)].map((_, idx) => (
            <div
              key={idx}
              style={inlineStyle()}
              {...commonProps}
              className={`${className} skeleton-paragraph-line`}
            ></div>
          ))}
        </div>
      )}

      {type === "image" && (
        <div style={inlineStyle()} {...commonProps} className={`${className} skeleton-image`}></div>
      )}

      {type === "button" && (
        <div style={inlineStyle()} {...commonProps} className={`${className} skeleton-button`}></div>
      )}
    </React.Fragment>
  );
};

export default React.forwardRef(Skeleton);
