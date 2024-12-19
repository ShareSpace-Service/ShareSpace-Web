import { useHostMatching } from '@/action/get-hostProduct';
import { fetchFilterMatchingProducts } from '@/api/Matching';
import HostStatusList from '@/component/HostStatusList';
import HostProductMenu from '@/component/ui/HostProductMenu';
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from '@/component/ui/state/StateComponent';
import { useProductStore } from '@/store/ProductState';
import { useRoleStore } from '@/store/Role';
import { useEffect } from 'react';

function HostProduct() {
  const selectedMenu = useProductStore((state) => state.selectedMenu);
  const setSelectedMenu = useProductStore((state) => state.setSelectedMenu);
  const setFilteredData = useProductStore((state) => state.setFilteredData);
  const setRole = useRoleStore((state) => state.setRole);

  const { data: allData, isLoading, error } = useHostMatching();

  const handleFilter = async (status: string) => {
    try {
      if (selectedMenu === '전체') {
        setFilteredData(allData?.products || []);
      } else {
        const filtered = await fetchFilterMatchingProducts(status);
        setFilteredData(filtered);
      }
    } catch (error) {
      console.error('필터링 중 에러 발생:', error);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    if (allData) {
      setRole(allData.role);
      handleFilter(selectedMenu);
    }
  }, [selectedMenu, allData, setRole]);

  if (isLoading) {
    return <LoadingState />;
  }
  if (error) {
    return <ErrorState error={error} />;
  }
  if (!allData) {
    return <EmptyState />;
  }

  return (
    <>
      <HostProductMenu
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <div className="pt-4 px-4">
        <HostStatusList />
      </div>
    </>
  );
}

export default HostProduct;
