import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {store, persistor} from './store';
// Feather Icons
import {Home, MessageCircle, User, Search} from 'react-native-feather';

// Importing Screens
import SignUpScreen from './SignUpScreen';
import AcademicScreen from './AcademicBackground';
import StudyScreen from './StudyScreen';
import InterestScreen from './Interests';
import OnboardingScreen from './OnboardingScreen';
import WelcomeScreen from './Option';
import LoginScreen from './Login';
import HomePage from './HomePage';
import ExploreScreen from './ExploreScreen';
import MessageScreen from './MessageScreen';
import ProfileScreen from './ProfileScreen';
import CreateGroup from './CreateGroup';
import ChatPage from './ChatPage';
import {SignUpProvider} from './SignupContext';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import GroupDetailsScreen from './GroupDetails';
type RootStackParamList = {
  SignUp: undefined;
  AcademicScreen: undefined;
  StudyScreen: undefined;
  InterestScreen: undefined;
  OnboardingScreen: undefined;
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  HomePage: undefined;
  AuthenticatedTabs: undefined;
  CreateGroup: undefined;
  ChatPage: { groupId: string; groupName: string };
  GroupDetailsScreen: { groupId: string; groupName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return null;
  }

  // Tab Navigator for Authenticated Stack
  const AuthenticatedTabs = () => (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          // This color will be active/inactive color
          const size = 22;

          if (route.name === 'Home') {
            return <Home color={color} width={size} height={size} />;
          } else if (route.name === 'Explore') {
            return <Search color={color} width={size} height={size} />;
          } else if (route.name === 'Messages') {
            return <MessageCircle color={color} width={size} height={size} />;
          } else if (route.name === 'Profile') {
            return <User color={color} width={size} height={size} />;
          }
        },
        tabBarActiveTintColor: '#172554',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SignUpProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {user ? (
                // Authenticated stack
                <>
                  <Stack.Screen
                    name="AuthenticatedTabs"
                    component={AuthenticatedTabs}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="CreateGroup"
                    component={CreateGroup}
                    options={{
                      headerShown: false, // Show a header for the Create Group page
                      title: 'Create Group', // Set a title for the header
                    }}
                  />

                  <Stack.Screen
                    name="ChatPage"
                    component={ChatPage}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="GroupDetailsScreen"
                    component={GroupDetailsScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                </>
              ) : (
                // Non-authenticated stack
                <>
                  <Stack.Screen
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="AcademicScreen"
                    component={AcademicScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="StudyScreen"
                    component={StudyScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="InterestScreen"
                    component={InterestScreen}
                    options={{headerShown: false}}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SignUpProvider>
      </PersistGate>
    </Provider>
  );
}
