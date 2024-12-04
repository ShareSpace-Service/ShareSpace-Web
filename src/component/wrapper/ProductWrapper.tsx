import HostProduct from '@/host/pages/HostProduct';
import Layout from '@/layout/Layout';
import Product from '@/pages/Product';
import { useRoleStore } from '@/store/Role';

function ProductWrapper() {
  const { role } = useRoleStore();

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
