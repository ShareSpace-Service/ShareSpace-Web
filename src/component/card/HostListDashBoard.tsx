import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MatchingListResponse } from '@/interface/MatchingInterface';
import { CalendarDays } from 'lucide-react';

interface HostListDashBoardProps {
  items?: MatchingListResponse;
  isLoading?: boolean;
}

function HostListDashBoard({
  items,
  isLoading = false,
}: HostListDashBoardProps) {
  if (isLoading) {
    return (
      <Card className="w-full h-[400px]">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent className="overflow-y-auto">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-24 w-full mb-4" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const matchingItems = items?.data || [];

  return (
    <Card className="w-full h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-lg">반납 예정 물품</h3>
        </div>
        <Badge variant="outline" className="text-orange-500">
          3일 이내
        </Badge>
      </CardHeader>
      <CardContent className="overflow-y-auto">
        {matchingItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground font-bold">
            반납 예정인 물품이 없습니다
          </div>
        ) : (
          <div className="space-y-4 h-[600px] overflow-y-auto">
            {matchingItems.map((item) => (
              <div
                key={item.matchingId}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="relative h-20 w-20 rounded-md overflow-hidden">
                  <img
                    src={item.imageUrl[0]}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      거리: {item.distance}m
                    </span>
                    <span className="text-sm font-medium text-orange-500">
                      {item.remainingDays}일 남음
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default HostListDashBoard;
