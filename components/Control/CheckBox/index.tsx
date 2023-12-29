"use client";

import React from "react";
import { HiCheck } from "react-icons/hi2";
import { useFormContext } from "react-hook-form";
import { InputValue } from "../type";
import { ComponentColor, ComponentSize } from "@/common/type";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import utils from "@/utils";

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  controlClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  sizes?: ComponentSize;
  color?: Exclude<ComponentColor, "gray">;
  onCheck?: (checked: boolean) => void;
  onCheckInput?: (value: InputValue) => void;
}

const CheckBox: React.ForwardRefRenderFunction<HTMLInputElement, CheckBoxProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    controlClassName = "",
    rootStyle,
    labelStyle,
    controlStyle,
    label,
    sizes = "md",
    color = "blue",
    checked = false,
    disabled,
    value,
    onCheck,
    onCheckInput,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { color: rhfColor, sizes: rhfSizes } = React.useContext(FormContext);

  const { type, isRhf, rhfName, rhfValue, rhfDisabled, rhfError } = React.useContext(FormItemContext);

  const [isChecked, setIsChecked] = React.useState<boolean>(checked);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const gapClassName = !isRhf ? "checkbox-gap" : "";

  const sizeClassName = `checkbox-${controlSize}`;

  const checkedClassName = isChecked ? `checkbox-checked-${controlColor}` : `checkbox-${controlColor}`;

  const errorClassName = rhfError ? "checkbox-group-error" : "";

  const disabledClassName = controlDisabled ? "checkbox-group-disabled" : "";

  const mainClassName = utils.formatClassName(
    "checkbox",
    gapClassName,
    sizeClassName,
    checkedClassName,
    rootClassName
  );

  const groupClassName = utils.formatClassName("checkbox-group", errorClassName, disabledClassName);

  const controlLabelClassName = utils.formatClassName("group-label", labelClassName);

  const controlCheckClassName = utils.formatClassName("group-checked", controlClassName);

  React.useEffect(() => {
    if (!isRhf) return setIsChecked(checked);

    const isBoolean = typeof rhfValue === "boolean";
    const isPrimitive = typeof rhfValue !== "boolean" && typeof rhfValue !== "object";
    const isArray = Array.isArray(rhfValue);

    if (isBoolean) return setIsChecked(rhfValue);
    if (isPrimitive) return setIsChecked(rhfValue === value);
    if (isArray) {
      const isChecked = [...Array.from(rhfValue)].includes(value);
      setIsChecked(isChecked);
    }
  }, [isRhf, rhfValue, checked, value]);

  const iconSize = () => {
    if (controlSize === "sm") return 12;
    if (controlSize === "md") return 14;
    if (controlSize === "lg") return 16;
  };

  const handleRhfChecked = (value: any, checked: boolean) => {
    if (type === "default") {
      if (!value) return rhfMethods.setValue(rhfName, checked);
      else return rhfMethods.setValue(rhfName, value);
    }

    if (Array.isArray(rhfValue)) {
      let checkedItems = [...Array.from(rhfValue)];
      const idx = [...checkedItems].findIndex((item) => item === value);

      if (idx === -1) checkedItems.push(value);
      else checkedItems = [...checkedItems].filter((item) => item !== value);

      rhfMethods.setValue(rhfName, checkedItems);
    }
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setIsChecked(checked);

    if (isRhf) return handleRhfChecked(value, checked);

    onCheck?.(checked);
    if (checked) onCheckInput?.(value);
    else onCheckInput?.("");
  };

  return (
    <div style={rootStyle} className={mainClassName}>
      <label className={groupClassName}>
        <input
          ref={ref}
          {...restProps}
          value={value}
          checked={isChecked}
          type="checkbox"
          className="group-control"
          disabled={controlDisabled}
          onChange={handleChecked}
        />

        <div style={controlStyle} className={controlCheckClassName}>
          {isChecked && <HiCheck size={iconSize()} />}
        </div>

        {label && (
          <div style={labelStyle} className={controlLabelClassName}>
            {label}
          </div>
        )}
      </label>
    </div>
  );
};

export default React.forwardRef(CheckBox);
