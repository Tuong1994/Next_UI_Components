"use client";

import React from "react";
import { ToastMessage } from "./type";
import { HiXMark } from "react-icons/hi2";
import { Record } from "@/common/type";
import useToastStore from "./ToastStore";
import utils from "@/utils";

interface ToastMessageItemProps {
  toast: ToastMessage;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  showProgress?: boolean;
}

const ANIMATION_TIME = 4000;

const ToastMessageItem: React.FC<ToastMessageItemProps> = ({
  toast,
  itemClassName = "",
  itemStyle,
  showProgress = true,
}) => {
  const [options, removeToast] = useToastStore((state) => [state.options, state.removeToast]);

  const [removed, setRemoved] = React.useState<boolean>(false);

  const { successIcon, errorIcon, warningIcon, infoIcon } = options;

  const barRef = React.useRef<HTMLDivElement>(null);

  const timeRef = React.useRef<any>(null);

  const { id, type, message } = toast;

  const typeClassName = `message-item-${type}`;

  const removeClassName = removed ? "message-item-hide" : "";

  const className = utils.formatClassName("message-item", typeClassName, removeClassName, itemClassName);

  React.useEffect(() => {
    timeRef.current = setTimeout(() => handleRemove(), ANIMATION_TIME);
    return () => clearTimeout(timeRef.current);
  }, []);

  const iconType = () => {
    const icon: Record = {
      success: successIcon,
      error: errorIcon,
      warning: warningIcon,
      info: infoIcon,
    };
    return icon[type ?? "success"];
  };

  const handleRemove = () => {
    setRemoved(true);
    setTimeout(() => removeToast(id), 400);
  };

  const handleMouseEnter = () => {
    if (!barRef.current) return;
    clearTimeout(timeRef.current);
    barRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    const barEl = barRef.current;
    if (!barEl) return;
    if (!barEl.parentElement) return;
    const remainTime = (barEl.offsetWidth / barEl.parentElement.offsetWidth) * ANIMATION_TIME;
    barEl.style.animationPlayState = "running";
    timeRef.current = setTimeout(() => handleRemove(), remainTime);
  };

  return (
    <div
      style={itemStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="item-content">
        <div className="content-icon">{iconType()}</div>

        <div className="content-message">
          <p className="message-text">{message}</p>

          {showProgress && (
            <div className="message-progress">
              <div ref={barRef} className="progress-bar" />
            </div>
          )}
        </div>
      </div>

      <button type="button" className="item-action" onClick={handleRemove}>
        <HiXMark />
      </button>
    </div>
  );
};

export default ToastMessageItem;
