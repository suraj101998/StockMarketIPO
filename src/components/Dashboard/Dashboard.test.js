import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Dashboard from './Dashboard';

// Mock the fetchRealTimeData function
jest.mock('../../services/stockService', () => ({
  fetchRealTimeData: jest.fn(() => Promise.resolve([])), // Adjust the mock based on your actual data
}));

// Mock the NotificationProvider and ThemeProvider contexts
jest.mock('../../contexts/ThemeContext', () => ({
  useTheme: jest.fn(() => ({ theme: 'light', toggleTheme: jest.fn() })),
}));
jest.mock('../../contexts/NotificationContext', () => ({
  useNotifications: jest.fn(() => ({ enableNotifications: true, toggleNotifications: jest.fn() })),
}));

describe('<Dashboard />', () => {
  test('renders dashboard components correctly', async () => {
    const { getByText, getByPlaceholderText } = render(<Dashboard onLogout={() => {}} />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  test('fetches real-time data on mount', async () => {
    render(<Dashboard onLogout={() => {}} />);
    // You might need to adjust this based on your actual fetchRealTimeData function
    expect(require('../../services/stockService').fetchRealTimeData).toHaveBeenCalled();
  });

  // Add more tests based on your component behavior
});
