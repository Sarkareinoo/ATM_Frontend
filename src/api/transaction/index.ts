import api from '@/config/axios';
import type { TransactionRequest, TransactionResponse } from './types';

export async function deposit(payload: TransactionRequest) {
  const response = await api.post<TransactionResponse>('/Transaction/deposit', payload);
  return response.data;
}

export async function withdraw(payload: TransactionRequest) {
  const response = await api.post<TransactionResponse>('/Transaction/withdraw', payload);
  return response.data;
}
