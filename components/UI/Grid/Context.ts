import React from "react";

export interface GridAppContextState {
  screenWidth?: number;
  isPhone?: boolean;
  isTablet?: boolean;
  isLaptop?: boolean;
  isDesktop?: boolean;
}

export interface GridRowContextState {
  gutters: [number?, number?];
}

export const GridAppContext = React.createContext<GridAppContextState>({
  screenWidth: 0,
  isPhone: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: false,
});

export const GridRowContext = React.createContext<GridRowContextState>({
  gutters: [],
});
