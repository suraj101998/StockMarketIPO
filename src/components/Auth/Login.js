import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { login } from '../../services/auth';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker'; // Import Picker from 'react-native'

const loginContainerStyle = {
  flex: 1, // Use flex: 1 to make the container take up the entire space
  justifyContent: 'center', // Center the content vertically
  alignItems: 'center', // Center the content horizontally
};

const inputStyle = {
  marginVertical: 10,
  padding: 8,
  fontSize: 16,
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 4,
  width: 250, // Set a width for the input
};

const buttonStyle = {
  backgroundColor: 'green',
  color: 'white',
  padding: 10,
  fontSize: 16,
  borderRadius: 4,
  marginTop: 10,
  width: 250, // Set a width for the button
  alignItems: 'center', // Center the text horizontally
};

const Login = ({ onLogin, onToggleRegister }) => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      onLogin(userData);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <ThemeProvider>
      <View style={{ ...styles.loginContainer, backgroundColor: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Login</Text>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>
          Don't have an account?{' '}
          <TouchableOpacity onPress={onToggleRegister} style={styles.button}>
            <Text style={{ color: 'white' }}>Register</Text>
          </TouchableOpacity>
        </Text>
        {/* Theme Selector */}
        <View style={{ marginTop: 10 }}>
          <Text>Theme:</Text>
          <Picker
            selectedValue={theme}
            onValueChange={(itemValue) => toggleTheme(itemValue)}
            style={{ height: 50, width: 150 }}
          >
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Dark" value="dark" />
          </Picker>
        </View>
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 20,
  },
  input: {
    marginVertical: 10,
    padding: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    width: 250,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    marginTop: 10,
    width: 250,
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
});

export default Login;
