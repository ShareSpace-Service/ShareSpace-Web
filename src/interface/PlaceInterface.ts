// 장소 목록
export interface Place {
  placeId: number;
  title: string;
  category: string;
  imageUrl: string;
  distance: number;
}

// 장소 목록 API Response
export interface ApiResponse {
  message: string;
  status: string;
  data: Place[];
  success: boolean;
}

// 장소 상세 정보
export interface PlaceData {
  placeId: number;
  title: string;
  category: string;
  period: number;
  imageUrl: string;
  description: string;
}

// 장소 상세 정보 API Response
export interface ApiDetailResponse {
  message: string;
  status: string;
  data: PlaceData;
  success: boolean;
}
