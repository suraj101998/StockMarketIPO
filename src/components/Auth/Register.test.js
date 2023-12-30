import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Register from './Register';

// Mock the register function
jest.mock('../../services/auth', () => ({
  register: jest.fn(() => Promise.resolve({})), // You might need to adjust this based on your actual register function
}));

describe('<Register />', () => {
  test('renders register form correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Register />);
    expect(getByText('Register')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm your password')).toBeTruthy();
  });

  test('handles registration correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    // Fill in the registration form
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm your password'), 'password123');

    // Trigger the registration action
    fireEvent.press(getByText('Register'));

    // Wait for the register function to resolve
    await Promise.resolve();

    // Check if the onRegister function was called
    // You might need to adjust this based on your actual onRegister function
    // In this example, we are checking if the register function was called with the correct arguments
    expect(require('../../services/auth').register).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('handles registration failure correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    // Mock the register function to reject
    require('../../services/auth').register.mockRejectedValueOnce(new Error('Registration failed'));

    // Fill in the registration form
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm your password'), 'password123');

    // Trigger the registration action
    fireEvent.press(getByText('Register'));

    // Wait for the register function to reject
    await Promise.reject();

    // Check if the error message is displayed
    expect(getByText('Registration failed')).toBeTruthy();
  });

  // Add more tests based on your component behavior
});
