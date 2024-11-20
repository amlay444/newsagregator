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
      Alert.alert('Invalid', 'Please enter both email and password');
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
    padding: SPACING * 3,
  },
  title: {
    fontSize: SPACING * 4,
    fontWeight: 'bold',
    marginBottom: SPACING * 2, 
    color: COLORS.dark,
    textAlign: 'center',
    letterSpacing: 1.5, 
    fontFamily: 'Roboto',
  },
  input: {
    width: '85%', 
    height: SPACING * 5, 
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
    borderRadius: SPACING * 1.5, 
    paddingLeft: SPACING * 1.2, 
    marginBottom: SPACING * 2.5, 
    fontSize: SPACING * 1.8, 
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING * 1.5, 
    paddingHorizontal: SPACING * 2.5, 
    borderRadius: SPACING, 
    width: '80%',
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: SPACING * 1, 
    marginBottom: SPACING * 1, 
    borderColor: COLORS.dark, 
    borderWidth: 1, 
},
  buttonText: {
    color: COLORS.dark,
    fontSize: SPACING * 2.2, 
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  link: {
    color: COLORS.secondary,
    fontSize: SPACING * 1.8, 
    marginTop: SPACING * 1, 
  },
  error: {
    color: 'red',
    fontSize: SPACING * 1.2, 
    marginBottom: SPACING * 2, 
  },
});

export default LoginScreen;
