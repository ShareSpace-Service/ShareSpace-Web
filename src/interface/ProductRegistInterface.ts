export interface RegistResponse {
  message: string;
  status: string;
  data: {
    matchingId: number;
  };
  success: boolean;
}
