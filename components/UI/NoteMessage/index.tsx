"use client";

import React from "react";
import { ComponentSize } from "@/common/type";

type NoteMessageType = "default" | "error"

type NoteMessageSize = ComponentSize | number

export interface NoteMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  message?: string;
  weight?: number;
  italic?: boolean;
  type?: NoteMessageType;
  size?: NoteMessageSize
}

const NoteMessage: React.ForwardRefRenderFunction<HTMLDivElement, NoteMessageProps> = (
  {
    rootClassName = "",
    style,
    message = "",
    type = "default",
    size = "md",
    italic,
    weight = 400,
    ...restProps
  },
  ref
) => {
  const typeClassName = `note-message-${type}`;

  const italicClassName = italic ? `note-message-italic` : "";

  const inlineStyle = (): React.CSSProperties => {
    const customStyle: React.CSSProperties = { ...style, fontWeight: weight };
    if (typeof size === "number") return { ...customStyle, fontSize: `${size}px` };
    if (size === "sm") return { ...customStyle, fontSize: "12px" };
    if (size === "md") return { ...customStyle, fontSize: "14px" };
    if (size === "lg") return { ...customStyle, fontSize: "18px" };
    return { ...customStyle };
  };

  return (
    <div
      {...restProps}
      ref={ref}
      style={inlineStyle()}
      className={`note-message ${typeClassName} ${italicClassName} ${rootClassName}`}
    >
      {message}
    </div>
  );
};

export default React.forwardRef(NoteMessage);
