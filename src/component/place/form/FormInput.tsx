import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEditHandler, useFormHandler } from '@/hooks/place/usePlaceForm';
import ButtonProps from '@/component/ui/ButtonProps';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SelectProps from '@/component/ui/SelectProps';

function FormInput() {
  const { formData, handleInputChange, handleTextareaChange } =
    useFormHandler();
  const { isEdit, handleClick } = useEditHandler();

  const disabledStyle = !isEdit ? 'bg-gray-100' : 'bg-white';

  const formSections = [
    {
      id: 'basic',
      title: '기본 정보',
      description: '장소의 기본적인 정보를 수정해주세요',
      content: (
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">제목</label>
            <Input
              value={formData?.title || ''}
              name="title"
              disabled={!isEdit}
              onChange={handleInputChange}
              placeholder="장소 이름을 입력해주세요"
              className={`text-lg p-3 ${disabledStyle}`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">위치</label>
            <div className="flex items-center gap-3">
              <Input
                value={formData?.location || ''}
                name="location"
                disabled={true}
                onChange={handleInputChange}
                placeholder="주소를 검색해주세요"
                className={`flex-1 ${disabledStyle}`}
              />
              {isEdit && (
                <ButtonProps
                  size="sm"
                  variant="custom"
                  title="주소 검색"
                  onClick={handleClick}
                  className="shrink-0"
                />
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'detail',
      title: '상세 정보',
      description: '카테고리와 대여 기간을 수정해주세요',
      content: (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              카테고리
            </label>
            <SelectProps
              value={formData?.category || ''}
              onChange={handleInputChange}
              disabled={!isEdit}
              className={disabledStyle}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              대여기간
            </label>
            <div className="relative">
              <Input
                value={formData?.period?.toString() || ''}
                name="period"
                type="number"
                min={0}
                max={100}
                disabled={!isEdit}
                onChange={handleInputChange}
                placeholder="대여 기간을 입력해주세요"
                className={disabledStyle}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                일
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'request',
      title: '요청사항',
      description: '추가적인 요청사항이 있다면 수정해주세요',
      content: (
        <div className="space-y-4">
          <Textarea
            value={formData?.description || ''}
            name="description"
            className={`w-full min-h-[120px] p-4 resize-none rounded-lg border-2 ${disabledStyle}`}
            disabled={!isEdit}
            onChange={handleTextareaChange}
            maxLength={100}
            placeholder="요청사항을 입력해주세요 (최대 100자)"
          />
          <div className="text-right text-sm text-gray-500">
            {formData?.description?.length || 0}/100
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {formSections.map((section) => (
        <Card
          key={section.id}
          className="bg-white border-2 border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
        >
          <CardHeader className="border-b bg-gray-50/70 pb-4">
            <CardTitle className="text-xl font-bold text-gray-800">
              {section.title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {section.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">{section.content}</CardContent>
        </Card>
      ))}
    </div>
  );
}

export default FormInput;
