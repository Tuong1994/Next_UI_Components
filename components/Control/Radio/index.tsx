"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ComponentColor, ComponentSize } from "@/common/type";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import utils from "@/utils";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  controlClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  sizes?: ComponentSize;
  color?: Exclude<ComponentColor, "gray">;
  onCheck?: (value: any) => void;
}

const Radio: React.ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    controlClassName = "",
    name,
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
    onBlur,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { color: rhfColor, sizes: rhfSizes } = React.useContext(FormContext);

  const { isRhf, rhfValue, rhfName, rhfDisabled, rhfError, rhfOnChange } = React.useContext(FormItemContext);

  const [isChecked, setIsChecked] = React.useState<boolean>(checked);

  const controlName = rhfName ? rhfName : name;

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const gapClassName = !isRhf ? "radio-gap" : "";

  const sizeClassName = `radio-${controlSize}`;

  const colorClassName = `radio-${controlColor}`;

  const errorClassName = rhfError ? "radio-group-error" : "";

  const disabledClassName = controlDisabled ? "radio-group-disabled" : "";

  const mainClassName = utils.formatClassName(
    "radio",
    gapClassName,
    sizeClassName,
    colorClassName,
    rootClassName
  );

  const groupClassName = utils.formatClassName("radio-group", errorClassName, disabledClassName);

  const controlLabelClassName = utils.formatClassName("group-label", labelClassName);

  const controlCheckClassName = utils.formatClassName("group-checked", controlClassName);

  React.useEffect(() => {
    if (!isRhf) return setIsChecked(checked);
    if (isRhf && rhfValue == value) return setIsChecked(true);
  }, [value, checked, isRhf, rhfValue]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setIsChecked(checked);
    onCheck?.(value);
  };

  const onChangeFn = rhfOnChange ? rhfOnChange : handleChecked;

  return (
    <div style={rootStyle} className={mainClassName}>
      <label className={groupClassName}>
        <input
          {...rhfMethods?.register(rhfName)}
          ref={ref}
          {...restProps}
          value={value}
          name={controlName}
          disabled={controlDisabled}
          checked={isChecked}
          type="radio"
          className="group-control"
          onChange={onChangeFn}
        />

        <div style={controlStyle} className={controlCheckClassName} />

        {label && (
          <div style={labelStyle} className={controlLabelClassName}>
            {label}
          </div>
        )}
      </label>
    </div>
  );
};

export default React.forwardRef(Radio);
