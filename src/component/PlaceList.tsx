import { useEffect } from 'react';
import { Place, ApiResponse } from '@/interface/Place';
import { DummyData } from './ui/GuestProductList';

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

  return (
    <div className="flex flex-col items-center gap-4">
      {DummyData.map((place) => (
        <div
          key={place.placeId}
          className="flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[180px] cursor-pointer"
        >
          {/* 상단 이미지 및 Title, description */}
          <div className="flex items-start m-4 gap-3 pb-5 border-b border-solid border-gray-200">
            <img
              src={place.imageUrl}
              className="w-[100px] h-[100px] object-contain rounded-lg"
            />
            <div className="flex flex-col w-60 gap-3">
              <h2 className="font-extrabold text-2xl">{place.title}</h2>
              <p className="text-gray-400 font-bold">{place.category}</p>
            </div>
          </div>
          {/* 하단 거리 */}
          <div className="flex flex-col items-start pl-4 h-full">
            <p className="text-black font-bold">{place.distance}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaceList;
