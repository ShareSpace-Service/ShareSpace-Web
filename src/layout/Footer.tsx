import FooterIcon from '@/component/ui/FooterIcon';
import RegisterButtonContainer from '@/containers/RegisterButtonContainer';

function Footer() {
  return (
    <footer className="relative w-full h-[60px] sticky bottom-0 bg-white shadow-lg flex justify-around items-center z-10">
      <FooterIcon />
      <RegisterButtonContainer />
    </footer>
  );
}

export default Footer;
