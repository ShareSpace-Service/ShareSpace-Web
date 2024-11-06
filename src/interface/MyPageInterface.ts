export interface ApiResponse {
  message: string;
  status: string;
  data: UserData;
  success: boolean;
}

export interface UserData {
  nickName: string;
  email: string;
  image: string | null;
  role: string;
  location: string;
}

export interface ApiUpdateResponse {
  message: string;
  status: string;
  data: null;
  success: boolean;
}
