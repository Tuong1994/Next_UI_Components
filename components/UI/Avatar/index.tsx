"use client";

import React from "react";
import { HiUser } from "react-icons/hi2";
import { ComponentColor, ComponentShape } from "@/common/type";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  size?: number;
  letter?: string;
  badge?: string;
  dot?: boolean;
  color?: Exclude<ComponentColor, "white" | "gray">;
  shape?: Exclude<ComponentShape, "round">;
}

const Avatar: React.ForwardRefRenderFunction<HTMLDivElement, AvatarProps> = (
  {
    rootClassName = "",
    style,
    children,
    size = 30,
    shape = "circle",
    color = "blue",
    dot,
    badge,
    letter,
    ...restProps
  },
  ref
) => {
  const [iconSize, setIconSize] = React.useState<number>(18);

  const shapeClassName = `avatar-${shape}`;

  const colorClassName = !children ? `avatar-${color}` : "";

  const badgeClassName = badge && badge.length > 1 ? "avatar-badge-radius" : "";

  const inlineStyle = { ...style, width: `${size}px`, height: `${size}px` };

  React.useEffect(() => {
    setIconSize(18);
    if (size < 30 && size % 10 === 0) setIconSize((prev) => prev - 6);
    if (size > 30 && size % 10 === 0) setIconSize((prev) => prev + 6);
  }, [size]);

  const renderContent = () => {
    if (children) return children;
    if (letter) return letter.slice(0, 1);
    return <HiUser size={iconSize} />;
  };

  return (
    <div
      {...restProps}
      ref={ref}
      style={inlineStyle}
      className={`avatar ${colorClassName} ${shapeClassName} ${rootClassName}`}
    >
      {badge && <div className={`avatar-badge ${badgeClassName}`}>{badge}</div>}

      {dot && <div className="avatar-dot" />}

      <div className="avatar-content">{renderContent()}</div>
    </div>
  );
};

export default React.forwardRef(Avatar);
