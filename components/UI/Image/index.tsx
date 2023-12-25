"use client";

import React from "react";
import { ComponentSize } from "@/common/type";
import ImageView from "./View";
import ImageLoading from "./Loading";
import DefaultImage from "@/assets/default-image.jpg";

type ImageSize = ComponentSize;

type ImageObjectFit = "fill" | "cover" | "contain" | "none";

type ImageLazyType = "immediate" | "lazy";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  rootClassName?: string;
  rootStyle?: React.CSSProperties;
  imgWidth?: number | string;
  imgHeight?: number | string;
  size?: ImageSize;
  objectFit?: ImageObjectFit;
  lazyType?: ImageLazyType;
  hasView?: boolean;
  hasRemove?: boolean;
  hasCheck?: boolean;
  onRemove?: () => void;
  onCheck?: (checked: boolean) => void;
}

const Image: React.ForwardRefRenderFunction<HTMLImageElement, ImageProps> = (
  {
    rootClassName = "",
    rootStyle,
    imgWidth,
    imgHeight,
    size,
    objectFit = "fill",
    lazyType = "lazy",
    src = DefaultImage,
    onCheck,
    ...restProps
  },
  ref
) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const [view, setView] = React.useState<string>("");

  const [checked, setChecked] = React.useState<boolean>(false);

  const rootCheckedClassName = checked ? "image-checked" : "";

  const elRef = React.useRef<HTMLDivElement>(null);

  const fitClassName = `image-${objectFit}`;

  React.useEffect(() => {
    if (lazyType === "lazy") {
      if (window["IntersectionObserver"]) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setView(src as string);
            if (elRef.current && elRef.current !== null) observer.unobserve(elRef.current);
          }
        });
        if (elRef.current && elRef.current !== null) observer.observe(elRef.current);
      } else setView(src as string);
    } else setView(src as string);
  }, [src]);

  const imageSize = (): React.CSSProperties => {
    if (size) {
      if (size === "sm") return { width: `100px`, height: `100px` };
      if (size === "md") return { width: `200px`, height: `200px` };
      if (size === "lg") return { width: `300px`, height: `300px` };
    }
    if (imgWidth && !imgHeight) return { width: imgWidth, height: "auto" };
    if (imgHeight && !imgWidth) return { width: "auto", height: imgHeight };
    if (imgWidth && imgHeight) return { width: imgWidth, height: imgHeight };
    return { width: "auto", height: "auto" };
  };

  const handleImageLoaded = () => setLoading(false);

  const handleCheck = (checked: boolean) => {
    setChecked(checked);
    onCheck?.(checked);
  };

  return (
    <div
      style={{ ...rootStyle, ...imageSize() }}
      className={`image ${fitClassName} ${rootCheckedClassName} ${rootClassName}`}
    >
      {loading && !view ? (
        <ImageLoading ref={elRef} imageSize={imageSize} />
      ) : (
        <ImageView
          ref={ref}
          {...restProps}
          src={view}
          checked={checked}
          imageSize={imageSize}
          onLoad={handleImageLoaded}
          handleCheck={handleCheck}
        />
      )}
    </div>
  );
};

export default React.forwardRef(Image);
