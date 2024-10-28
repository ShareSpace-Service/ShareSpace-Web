import { fetchUserAddress } from '@/api/UserProfile';
import { useQuery } from '@tanstack/react-query';

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
    <div className="w-full py-5">
      <h2 className="font-bold text-base">{data?.data}</h2>
    </div>
  );
}

export default Address;
