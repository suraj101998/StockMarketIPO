import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from './App';

describe('<App />', () => {
  test('renders login screen by default', () => {
    const { getByText } = render(<App />);
    expect(getByText('Login')).toBeTruthy();
  });

  test('switches to registration screen on register link click', () => {
    const { getByText } = render(<App />);

    fireEvent.press(getByText('Register'));

    expect(getByText('Register')).toBeTruthy();
  });

  test('logs in and switches to dashboard on successful login', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<App />);

    // Assuming your login button has the testID 'login-button'
    fireEvent.changeText(getByPlaceholderText('Email:'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password:'), 'password123');
    fireEvent.press(getByTestId('login-button'));

    expect(getByText('Dashboard')).toBeTruthy();
  });

  // Add more tests based on your application flow and components
});
