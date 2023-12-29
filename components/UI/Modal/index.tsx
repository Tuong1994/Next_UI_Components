import React from "react";
import { HiXMark } from "react-icons/hi2";
import { ComponentColor, ComponentSize } from "@/common/type";
import { useOverflow, useRender } from "@/hooks";
import Portal from "@/components/Portal";
import Button, { ButtonProps } from "../Button";

export interface ModalProps {
  rootClassName?: string;
  headClassName?: string;
  bodyClassName?: string;
  footClassName?: string;
  style?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footStyle?: React.CSSProperties;
  head?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
  hasHead?: boolean;
  hasFoot?: boolean;
  hasCloseIcon?: boolean;
  backdropClose?: boolean;
  open?: boolean;
  sizes?: ComponentSize;
  color?: ComponentColor;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  okButtonTitle?: React.ReactNode | React.ReactNode[];
  cancelButtonTitle?: React.ReactNode | React.ReactNode[];
  onOk?: () => void;
  onCancel?: () => void;
}

const Modal: React.ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  {
    rootClassName = "",
    headClassName = "",
    bodyClassName = "",
    footClassName = "",
    style,
    headStyle,
    bodyStyle,
    footStyle,
    head = "Modal",
    children,
    sizes = "md",
    color = "blue",
    hasHead = true,
    hasFoot = true,
    hasCloseIcon = true,
    backdropClose = true,
    open = false,
    okButtonTitle = "Ok",
    cancelButtonTitle = "Cancel",
    okButtonProps,
    cancelButtonProps,
    onOk,
    onCancel,
  },
  ref
) => {
  const render = useRender(open);

  useOverflow(open);

  const sizeClassName = `modal-${sizes}`;

  const colorClassName = `modal-${color}`;

  const backdropActiveClassName = open ? "modal-backdrop-active" : "";

  const modalActiveClassName = open ? "modal-active" : "";

  const okButtonColor = color === "white" || color === "gray" ? "blue" : okButtonProps?.color ?? color;

  const okActionProps: ButtonProps = { ...okButtonProps, color: okButtonColor };

  return (
    <Portal>
      {render && (
        <React.Fragment>
          <div
            className={`modal-backdrop ${backdropActiveClassName}`}
            onClick={() => backdropClose && onCancel?.()}
          />

          <div
            ref={ref}
            style={style}
            className={`modal ${colorClassName} ${sizeClassName} ${modalActiveClassName} ${rootClassName}`}
          >
            {hasHead && (
              <div style={headStyle} className={`modal-head ${headClassName}`}>
                {head}
                {hasCloseIcon && <HiXMark size={20} className="head-icon" onClick={onCancel} />}
              </div>
            )}

            <div style={bodyStyle} className={`modal-body ${bodyClassName}`}>
              {children}
            </div>

            {hasFoot && (
              <div style={footStyle} className={`modal-foot ${footClassName}`}>
                <Button {...cancelButtonProps} onClick={onCancel}>
                  {cancelButtonTitle}
                </Button>
                <Button {...okActionProps} onClick={onOk}>
                  {okButtonTitle}
                </Button>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </Portal>
  );
};

export default React.forwardRef(Modal);
