import { useCallback, useRef } from 'react';

/**
 * body 요소의 스크롤을 제어하는 커스텀 훅
 * 모달이 열릴 때 배경 스크롤을 막고, 닫힐 때 원래 스크롤 위치로 복원
 */
export function useBodyScrollLock() {
  // 스크롤 위치를 저장할 ref
  // useRef 사용 이유: 리렌더링 시에도 값을 유지하고, 값 변경 시 리렌더링을 발생시키지 않기 위함
  const scrollPosition = useRef(0);

  /**
   * 스크롤을 잠그는 함수
   * - 현재 스크롤 위치 저장
   * - body를 fixed로 고정하여 스크롤 방지
   * - iOS Safari에서도 정상 동작하도록 처리
   */
  const lockScroll = useCallback(() => {
    scrollPosition.current = window.pageYOffset; // 현재 스크롤 위치 저장
    document.body.style.overflow = 'hidden'; // 스크롤바 숨김
    document.body.style.position = 'fixed'; // body 고정
    document.body.style.top = `-${scrollPosition.current}px`; // 현재 위치 유지
    document.body.style.width = '100%'; // 가로 스크롤 방지
  }, []);

  /**
   * 스크롤 잠금을 해제하는 함수
   * - body 스타일 초기화
   * - 저장된 위치로 스크롤 복원
   */
  const openScroll = useCallback(() => {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition.current); // 원래 스크롤 위치로 복원
  }, []);

  return { lockScroll, openScroll };
}
