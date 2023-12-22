import React from "react";
import { Option, SelectOptions } from "../type";
import OptionItem from "./OptionItem";
import OptionPagination from "./OptionPagination";
import OptionEmpty from "./OptionEmpty";
import OptionLoading from "./OptionLoading";

export interface SelectOptionProps {
  async: boolean;
  dropdown: boolean;
  loading: boolean;
  options: SelectOptions;
  selectedOption: Option | null;
  currentPage: number;
  totalPages: number;
  iconSize: () => number | undefined;
  handleSelect: (option: Option) => void;
  handleChangePage: (type: "prev" | "next") => void;
}

const SelectOption: React.ForwardRefRenderFunction<HTMLDivElement, SelectOptionProps> = (
  {
    async,
    loading,
    dropdown,
    options = [],
    selectedOption,
    currentPage,
    totalPages,
    iconSize,
    handleSelect,
    handleChangePage,
  },
  ref
) => {
  const optionScrollClassName = options.length > 10 ? "option-list-scroll" : "";

  const dropdownClassName = dropdown ? "wrap-option-active" : "";

  const isSelected = (option: Option) => selectedOption?.value === option.value;

  const renderContent = () => {
    if (loading) return <OptionLoading />;
    if (!options.length) return <OptionEmpty />;
    return options.map((option, idx) => (
      <OptionItem
        key={idx}
        option={option}
        iconSize={iconSize}
        isSelected={isSelected}
        handleSelect={handleSelect}
      />
    ));
  };

  return (
    <div ref={ref} className={`wrap-option ${dropdownClassName}`}>
      <div className={`option-list ${optionScrollClassName}`}>{renderContent()}</div>

      {async && totalPages > 1 && (
        <OptionPagination
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
};

export default React.forwardRef(SelectOption);
