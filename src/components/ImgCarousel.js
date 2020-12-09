import { useState, useEffect } from "react";
import "../shared/imgCarousel.scss";

export default function ImgCarousel(props) {
  let { imgArr } = props;
  let newArr = imgArr ? [...imgArr] : [];

  const length = newArr.length;
  newArr.push(...newArr);

  const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const createItem = (position, idx) => {
    const item = {
      styles: {
        transform: `translateX(${position * 20}rem)`,
      },
      photoItem: newArr[idx],
    };

    return item;
  };

  const CarouselSlideItem = ({ pos, idx, activeIdx }) => {
    const item = createItem(pos, idx, activeIdx);

    return (
      <li className="carousel__slide-item" style={item.styles}>
        <div className="carousel__slide-item-img-link">
          <img src={item.photoItem.img_src} alt={item.photoItem.id} />
        </div>
      </li>
    );
  };

  const keys = Array.from(Array(newArr.length).keys());

  const Carousel = () => {
    const [items, setItems] = useState(keys);
    const [isTicking, setIsTicking] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const bigLength = items.length;

    const prevClick = (jump = 1) => {
      if (!isTicking) {
        setIsTicking(true);
        setItems((prev) => {
          return prev.map((_, i) => prev[(i + jump) % bigLength]);
        });
      }
    };

    const nextClick = (jump = 1) => {
      if (!isTicking) {
        setIsTicking(true);
        setItems((prev) => {
          return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength]);
        });
      }
    };

    const handleDotClick = (idx) => {
      if (idx < activeIdx) prevClick(activeIdx - idx);
      if (idx > activeIdx) nextClick(idx - activeIdx);
    };

    useEffect(() => {
      if (isTicking) sleep(300).then(() => setIsTicking(false));
    }, [isTicking]);

    useEffect(() => {
      setActiveIdx((length - (items[0] % length)) % length);
    }, [items]);

    return (
      <div className="carousel__wrap">
        <div className="carousel__inner">
          <button
            className="carousel__btn carousel__btn--prev"
            onClick={() => prevClick()}
          >
            <i className="carousel__btn-arrow carousel__btn-arrow--left" />
          </button>
          <div className="carousel__container">
            <ul className="carousel__slide-list">
              {items.map((pos, i) => (
                <CarouselSlideItem
                  key={i}
                  idx={i}
                  pos={pos}
                  activeIdx={activeIdx}
                />
              ))}
            </ul>
          </div>
          <button
            className="carousel__btn carousel__btn--next"
            onClick={() => nextClick()}
          >
            <i className="carousel__btn-arrow carousel__btn-arrow--right" />
          </button>
          <div className="carousel__dots">
            {items.slice(0, length).map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={i === activeIdx ? "dot active" : "dot"}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return <Carousel />;
}
