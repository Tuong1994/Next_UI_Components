import React from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children?: React.ReactNode | React.ReactNode[];
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  });

  return mounted ? createPortal(children, document.querySelector("#portal") as Element) : null;
};

export default Portal;
