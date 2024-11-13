import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing Screens
import SignUpScreen from './SignUpScreen';
import AcademicScreen from './AcademicBackground';
import StudyScreen from './StudyScreen';
import InterestScreen from './Interests';
import OnboardingScreen from './OnboardingScreen';
import WelcomeScreen from './Option';
import LoginScreen from './Login';
// Define the type for navigation stack parameters
type RootStackParamList = {
  SignUp: undefined;
  AcademicScreen: undefined;
  StudyScreen: undefined;
  InterestScreen: undefined;
  OnboardingScreen: undefined; // Add the OnboardingScreen if needed
  WelcomeScreen: undefined; // Add
  LoginScreen: undefined; // Add the LoginScreen if needed
};

// Create a stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreen">
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AcademicScreen" 
          component={AcademicScreen} 
          options={{ headerShown: false }} 
        />
                <Stack.Screen 
          name="StudyScreen" 
          component={StudyScreen} 
          options={{ headerShown: false }} 
        />
                        <Stack.Screen 
          name="InterestScreen" 
          component={InterestScreen} 
          options={{ headerShown: false }} 
        />
                                <Stack.Screen 
          name="OnboardingScreen" 
          component={OnboardingScreen} 
          options={{ headerShown: false }} 
        />
                                        <Stack.Screen 
          name="WelcomeScreen" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
                                  <Stack.Screen 
          name="LoginScreen"
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
