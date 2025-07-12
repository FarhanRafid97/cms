// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// import required modules
import { pictCarousel } from '@/lib/options-default';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, User, Clock, Tag } from 'lucide-react';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

export default function CarouselHero() {
  return (
    <div className="relative w-full h-[80vh] md:h-screen group overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]" />

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

                {/* News-style Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />
              </div>

              {/* Content Container - News Layout */}
              <div className="relative z-10 flex items-end h-full px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-4xl mx-auto w-full">
                  {/* News Header */}
                  <div className="mb-6">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wide rounded-sm mb-4">
                      <Tag className="w-3 h-3" />
                      <span>Artikel Terbaru</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
                      {pict.label}
                    </h1>

                    {/* Subtitle/Excerpt */}
                    <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-3xl mb-6">
                      {pict.label_description}
                    </p>
                  </div>

                  {/* News Meta Information */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm mb-6">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{pict.author}</span>
                    </div>

                    {/* Publication Date */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{pict.publish_date}</span>
                    </div>

                    {/* Reading Time */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>5 min read</span>
                    </div>

                    {/* Article Type */}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Featured Article</span>
                    </div>
                  </div>

                  {/* News-style CTA */}
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <button className="group/btn relative px-6 py-3 bg-white text-black font-semibold rounded-none hover:bg-gray-100 transition-all duration-300 border-2 border-white hover:border-gray-300">
                      <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* News-style Slide Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center gap-3">
                  {pictCarousel.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-3 h-1 rounded-full transition-all duration-300 ${
                        idx === index ? 'bg-white w-8' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Controls - News Style */}
      <div
        id="my-prev-button"
        className="absolute top-1/2 -translate-y-1/2 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button className="group/nav w-12 h-12 rounded-none bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all duration-300">
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
      </div>

      <div
        id="my-next-button"
        className="absolute top-1/2 -translate-y-1/2 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button className="group/nav w-12 h-12 rounded-none bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all duration-300">
          <ChevronRight className="h-5 w-5 text-white" />
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
