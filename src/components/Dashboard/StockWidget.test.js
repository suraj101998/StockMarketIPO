import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StockWidget from './StockWidget';

describe('<StockWidget />', () => {
  const stockData = {
    symbol: 'AAPL',
    latestPrice: 150.0,
  };

  test('renders stock widget correctly', () => {
    const { getByText, getByTestId } = render(
      <StockWidget stock={stockData} isSelected={false} handleWidgetSelection={() => {}} />
    );

    expect(getByText('AAPL')).toBeTruthy();
    expect(getByText('Last Price: $150.00')).toBeTruthy();
    expect(getByTestId('stock-widget')).toBeTruthy();
  });

  test('handles widget selection', () => {
    const handleWidgetSelectionMock = jest.fn();
    const { getByTestId } = render(
      <StockWidget stock={stockData} isSelected={false} handleWidgetSelection={handleWidgetSelectionMock} />
    );

    fireEvent.press(getByTestId('stock-widget'));
    expect(handleWidgetSelectionMock).toHaveBeenCalledWith('AAPL');
  });

  // Add more tests based on your component behavior
});
