import { fetchMatchingProducts } from '@/api/Matching';
import ProductStatusList from '@/component/ProductStatusList';

import ProductMenu from '@/component/ui/ProductMenu';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface ApiResponse {
  message: string;
  status: string;
  data: MatchingData[];
  success: boolean;
}

export interface MatchingData {
  matchingId: number | null;
  title: string;
  category: string;
  imageUrl: string[];
  status: string;
  distance: number | null;
}
async function getMatchingProduct() {
  const data = await fetchMatchingProducts();
  // if (!response.ok) {
  //   throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
  // }
  // const result: ApiResponse = await response.json();
  // console.log('result', result);
  return data;
}

function Product() {
  const { data, isLoading, error } = useQuery<MatchingData[], Error>({
    queryKey: ['matching'],
    queryFn: getMatchingProduct,
    staleTime: 1000 * 60 * 5,
  });

  const [selectedMenu, setSelectedMenu] = useState<string>('전체');

  const filteredData =
    selectedMenu === '전체'
      ? data
      : data?.filter((item) => item.status === selectedMenu);

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때의 UI
  }

  // 에러 처리
  if (error) {
    return <div>에러 발생: {error.message}</div>; // 에러 발생 시 UI
  }

  return (
    <>
      <ProductMenu
        noPadding={true}
        selectedStatus={selectedMenu}
        setSelectStatus={setSelectedMenu}
      />
      <div className="px-4">
        {filteredData && filteredData.length > 0 ? (
          <ProductStatusList filteredData={filteredData} />
        ) : (
          <div className="text-center font-bold text-lg mt-4">
            해당 물품이 없습니다.
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
