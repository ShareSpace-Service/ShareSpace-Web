import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DaumPostcode from 'react-daum-postcode';

/**
 * DaumPost 컴포넌트에 대한 props
 */
interface DaumPostProps {
  /** DaumPostcode 모달이 열려 있는지 여부 */
  isOpen: boolean;
  /** 모달의 열림/닫힘 상태를 업데이트하는 함수 */
  setIsOpen: (isOpen: boolean) => void;
  /** 우편번호 */
  zoneCode: string;
  /** 우편번호를 업데이트하는 함수 */
  setZoneCode: (zoneCode: string) => void;
  /** 주소 */
  address: string;
  /** 주소를 업데이트하는 함수 */
  setAddress: (address: string) => void;
}

/**
 * DaumPostcode API에서 반환된 주소 데이터
 */
interface AddressData {
  /** 우편번호 */
  zonecode: string;
  /** 주소 */
  address: string;
}

/**
 * DaumPostcode 모달을 닫을 때의 상태 타입
 */
type CloseState = 'FORCE_CLOSE' | 'COMPLETE_CLOSE';

/**
 * DaumPost 컴포넌트
 * @param isOpen DaumPostcode 모달이 열려 있는지 여부
 * @param setIsOpen 모달의 열림/닫힘 상태를 업데이트하는 함수
 * @param zoneCode 우편번호 값
 * @param setZoneCode 우편번호 값을 업데이트하는 함수
 * @param address 주소 값
 * @param setAddress 주소 값을 업데이트하는 함수
 */

function DaumPost({
  isOpen,
  setIsOpen,
  zoneCode,
  setZoneCode,
  address,
  setAddress,
}: DaumPostProps) {
  /**
   * '검색' 버튼 클릭 시 모달을 열기 위한 함수
   * @param e 버튼 클릭 이벤트
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  /**
   * DaumPostcode API에서 주소 선택 후 실행되는 함수
   * @param data 선택된 주소 데이터
   */
  const completeHandler = (data: AddressData) => {
    const { zonecode, address } = data;
    setZoneCode(zonecode);
    setAddress(address);
  };

  /**
   * DaumPostcode 모달이 닫힐 때 실행되는 함수
   * @param state 모달 닫힘 상태
   */
  const closeHandler = (state: CloseState) => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  return (
    <div className="grid w-full max-w-lg items-center gap-2">
      <Label htmlFor="zoneCode" className="text-start font-bold text-base">
        Address
      </Label>
      <div className="flex items-center justify-between">
        <Input
          type="text"
          id="zoneCode"
          placeholder="zoneCode"
          className="max-w-sm"
          value={zoneCode}
          readOnly
        />
        <Button
          size="lg"
          variant="color"
          onClick={handleClick}
          className="h-14"
        >
          검색
        </Button>
      </div>
      <Input
        type="text"
        id="address"
        placeholder="Address"
        value={address}
        readOnly
      />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <DaumPostcode onComplete={completeHandler} onClose={closeHandler} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DaumPost;
