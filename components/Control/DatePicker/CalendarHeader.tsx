import React from "react";
import {
  HiOutlineChevronDoubleLeft as ArrowLeft,
  HiOutlineChevronDoubleRight as ArrowRight,
} from "react-icons/hi2";
import { SelectOptions } from "../type";
import HeaderSelect from "./HeaderSelect";

interface CalendarHeaderProps {
  currentMonth: number;
  currentYear: number;
  handleSelectMonth: (month: number) => void;
  handleSelectYear: (year: number) => void;
  handleSwitchMonth: (type: "prev" | "next") => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  currentYear,
  handleSelectMonth,
  handleSelectYear,
  handleSwitchMonth,
}) => {
  const months = [
    "Janunary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = React.useMemo(() => {
    let startYear = 1970;
    const yearRange: number[] = [];
    const currentYear = new Date().getFullYear();
    while (startYear <= currentYear) {
      yearRange.push(startYear++);
    }
    return yearRange;
  }, []);

  const monthOptions: SelectOptions = months.map((month, idx) => ({ label: month, value: idx }));

  const yearOptions: SelectOptions = years.map((year) => ({ label: String(year), value: year }));

  return (
    <div className="calendar-header">
      <button type="button" className="header-action" onClick={() => handleSwitchMonth("prev")}>
        <ArrowLeft />
      </button>
      <div className="header-control">
        <HeaderSelect
          type="month"
          currentOption={currentMonth}
          options={monthOptions}
          onSelect={(option) => handleSelectMonth(option.value as number)}
        />
        <HeaderSelect
          type="year"
          currentOption={currentYear}
          options={yearOptions}
          onSelect={(option) => handleSelectYear(option.value as number)}
        />
      </div>
      <button type="button" className="header-action" onClick={() => handleSwitchMonth("next")}>
        <ArrowRight />
      </button>
    </div>
  );
};

export default CalendarHeader;
