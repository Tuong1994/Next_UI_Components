import React from "react";
import { HiPlus } from "react-icons/hi2";
import utils from "@/utils";

interface SingleImageUploadControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  controlClassName?: string;
  controlStyle?: React.CSSProperties;
}

const SingleImageUploadControl: React.ForwardRefRenderFunction<
  HTMLInputElement,
  SingleImageUploadControlProps
> = ({ controlClassName = "", controlStyle, ...restProps }, ref) => {
  const controlInputClassName = utils.formatClassName("group-control", controlClassName);

  return (
    <label style={controlStyle} className={controlInputClassName}>
      <input ref={ref} {...restProps} type="file" className="control-input" />
      <HiPlus size={25} className="control-icon" />
    </label>
  );
};

export default React.forwardRef(SingleImageUploadControl);
