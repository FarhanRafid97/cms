'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './button-arrow';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const pictCarousel = [
  { id: 1, imagePath: '/carousel-image/1.png', label: 'Komunitas Literasi Perpustakaan' },
  { id: 2, imagePath: '/carousel-image/2.png', label: 'Komunitas Literasi Pustaka' },
  { id: 3, imagePath: '/carousel-image/3.png', label: 'Komunitas Bukik Ase' },
];
const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  options?: EmblaOptionsType;
};

const CarouselComunityPict: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    ...options,
  });
  const tweenFactor = useRef(0);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const opacity = numberWithinRange(tweenValue, 0, 1).toString();
        emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity);
  }, [emblaApi, setTweenFactor, tweenOpacity]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {pictCarousel.map((process) => (
            <div className="embla__slide" key={process.id}>
              <AspectRatio
                ratio={4 / 6}
                className="w-full h-full overflow-hidden rounded-xl relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={process.imagePath}
                  alt="Tentang Komunitas - Suasana diskusi buku yang hangat dan inspiratif"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 dark:opacity-90"
                  priority
                />
                <span className="absolute left-4 bottom-4 font-bold text-white z-20 text-lg">
                  {process.label}
                </span>
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full mt-4">
        <div className="w-full flex gap-2 justify-end">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default CarouselComunityPict;
