import { useQuery } from '@tanstack/react-query';
import { fetchDetailHistory } from '@/api/History';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from '@/component/ui/image/Image';
import { Badge } from '@/components/ui/badge';

function HistoryDetailModal({
  onClose,
  matchingId,
}: {
  onClose: () => void;
  matchingId: number | null;
}) {
  const { data } = useQuery({
    queryKey: ['historyDetail', matchingId],
    queryFn: () => fetchDetailHistory({ matchingId: matchingId! }),
    enabled: !!matchingId,
  });

  return (
    <div className="fixed inset-0 bg-black/60 z-50">
      <div className="h-full w-full bg-white">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6">
          <button onClick={onClose} className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </header>

        <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
          <div className="px-6 py-5 space-y-7">
            <Card>
              <CardContent className="p-0">
                <Image
                  src={data?.data.imageUrl}
                  alt="보관 물품"
                  className="w-full h-[250px] object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            <div className="space-y-3 px-1">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 text-base font-semibold px-3.5 py-1 rounded-lg"
              >
                {data?.data.product.category}
              </Badge>
              <h1 className="text-2xl text-gray-900 font-extrabold">
                {data?.data.product.title}
              </h1>
            </div>

            <Card className="shadow-[0_0_15px_rgba(0,0,0,0.1)]">
              <CardContent className="p-5 space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2.5">
                    보관 장소
                  </h2>
                  <p className="text-base text-gray-400 font-bold">
                    {data?.data.place.title}
                  </p>
                </div>

                <div className="w-full h-px bg-gray-200" />

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2.5">
                    보관 기간
                  </h2>
                  <p className="text-base text-gray-400 font-bold">
                    {data?.data.product.period}일
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 px-1">요청사항</h2>
              <Card className="shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                <CardContent className="p-5">
                  <p className="text-base leading-relaxed text-gray-400 font-bold">
                    {data?.data.product.description || '요청사항이 없습니다.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryDetailModal;
