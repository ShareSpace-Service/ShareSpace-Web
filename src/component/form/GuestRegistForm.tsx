import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ButtonProps from '../ui/ButtonProps';
import SelectProps from '../ui/SelectProps';
import { useState } from 'react';
import ImageUpload from './ImageUpload';

function FormGroup({
  children,
  label,
  htmlFor,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={htmlFor} className="text-start font-bold text-base">
        {label}
      </Label>
      {children}
    </div>
  );
}

function GuestRegistForm() {
  const [showImages, setShowImages] = useState<string[]>([]); // 이미지 URL 상태

  // 이미지 추가 처리
  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = event.target.files;

    console.log('FileList:', imageLists); // FileList 로그 출력

    // 이미지 목록이 존재할 때
    if (imageLists) {
      let imagesUrlLists: string[] = [...showImages]; // 기존 이미지 URL 복사

      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]); // URL 생성
        imagesUrlLists.push(currentImageUrl); // URL 추가
      }

      // 최대 10개의 이미지로 제한
      if (imagesUrlLists.length > 10) {
        imagesUrlLists = imagesUrlLists.slice(0, 10);
      }

      // 상태 업데이트
      setShowImages(imagesUrlLists); // 이미지 URL 상태 업데이트
      console.log(imagesUrlLists); // 전체 이미지 URL 로그 출력
    }
  };

  // 이미지 삭제 처리
  const handleDeleteImage = (id: number) => {
    setShowImages(
      (prevImages) => prevImages.filter((_, index) => index !== id) // 삭제된 이미지 제외
    );
  };

  return (
    <div className="flex flex-col h-full">
      <form className="space-y-6 h-full">
        {/* 파일 선택 */}
        <ImageUpload
          handleAddImages={handleAddImages}
          showImages={showImages}
          handleDeleteImage={handleDeleteImage}
        />

        {/* 제목 */}
        <FormGroup label="제목" htmlFor="title">
          <Input type="text" id="title" placeholder="제목" />
        </FormGroup>

        {/* 카테고리 */}
        <FormGroup label="카테고리" htmlFor="category">
          <SelectProps />
        </FormGroup>

        {/* 대여기간 */}
        <FormGroup label="대여기간" htmlFor="rental-period">
          <Input
            type="number"
            id="rental-period"
            placeholder="대여기간을 입력해주세요"
          />
        </FormGroup>

        {/* 요청사항 */}
        <FormGroup label="요청사항" htmlFor="request">
          <Textarea id="request" placeholder="요청사항을 입력해주세요" />
        </FormGroup>

        {/* onSubmit */}
        <div className="mt-6 pt-4">
          <ButtonProps size="full" variant="custom" title="등록하기" />
        </div>
      </form>
    </div>
  );
}

export default GuestRegistForm;
