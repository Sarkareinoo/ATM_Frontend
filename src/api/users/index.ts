import api from '@/config/axios';
import type { LoginRequest, LoginResponse, BalanceResponse } from './types';

export async function login(credentials: LoginRequest): Promise<string> {
  const response = await api.post<LoginResponse>('/Users/login', credentials);

  const { token, result } = response.data;
  if (!token || !result?.userID) {
    throw new Error('Invalid login response');
  }

  localStorage.setItem('token', token);
  localStorage.setItem('user_id', result.userID);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return result.userID;
}

export function getCurrentUserId(): string | null {
  return localStorage.getItem('user_id');
}

export function logout() {
  localStorage.removeItem('user_id');
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
}

export async function getBalance(userId: string): Promise<number> {
  const response = await api.get<BalanceResponse>(`/Users/${userId}/balance`);
  return response.data.data;
}

export async function deposit(userId: string, amount: number) {
  const response = await api.post('/Transaction/deposit', { userId, amount });
  return response.data;
}

export async function withdraw(userId: string, amount: number) {
  const response = await api.post('/Transaction/withdraw', { userId, amount });
  return response.data;
}
