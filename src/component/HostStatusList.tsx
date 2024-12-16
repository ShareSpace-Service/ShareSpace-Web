import { MatchingData } from '@/interface/MatchingInterface';
import { useMatchingIdStore } from '@/store/MatchingId';
import { useProductStore } from '@/store/ProductState';
import { useStatusStore } from '@/store/ProductStatus';
import { useRoleStore } from '@/store/Role';
import { hostMenuTitle } from './ui/HostProductMenu';
import ButtonProps from './ui/ButtonProps';
import HostModalRender from '@/modal/HostModalRender';
import { formatDistance } from '@/lib/formatDistance';
import { EmptyState } from './ui/state/StateComponent';
import clsx from 'clsx';

function HostStatusList() {
  const filteredData = useProductStore((state) => state.filteredData);
  const role = useRoleStore((state) => state.role);
  const setMatchingId = useMatchingIdStore((state) => state.setMatchingId);
  const setStatus = useStatusStore((state) => state.setStatus);

  const handleClick = (item: MatchingData) => {
    if (item.matchingId !== null) {
      setMatchingId(item.matchingId);
    }
    setStatus(item.status);
  };

  const getTitle = (status: string) => {
    const menu = hostMenuTitle(role).find((menu) => menu.status === status);
    return menu ? menu.title : status;
  };

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-4',
        // 데이터가 없을 때는 전체 높이를 사용하여 중앙 정렬
        {
          'h-[calc(100vh-200px)] justify-center':
            !filteredData || filteredData.length === 0,
        }
      )}
    >
      {!filteredData || filteredData.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {filteredData?.map((data, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[180px] cursor-pointer"
              onClick={() => handleClick(data)}
            >
              {/* 상단 이미지 및 Title, description, status */}
              <div className="flex items-start m-4 gap-5 pb-5 border-b border-solid border-gray-200">
                <img
                  src={data.imageUrl[0]}
                  className="w-[100px] h-[100px] object-full rounded-lg"
                />
                <div className="flex flex-col w-80 gap-3 h-full justify-start">
                  <h2 className="font-extrabold text-2xl">{data.title}</h2>
                  <p className="text-gray-400 font-bold">{data.category}</p>
                </div>
                <div className="w-20 flex flex-col h-full items-end">
                  <ButtonProps
                    title={getTitle(data.status)}
                    variant="custom"
                    size="status"
                    className="text-base"
                  />
                </div>
              </div>
              {/* 하단 거리 */}
              <div className="flex flex-col items-start pl-4 h-full">
                <p className="text-black font-bold">
                  {formatDistance(data.distance)}
                </p>
              </div>
            </div>
          ))}
        </>
      )}

      <HostModalRender />
    </div>
  );
}

export default HostStatusList;
