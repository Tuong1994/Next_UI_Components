'use client'

import React from "react";

const useRender = (trigger: boolean, time = 300) => {
  const [render, setRender] = React.useState<boolean>(false);

  let timeOut: any;

  React.useEffect(() => {
    if (!render && trigger) setRender(true);
    else if (render && !trigger) timeOut = setTimeout(() => setRender(false), time);

    return () => clearTimeout(timeOut);
  }, [trigger]);

  return render;
};

export default useRender;
