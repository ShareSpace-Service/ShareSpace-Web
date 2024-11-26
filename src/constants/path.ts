// 새로운 파일 생성
export const HIDE_BUTTON_PATHS = [
  '/productregist',
  '/profile',
  '/history',
  '/question',
] as const;

export type PathType = '/productregist' | '/profile' | '/history' | '/question';
