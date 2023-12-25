import React from "react";

const useDetectBottom = (ref: React.RefObject<HTMLElement>, distance = 250) => {
  if(typeof window === 'undefined') return false

  const [bottom, setBottom] = React.useState<boolean>(false);

  let elBottom = 0;

  React.useEffect(() => {
    if (!ref.current) return setBottom(false);
    elBottom = ref.current.getBoundingClientRect().bottom;
    if (window.innerHeight - elBottom < distance) return setBottom(true);
    setBottom(false);
  }, [elBottom, window.innerHeight]);

  return bottom;
};

export default useDetectBottom;
