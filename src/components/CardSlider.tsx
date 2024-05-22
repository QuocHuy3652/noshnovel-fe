import { Swiper, SwiperSlide } from 'swiper/react';
import { NovelCard, NovelCardProps } from '~/components/NovelCard.tsx';
import { Navigation, Pagination, Scrollbar, FreeMode, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';

export const CardSlider = () => {
  const history = JSON.parse(localStorage.getItem('history') || '[]');
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
        {history.map((item: NovelCardProps, index: number) => (
          <SwiperSlide className="mb-[3rem] !mr-5" key={index}>
            <NovelCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
