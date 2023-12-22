"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ComponentSize } from "@/common/type";
import { ControlColor, ControlShape } from "../type";
import FormContext, { FormContextState } from "./FormContext";

export interface FormProps<M> extends React.FormHTMLAttributes<HTMLFormElement> {
  initialData: M;
  color?: ControlColor;
  shape?: ControlShape;
  sizes?: ComponentSize;
  children?: React.ReactNode | React.ReactNode[];
  onFinish?: (formData: M) => void;
}

const Form = <M extends object>(
  {
    initialData,
    color = "blue",
    sizes = "md",
    shape = "square",
    children,
    onFinish,
    ...restProps
  }: FormProps<M>,
  ref: React.ForwardedRef<HTMLFormElement>
) => {
  const rhfMethods = useForm<M>({ values: initialData, mode: "all" });

  const formContextState: FormContextState = { isForm: true, color, sizes, shape };

  const onSubmit = (formData: M) => onFinish?.(formData);

  return (
    <FormProvider {...rhfMethods}>
      <FormContext.Provider value={formContextState}>
        <form ref={ref} {...restProps} onSubmit={rhfMethods.handleSubmit(onSubmit)}>
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
};

export default React.forwardRef(Form);
