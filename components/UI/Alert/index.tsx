"use client";

import React from "react";
import {
  HiCheckCircle as SuccessIcon,
  HiXCircle as ErrorIcon,
  HiInformationCircle as InfoIcon,
} from "react-icons/hi2";
import { PiWarningCircleFill as WarningIcon } from "react-icons/pi";
import { AlertType } from "./type";
import { ComponentPlacement, Record } from "@/common/type";
import Portal from "@/components/Portal";
import useRender from "@/hooks/useRender";
import utils from "@/utils";

export interface AlertProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  type?: AlertType;
  message?: React.ReactNode | React.ReactNode[];
  placement?: ComponentPlacement;
  open?: boolean;
  onClose?: () => void;
}

const Alert: React.ForwardRefRenderFunction<HTMLDivElement, AlertProps> = (
  {
    rootClassName = "",
    style,
    type = "info",
    placement = "top",
    message = "Alert message",
    open = false,
    onClose,
  },
  ref
) => {
  const timeRef = React.useRef<any>(null);

  const render = useRender(open);

  const typeClassName = `alert-${type}`;

  const placementClassName = `alert-${placement}`;

  const activeClassName = open ? "alert-active" : "";

  const className = utils.formatClassName(
    "alert",
    typeClassName,
    placementClassName,
    activeClassName,
    rootClassName
  );

  React.useEffect(() => {
    timeRef.current = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(timeRef.current);
  });

  const iconType = () => {
    const iconProps = { size: 20 };
    const icon: Record = {
      success: <SuccessIcon {...iconProps} />,
      error: <ErrorIcon {...iconProps} />,
      warning: <WarningIcon {...iconProps} />,
      info: <InfoIcon {...iconProps} />,
    };
    return icon[type];
  };

  return (
    <Portal>
      {render && (
        <div ref={ref} style={style} className={className} onClick={onClose}>
          <div className="alert-icon">{iconType()}</div>
          <p className="alert-message">{message}</p>
        </div>
      )}
    </Portal>
  );
};

export default React.forwardRef(Alert);
