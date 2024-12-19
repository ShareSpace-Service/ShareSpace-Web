import { useBodyScrollLock } from '@/hooks/scroll/useScrollLock';
import { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

/**
 * 모달을 렌더링하기 위한 Portal 컴포넌트
 * useLayoutEffect 사용 이유
 * 1. useEffect는 화면 렌더링 후 비동기적으로 실행되어 깜빡임이 발생할 수 있음
 * 2. useLayoutEffect는 DOM 변경 직후, 화면 렌더링 전에 동기적으로 실행
 * 3. 스크롤 잠금이 시각적 변화를 일으키므로 useLayoutEffect가 더 적합
 */

interface ModalPortalProps {
  children: React.ReactNode;
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
  const { lockScroll, openScroll } = useBodyScrollLock();

  useLayoutEffect(() => {
    lockScroll();
    return () => openScroll();
  }, [lockScroll, openScroll]);

  const el = document.getElementById('modal');
  if (!el) {
    return null;
  }

  return ReactDOM.createPortal(children, el);
};
