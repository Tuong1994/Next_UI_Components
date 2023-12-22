"use client";

import React from "react";
import { ComponentColor } from "@/common/type";
import { FaSpinner } from "react-icons/fa";

type SpinnerType = "default" | "bubble"

export interface SpinnerProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  type?: SpinnerType;
  size?: number;
  color?: ComponentColor;
}

const Spinner: React.FC<SpinnerProps> = ({
  rootClassName = "",
  style,
  size = 14,
  color = "gray",
  type = "default",
}) => {
  const dotStyle = { width: `${size}px`, height: `${size}px` };

  const colorClassName = type === "default" ? `spinner-default-${color}` : `spinner-bubble-${color}`;

  return (
    <React.Fragment>
      {type === "default" && (
        <FaSpinner
          style={style}
          size={size}
          className={`spinner-default ${colorClassName} ${rootClassName}`}
        />
      )}
      {type === "bubble" && (
        <div style={style} className={`spinner-bubble ${colorClassName} ${rootClassName}`}>
          {[...Array(2)].map((_, idx) => (
            <div className="bubble-item" key={idx}>
              <div style={dotStyle} className="item-dot"></div>
              <div style={dotStyle} className="item-dot"></div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Spinner;
