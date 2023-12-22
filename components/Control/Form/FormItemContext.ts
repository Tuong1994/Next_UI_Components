"use client";

import React from "react";

export type FormItemType = "default" | "checkgroup";

export type FormItemContextState = {
  type: FormItemType;
  isRhf: boolean;
  rhfName: string;
  rhfValue: any;
  rhfError: boolean;
  rhfDisabled: boolean;
  rhfOnChange?: (...event: any) => void;
  rhfOnBlur?: (...event: any) => void;
};

const FormItemContext = React.createContext<FormItemContextState>({
  type: "default",
  isRhf: false,
  rhfName: "",
  rhfValue: "",
  rhfError: false,
  rhfDisabled: false,
});

export default FormItemContext;
