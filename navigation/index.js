import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

export default function AppNavigation() {
    function MyStack() {
        return (
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
                    component={HomeScreen} 
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
        )
    }

    function MyTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Hometab} />
                <Tab.Screen name="Browse" component={Browsetab} />
                <Tab.Screen name="EditProfile" component={Editprofiletab} />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <MyStack />
             </NavigationContainer>
    )
    
}