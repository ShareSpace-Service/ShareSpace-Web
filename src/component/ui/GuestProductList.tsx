import { ApiResponse, Place } from '@/interface/Place';
import { useQuery } from '@tanstack/react-query';

export const DummyData: Place[] = [
  {
    placeId: 1,
    title: '민우의 침실',
    category: 'LARGE',
    imageUrl: 'https://via.placeholder.com/100',
    distance: 13499,
  },
  {
    placeId: 2,
    title: '민우의 화장실',
    category: 'SMALL',
    imageUrl: 'https://via.placeholder.com/100',
    distance: 45449,
  },
  {
    placeId: 3,
    title: '민우의 부엌',
    category: 'LARGE',
    imageUrl: 'https://via.placeholder.com/100',
    distance: 31232,
  },
  {
    placeId: 4,
    title: '민우의 거실',
    category: 'MEDIUM',
    imageUrl: 'https://via.placeholder.com/100',
    distance: 12312,
  },
  {
    placeId: 5,
    title: '민우의 창고',
    category: 'SMALL',
    imageUrl: 'https://via.placeholder.com/100',
    distance: 12312,
  },
  {
    placeId: 6,
    title: '민우의 TV',
    category: 'MEDIUM',
    imageUrl: 'https://via.placeholder.com/100',
    distance: 12312,
  },
];

// API 요청 추후에 API 디렉토리로 이동 예정
const fetchProductList = async () => {
  const response = await fetch('http://localhost:8080/place');
  if (!response.ok) {
    throw new Error('서버 상태가 그냥 미누그앗!');
  }
  const result: ApiResponse = await response.json();
  return result.data;
};

function GuestProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['places'],
    queryFn: fetchProductList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {data?.map((place) => (
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

export default GuestProductList;
