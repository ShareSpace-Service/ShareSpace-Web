import { fetchProfile } from '@/api/UserProfile';
import HostProduct from '@/host/pages/HostProduct';
import Layout from '@/layout/Layout';
import Product from '@/pages/Product';
import { useRoleStore } from '@/store/Role';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// 해결해야 될 문제
// 1. ProductWrapper에서 Role에 따라 Product 또는 HostProduct를 렌더링해야 한다.
// 2. Product와 HostProduct는 Role만 다르고 호출하는 API와 렌더링하는 방식이 같다.
// 3. 그럼 반복되는 Product와 HostProduct를 어떻게 코드 작성을 해야할까?
// 4. 그렇다고 HOST와 GUEST를 한 번에 관리하는게 옳은 방식일까?

// 고민
// 반복되는 코드를 줄여서 HOST와 GUEST를 한번에 관리하는 방법이 옳다.
// 코드가 중복되더라도 HOST와 GUEST를 따로 관리하는 것이 더 좋다.

// 각각의 장단점
// 반복되는 코드를 줄여서 관리하는 방법
// 장점
// 1. 코드 중복을 줄일 수 있다.
// 2. 데이터를 한 번에 관리할 수 있다.
// 단점
// 1. 어떤 데이터가 어떤 컴포넌트에서 사용되는지 파악하기 어렵다.
// 2. 코드가 복잡해진다.
// 3. props-drilling이 발생할 수 있다.

// HOST와 GUEST를 따로 관리하는 방법
// 장점
// 1. 코드는 복잡하더라도 각각의 역할을 명확하게 파악할 수 있다.
// 2. 데이터를 따로 관리하기 때문에 데이터의 흐름을 파악하기 쉽다.
// 단점
// 1. 코드 중복이 발생할 수 있다.
// 2. API 호출이 중복될 수 있다.

// 해결 방법
// 따로 관리하는게 맞다.
// 왜냐하면 HOST와 GUEST의 역할도 다르고 모달이 등장했을 때 다른 컴포넌트를 렌더링해야 하기 때문이다.
// 그리고 모달에서 상호작용하는 API가 다르기 떄문에 한번에 관리하면 데이터가 꼬일 수 있다.

function ProductWrapper() {
  const { role, setRole } = useRoleStore();

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  useEffect(() => {
    if (data && data.data.role) {
      // data.data.role가 존재하면
      setRole(data.data.role); // role을 설정
    }
  }, [data]); // data가 변경될 때마다 실행

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
