import { fetchProfile } from '@/api/UserProfile';
import HostProduct from '@/host/pages/HostProduct';
import Layout from '@/layout/Layout';
import Product from '@/pages/Product';
import { useRoleStore } from '@/store/Role';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function ProductWrapper() {
  const { role, setRole } = useRoleStore();

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  useEffect(() => {
    if (data && data.data.role) {
      // data.data.role가 존재하면
      setRole(data.data.role.toUpperCase()); // role을 설정
    }
  }, [data, setRole]); // data가 변경될 때마다 실행

  if (role === null) {
    // role이 null이면
    return <div>Loading...</div>; // 로딩 중을 표시
  }

  return (
    <Layout noPadding={true}>
      {role === 'GUEST' ? <Product /> : <HostProduct />}
    </Layout>
  );
}

export default ProductWrapper;
