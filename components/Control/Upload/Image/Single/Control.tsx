import React from "react";
import { HiPlus } from "react-icons/hi2";

interface SingleImageUploadControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  controlClassName?: string;
  controlStyle?: React.CSSProperties;
}

const SingleImageUploadControl: React.ForwardRefRenderFunction<
  HTMLInputElement,
  SingleImageUploadControlProps
> = ({ controlClassName, controlStyle, ...restProps }, ref) => {
  return (
    <label style={controlStyle} className={`group-control ${controlClassName}`}>
      <input ref={ref} {...restProps} type="file" className="control-input" />
      <HiPlus size={25} className="control-icon" />
    </label>
  );
};

export default React.forwardRef(SingleImageUploadControl);
