const API_KEY = 'pk_c7e22b8275ea47ee995f065c95948a3c';
const BASE_URL = 'https://api.iex.cloud/v1';

export const fetchRealTimeData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data/CORE/UPCOMING_IPOS/market?token=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Failed to fetch upcoming IPOs');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching upcoming IPOs:', error);
    throw new Error('Error fetching upcoming IPOs');
  }
};

export const fetchCurrencyRates = async () => {
  try {
    const response = await fetch(`${BASE_URL}/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Failed to fetch currency rates');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw new Error('Error fetching currency rates');
  }
};
