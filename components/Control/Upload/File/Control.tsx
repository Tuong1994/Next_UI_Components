import React from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { UploadError } from "../../type";
import utils from "@/utils";

interface FileUploadControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  controlClassName?: string;
  controlStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  error: UploadError | null;
  dragged: boolean;
  handleDrag: (e: React.DragEvent<HTMLLabelElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
}

const FileUploadControl: React.ForwardRefRenderFunction<HTMLInputElement, FileUploadControlProps> = (
  {
    controlClassName = "",
    controlStyle,
    label,
    disabled,
    error,
    dragged,
    handleDrag,
    handleDrop,
    ...restProps
  },
  ref
) => {
  const dragClassName = dragged ? "upload-group-dragged" : "";

  const errorClassName = error?.active ? "upload-group-error" : "";

  const disabledClassName = disabled ? "upload-group-disabled" : "";

  const controlInputClassName = utils.formatClassName(
    "upload-group",
    dragClassName,
    errorClassName,
    disabledClassName,
    controlClassName
  );

  const renderLabel = () => {
    if (label) return label;
    return (
      <div className="group-label">
        <AiOutlineUpload size={18} />
        <span>Choose file</span>
      </div>
    );
  };

  return (
    <label
      style={controlStyle}
      className={controlInputClassName}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input ref={ref} {...restProps} disabled={disabled} type="file" className="group-control" />
      {renderLabel()}
    </label>
  );
};

export default React.forwardRef(FileUploadControl);
