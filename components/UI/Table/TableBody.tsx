import React from "react";
import { TableColor } from ".";
import { Columns } from "./type";
import { CheckBox } from "@/components/Control";
import TableCell from "./TableCell";

interface TableBodyProps<M> {
  dataSource: M[];
  columns: Columns<M>;
  rowKey?: React.Key;
  rowSelectedKeys: React.Key[];
  color?: TableColor;
  hasRowSelection: boolean;
  hasRowExpand: boolean;
  handleSelectRow: (key: React.Key) => void;
  expandRowTable?: (data: M) => React.ReactNode | React.ReactNode[];
}

const TableBody = <M extends object>({
  dataSource = [],
  columns = [],
  rowKey,
  rowSelectedKeys,
  hasRowSelection,
  hasRowExpand,
  color = "blue",
  handleSelectRow,
  expandRowTable,
}: TableBodyProps<M>) => {
  const [expandedRow, setExpandedRow] = React.useState<React.Key>("");

  const expandClassName = (key: string) => (expandedRow === key ? "cell-expand-action-expanded" : "");

  const isSeleted = (key: string) => {
    if (rowSelectedKeys.includes(key)) return true;
    return false;
  };

  const handleExpand = (key: string) => {
    if (expandedRow === key) return setExpandedRow("");
    setExpandedRow(key);
  };

  return (
    <tbody>
      {dataSource.map((data, idx) => {
        const key = rowKey ? data[rowKey as keyof M] : `row-${idx}`;
        return (
          <React.Fragment key={key}>
            <tr className={isSeleted(key) ? "table-row-selected" : ""}>
              {hasRowSelection && (
                <td>
                  <TableCell>
                    <CheckBox color={color} checked={isSeleted(key)} onClick={() => handleSelectRow(key)} />
                  </TableCell>
                </td>
              )}

              {hasRowExpand && (
                <td>
                  <TableCell>
                    <div
                      className={`cell-expand-action ${expandClassName(key)}`}
                      onClick={() => handleExpand(key)}
                    >
                      <div className="action-icon" />
                    </div>
                  </TableCell>
                </td>
              )}

              {columns.map((column) => (
                <td key={column.id}>
                  <TableCell>
                    {column.render
                      ? column.render(data[column.dataIndex], data, idx)
                      : (data[column.dataIndex] as React.ReactNode)}
                  </TableCell>
                </td>
              ))}
            </tr>

            {hasRowExpand && expandedRow === key && (
              <tr className="table-row-expand">
                <td />
                <td colSpan={columns.length + 1}>
                  <TableCell>{expandRowTable?.(data)}</TableCell>
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

export default TableBody;
