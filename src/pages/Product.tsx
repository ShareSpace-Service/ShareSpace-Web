import {
  fetchFilterMatchingProducts,
  fetchMatchingProducts,
} from '@/api/Matching';
import ProductStatusList from '@/component/ProductStatusList';
import ProductMenu from '@/component/ui/ProductMenu';
import { Matching, MatchingData } from '@/interface/MatchingInterface';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function Product() {
  const [selectedMenu, setSelectedMenu] = useState<string>('전체');
  const [filteredData, setFilteredData] = useState<MatchingData[]>([]);
  const [role, setRole] = useState<string | null>(null); // 역할 상태

  const {
    data: allData,
    isLoading,
    error,
  } = useQuery<Matching, Error>({
    queryKey: ['matching'],
    queryFn: fetchMatchingProducts,
    staleTime: 1000 * 60 * 5,
  });

  const handleFilter = async (status: string) => {
    if (selectedMenu === '전체') {
      setFilteredData(allData?.products || []); // 전체 데이터를 그대로 사용하고
    } else {
      const filtered = await fetchFilterMatchingProducts(status); // 필터링된 데이터를 가져옴.
      setFilteredData(filtered); // 필터링된 데이터를 사용합니다.
    }
  };

  // 전체 데이터가 변경되면 필터링을 다시 수행합니다.
  useEffect(() => {
    if (allData) {
      setRole(allData.role);
      handleFilter(selectedMenu);
    }
  }, [selectedMenu, allData]);

  // 로딩 상태 처리
  if (isLoading) {
    console.log('Loading state active'); // 로딩 중일 때의 UI
    return <div>로딩 중...</div>; // 로딩 중일 때의 UI
  }

  // 에러 처리
  if (error) {
    console.log('Error state active:', error);
    return <div>에러 발생: {error.message}</div>; // 에러 발생 시 UI
  }

  return (
    <>
      <ProductMenu
        noPadding={true}
        selectedStatus={selectedMenu}
        setSelectStatus={setSelectedMenu}
        userRole={role}
      />
      <div className="pt-4 px-4">
        {filteredData && filteredData.length > 0 ? (
          <ProductStatusList filteredData={filteredData} userRole={role} />
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
