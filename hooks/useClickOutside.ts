'use client'

import React from "react";

const useClickOutside = (
  ref: React.RefObject<any>,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if(typeof window === 'undefined') return

  const handleClickOutside = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setTrigger(false);
    }
  };

  window.addEventListener("mousedown", handleClickOutside);

  return () => window.removeEventListener("mousedown", handleClickOutside);
};

export default useClickOutside;
