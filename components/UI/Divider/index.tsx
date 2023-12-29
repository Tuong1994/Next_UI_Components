import React from "react";
import utils from "@/utils";

type DividerType = "horizontal" | "vertical";

type ContentPlacement = "left" | "center" | "right";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  plain?: boolean;
  verticalSize?: number;
  placement?: ContentPlacement;
  type?: DividerType;
}

const Divider: React.ForwardRefRenderFunction<HTMLDivElement, DividerProps> = (
  {
    rootClassName = "",
    type = "horizontal",
    verticalSize = 20,
    children,
    plain,
    placement = "left",
    ...restProps
  },
  ref
) => {
  const placementClassName = `divider-${placement}`;

  const plainClassName = plain ? `divider-plain` : "";

  const showHorizontal = type === "horizontal";

  const showVertical = type === "vertical";

  const verticalStyle = { height: `${verticalSize}px` };

  const className = utils.formatClassName("divider", placementClassName, plainClassName, rootClassName);

  return (
    <div ref={ref} {...restProps} className={className}>
      {showHorizontal && (
        <div className="divider-horizontal">
          {children && <div className="horizontal-content">{children}</div>}
        </div>
      )}

      {showVertical && <div style={verticalStyle} className="divider-vertical" />}
    </div>
  );
};

export default React.forwardRef(Divider);
