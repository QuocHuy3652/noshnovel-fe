import { Swiper, SwiperSlide } from 'swiper/react';
import { NovelCard } from '~/components/NovelCard.tsx';
import { Navigation, Pagination, Scrollbar, FreeMode, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';

export const CardSlider = () => {
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        freeMode={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className="p-5"
      >
        {[1, 2, 3, 4, 5, 6].map((item) =>
          <SwiperSlide className="mb-[3rem]" key={item}><NovelCard /></SwiperSlide>
        )}
      </Swiper>
    </>
  )
}