import React from "react";

interface CalendarDayProps {}

const CalendarDay: React.FC<CalendarDayProps> = () => {
  const days = ["Sun", "Mon", "Tue", "Web", "Thur", "Fri", "Sat"];

  return (
    <div className="calendar-day">
      {days.map((day, idx) => (
        <div key={idx} className="day-item">
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarDay;
