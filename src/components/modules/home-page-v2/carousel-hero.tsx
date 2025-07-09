import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { pictCarousel } from '@/lib/options-default';
import Image from 'next/image';

export default function CarouselHero() {
  return (
    <div className="w-full h-full ">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-full"
      >
        {pictCarousel.map((pict, index) => (
          <SwiperSlide key={pict.id}>
            <div className="relative w-full h-full group">
              <Image
                src={pict.imagePath}
                alt={pict.label}
                fill
                className="object-cover object-center transition-transform duration-700 "
                priority={index === 0}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 text-white">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight font-geist-mono">
                    {pict.label}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
                    {pict.label_description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
