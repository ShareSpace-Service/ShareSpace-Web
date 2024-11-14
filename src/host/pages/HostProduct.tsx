import {
  fetchFilterMatchingProducts,
  fetchMatchingProducts,
} from '@/api/Matching';
import HostStatusList from '@/component/HostStatusList';
import HostProductMenu from '@/component/ui/HostProductMenu';
import { Matching } from '@/interface/MatchingInterface';
import { useProductStore } from '@/store/ProductState';
import { useRoleStore } from '@/store/Role';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function HostProduct() {
  const { selectedMenu, filteredData, setFilteredData } = useProductStore();
  const { setRole } = useRoleStore();

  const {
    data: allData,
    isLoading,
    error,
  } = useQuery<Matching, Error>({
    queryKey: ['matching'],
    queryFn: fetchMatchingProducts,
  });

  const handleFilter = async (status: string) => {
    if (selectedMenu === '전체') {
      setFilteredData(allData?.products || []);
    } else {
      const filtered = await fetchFilterMatchingProducts(status);
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    if (allData) {
      setRole(allData.role);
      handleFilter(selectedMenu);
    }
  }, [selectedMenu, allData]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <>
      <HostProductMenu noPadding={true} />
      <div className="pt-4 px-4">
        {filteredData && filteredData.length > 0 ? (
          <HostStatusList />
        ) : (
          <div className="text-center font-bold text-lg mt-4">
            해당 물품이 없습니다.
          </div>
        )}
      </div>
    </>
  );
}

export default HostProduct;
