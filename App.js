import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Dashboard from './src/components/Dashboard/Dashboard';
import Login from './src/components/Auth/Login';
import Register from './src/components/Auth/Register';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { NotificationProvider } from './src/contexts/NotificationContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleToggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <View style={styles.container}>
          {!isLoggedIn && !showRegister ? (
            <Login onLogin={handleLogin} onToggleRegister={handleToggleRegister} />
          ) : isLoggedIn ? (
            <Dashboard onLogout={handleLogout} />
          ) : (
            <Register onRegister={handleLogin} />
          )}
        </View>
      </NotificationProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
