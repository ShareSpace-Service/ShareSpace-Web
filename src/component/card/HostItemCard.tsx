import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MatchingCheck } from '@/interface/MatchingInterface';
import { Package, Clock, Home } from 'lucide-react';

function HostItemCard({
  requestedCount,
  pendingCount,
  storedCount,
}: MatchingCheck) {
  const statItems = [
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      label: '대여 요청',
      count: requestedCount,
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      label: '보관 대기',
      count: pendingCount,
      bgColor: 'bg-orange-50',
    },
    {
      icon: <Package className="w-8 h-8 text-green-500" />,
      label: '보관 중',
      count: storedCount,
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="font-semibold text-lg">물품 보관 현황</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} p-4 rounded-lg transition-all hover:scale-105`}
            >
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <span className="text-sm text-muted-foreground font-bold">
                  {item.label}
                </span>
              </div>
              <p className="text-3xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default HostItemCard;
