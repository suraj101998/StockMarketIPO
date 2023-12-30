import AsyncStorage from '@react-native-async-storage/async-storage';

export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token !== null;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    // Simulate login, replace with actual authentication API call
    if (email === 'surajchakraborty82@gmail.com' && password === 'Suraj@101998') {
      await AsyncStorage.setItem('token', 'fakeToken');
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    // Simulate registration, replace with actual registration API call
    // You might want to handle registration validation and error handling here
    await AsyncStorage.setItem('token', 'fakeToken');
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
