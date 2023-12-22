import React from "react";

interface TableCellProps {
  children?: React.ReactNode | React.ReactNode[];
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return <div className="table-cell">{children}</div>;
};

export default TableCell;
