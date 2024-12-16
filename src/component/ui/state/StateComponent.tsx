import { Loader2, AlertCircle, FileQuestion } from 'lucide-react';

export function LoadingState() {
  return (
    <StateLayout>
      <div className="flex flex-col items-center gap-6 animate-fadeIn">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-gray-100 rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xl font-semibold text-gray-700">
            잠시만 기다려주세요
          </p>
          <p className="text-gray-500">요청하신 정보를 불러오고 있습니다</p>
        </div>
      </div>
    </StateLayout>
  );
}

export function ErrorState({ error }: { error: Error }) {
  return (
    <StateLayout>
      <div className="flex flex-col items-center gap-6 animate-fadeIn">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xl font-semibold text-gray-700">죄송합니다</p>
          <p className="text-gray-500">
            데이터를 불러오는 중 문제가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요
          </p>
          <p className="text-red-500 font-bold">{error.message}</p>
        </div>
      </div>
    </StateLayout>
  );
}

export function EmptyState() {
  return (
    <StateLayout>
      <div className="flex flex-col items-center gap-6 animate-fadeIn">
        <FileQuestion className="w-16 h-16 text-gray-400" />
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xl font-semibold text-gray-700">
            표시할 내용이 없습니다
          </p>
          <p className="text-gray-500">아직 등록된 데이터가 없습니다</p>
        </div>
      </div>
    </StateLayout>
  );
}

interface StateLayoutProps {
  children: React.ReactNode;
}

function StateLayout({ children }: StateLayoutProps) {
  return (
    <div className="flex items-center justify-center h-screen">{children}</div>
  );
}
