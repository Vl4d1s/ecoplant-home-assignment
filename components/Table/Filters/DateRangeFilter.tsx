import React, { ChangeEvent } from "react";

interface DateRangeFilterProps {
  columnId: string;
  startDate: string;
  endDate: string;
  onFilterChange: (start: string, end: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  columnId,
  startDate,
  endDate,
  onFilterChange,
}) => {
  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const start = event.target.value;
    onFilterChange(start, endDate);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const end = event.target.value;
    onFilterChange(startDate, end);
  };

  return (
    <div>
      <label htmlFor={`start-${columnId}`}>Start Date:</label>
      <input
        id={`start-${columnId}`}
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
      />

      <label htmlFor={`end-${columnId}`}>End Date:</label>
      <input
        id={`end-${columnId}`}
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default DateRangeFilter;
