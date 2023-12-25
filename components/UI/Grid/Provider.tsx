"use client";

import React from "react";
import { useViewpoint } from "@/hooks";
import { GridAppContext } from "./Context";

const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const { isPhone, isTablet, isLaptop, isDesktop, screenWidth } = useViewpoint();
  return (
    <GridAppContext.Provider value={{ isPhone, isTablet, isLaptop, isDesktop, screenWidth }}>
      {children}
    </GridAppContext.Provider>
  );
};

export default GridProvider;
