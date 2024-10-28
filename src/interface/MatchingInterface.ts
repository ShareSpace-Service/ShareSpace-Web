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
  data: MatchingData[];
  success: boolean;
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
