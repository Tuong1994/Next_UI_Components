import React from "react";
import { HiCalendar, HiOutlineArrowPath } from "react-icons/hi2";
import moment from "moment";

interface DatePickerControlProps {
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  format: string;
  inputClassName: string;
  showResetIcon: boolean;
  selectedDate: Date | null;
  iconSize: () => number | undefined;
  handleResetInput: () => void;
  handleDropdown: () => void;
}

const DatePickerControl: React.FC<DatePickerControlProps> = ({
  addonBefore,
  addonAfter,
  inputClassName,
  showResetIcon,
  selectedDate,
  format,
  iconSize,
  handleResetInput,
  handleDropdown,
}) => {
  return (
    <div className="wrap-group" onClick={handleDropdown}>
      {addonBefore && <div className="group-addon group-addon-before">{addonBefore}</div>}

      <div className="group-control">
        <div className={`control-box ${inputClassName}`}>{moment(selectedDate).format(format)}</div>

        {showResetIcon && (
          <div className="control-action" onClick={handleResetInput}>
            <HiOutlineArrowPath size={iconSize()} />
          </div>
        )}

        <div className="control-action">
          <HiCalendar size={iconSize()} />
        </div>
      </div>

      {addonAfter && <div className="group-addon group-add-after">{addonAfter}</div>}
    </div>
  );
};

export default DatePickerControl;
