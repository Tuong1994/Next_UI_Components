import React from "react";
import { ComponentColor } from "@/common/type";

export type LayoutTheme = "dark" | "light";

export type LayoutColor = Exclude<ComponentColor, "white" | "gray">;

export interface LayoutContextState {
  theme: LayoutTheme;
  color: LayoutColor;
  layouted: boolean;
}

const LayoutContext = React.createContext<LayoutContextState>({
  theme: "light",
  color: "blue",
  layouted: false,
});

export default LayoutContext;
