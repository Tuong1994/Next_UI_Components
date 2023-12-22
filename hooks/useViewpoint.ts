'use client'

import React from "react";

const useViewpoint = () => {
  if (typeof window === "undefined") return;

  const [screenWidth, setScreenWidth] = React.useState<number>(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const isPhone = React.useMemo(() => screenWidth >= 320 && screenWidth <= 480, [screenWidth]);

  const isTablet = React.useMemo(() => screenWidth > 480 && screenWidth <= 768, [screenWidth]);

  const isLaptop = React.useMemo(() => screenWidth > 768 && screenWidth <= 1100, [screenWidth]);

  const isDesktop = React.useMemo(() => screenWidth > 1100, [screenWidth]);

  return { screenWidth, isPhone, isTablet, isLaptop, isDesktop };
};

export default useViewpoint;
