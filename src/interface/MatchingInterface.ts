// 대여 요청 Response
export interface MatchingRequestResult {
  success: boolean;
  status: string;
  data: null;
  message: string;
}

// 물품 보관 현황 Response
export interface MatchingApiResponse {
  message: string;
  status: string;
  data: Matching;
  success: boolean;
}

export interface Matching {
  role: string;
  products: MatchingData[];
}

// 물품 보관 현황 Data
export interface MatchingData {
  matchingId: number | null;
  title: string;
  category: string;
  imageUrl: string[];
  status: string;
  distance: number | null;
}

// 내 물품 현황 조회 특정 장소 선택시 Response
export interface MatchingPlaceResponse {
  message: string;
  status: string;
  data: MatchingData[];
  success: boolean;
}

// 물품 보관 현황 요청됨 모달 API Response
interface Product {
  title: string;
  image: string[];
  category: string;
  period: number;
  description: string;
}

// 물품 보관 현황 요청됨 모달 API Response
interface Place {
  title: string;
  image: string[];
  category: string;
  period: number;
  description: string;
}
// 물품 보관 현황 요청됨 모달 API Response
export interface ApiResponseData {
  product: Product;
  place: Place;
}
// 물품 보관 현황 요청됨 모달 API Response
export interface ApiRequestModalResponse {
  message: string;
  status: string;
  data: ApiResponseData;
  success: boolean;
}

// 물품 보관 현황 보관중, 보관 대기중 모달 API Response
export interface ApiKeepModalResponse {
  message: string;
  status: string;
  data: {
    product: KeepProductDetails;
    place: KeepPlaceDetails;
    imageUrl: string | null; // 이거 이미지가 Null이 들어갈 수가 없음 수정해야함
    guestCompleted: boolean;
    hostCompleted: boolean;
  };
  success: boolean;
}

// 물품 보관 현황 보관중, 보관 대기중 모달 API Response
export interface KeepProductDetails {
  title: string;
  period: number;
  description: string;
  category: string;
}

// 물품 보관 현황 보관중, 보관 대기중 모달 API Response
export interface KeepPlaceDetails {
  title: string;
}

// 호스트 대시보드 항목별 개수 조회
export interface MatchingCheck {
  requestedCount: number;
  pendingCount: number;
  storedCount: number;
}
// 호스트 대시보드 항목별 개수 조회 Response
export interface MatchingCheckResponse {
  message: string;
  status: string;
  data: MatchingCheck;
  success: boolean;
}
