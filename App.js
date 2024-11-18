import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homescreen';
import SignupScreen from './screens/signupscreen';
import LoginScreen from './screens/loginscreen';
import PreferencesScreen from './screens/preferences';
import ArticleDetails from './screens/articledetails';
// import MainTabNavigator from './MainTabNavigator';
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Preferences" component={PreferencesScreen} />
                <Stack.Screen name="Article" component={ArticleDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
