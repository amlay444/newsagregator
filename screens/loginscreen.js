import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase';
import SPACING from '../config/SPACING';
import COLORS from '../config/COLORS';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Invalid input', 'Please enter both email and password');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      Alert.alert('Login Successful', 'You have successfully logged in');
      navigation.navigate('Home');
    } catch (error) {
      setError(error.message);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NewsPalette: Catered For You</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: SPACING * 3, // Adjusted padding for better fit
  },
  title: {
    fontSize: SPACING * 4, // Adjusted font size for better fit
    fontWeight: 'bold',
    marginBottom: SPACING * 3, // Adjusted margin for better spacing
    color: COLORS.dark,
    textAlign: 'center',
    letterSpacing: 1.5, // Adjusted letter spacing for better readability
    fontFamily: 'Roboto',
  },
  input: {
    width: '85%', // Adjusted width for better alignment
    height: SPACING * 5, // Adjusted height for better touch targets
    borderColor: COLORS.secondary,
    borderWidth: 1.5, // Adjusted border width for better definition
    borderRadius: SPACING * 1.5, // Adjusted border radius for a softer look
    paddingLeft: SPACING * 1.2, // Adjusted padding for better text alignment
    marginBottom: SPACING * 2.5, // Adjusted margin for better spacing
    fontSize: SPACING * 1.8, // Adjusted font size for better readability
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING * 1.8, // Adjusted padding for better touch targets
    paddingHorizontal: SPACING * 3.5, // Adjusted padding for better touch targets
    borderRadius: SPACING * 1.5, // Adjusted border radius for a softer look
    width: '85%', // Adjusted width for better alignment
    alignItems: 'center',
    marginTop: SPACING * 2.5, // Adjusted margin for better spacing
    elevation: 5, // Adjusted elevation for a more pronounced shadow
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2.5 }, // Adjusted shadow offset for more depth
    shadowOpacity: 0.35, // Adjusted shadow opacity for more visibility
    shadowRadius: 4.5, // Adjusted shadow radius for a softer shadow
  },
  buttonText: {
    color: COLORS.dark,
    fontSize: SPACING * 2.2, // Adjusted font size for better readability
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  link: {
    color: COLORS.secondary,
    fontSize: SPACING * 1.8, // Adjusted font size for better readability
    marginTop: SPACING * 2, // Added margin for better spacing
  },
  error: {
    color: 'red',
    fontSize: SPACING * 1.6, // Adjusted font size for better readability
    marginBottom: SPACING * 2, // Added margin for better spacing
  },
});

export default LoginScreen;
