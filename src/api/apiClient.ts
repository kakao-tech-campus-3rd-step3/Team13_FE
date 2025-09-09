import axios from 'axios';

export interface Greeting {
  greeting: string;
}

export async function fetchGreeting() {
  const res = await axios.get<Greeting>('/api/greeting');
  return res.data;
}
