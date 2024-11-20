import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background
import SPACING from '../config/SPACING';
import COLORS from '../config/COLORS';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[COLORS.darker, COLORS.lighter]}
      style={styles.container}
    >
      <Image
        source={require('../config/assets/welcomescreen.png')} 
        style={styles.fullScreenImage}
      />
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonTextSecondary}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Makes the image cover the screen
  },
  buttonContainer: {
    position: 'absolute', // Ensures the buttons are on top of the image
    bottom: SPACING * 4,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    height: SPACING * 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING,
    marginHorizontal: SPACING / 2,
  },
  primaryButton: {
    backgroundColor: COLORS.darker,
  },
  secondaryButton: {
    backgroundColor: COLORS.lighter,
    borderColor: COLORS.white,
    borderWidth: 2,
  },
  buttonText: {
    color: COLORS.light,
    fontSize: SPACING * 2,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: COLORS.primary,
    fontSize: SPACING * 2,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
