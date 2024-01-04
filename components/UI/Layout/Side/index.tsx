import React from "react";
import { CgArrowsShrinkH as ShrinkIcon } from "react-icons/cg";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { GridAppContext } from "../../Grid/Context";
import { useOverflow, useRender } from "@/hooks";
import LayoutContext from "../Context";
import Button from "@/components/UI/Button";
import useLayoutStore from "../LayoutStore";
import utils from "@/utils";

const ICON_SIZE = 20;

export interface LayoutSideProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  collapsable?: boolean;
  onCollapse?: (collapse: boolean) => void;
}

const LayoutSide: React.ForwardRefRenderFunction<HTMLDivElement, LayoutSideProps> = (
  { rootClassName = "", collapsable = false, children, onCollapse, ...restProps },
  ref
) => {
  const { theme, color, layouted } = React.useContext(LayoutContext);

  const { isPhone, isTablet } = React.useContext(GridAppContext);

  const [shrinked, onShrinked, onResizeContent] = useLayoutStore((state) => [
    state.shrinked,
    state.onShrinked,
    state.onResizeContent,
  ]);

  const [show, setShow] = React.useState<boolean>(false);

  const render = useRender(show);

  useOverflow(show);

  const isResponsive = isPhone || isTablet;

  const themeClassName = `side-${theme}`;

  const shrinkClassName = shrinked ? `side-shrinked` : "";

  const layoutClassName = layouted ? "side-layout" : "";

  const collapsableClassName = collapsable ? "side-collapsable" : "";

  const mobileShowClassName = show ? "side-show" : "";

  const mobileBtnMoveDownClassName = layouted ? "side-mobile-btn-top" : "";

  const backdropShowClassName = show ? "side-mobile-backdrop-active" : "";

  const className = utils.formatClassName(
    "side",
    shrinkClassName,
    themeClassName,
    layoutClassName,
    collapsableClassName,
    mobileShowClassName,
    rootClassName
  );

  const mobileBtnClassName = utils.formatClassName("side-mobile-btn", mobileBtnMoveDownClassName);

  const mobileBackDropClassName = utils.formatClassName("side-mobile-backdrop", backdropShowClassName);

  React.useEffect(() => onResizeContent(), []);

  React.useEffect(() => onCollapse?.(shrinked), [shrinked]);

  const handleShow = () => setShow(true);

  const handleHide = () => setShow(false);
  return (
    <React.Fragment>
      <aside ref={ref} {...restProps} className={className}>
        <div className="side-content">{children}</div>
        {!isResponsive && collapsable && (
          <div className="side-action">
            <Button color={color} rootClassName="action-btn" onClick={onShrinked}>
              <ShrinkIcon size={ICON_SIZE} />
            </Button>
          </div>
        )}
      </aside>

      {render && isResponsive && (
        <div className={mobileBackDropClassName} onClick={handleHide}>
          <button className="backdrop-close-btn">
            <HiXMark size={ICON_SIZE} />
          </button>
        </div>
      )}

      {isResponsive && (
        <button className={mobileBtnClassName} onClick={handleShow}>
          <HiBars3 size={ICON_SIZE} />
        </button>
      )}
    </React.Fragment>
  );
};

export default React.forwardRef(LayoutSide);
