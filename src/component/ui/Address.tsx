import { fetchUserAddress } from '@/api/UserProfile';
import { useQuery } from '@tanstack/react-query';
import { MapPinIcon } from 'lucide-react';

export interface AddressResponse {
  message: string;
  status: string;
  data: string;
  success: boolean;
}

function Address() {
  const { data } = useQuery<AddressResponse>({
    queryKey: ['address'],
    queryFn: fetchUserAddress,
    staleTime: 1000 * 60 * 60, // 1시간 동안은 유지
    gcTime: 1000 * 60 * 60 * 24, // 24시간이 지나면 가비지 컬렉션 전까지 캐시 유지
  });
  console.log('data', data);
  return (
    <div className="w-full py-5 bg-white p-4 rounded-lg shadow-md flex items-center">
      {/* 박스 스타일 추가 */}
      <MapPinIcon className="mr-2 text-green-600" />
      <h2 className="font-bold text-base">{data?.data}</h2>
    </div>
  );
}

export default Address;
