import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from './Login';

// Mock the login function
jest.mock('../../services/auth', () => ({
  login: jest.fn(() => Promise.resolve({})), // You might need to adjust this based on your actual login function
}));

describe('<Login />', () => {
  test('renders login form correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    expect(getByText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Email:')).toBeTruthy();
    expect(getByPlaceholderText('Password:')).toBeTruthy();
    expect(getByText('Don\'t have an account?')).toBeTruthy();
  });

  test('handles login correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    // Fill in the login form
    fireEvent.changeText(getByPlaceholderText('Email:'), 'surajchakraborty82@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password:'), 'Suraj@101998');

    // Trigger the login action
    fireEvent.press(getByText('Login'));

    // Wait for the login function to resolve
    await Promise.resolve();

    // Check if the onLogin function was called
    // You might need to adjust this based on your actual onLogin function
    // In this example, we are checking if the login function was called with the correct arguments
    expect(require('../../services/auth').login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('handles login failure correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    // Mock the login function to reject
    require('../../services/auth').login.mockRejectedValueOnce(new Error('Invalid email or password'));

    // Fill in the login form
    fireEvent.changeText(getByPlaceholderText('Email:'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password:'), 'password123');

    // Trigger the login action
    fireEvent.press(getByText('Login'));

    // Wait for the login function to reject
    await Promise.reject();

    // Check if the error message is displayed
    expect(getByText('Invalid email or password')).toBeTruthy();
  });

  // Add more tests based on your component behavior
});
