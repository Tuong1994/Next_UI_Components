"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ControlColor, ControlShape, SelectDate } from "../type";
import { ComponentSize } from "@/common/type";
import { useRender, useClickOutside, useDetectBottom } from "@/hooks";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import DatePickerControl from "./Control";
import DatePickerCalender from "./Calendar";
import utils from "@/utils";

export interface DatePickerProps {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  value?: Date;
  format?: string;
  max?: "today" | string;
  min?: "today" | string;
  sizes?: ComponentSize;
  color?: ControlColor;
  shape?: ControlShape;
  required?: boolean;
  optional?: boolean;
  hasReset?: boolean;
  onChangeSelect?: (date: Date) => void;
}

const DatePicker: React.ForwardRefRenderFunction<HTMLDivElement, DatePickerProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    addonBefore,
    addonAfter,
    disabled,
    min,
    max,
    sizes = "md",
    color = "blue",
    shape = "square",
    format = "DD/MM/YYYY",
    value = new Date(),
    required,
    optional,
    hasReset = true,
    onChangeSelect,
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { color: rhfColor, sizes: rhfSizes, shape: rhfShape } = React.useContext(FormContext);

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled } = React.useContext(FormItemContext);

  const [selectedDate, setSelectedDate] = React.useState<Date>(value instanceof Date ? value : new Date());

  const [dropdown, setDropdown] = React.useState<boolean>(false);

  const [touched, setTouched] = React.useState<boolean>(false);

  const datepickerRef = React.useRef<HTMLDivElement>(null);

  const render = useRender(dropdown);

  const bottom = useDetectBottom(datepickerRef);

  useClickOutside(datepickerRef, setDropdown);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const showResetIcon = Boolean(
    selectedDate.getDate() !== new Date().getDate() && hasReset && !controlDisabled
  );

  const showOptional = required ? false : optional;

  const sizeClassName = `datepicker-${controlSize}`;

  const colorClassName = `datepicker-${controlColor}`;

  const shapeClassName = `datepicker-${controlShape}`;

  const bottomClassName = bottom ? "datepicker-bottom" : "";

  const disabledClassName = controlDisabled ? "datepicker-disabled" : "";

  const errorClassName = rhfError ? "datepicker-error" : "";

  const mainClassName = utils.formatClassName(
    "datepicker",
    colorClassName,
    sizeClassName,
    shapeClassName,
    bottomClassName,
    errorClassName,
    rootClassName,
    disabledClassName
  );

  const controlLabelClassName = utils.formatClassName("datepicker-label", labelClassName);

  // Trigger validation
  React.useEffect(() => {
    if (!isRhf) return;

    if (touched && !dropdown && !rhfValue) rhfMethods.trigger(rhfName);
    else if (touched && !dropdown && rhfValue) rhfMethods.trigger(rhfName);

    if (touched && !dropdown) setTouched(false);
  }, [touched, dropdown, isRhf, rhfName, rhfValue]);

  // Set default value
  React.useEffect(() => {
    if (isRhf && rhfValue) setSelectedDate(rhfValue instanceof Date ? rhfValue : new Date());
  }, [isRhf, rhfValue]);

  const iconSize = () => {
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
    setTouched(true);
  };

  const handleSelect = (date: SelectDate) => {
    setSelectedDate(date.fullDate);
    onChangeSelect?.(date.fullDate);
    if (isRhf) rhfMethods.setValue(rhfName, date.fullDate);
  };

  const handleResetInput = () => {
    setTouched(true);
    setSelectedDate(new Date());
    if (isRhf) rhfMethods.setValue(rhfName, new Date());
  };

  return (
    <div ref={datepickerRef} style={rootStyle} className={mainClassName}>
      {label && (
        <label style={labelStyle} className={controlLabelClassName}>
          {required && <span className="label-required">*</span>}
          <span>{label}</span>
          {showOptional && <span className="label-optional">(Optional)</span>}
        </label>
      )}

      <div className="datepicker-wrap" ref={ref}>
        <DatePickerControl
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          inputClassName={inputClassName}
          selectedDate={selectedDate}
          showResetIcon={showResetIcon}
          format={format}
          iconSize={iconSize}
          handleResetInput={handleResetInput}
          handleDropdown={handleDropdown}
        />

        {render && (
          <DatePickerCalender
            min={min}
            max={max}
            dropdown={dropdown}
            selectedDate={selectedDate}
            handleSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(DatePicker);
