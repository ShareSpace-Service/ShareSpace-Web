export interface RegistResponse {
  message: string;
  status: string;
  data: {
    productId: number;
    matchingId: number;
  };
  success: boolean;
}
