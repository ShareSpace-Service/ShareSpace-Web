import { useEffect } from 'react';
import { Place, ApiResponse } from '@/interface/Place';

async function getPlaceList(productId: number): Promise<Place[] | null> {
  try {
    const response = await fetch(
      `http://localhost:8080/place/searchByProduct?productId=${productId}`
    );
    if (!response.ok) {
      throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
    }

    const result: ApiResponse = await response.json();
    console.log(result, 'result');
    if (result.success && result.data) {
      return result.data;
    } else {
      console.error('API 요청 실패', result);
      return null;
    }
  } catch (error) {
    console.log('error fetch', error);
    return null;
  }
}

function PlaceList({ productId }: { productId: number }) {
  console.log(productId);
  // productId는 URL 파라미터로 전달받은 값
  // 이 값은 GusetPlace 컴포넌트에서 useParams를 사용

  useEffect(() => {
    console.log('API 요청');
    getPlaceList(productId)
      .then((places) => {
        if (places) {
          console.log('fetched places', places);
        } else {
          console.log('API 요청 실패');
        }
      })
      .catch((error) => {
        console.log('error Fetching Places:', error);
      });
  }, [productId]);
  return <div>PlaceList</div>;
}

export default PlaceList;
