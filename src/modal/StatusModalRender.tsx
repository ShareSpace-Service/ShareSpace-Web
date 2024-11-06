import { useLayoutEffect, useRef } from 'react';
import KeepDetailModal from './KeepDetailModal';
import RequestModal from './RequestModal';
import WaitDetailModal from './WaitDetailModal';
import UnassignedModal from './UnassignedModal';
import { useMatchingIdStore } from '@/store/MatchingId';
import { useStatusStore } from '@/store/ProductStatus';

function StatusModalRender() {
  const { matchingId } = useMatchingIdStore();
  const { status } = useStatusStore();

  const modalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // useLayoutEffect를 사용하는 이유:
    // 이 훅은 DOM 업데이트 후 레이아웃을 계산할 수 있는 시점에 실행되므로,
    // 모달이 열릴 때 배경 스크롤을 방지하고 모달의 위치를 설정하는 작업을
    // DOM이 화면에 그리기 전에 완료할 수 있습니다. 이는 화면 깜빡임을 방지하고
    // 사용자에게 더 매끄러운 경험을 제공합니다.

    // matchingId와 status가 존재하고 modalRef.current가 유효한 경우
    if (matchingId && status && modalRef.current) {
      document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
      const scrollY = window.scrollY; // 현재 스크롤 위치 저장
      modalRef.current.style.top = `${scrollY}px`; // 모달의 top 위치를 현재 스크롤 위치로 설정
    }

    // cleanup 함수: 컴포넌트가 언마운트될 때 호출됨
    return () => {
      document.body.style.overflow = 'unset'; // 배경 스크롤 복원
    };
  }, [matchingId, status]); // matchingId와 status가 변경될 때마다 실행

  if (!matchingId || !status) {
    return null;
  }
  const modalContent = (() => {
    switch (status) {
      case 'STORED': // 보관중
        return <KeepDetailModal />;
      case 'PENDING': // 보관대기중
        return <WaitDetailModal />;
      case 'REQUESTED': // 요청됨 / 요청옴
        return <RequestModal />;
      case 'UNASSIGNED': // 미배정
      case 'REJECTED': // 반력됨
        return <UnassignedModal />;
      default:
        return null;
    }
  })();
  return (
    <div
      ref={modalRef}
      className="absolute left-0 w-full min-h-screen bg-black bg-opacity-50 z-20"
      style={{ position: 'absolute' }}
    >
      {modalContent}
    </div>
  );
}

export default StatusModalRender;
