import HostImage from '@/assets/HostImage.svg';
import GuestImage from '@/assets/GuestImage.svg';

export type Role = 'GUEST' | 'HOST' | null; // Zustand Role Type 정리

export const ROLE_STATUS = {
  GUEST: 'ROLE_GUEST',
  HOST: 'ROLE_HOST',
} as const;

export interface RoleType {
  role: string;
  description: string;
  image: string;
  roleStatus: (typeof ROLE_STATUS)[keyof typeof ROLE_STATUS];
}

export const RoleInfo: RoleType[] = [
  {
    role: '게스트',
    description: '보관하고자 하는 장소를 선택 후 물건을 맡겨주세요!',
    image: GuestImage,
    roleStatus: ROLE_STATUS.GUEST,
  },
  {
    role: '호스트',
    description: '보관 요청이 오면 물건을 수락/거절 할 수 있어요!',
    image: HostImage,
    roleStatus: ROLE_STATUS.HOST,
  },
] as const;
