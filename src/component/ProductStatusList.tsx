import ButtonProps from './ui/ButtonProps';
import { getMenuTitle } from './ui/ProductMenu';
import { useState } from 'react';
import StatusModalRender from '@/modal/StatusModalRender';
import { MatchingData } from '@/interface/MatchingInterface';

function ProductStatusList({
  filteredData,
  userRole,
}: {
  filteredData: MatchingData[] | undefined;
  userRole: string | null;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleClick = (item: MatchingData) => {
    setSelectedId(item.matchingId);
    setSelectedStatus(item.status);
  };

  const closeModal = () => {
    setSelectedId(null);
    setSelectedStatus(null);
  };

  const getTitle = (status: string) => {
    const menu = getMenuTitle(userRole).find((menu) => menu.status === status);
    return menu ? menu.title : status;
  };

  return (
    <div className="flex flex-col items-center gap-4">
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
            <div className="flex flex-col w-60 gap-3 h-full justify-center">
              <h2 className="font-extrabold text-2xl">{data.title}</h2>
              <p className="text-gray-400 font-bold">{data.category}</p>
            </div>
            <div className="w-40 flex flex-col h-full items-end">
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
            <p className="text-black font-bold">{data.distance}</p>
          </div>
        </div>
      ))}
      <StatusModalRender
        matchingId={selectedId}
        status={selectedStatus}
        onClose={closeModal}
      />
    </div>
  );
}

export default ProductStatusList;
