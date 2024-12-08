import { useMatchingCount, useMatchingDashboard } from '@/action/get-dashboard';
import HostItemCard from '@/component/card/HostItemCard';
import HostListDashBoard from '@/component/card/HostListDashBoard';
import Address from '@/component/ui/Address';
import HeaderTitle from '@/component/ui/HeaderTitle';
import { useLayout } from '@/layout/Layout';

function HostHome() {
  const { nickname } = useLayout();

  const { data: countData, isError: isCountError } = useMatchingCount();

  const {
    data: matchingList,
    isLoading: isListLoading,
    isError: isListError,
  } = useMatchingDashboard();

  if (isCountError || isListError) {
    return <div className="text-destructive">Error loading data</div>;
  }

  if (!countData) {
    return <div className="text-muted-foreground">No data available</div>;
  }

  return (
    <div className="flex flex-col items-start space-y-4">
      <HeaderTitle nickname={nickname} />
      <Address />
      <HostItemCard
        requestedCount={countData.requestedCount}
        pendingCount={countData.pendingCount}
        storedCount={countData.storedCount}
      />
      <HostListDashBoard items={matchingList} isLoading={isListLoading} />
    </div>
  );
}

export default HostHome;
