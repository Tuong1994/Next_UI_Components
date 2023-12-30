"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ControlColor, ControlShape, Option, SelectOptions } from "../type";
import { ComponentSize } from "@/common/type";
import { useRender, useClickOutside, useDetectBottom } from "@/hooks";
import SelectTagControl from "./Control";
import SelectOption from "./Option";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import utils from "@/utils";

export interface SelectTagProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  options?: SelectOptions;
  defaultTags?: any[];
  sizes?: ComponentSize;
  color?: ControlColor;
  shape?: ControlShape;
  total?: number;
  limit?: number;
  async?: boolean;
  loading?: boolean;
  required?: boolean;
  optional?: boolean;
  hasClear?: boolean;
  onChangeSearch?: (text: string) => void;
  onChangeSelect?: (tags: any[]) => void;
  onChangePage?: (page: number) => void;
}

const SelectTag: React.ForwardRefRenderFunction<HTMLInputElement, SelectTagProps> = (
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
    defaultTags = [],
    total = 0,
    limit = 10,
    async = false,
    loading = false,
    required,
    optional,
    hasClear = true,
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

  const [selectedOptions, setSelectedOptions] = React.useState<SelectOptions>([]);

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
    if (!isRhf) return setSelectedOptions(defaultOptions([...defaultTags]));
    setSelectedOptions(defaultOptions([...rhfValue]));
  }, [defaultTags.length, rhfValue, isRhf]);

  const controlPlaceHolder = React.useMemo(() => {
    if (placeholder) return placeholder;
    if (dropdown) return "Search";
    return "Select option";
  }, [placeholder, dropdown]);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const showClearIcon = Boolean(hasClear && search && !controlDisabled);

  const showOptional = required ? false : optional;

  const sizeClassName = `select-${controlColor}`;

  const colorClassName = `select-${controlSize}`;

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

  const defaultOptions = (tags: any[]) => {
    return [...options].filter((option) => {
      if (tags.includes(option.value)) return option;
    }) as SelectOptions;
  };

  const iconSize = () => {
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const renderValue = () => {
    if (search) return search;
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
    const value = e.target.value;
    setSearch(value);
    onChangeSearch?.(value);
  };

  const handleSelect = (option: Option) => {
    let selectedItems = [...selectedOptions];

    const idx = selectedItems.findIndex((item) => item.value === option.value);
    if (idx === -1) selectedItems = [...selectedItems, option];
    else selectedItems = selectedItems.filter((item) => item.value !== option.value);

    setSelectedOptions(selectedItems);
    setSearch("");

    const tags = [...selectedItems].map((option) => option?.value);
    if (!isRhf) return onChangeSelect?.(tags);
    else rhfMethods.setValue(rhfName, tags);
  };

  const handleClearInput = () => {
    setTouched(true);
    if (search) setSearch("");
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
          {required && <span className="label-required">*</span>}
          <span>{label}</span>
          {showOptional && <span className="label-optional">(Optional)</span>}
        </label>
      )}

      <div className="select-wrap">
        <SelectTagControl
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
          selectedOptions={selectedOptions}
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
            selectedOptions={selectedOptions}
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

export default React.forwardRef(SelectTag);
