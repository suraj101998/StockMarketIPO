const API_KEY = 'pk_7d8247a072f140c784a0f0d4e7b46837';
const BASE_URL = 'https://cloud.iexapis.com/stable';

export const fetchRealTimeData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stock/market/list/mostactive?token=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Failed to fetch real-time data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching real-time data:', error);
    throw new Error('Error fetching real-time data');
  }
};
