import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ButtonProps from '../ui/ButtonProps';
import SelectProps from '../ui/SelectProps';
import { useState } from 'react';
import ImageUpload from './ImageUpload';
import GuestPlaceChoice from '@/modal/GuestPlaceChoice';
import { useMutation } from '@tanstack/react-query';

interface RegisterResponse {
  message: string;
  status: string;
  data: {
    productId: number;
  };
  success: boolean;
}

export function FormGroup({
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

  // 제품 등록 API 호출 함수
  const registProduct = async (
    formData: FormData
  ): Promise<RegisterResponse> => {
    const response = await fetch('http://localhost:8080/product/register', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const responseData = await response.json(); // JSON 형태로 응답 데이터 가져오기
    return responseData as RegisterResponse; // RegisterResponse 타입으로 반환
  };

  const mutation = useMutation<RegisterResponse, Error, FormData>({
    mutationFn: (formData: FormData) => registProduct(formData),
    onSuccess: (data) => {
      // 요청 성공 시
      const newProductId = data.data.productId; // 새로 등록된 제품 ID 가져오기
      if (newProductId) {
        setProductId(newProductId); // 제품 ID 상태 업데이트
        alert('상품이 등록되었습니다.');
        setIsOpen(true);
      } else {
        console.error('productId response 실패', data);
        alert('상품 등록에 실패했습니다.');
      }
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('상품 등록에 실패했습니다.');
    },
  });

  // 폼 제출
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 폼 제출 방지

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
    mutation.mutate(formData); // mutate 호출로 제품 등록 요청
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
        <GuestPlaceChoice title={title} productId={productId} />
      )}
    </div>
  );
}

export default GuestRegistForm;
