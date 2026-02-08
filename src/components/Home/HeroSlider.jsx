import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80",
    title: "Discover Local Flavors",
    subtitle:
      "Explore honest food reviews from your community and find hidden gems near you.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
    title: "Share Your Experience",
    subtitle:
      "Tried something delicious? Share your review with photos and help others find great food.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80",
    title: "Street Food Adventures",
    subtitle:
      "From food trucks to night markets — celebrate the best street food your city has to offer.",
  },
];

const HeroSlider = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-[500px] md:h-[600px] lg:h-[650px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl"
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link to="/all-reviews" className="btn-primary">
                        Browse Reviews
                      </Link>
                      <Link
                        to="/add-review"
                        className="btn-outline !border-white !text-white hover:!bg-white hover:!text-gray-900"
                      >
                        Write a Review
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
