import React from "react";
import { Option } from "../type";
import { HiCheck } from "react-icons/hi2";

interface OptionItemProps {
  option: Option;
  iconSize: () => number | undefined;
  isSelected: (option: Option) => boolean;
  handleSelect: (option: Option) => void;
}

const OptionItem: React.FC<OptionItemProps> = ({ option, isSelected, handleSelect, iconSize }) => {
  return (
    <div
      className={`list-item ${isSelected(option) ? "list-item-selected" : ""}`}
      onClick={() => handleSelect(option)}
    >
      <div className="item-label">
        {option.icon && <div className="label-icon">{option.icon}</div>}
        <div>{option.label}</div>
      </div>
      {isSelected(option) && <HiCheck size={iconSize()} />}
    </div>
  );
};

export default OptionItem;
