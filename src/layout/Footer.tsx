import FooterIcon from '@/component/ui/FooterIcon';
import RegisterButtonContainer from '@/containers/RegisterButtonContainer';
import { useRoleStore } from '@/store/Role';

function Footer() {
  const role = useRoleStore((state) => state.role);
  return (
    <footer className="relative w-full h-[60px] sticky bottom-0 bg-white shadow-lg flex justify-around items-center z-10">
      <FooterIcon />
      {role === 'GUEST' && <RegisterButtonContainer />}
    </footer>
  );
}

export default Footer;
