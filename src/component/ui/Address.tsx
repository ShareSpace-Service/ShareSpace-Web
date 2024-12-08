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
