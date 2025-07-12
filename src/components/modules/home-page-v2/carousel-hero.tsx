// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// import required modules
import { pictCarousel } from '@/lib/options-default';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

export default function CarouselHero() {
  return (
    <div className="relative w-full h-[80vh] md:h-screen group overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      <Swiper
        navigation={{
          nextEl: '#my-next-button',
          prevEl: '#my-prev-button',
        }}
        pagination={{
          clickable: true,
          el: '#custom-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        className="w-full h-full"
      >
        {pictCarousel.map((pict, index) => (
          <SwiperSlide key={pict.id}>
            <div className="relative w-full h-full group/slide">
              {/* Background Image with Parallax Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={pict.imagePath}
                  alt={pict.label}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />

                {/* Multiple Gradient Overlays for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/60" />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-20 left-20 opacity-20">
                <div className="w-32 h-32 bg-white/10 rounded-full blur-xl" />
              </div>
              <div className="absolute bottom-40 right-20 opacity-20">
                <div className="w-48 h-48 bg-purple-500/20 rounded-full blur-xl" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-white/90 text-sm font-medium">Artikle Terbaru</span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                      {pict.label}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto mb-8">
                    {pict.label_description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-center gap-6 text-white/70 text-sm mb-8">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{pict.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{pict.publish_date}</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="group/btn relative px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                      <span className="flex items-center gap-2">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center gap-2">
                  {pictCarousel.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300   `}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Controls */}
      <div
        id="my-prev-button"
        className="absolute top-1/2 -translate-y-1/2 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button className="group/nav w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
          <ChevronLeft className="h-6 w-6 text-white " />
        </button>
      </div>

      <div
        id="my-next-button"
        className="absolute top-1/2 -translate-y-1/2 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button className="group/nav w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 ">
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Custom Pagination */}
      <div
        id="custom-pagination"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      />
    </div>
  );
}
