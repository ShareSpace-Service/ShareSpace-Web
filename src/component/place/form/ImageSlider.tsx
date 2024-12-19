import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEditHandler } from '@/hooks/place/usePlaceForm';
import { useImageHandler } from '@/hooks/place/usePlaceImage';

function ImageSlider() {
  const { isEdit, currentImage } = useEditHandler();
  const { handleImageDelete } = useImageHandler();

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="aspect-[4/3]"
      >
        {currentImage?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`place-${index + 1}`}
              className="w-full h-full rounded-lg"
            />
            {/* 수정 모드 일때 삭제 버튼 표시 */}
            {isEdit && (
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => handleImageDelete(image)}
              >
                X
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlider;
