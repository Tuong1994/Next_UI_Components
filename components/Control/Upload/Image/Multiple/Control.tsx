import React from "react";
import { BsCloudUpload } from "react-icons/bs";
import utils from "@/utils";

interface MultipleImageUploadControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  controlClassName?: string;
  controlStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
}

const MultipleImageUploadControl: React.ForwardRefRenderFunction<
  HTMLInputElement,
  MultipleImageUploadControlProps
> = ({ controlClassName = "", controlStyle, label, ...restProps }, ref) => {
  const controlInputClassName = utils.formatClassName("group-control", controlClassName);

  const renderLabel = () => {
    if (label) return label;
    return (
      <div className="control-label">
        <BsCloudUpload size={30} className="label-icon" />
        <p>Select or drag image here</p>
      </div>
    );
  };

  return (
    <label style={controlStyle} className={controlInputClassName}>
      <input ref={ref} {...restProps} type="file" multiple className="control-input" />
      {renderLabel()}
    </label>
  );
};

export default React.forwardRef(MultipleImageUploadControl);
