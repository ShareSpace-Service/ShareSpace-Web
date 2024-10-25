export interface MatchingItem {
  matchingId: number;
  title: string;
  category: string;
  imageUrl: string;
  distance: number;
}
export interface ApiResponse {
  message: string;
  status: string;
  data: MatchingItem[];
  success: boolean;
}

export interface HistoryDetailResponse {
  message: string;
  status: string;
  data: MatchingData;
  success: boolean;
}

export interface MatchingData {
  product: Product;
  place: Place;
  imageUrl: string;
}

export interface Product {
  title: string;
  period: number;
  description: string;
  category: string;
}

export interface Place {
  title: string;
}
