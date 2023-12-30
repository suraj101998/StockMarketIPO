import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { register } from '../../services/auth';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';

const Register = ({ onRegister }) => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    // Check if any field is empty
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userData = await register(email, password);
      onRegister(userData);
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <ThemeProvider>
      <View style={styles.registerContainer}>
        <Text style={styles.heading}>Register</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.inputContainer}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <Button title="Register" onPress={handleRegister} />
        {/* Theme Selector */}
        <View style={styles.themeSelector}>
          <Text>Theme:</Text>
          <Picker
            selectedValue={theme}
            onValueChange={toggleTheme}
            style={styles.picker}
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
  registerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    margin: 10,
    padding: 8,
    fontSize: 16,
    borderWidth: 1,
    width: '100%',
  },
  themeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
});

export default Register;
