import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Dashboard from './Dashboard';

// Mock your context providers if needed
jest.mock('../../contexts/ThemeContext', () => ({
  useTheme: jest.fn(() => ({ theme: 'light', toggleTheme: jest.fn() })),
}));

jest.mock('../../contexts/NotificationContext', () => ({
  useNotifications: jest.fn(() => ({
    enableNotifications: true,
    toggleNotifications: jest.fn(),
  })),
}));

// Mock your fetch functions if needed
jest.mock('../../services/stockService', () => ({
  fetchRealTimeData: jest.fn(() => Promise.resolve([])),
  fetchCurrencyRates: jest.fn(() => Promise.resolve([])),
}));

describe('<Dashboard />', () => {
  it('renders Dashboard component', () => {
    const { getByText } = render(<Dashboard onLogout={jest.fn()} />);
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('handles theme change', () => {
    const { getByText } = render(<Dashboard onLogout={jest.fn()} />);
    fireEvent.changeText(getByText('Light'), 'Dark');
    // Add assertions for theme change
  });

  it('handles search input', async () => {
    const { getByPlaceholderText, getByText } = render(<Dashboard onLogout={jest.fn()} />);
    const searchInput = getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'smith');
    // Add assertions for handling search input
  });

  it('handles sort order change', async () => {
    const { getByText } = render(<Dashboard onLogout={jest.fn()} />);
    fireEvent.changeText(getByText('Ascending'), 'Descending');
    // Add assertions for handling sort order change
  });

  it('handles IPO selection', async () => {
    const { getByText } = render(<Dashboard onLogout={jest.fn()} />);
    fireEvent.press(getByText('PERFECT MOMENT LTD.')); // Assuming 'Example IPO' is present in your IPO list
    // Add assertions for handling IPO selection
  });

  // Add more test cases for other functionalities as needed
});
