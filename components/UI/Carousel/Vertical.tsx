"use client";

import React from "react";
import { CarouselItems } from "./type";
import { HiOutlineChevronUp as ArrowUp, HiOutlineChevronDown as ArrowDown } from "react-icons/hi2";
import useCarousel from "./useCarousel";

export interface CarouselVerticalProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  items?: CarouselItems;
  slideId?: string;
  time?: number;
  infinite?: boolean;
  autoPlay?: boolean;
  hasManualStop?: boolean;
  upButtonIcon?: React.ReactNode | React.ReactNode[];
  downButtonIcon?: React.ReactNode | React.ReactNode[];
  mode?: "dark" | "light";
}

const heightSpan = 100;

let interval: any;

const CarouselVertical: React.ForwardRefRenderFunction<HTMLDivElement, CarouselVerticalProps> = (
  {
    rootClassName = "",
    style,
    slideId = "slide",
    mode = "dark",
    time = 3000,
    infinite,
    autoPlay,
    hasManualStop,
    upButtonIcon = <ArrowUp size={30} />,
    downButtonIcon = <ArrowDown size={30} />,
    items = [
      { id: "1", content: "Content 1" },
      { id: "2", content: "Content 2" },
      { id: "3", content: "Content 3" },
    ],
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

  const { translateFull, translatePartial, translateAnimation } = useCarousel({ items, slideId, slidePos });

  React.useEffect(() => {
    if (autoPlay) {
      if (manualStop && !clicked && !touched) {
        interval = setInterval(() => handleNextSlide(), time);
      }
    }
    return () => clearInterval(interval);
  });

  const modeClassName = `carousel-${mode}`;

  const isReSlide = infinite || autoPlay;

  const prevBtnDisabled = !isReSlide && slidePos === 0;

  const nextBtnDisabled = !isReSlide && slidePos === items.length - 1;

  const prevBtnDisabledClassName = prevBtnDisabled ? "carousel-action-disabled" : "";

  const nextBtnDisabledClassName = nextBtnDisabled ? "carousel-action-disabled" : "";

  const jumpToSlide = (pos: number) => {
    setSlidePos(pos);
    translateFull(pos, "vertical");
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
    translateFull(newPos, "vertical");
  };

  const handleNextSlide = () => {
    let newPos = slidePos;
    if (newPos < items.length - 1) newPos += 1;
    else if (isReSlide) newPos = 0;
    setSlidePos(newPos);
    translateFull(newPos, "vertical");
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
    setTouchStartPos(e.touches[0].clientY);
    setTouchEndPos(e.touches[0].clientY);
    setTouched(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touched) return;
    setTouchEndPos(e.touches[0].clientY);
    const viewWidth = document.getElementById("carouselView")?.offsetWidth;
    if (viewWidth) {
      const translate = ((touchEndPos - touchStartPos) / viewWidth) * heightSpan;
      translatePartial(translate, "vertical");
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
    setMouseStartPos(e.clientY);
    setMouseEndPos(e.clientY);
    setClicked(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!clicked) return;
    setMouseEndPos(e.clientY);
    const viewWidth = document.getElementById("carouselView")?.offsetWidth;
    if (viewWidth) {
      const translate = ((mouseEndPos - mouseStartPos) / viewWidth) * heightSpan;
      translatePartial(translate, "vertical");
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
        {item.content}
      </div>
    ));
  };

  const renderDots = () => {
    return items.map((item, idx) => {
      const dotActiveClassName = slidePos === idx ? "dots-item-active" : "";
      return <div key={item.id} className={`dots-item ${dotActiveClassName}`} onClick={() => jumpToSlide(idx)} />;
    });
  };

  return (
    <div ref={ref} style={style} className={`carousel carousel-vertical ${modeClassName} ${rootClassName}`}>
      <button disabled={prevBtnDisabled} className={`carousel-action ${prevBtnDisabledClassName}`} onClick={onPrev}>
        {upButtonIcon}
      </button>
      <button disabled={nextBtnDisabled} className={`carousel-action ${nextBtnDisabledClassName}`} onClick={onNext}>
        {downButtonIcon}
      </button>
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
      <div className="carousel-dots">{renderDots()}</div>
    </div>
  );
};

export default React.forwardRef(CarouselVertical);
