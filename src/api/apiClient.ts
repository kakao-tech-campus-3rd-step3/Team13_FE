//import axios from 'axios';
import { apiClient } from '@/api/core/axiosInstance';

export interface Greeting {
  greeting: string;
}

export async function fetchGreeting() {
  const res = await apiClient.get<Greeting>('/api/greeting');
  return res.data;
}
