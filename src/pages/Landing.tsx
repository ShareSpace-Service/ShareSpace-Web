import frameImage from '../assets/Frame.svg';
import CenteredLayout from '../layout/CenterLayout';
import { Button } from '@/components/ui/button';

function Landing() {
  return (
    <>
      <CenteredLayout>
        <div className="flex justify-center items-center h-full">
          <img src={frameImage} alt="이미지" />
        </div>
        <div className="text-black text-center pb-8 mb-8">
          <h1 className="text-4xl font-bold">SHARE SPACE</h1>
          <p className="text-sm tracking-wider font-bold">
            공간 부족 문제를 해결해 줄 수 있는 이웃 간의 공간 공유 플랫폼
          </p>
        </div>
        <div className="pb-10">
          <Button size="custom" variant="custom">
            Get Started
          </Button>
        </div>
      </CenteredLayout>
    </>
  );
}

export default Landing;
