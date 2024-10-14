export interface Place {
  placeId: number;
  title: string;
  category: string;
  imageUrl: string;
  distance: number;
}

// API Response
export interface ApiResponse {
  message: string;
  status: string;
  data: Place[];
  success: boolean;
}
