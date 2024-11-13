import ButtonProps from '../ui/ButtonProps';
import { Input } from '@/components/ui/input';
import MapIcon from '@/assets/Map.svg';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useState } from 'react';
import { usePlaceEditStore } from '@/store/PlaceEdit';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import { fetchPlaceForm } from '@/api/Place';
import { PlaceEditForm } from '@/interface/PlaceInterface';
import { validatePeriod } from '@/lib/PeriodFormat';

function HostEditForm() {
  const {
    isEdit,
    setIsEdit,
    isOpen,
    setIsOpen,
    formData,
    setFormData,
    currentImage,
    setCurrentImage,
    originalData,
    setOriginalData,
    originalImage,
    setOriginalImage,
  } = usePlaceEditStore();
  const [zoneCode, setZoneCode] = useState<string>('');
  const objectUrls = useRef<string[]>([]);

  const mutation = useMutation({
    mutationFn: (formData: FormData) => fetchPlaceForm(formData),

    onSuccess: (data: PlaceEditForm) => {
      console.log('장소가 정상적으로 수정되었습니다.', data);

      // 성공 시 URL 객체들 정리
      objectUrls.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      objectUrls.current = [];
      setIsEdit(false);
    },
    onError: (error: Error) => {
      console.error('장소 수정 중 오류가 발생했습니다.', error);
      alert(error.message || '장소 수정에 실패했습니다.');
    },
  });

  // 수정 버튼 클릭 시
  const handleEditClick = () => {
    if (formData) {
      setOriginalData(formData);
      setOriginalImage(currentImage);
    }
    setIsEdit(true);
  };
  // 주소 검색 버튼 클릭 시
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  // location 값 변경 시
  const handleAddress = (addressData: Address) => {
    const fullAddress = addressData.address;
    if (formData) {
      setFormData({ ...formData, location: fullAddress });
    }
    setZoneCode(addressData.zonecode);
    setIsOpen(false);
  };

  // Input 값 변경 시
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'period' ? validatePeriod(value) : value,
    });
  };

  // TextArea 값 변경 시
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // 수정 모드 종료 시
  useEffect(() => {
    if (!isEdit) {
      console.log('수정 모드 종료 - Cleanup 시작');
      console.log('정리할 URL 목록:', objectUrls.current);
      // 수정 모드가 false가 되면
      // 생성된 모든 URL 객체 정리
      objectUrls.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      objectUrls.current = [];
      console.log('Cleanup 완료 - objectUrls 비워짐:', objectUrls.current);
    }
  }, [isEdit]); // isEdit으로 상태 변화 감지

  // 이미지 추가 로직
  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !formData) return; // files 또는 formData가 없으면 종료

    console.log('이미지 추가 시작 - 현재 URL 목록:', objectUrls.current);

    // 이미지 최대 개수 제한
    if (currentImage.length + files.length > 10) {
      alert('이미지는 최대 10개까지 추가할 수 있습니다.');
      return;
    }

    // 파일 유효성 검사 및 유효한 파일 배열 생성
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // 파일 크기 제한
      if (file.size > 1 * 1024 * 1024) {
        alert('이미지 크기는 1MB를 초과할 수 없습니다.');
        continue;
      }
      validFiles.push(file);
      console.log('유효한 파일 추가:', file.name);
    }
    if (validFiles.length === 0) return; // 유효한 파일이 없으면 종료

    setFormData({
      ...formData,
      newImageUrl: [...(formData.newImageUrl || []), ...validFiles],
    });

    // 이전에 생성된 URL 객체들 정리 (메모리 누수 방지)
    objectUrls.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    // 미리보기 URL 생성
    const newImageUrls = validFiles.map((file) => {
      const url = URL.createObjectURL(file);
      objectUrls.current.push(url); // 생성된 URL을 ref에 저장
      console.log('새로운 URL 생성:', url);
      return url;
    });

    console.log('URL 생성 후 objectUrls:', objectUrls.current);
    // 현재 이미지 배열에 새로운 미리보기 URL 추가
    setCurrentImage([...currentImage, ...newImageUrls]);

    // 파일 input 초기화 (동일한 파일 재선택 가능하도록 하기 위함)
    e.target.value = '';
  };

  const handleImageDelete = (deleteUrl: string) => {
    // formData가 없으면 종료
    if (!formData) return;

    console.log('이미지 삭제 시작 - 삭제할 이미지 :', deleteUrl);
    // 1. 현재 이미지 목록(미리보기)에서 삭제할 이미지 제거
    // filter를 사용해서 삭제할 이미지를 제외한 새 배열 생성
    setCurrentImage(currentImage.filter((img) => img !== deleteUrl));

    // 2. 새로 추가된 이미지인 경우 처리
    // objectUrls.current에 URL이 있다면 새로 추가된 이미지
    if (objectUrls.current.includes(deleteUrl)) {
      // 메모리 누구 방지를 위해 URL객체 제거
      URL.revokeObjectURL(deleteUrl);
      objectUrls.current = objectUrls.current.filter(
        (url) => url !== deleteUrl
        // objectUrls 배열에서 해당 URL 제거
      );

      // 3. formData에 있는 newImageUrl에서도 파일 제거
      const fileIndex = currentImage.indexOf(deleteUrl);
      if (formData.newImageUrl && fileIndex !== -1) {
        const updatedFiles = [...formData.newImageUrl]; // 기조 배열 복사해 불변성 유지
        updatedFiles.splice(fileIndex, 1); // fileIndex 위치의 파일 제거
        setFormData({
          ...formData,
          newImageUrl: updatedFiles.length > 0 ? updatedFiles : null,
          // formData 업데이트
          // 파일이 남아있으면 updateFiles를, 없으면 Null을 넣어줌
        });
      }
    }
    // 4. 기존 이미지인 경우
    else {
      setFormData({
        ...formData,
        deleteImageUrl: [...(formData.deleteImageUrl || []), deleteUrl],
        // deleteImageUrl 배열에 삭제할 URL 추가
        // 기존 배열이 없으면 빈 배열을 생성하여 추가
      });
    }
    console.log('이미지 삭제 완료');
  };

  // 취소 버튼 클릭 시
  const handleCancelClick = () => {
    console.log('취소 버튼 클릭 - Cleanup 시작');
    console.log('정리할 URL 목록:', objectUrls.current);

    objectUrls.current.forEach((url) => {
      console.log('URL revoke:', url);
      URL.revokeObjectURL(url);
    });
    objectUrls.current = [];

    console.log('Cleanup 완료 - objectUrls 비워짐:', objectUrls.current);
    if (originalData) {
      setFormData(originalData);
      setCurrentImage(originalImage);
    }
    setIsEdit(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('수정 완료');
    if (formData && isEdit) {
      const formDataSubmit = new FormData();
      formDataSubmit.append('title', formData.title);
      formDataSubmit.append('location', formData.location);
      formDataSubmit.append('category', formData.category);
      formDataSubmit.append('description', formData.description);
      formDataSubmit.append('period', formData.period.toString()); // string으로 변환되서 넘겨야됨

      // 삭제할 이미지가 있는 경우에만 전송
      if (formData.deleteImageUrl && formData.deleteImageUrl.length > 0) {
        formData.deleteImageUrl.forEach((url) => {
          formDataSubmit.append('deleteImageUrl', url);
        });
      }

      // 새로 추가할 이미지가 있는 경우에만 전송
      if (formData.newImageUrl && formData.newImageUrl.length > 0) {
        formData.newImageUrl.forEach((file) => {
          formDataSubmit.append('newImageUrl', file);
        });
      }
      try {
        // mutation 실행
        await mutation.mutateAsync(formDataSubmit);
      } catch (error) {
        console.error('Update failed:', error);
      }
    }
  };

  return (
    <form
      className="flex flex-col max-w-2xl mx-auto p-6 gap-10"
      onSubmit={handleSubmit}
    >
      {/* 상단 버튼 영역 */}
      <div className="flex items-center justify-end gap-3">
        {isEdit && (
          <>
            <Label className="font-bold text-lg bg-baseColor hover:bg-baseColor/90 px-3 py-1 rounded-md text-white cursor-pointer transition-colors">
              <Input
                type="file"
                accept=".jpeg, .png"
                multiple
                className="hidden"
                onChange={handleImageAdd}
              />
              이미지 추가
            </Label>
            <ButtonProps
              size="sm"
              variant="custom"
              title="취소"
              type="button"
              onClick={handleCancelClick}
            />
          </>
        )}
        {!isEdit && (
          <ButtonProps
            size="sm"
            variant="custom"
            title="수정"
            type="button"
            onClick={handleEditClick}
          />
        )}
      </div>

      {/* 이미지 슬라이더 */}
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

      {/* 폼 필드 영역 */}
      <div className="space-y-6">
        {/* 제목 */}
        <ProfileDetailItem
          value={formData?.title || ''}
          disabled={!isEdit}
          name="title"
          onChange={handleInputChange}
        />

        {/* 위치 */}
        <div className="flex items-center gap-4">
          <img src={MapIcon} alt="map" className="w-5 h-5" />
          <div className="flex-1">
            <ProfileDetailItem
              value={formData?.location || ''}
              disabled={true}
              name="location"
              onChange={handleInputChange}
            />
          </div>
          {isEdit && (
            <ButtonProps
              size="sm"
              variant="custom"
              title="주소 검색"
              onClick={handleClick}
            />
          )}
        </div>

        {/* 카테고리, 대여기간 */}
        <div className="grid grid-cols-2 gap-6">
          <ProfileDetailItem
            label="카테고리"
            value={formData?.category || ''}
            disabled={!isEdit}
            name="category"
            onChange={handleInputChange}
          />
          <ProfileDetailItem
            label="대여기간"
            value={formData?.period?.toString() || ''}
            disabled={!isEdit}
            name="period"
            onChange={handleInputChange}
          />
        </div>

        {/* 요청사항 */}
        <div className="space-y-1">
          <h2 className="font-semibold text-gray-700 text-sm">요청사항</h2>
          <Textarea
            value={formData?.description || ''}
            name="description"
            className={`w-full min-h-[100px] rounded-md font-medium text-base p-3 ${
              !isEdit
                ? 'bg-gray-50 text-gray-700'
                : 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-baseColor'
            } transition-colors`}
            disabled={!isEdit}
            onChange={handleTextareaChange}
            placeholder="요청사항을 입력하세요"
          />
        </div>
      </div>

      {/* 저장 버튼 */}
      {isEdit && (
        <ButtonProps
          size="full"
          variant="custom"
          title="저장하기"
          type="submit"
        />
      )}
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <div className="fixed inset-0 m-0 bg-black/50 backdrop-blur-sm z-50" />
          {/* 모달 컨텐츠 */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg relative max-w-md w-full">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
              <DaumPostcodeEmbed onComplete={handleAddress} />
            </div>
          </div>
        </>
      )}
    </form>
  );
}
export default HostEditForm;

function ProfileDetailItem({
  label,
  value,
  disabled,
  onChange,
  name,
}: {
  label?: string;
  value: string | undefined;
  disabled: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <h2 className="font-semibold text-gray-700 text-sm">{label}</h2>
      )}
      <div className="flex items-center gap-2">
        <Input
          value={value}
          name={name}
          className={`font-medium text-base rounded-md ${
            disabled
              ? 'bg-gray-50 text-gray-700'
              : 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-baseColor'
          } transition-colors`}
          disabled={disabled}
          onChange={onChange}
          type={name === 'period' ? 'number' : 'text'}
          min={name === 'period' ? 0 : undefined}
          max={name === 'period' ? 100 : undefined}
        />
        {name === 'period' && (
          <span className="font-medium text-gray-600">일</span>
        )}
      </div>
    </div>
  );
}
