import React from "react";
import { Spinner } from "../Loading";

interface ImageLoadingProps {
  imageSize: () => React.CSSProperties;
}

const ImageLoading: React.ForwardRefRenderFunction<HTMLDivElement, ImageLoadingProps> = ({ imageSize }, ref) => {
  return (
    <div ref={ref} style={imageSize()} className="image-loading">
      <Spinner size={20} />
    </div>
  );
};

export default React.forwardRef(ImageLoading);
