import React from "react";
import { SelectDate } from "../type";
import useSelectRange from "./useSelectRange";

interface DateItemProps {
  min?: "today" | string;
  max?: "today" | string;
  currentDate: Date;
  selectDate: SelectDate;
  handleSelectDate: (date: SelectDate) => void;
}

const DateItem: React.FC<DateItemProps> = ({ min, max, currentDate, selectDate, handleSelectDate }) => {
  const selectRange = useSelectRange({ date: selectDate, min, max });

  const { className: disabledClassName, disabled } = selectRange;

  const isSelected =
    selectDate.date === currentDate.getDate() &&
    selectDate.month === currentDate.getMonth() &&
    selectDate.year === currentDate.getFullYear();

  const selectedClassName = isSelected ? "date-item-selected" : "";

  const subDateClassName = selectDate.type === "sub" ? "date-item-sub" : "";

  return (
    <div className={`date-item ${selectedClassName} ${subDateClassName} ${disabledClassName}`}>
      <button
        disabled={disabled}
        type="button"
        className="item-btn"
        onClick={() => handleSelectDate(selectDate)}
      >
        {selectDate.date}
      </button>
    </div>
  );
};

export default DateItem;
