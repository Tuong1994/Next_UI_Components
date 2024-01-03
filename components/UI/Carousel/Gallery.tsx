"use client";

import React from "react";
import { CarouselItems } from "./type";
import {
  HiOutlineChevronLeft as ArrowLeft,
  HiOutlineChevronRight as ArrowRight,
  HiXMark as IconClose,
  HiListBullet as IconList,
} from "react-icons/hi2";
import { Image } from "..";
import { useRender } from "@/hooks";
import Portal from "@/components/Portal";
import useCarousel from "./useCarousel";
import utils from "@/utils";

export interface CarouselGalleryProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  items?: CarouselItems;
  slideId?: string;
  time?: number;
  open?: boolean;
  infinite?: boolean;
  autoPlay?: boolean;
  hasManualStop?: boolean;
  leftButtonIcon?: React.ReactNode | React.ReactNode[];
  rightButtonIcon?: React.ReactNode | React.ReactNode[];
  mode?: "dark" | "light";
  onClose?: () => void;
}

const widthSpan = 100;

let interval: any;

const CarouselGallery: React.ForwardRefRenderFunction<HTMLDivElement, CarouselGalleryProps> = (
  {
    rootClassName = "",
    style,
    slideId = "slide",
    mode = "dark",
    time = 3000,
    infinite,
    autoPlay,
    open = false,
    hasManualStop,
    leftButtonIcon = <ArrowLeft size={30} />,
    rightButtonIcon = <ArrowRight size={30} />,
    items = [
      { id: "1", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "2", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "3", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "4", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "5", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "6", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "7", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "8", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "9", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "10", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "11", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
      { id: "12", url: "https://universe.nasa.gov/internal_resources/402/Carina%20Nebula.jpeg" },
    ],
    onClose,
  },
  ref
) => {
  const [slidePos, setSlidePos] = React.useState<number>(0);

  const [touchStartPos, setTouchStartPos] = React.useState<number>(0);
  const [touchEndPos, setTouchEndPos] = React.useState<number>(0);
  const [touched, setTouched] = React.useState<boolean>(false);
  const [touchSwiped, setTouchSwiped] = React.useState<boolean>(false);

  const [mouseStartPos, setMouseStartPos] = React.useState<number>(0);
  const [mouseEndPos, setMouseEndPos] = React.useState<number>(0);
  const [clicked, setClicked] = React.useState<boolean>(false);
  const [mouseSwiped, setMouseSwiped] = React.useState<boolean>(false);

  const [manualStop, setManualStop] = React.useState<boolean>(time !== undefined);

  const [showList, setShowList] = React.useState<boolean>(false);

  const { translateFull, translatePartial, translateAnimation } = useCarousel({ items, slideId, slidePos });

  const render = useRender(open);

  React.useEffect(() => {
    if (autoPlay) {
      if (manualStop && !clicked && !touched) {
        interval = setInterval(() => handleNextSlide(), time);
      }
    }
    return () => clearInterval(interval);
  });

  const modeClassName = `carousel-${mode}`;

  const openClassName = open ? "carousel-gallery-active" : "";

  const isReSlide = infinite || autoPlay;

  const prevBtnDisabled = !isReSlide && slidePos === 0;

  const nextBtnDisabled = !isReSlide && slidePos === items.length - 1;

  const prevBtnDisabledClassName = prevBtnDisabled ? "carousel-action-disabled" : "";

  const nextBtnDisabledClassName = nextBtnDisabled ? "carousel-action-disabled" : "";

  const listActiveClassName = showList ? "carousel-gallery-list-active" : "";

  const mainClassName = utils.formatClassName(
    "carousel",
    "carousel-gallery",
    openClassName,
    listActiveClassName,
    modeClassName,
    rootClassName
  );

  const leftActionClassName = utils.formatClassName("carousel-action", prevBtnDisabledClassName);

  const rightActionClassName = utils.formatClassName("carousel-action", nextBtnDisabledClassName);

  const jumpToSlide = (pos: number) => {
    setSlidePos(pos);
    translateFull(pos, "horizontal");
  };

  const handleManualStop = () => {
    clearInterval(interval);
    if (hasManualStop) setManualStop(false);
  };

  const handlePrevSlide = () => {
    let newPos = slidePos;
    if (newPos > 0) newPos -= 1;
    else if (isReSlide) newPos = items.length - 1;
    setSlidePos(newPos);
    translateFull(newPos, "horizontal");
  };

  const handleNextSlide = () => {
    let newPos = slidePos;
    if (newPos < items.length - 1) newPos += 1;
    else if (isReSlide) newPos = 0;
    setSlidePos(newPos);
    translateFull(newPos, "horizontal");
  };

  const onPrev = () => {
    handlePrevSlide();
    handleManualStop();
  };

  const onNext = () => {
    handleNextSlide();
    handleManualStop();
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartPos(e.touches[0].clientX);
    setTouchEndPos(e.touches[0].clientX);
    setTouched(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touched) return;
    setTouchEndPos(e.touches[0].clientX);
    const viewWidth = document.getElementById("carouselView")?.offsetWidth;
    if (viewWidth) {
      const translate = ((touchEndPos - touchStartPos) / viewWidth) * widthSpan;
      translatePartial(translate, "horizontal");
      setTouchSwiped(true);
    }
  };

  const onTouchEnd = () => {
    if (!touchSwiped) return;
    if (touchEndPos - touchStartPos > 75) handlePrevSlide();
    else if (touchEndPos - touchStartPos < -75) handleNextSlide();
    else jumpToSlide(slidePos);
    setManualStop(true);
    setTouched(false);
    setTouchSwiped(false);
    translateAnimation("slow");
  };

  const onMouseStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMouseStartPos(e.clientX);
    setMouseEndPos(e.clientX);
    setClicked(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!clicked) return;
    setMouseEndPos(e.clientX);
    const viewWidth = document.getElementById("carouselView")?.offsetWidth;
    if (viewWidth) {
      const translate = ((mouseEndPos - mouseStartPos) / viewWidth) * widthSpan;
      translatePartial(translate, "horizontal");
      setMouseSwiped(true);
    }
  };

  const onMouseEnd = () => {
    if (!mouseSwiped) return;
    if (mouseEndPos - mouseStartPos > 100) handlePrevSlide();
    else if (mouseEndPos - mouseStartPos < -100) handleNextSlide();
    else jumpToSlide(slidePos);
    setManualStop(true);
    setClicked(false);
    setMouseSwiped(false);
    translateAnimation("slow");
  };

  const renderItems = () => {
    return items.map((item, idx) => (
      <div key={item.id} id={`${slideId}-${idx}`} className="view-item">
        <img src={item.url} className="item-content" />
      </div>
    ));
  };

  const renderList = () => {
    return items.map((item, idx) => {
      const itemActiveClassName = slidePos === idx ? "list-item-active" : "";
      return (
        <Image
          imgWidth="100%"
          key={item.id}
          src={item.url}
          rootClassName={`list-item ${itemActiveClassName}`}
          onClick={() => jumpToSlide(idx)}
        />
      );
    });
  };

  return (
    <Portal>
      {render && (
        <div ref={ref} style={style} className={mainClassName}>
          <div className="gallery-view">
            <button disabled={prevBtnDisabled} className={leftActionClassName} onClick={onPrev}>
              {leftButtonIcon}
            </button>
            <button disabled={nextBtnDisabled} className={rightActionClassName} onClick={onNext}>
              {rightButtonIcon}
            </button>

            <div className="view-head">
              <div className="head-content">
                {slidePos + 1} / {items.length}
              </div>
              <div className="head-action">
                <IconList size={20} className="action-icon" onClick={() => setShowList(!showList)} />
                <IconClose size={20} className="action-icon" onClick={onClose} />
              </div>
            </div>

            <div
              id="carouselView"
              className="carousel-view"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseStart}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseEnd}
              onMouseLeave={onMouseEnd}
            >
              {renderItems()}
            </div>
          </div>

          <div className="gallery-list">{renderList()}</div>
        </div>
      )}
    </Portal>
  );
};

export default React.forwardRef(CarouselGallery);
