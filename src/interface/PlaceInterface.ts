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
  imageUrl: string[];
  description: string;
}

// 장소 상세 정보 API Response
export interface ApiDetailResponse {
  message: string;
  status: string;
  data: PlaceData;
  success: boolean;
}

// 장소 수정 페이지 장소 정보
export interface PlaceEditData {
  placeId: number;
  title: string;
  category: string;
  period: number;
  location: string;
  imageUrl: string[];
  description: string;
}

// 장소 수정 페이지 장소 정보 API Response
export interface ApiEditResponse {
  message: string;
  status: string;
  data: PlaceEditData;
  success: boolean;
}

// 장소 수정 페이지 장소 Form 정보
export interface PlaceEditForm {
  title: string;
  category: string;
  period: number;
  deleteImageUrl: string[] | null;
  newImageUrl: File[] | null;
  description: string;
  location: string;
}

// 장소 수정 페이지 장소 Form API Response
export interface PlaceEditResponse {
  message: string;
  success: boolean;
  status: string;
  data: PlaceEditForm;
}
