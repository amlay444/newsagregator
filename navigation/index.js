import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/homescreen';
import EditProfileScreen from '../screens/editprofile';
import LoginScreen from '../screens/loginscreen';
import SignupScreen from '../screens/signupscreen';
import SelectPreferencesScreen from '../screens/preferences';
import ArticleDetails from '../screens/articledetails';
import Hometab from '../screens/Bottomtabs/Hometab';
import Browsetab from '../screens/Bottomtabs/Browsetab';
import Editprofiletab from '../screens/Bottomtabs/Editprofiletab';
import WelcomeScreen from '../screens/welcomescreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Explore') {
                        iconName = focused ? 'magnify' : 'magnify-plus-outline';
                    } else if (route.name === 'Edit Profile') {
                        iconName = focused ? 'account' : 'account-outline';
                    }

                    // Return the icon component
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200ee',
                tabBarInactiveTintColor: 'gray',  
                tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5 }, 
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={Hometab} 
                options={{ tabBarLabel: 'Home' }} 
            />
            <Tab.Screen 
                name="Explore" 
                component={Browsetab} 
                options={{ tabBarLabel: 'Browse' }} 
            />
            <Tab.Screen 
                name="Edit Profile" 
                component={Editprofiletab} 
                options={{ tabBarLabel: 'Profile' }} 
            />
        </Tab.Navigator>
    );
}

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Welcome" 
                    component={WelcomeScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Signup" 
                    component={SignupScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Home" 
                    component={MyTabs} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="EditProfile" 
                    component={EditProfileScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="SelectPreferences" 
                    component={SelectPreferencesScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Article" 
                    component={ArticleDetails} 
                    options={{ headerShown: false }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
