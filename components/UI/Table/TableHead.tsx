import { Columns } from "./type";
import { CheckBox } from "@/components/Control";
import { HiMinus } from "react-icons/hi2";
import Button, { ButtonProps } from "@/components/UI/Button";
import TableCell from "./TableCell";

interface TableHeadProps<M> {
  columns: Columns<M>;
  totalRows: number;
  hasRowSelection: boolean;
  hasRowExpand: boolean;
  rowSelectedKeys: React.Key[];
  removeButtonTitle?: React.ReactNode | React.ReactNode[];
  cancelButtonTitle?: React.ReactNode | React.ReactNode[];
  removeButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  handleSelectAllRow: () => void;
  handleCancelSelect: () => void;
  onSelectRow?: (keys: React.Key[]) => void;
}

const TableHead = <M extends object>({
  columns,
  totalRows,
  rowSelectedKeys,
  hasRowSelection,
  hasRowExpand,
  removeButtonTitle,
  cancelButtonTitle,
  removeButtonProps,
  cancelButtonProps,
  onSelectRow,
  handleSelectAllRow,
  handleCancelSelect,
}: TableHeadProps<M>) => {
  const removeActionProps: ButtonProps = {
    sizes: "sm",
    color: "red",
    rootClassName: "actions-btn",
    ...removeButtonProps,
  };

  const cancelActionProps: ButtonProps = {
    sizes: "sm",
    rootClassName: "actions-btn",
    ...cancelButtonProps,
  };

  const renderCheckBox = () => {
    const totalKeys = rowSelectedKeys.length;

    if (totalKeys > 0 && totalKeys < totalRows)
      return (
        <div className="cell-checked-mixed" onClick={handleSelectAllRow}>
          <HiMinus />
        </div>
      );
    if (totalKeys === 0) return <CheckBox color="white" onClick={handleSelectAllRow} />;
    return <CheckBox checked={totalKeys === totalRows} color="white" onClick={handleSelectAllRow} />;
  };

  const renderColumns = () => {
    if (rowSelectedKeys.length) {
      return (
        <th colSpan={columns.length}>
          <div className="table-head-remove-actions">
            <Button {...removeActionProps} onClick={() => onSelectRow?.(rowSelectedKeys)}>
              {removeButtonTitle}
            </Button>
            <Button {...cancelActionProps} onClick={handleCancelSelect}>
              {cancelButtonTitle}
            </Button>
          </div>
        </th>
      );
    }

    return columns.map((column) => (
      <th key={column.id}>
        <TableCell>{column.title}</TableCell>
      </th>
    ));
  };

  return (
    <thead>
      <tr>
        {hasRowSelection && (
          <th>
            <TableCell>{renderCheckBox()}</TableCell>
          </th>
        )}

        {hasRowExpand && <th />}

        {renderColumns()}
      </tr>
    </thead>
  );
};

export default TableHead;
