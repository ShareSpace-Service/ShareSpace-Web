import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ButtonProps from '../ui/ButtonProps';
import SelectProps from '../ui/SelectProps';
import { useState } from 'react';
import ImageUpload from './ImageUpload';
import GuestPlaceChoice from '@/modal/GuestPlaceChoice';

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
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number | null>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  // 이미지 추가 처리
  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = event.target.files;

    console.log('FileList:', imageLists); // FileList 로그 출력

    // 이미지 목록이 존재할 때
    if (imageLists) {
      let imagesUrlLists: string[] = [...showImages]; // 기존 이미지 URL 복사
      let fileList: File[] = [...files]; // 기존 파일 목록 복사

      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]); // URL 생성
        imagesUrlLists.push(currentImageUrl); // URL 추가
        fileList.push(imageLists[i]); // 파일 추가
      }

      // 최대 5개의 이미지로 제한
      if (imagesUrlLists.length > 5) {
        imagesUrlLists = imagesUrlLists.slice(0, 5);
        fileList = fileList.slice(0, 5);
      }

      // 이미지 사이즈 1MB 제한
      if (imageLists) {
        const maxSize = 1 * 1024 * 1024; // 1MB
        for (let i = 0; i < imageLists.length; i++) {
          if (imageLists[i].size > maxSize) {
            alert('파일 사이즈가 너무 큽니다.');
            return;
          }
        }
      }

      // 상태 업데이트
      setShowImages(imagesUrlLists); // 이미지 URL 상태 업데이트
      setFiles(fileList); // 파일 목록 상태 업데이트
      console.log(imagesUrlLists); // 전체 이미지 URL 로그 출력
    }
  };

  // 이미지 삭제 처리
  const handleDeleteImage = (id: number) => {
    setShowImages(
      (prevImages) => prevImages.filter((_, index) => index !== id) // 삭제된 이미지 제외
    );
  };

  // 폼 제출
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !category || !period || !description) {
      alert('항목을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('period', period);
    formData.append('description', description);
    files.forEach(
      (file) => formData.append('imageUrl', file) // 이미지 파일 추가
    );

    for (const [key, value] of formData.entries()) {
      // formData.entries()는 [key, value] 배열을 반환
      console.log(key, value);
    }
    console.log('formData:', formData);

    try {
      const response = await fetch('http://localhost:8080/product/register', {
        method: 'POST',
        body: formData,
        // header 생략한 이유는 fetch API가 자동으로 multipart/form-data로 설정하기 때문
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);

      const productId = responseData.data.productId;

      if (productId) {
        console.log('id', productId);
        setProductId(productId);
        alert('상품이 등록되었습니다.');
        setIsOpen(true);
      } else {
        console.error('productId response 실패', responseData);
        alert('상품 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('상품 등록에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <form className="space-y-6 h-full" onSubmit={handleSubmit}>
        {/* 파일 선택 */}
        <ImageUpload
          handleAddImages={handleAddImages}
          showImages={showImages}
          handleDeleteImage={handleDeleteImage}
        />

        {/* 제목 */}
        <FormGroup label="제목" htmlFor="title">
          <Input
            type="text"
            id="title"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        {/* 카테고리 */}
        <FormGroup label="카테고리" htmlFor="category">
          <SelectProps value={category} onChange={setCategory} />
        </FormGroup>

        {/* 대여기간 */}
        <FormGroup label="대여기간" htmlFor="rental-period">
          <Input
            type="number"
            id="rental-period"
            placeholder="대여기간을 입력해주세요"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
        </FormGroup>

        {/* 요청사항 */}
        <FormGroup label="요청사항" htmlFor="request">
          <Textarea
            id="request"
            placeholder="요청사항을 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        {/* onSubmit */}
        <div className="mt-6 pt-4">
          <ButtonProps size="full" variant="custom" title="등록하기" />
        </div>
      </form>
      {isOpen && productId !== null && (
        <GuestPlaceChoice
          closeModal={closeModal}
          title={title}
          productId={productId}
        />
      )}
    </div>
  );
}

export default GuestRegistForm;
