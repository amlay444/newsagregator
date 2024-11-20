import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homescreen';
import EditProfileScreen from './screens/editprofile';
import LoginScreen from './screens/loginscreen';
import SignupScreen from './screens/signupscreen';
import PreferencesScreen from './screens/preferences';
import ArticleDetails from './screens/articledetails';
import AppNavigation from './navigation';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AppNavigation />
  );
}
