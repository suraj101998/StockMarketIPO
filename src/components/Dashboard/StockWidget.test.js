import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StockWidget from './StockWidget';

describe('<StockWidget />', () => {
  const mockIPO = {
    symbol: 'ABC',
    companyName: 'Example Company',
    shares: 100,
  };

  it('renders StockWidget component', () => {
    const { getByText } = render(
      <StockWidget ipo={mockIPO} isSelected={false} handleIPOSelection={jest.fn()} />
    );
    expect(getByText('Example Company')).toBeTruthy();
    expect(getByText('Shares: 100')).toBeTruthy();
  });

  it('handles IPO selection when not selected', () => {
    const handleIPOSelection = jest.fn();
    const { getByText } = render(
      <StockWidget ipo={mockIPO} isSelected={false} handleIPOSelection={handleIPOSelection} />
    );

    fireEvent.press(getByText('Example Company'));
    expect(handleIPOSelection).toHaveBeenCalledWith('ABC');
  });

  it('handles IPO selection when already selected', () => {
    const handleIPOSelection = jest.fn();
    const { getByText } = render(
      <StockWidget ipo={mockIPO} isSelected={true} handleIPOSelection={handleIPOSelection} />
    );

    fireEvent.press(getByText('Example Company'));
    expect(handleIPOSelection).toHaveBeenCalledWith('ABC');
  });

  // Add more test cases as needed for different scenarios
});
