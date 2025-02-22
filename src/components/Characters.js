import '../styles/embla.css';

import useEmblaCarousel from 'embla-carousel-react';
import { PropTypes } from 'prop-types';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

const Characters = forwardRef(({ characters, setIndex }, ref) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  useImperativeHandle(ref, () => ({
    scrollPrev,
    scrollNext,
  }));

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <div className="embla !bg-transparent -top-20 lg:top-0">
      <div className="embla__viewport  lg:w-[22rem] 2xl:w-[27rem]" ref={viewportRef}>
        <div className="embla__container">
          {characters.map((character) => (
            <div className="embla__slide" key={character?.id}>
              <div className="embla__slide__inner !h-full">
                <figure className="">
                  <img
                    className="mx-auto"
                    src={character?.image}
                    alt={character?.name}
                  />
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Characters.propTypes = {
  ref: PropTypes.shape({}),
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  setIndex: PropTypes.func.isRequired,
};

export default Characters;
