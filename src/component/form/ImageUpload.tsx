import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ImageUploaderProps {
  handleAddImages: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showImages: string[];
  handleDeleteImage: (id: number) => void;
}

function ImageUpload({
  handleAddImages,
  showImages,
  handleDeleteImage,
}: ImageUploaderProps) {
  return (
    <div className="h-42 pt-3">
      <Label
        htmlFor="input-file"
        className="font-bold text-base bg-baseColor p-3 rounded-lg text-white"
      >
        파일 선택
      </Label>
      <Input
        type="file"
        id="input-file"
        accept=".jpeg, .png"
        multiple
        onChange={handleAddImages}
        className="hidden"
      />
      {showImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4 pt-4">
          {showImages.map((preview, id) => (
            <div
              key={id}
              className="relative w-full h-28 bg-gray-300 rounded-lg overflow-hidden"
            >
              <img
                src={preview}
                alt="preview"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ aspectRatio: '4 / 3' }}
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                onClick={() => handleDeleteImage(id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
