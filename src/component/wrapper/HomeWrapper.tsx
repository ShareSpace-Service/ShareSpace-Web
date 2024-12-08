import GuestHome from '@/guest/pages/GuestHome';
import HostHome from '@/host/pages/HostHome';
import { useRoleStore } from '@/store/Role';

function HomeWrapper() {
  const { role } = useRoleStore();

  return role === 'GUEST' ? <GuestHome /> : <HostHome />;
}

export default HomeWrapper;
