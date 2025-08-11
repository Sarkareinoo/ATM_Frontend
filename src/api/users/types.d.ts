export interface LoginRequest {
  UserID: string;
  Password: string;
}

export interface LoginResponse {
  token: string;
  result: {
    userID: string;
  };
}

export interface BalanceResponse {
  data: number; 
}
