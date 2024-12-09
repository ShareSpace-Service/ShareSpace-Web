import { Card, CardContent } from '@/components/ui/card';
import { PackageSearch } from 'lucide-react';

export function EmptyPlaceList() {
  return (
    <Card className="mt-5 w-full">
      <CardContent className="flex flex-col items-center justify-center min-h-[400px] space-y-4 p-8">
        <PackageSearch className="h-12 w-12 text-muted-foreground" />
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold tracking-tight">
            이용 가능한 장소가 없습니다
          </h3>
          <p className="text-sm text-muted-foreground">
            현재 위치 주변에 이용 가능한 장소가 없습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
