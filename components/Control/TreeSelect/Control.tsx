import React from "react";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineChevronDown, HiXCircle } from "react-icons/hi2";
import utils from "@/utils";

interface SelectControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rhfError: boolean;
  dropdown: boolean;
  loading: boolean;
  inputClassName?: string;
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  controlDisabled: boolean | undefined;
  showClearIcon: boolean;
  iconSize: () => number | undefined;
  renderValue: () => string;
  handleClearInput: () => void;
  handleDropdown: () => void;
}

const SelectControl: React.ForwardRefRenderFunction<HTMLInputElement, SelectControlProps> = (
  {
    rhfError,
    dropdown,
    loading,
    addonAfter,
    addonBefore,
    controlDisabled,
    showClearIcon,
    inputClassName = "",
    iconSize,
    renderValue,
    handleClearInput,
    handleDropdown,
    ...restProps
  },
  ref
) => {
  const selectRef = React.useRef<HTMLDivElement>(null);

  const iconRotateClassName = dropdown ? "action-icon-rotate" : "";

  const controlInputClassName = utils.formatClassName("control-box", inputClassName);

  // Focus input when error is trigger
  React.useEffect(() => {
    if (rhfError) selectRef.current?.click();
  }, [rhfError]);

  return (
    <div ref={selectRef} className="wrap-group" onClick={handleDropdown}>
      {addonBefore && <div className="group-addon group-addon-before">{addonBefore}</div>}

      <div className="group-control">
        <input
          ref={ref}
          {...restProps}
          type="text"
          disabled={controlDisabled}
          value={renderValue()}
          className={controlInputClassName}
        />
        {showClearIcon && (
          <div className="control-action" onClick={handleClearInput}>
            <HiXCircle size={iconSize()} />
          </div>
        )}
        <div className="control-action">
          <HiOutlineChevronDown
            size={iconSize()}
            className={utils.formatClassName("action-icon", iconRotateClassName)}
          />
        </div>
      </div>

      {addonAfter && <div className="group-addon group-addon-after">{addonAfter}</div>}

      {loading && (
        <div className="group-loading">
          <FaSpinner className="loading-icon" />
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(SelectControl);
