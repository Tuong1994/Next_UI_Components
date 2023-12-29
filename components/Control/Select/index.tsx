"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ControlColor, ControlShape, Option, SelectOptions } from "../type";
import { ComponentSize } from "@/common/type";
import { useRender, useClickOutside, useDetectBottom } from "@/hooks";
import SelectControl from "./Control";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import SelectOption from "./Option";
import utils from "@/utils";

export interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  options?: SelectOptions;
  defaultValue?: number | string;
  sizes?: ComponentSize;
  color?: ControlColor;
  shape?: ControlShape;
  hasClear?: boolean;
  async?: boolean;
  loading?: boolean;
  total?: number;
  limit?: number;
  onChangeSearch?: (text: string) => void;
  onChangeSelect?: (value: string | number | boolean) => void;
  onChangePage?: (page: number) => void;
}

const Select: React.ForwardRefRenderFunction<HTMLInputElement, SelectProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    addonBefore,
    addonAfter,
    sizes = "md",
    color = "blue",
    shape = "square",
    placeholder,
    disabled,
    options = [],
    defaultValue,
    hasClear = true,
    async = false,
    loading = false,
    total = 0,
    limit = 10,
    onChangeSearch,
    onChangeSelect,
    onChangePage,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { color: rhfColor, sizes: rhfSizes, shape: rhfShape } = React.useContext(FormContext);

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled } = React.useContext(FormItemContext);

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [search, setSearch] = React.useState<string>("");

  const [selectedOption, setSelectedOption] = React.useState<Option | null>(null);

  const [dropdown, setDropdown] = React.useState<boolean>(false);

  const [touched, setTouched] = React.useState<boolean>(false);

  const selectRef = React.useRef<HTMLDivElement>(null);

  const render = useRender(dropdown);

  const bottom = useDetectBottom(selectRef);

  useClickOutside(selectRef, setDropdown);

  const totalPages = Math.ceil(total / limit);

  // Trigger validation
  React.useEffect(() => {
    if (!isRhf) return;

    if (touched && !dropdown && !rhfValue) rhfMethods.trigger(rhfName);
    else if (touched && !dropdown && rhfValue) rhfMethods.trigger(rhfName);

    if (touched && !dropdown) setTouched(false);
  }, [touched, dropdown, isRhf, rhfName, rhfValue]);

  // Set default option
  React.useEffect(() => {
    let defaultOption: Option | null = null;
    if (!isRhf) defaultOption = [...options].find((option) => option.value === defaultValue) as Option;
    else defaultOption = [...options].find((option) => option.value === rhfValue) as Option;
    setSelectedOption(defaultOption);
  }, [defaultValue, rhfValue, isRhf]);

  const controlPlaceHolder = React.useMemo(() => {
    if (placeholder) return placeholder;
    if (dropdown) return "Search";
    return "Select option";
  }, [placeholder, dropdown]);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const showClearIcon = Boolean((search || selectedOption) && hasClear && !controlDisabled);

  const sizeClassName = `select-${controlSize}`;

  const colorClassName = `select-${controlColor}`;

  const shapeClassName = `select-${controlShape}`;

  const bottomClassName = bottom ? "select-bottom" : "";

  const disabledClassName = controlDisabled ? "select-disabled" : "";

  const errorClassName = rhfError ? "select-error" : "";

  const mainClassName = utils.formatClassName(
    "select",
    colorClassName,
    sizeClassName,
    shapeClassName,
    bottomClassName,
    errorClassName,
    rootClassName,
    disabledClassName
  );

  const controlLabelClassName = utils.formatClassName("select-label", labelClassName);

  const iconSize = () => {
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const renderValue = () => {
    if (search) return search;
    if (selectedOption) return selectedOption.label;
    return "";
  };

  const renderOptions = () => {
    if (async) return options;
    if (!search) return options;
    return options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
    setTouched(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!dropdown) setDropdown(true);
    const value = e.target.value;
    setSearch(value);
    setSelectedOption(null);
    onChangeSearch?.(value);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setSearch("");
    onChangeSelect?.(option.value);
    if (isRhf) rhfMethods.setValue(rhfName, option.value);
  };

  const handleClearInput = () => {
    setTouched(true);
    if (search) setSearch("");
    if (selectedOption) setSelectedOption(null);
    if (isRhf) rhfMethods.setValue(rhfName, null);
  };

  const handleChangePage = (type: "prev" | "next") => {
    let page = currentPage;
    if (type === "prev") page -= 1;
    else page += 1;
    setCurrentPage(page);
    onChangePage?.(page);
  };

  return (
    <div ref={selectRef} style={rootStyle} className={mainClassName}>
      {label && (
        <label style={labelStyle} className={controlLabelClassName}>
          {label}
        </label>
      )}

      <div className="select-wrap">
        <SelectControl
          {...restProps}
          ref={ref}
          inputClassName={inputClassName}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          loading={loading}
          rhfError={rhfError}
          dropdown={dropdown}
          controlDisabled={controlDisabled}
          placeholder={controlPlaceHolder}
          showClearIcon={showClearIcon}
          iconSize={iconSize}
          onChange={handleSearch}
          renderValue={renderValue}
          handleClearInput={handleClearInput}
          handleDropdown={handleDropdown}
        />

        {render && (
          <SelectOption
            async={async}
            loading={loading}
            dropdown={dropdown}
            selectedOption={selectedOption}
            currentPage={currentPage}
            totalPages={totalPages}
            options={renderOptions()}
            iconSize={iconSize}
            handleSelect={handleSelect}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(Select);
