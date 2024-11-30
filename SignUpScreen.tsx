import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignUpForm from './SignUpForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from './BackButton';
import { useSignUp } from './SignupContext';
// Define RootStackParamList if not already defined
type RootStackParamList = {
  SignUp: undefined;
  AcademicScreen: undefined;
  StudyScreen: undefined;
};

const SignUpScreen: React.FC = () => {
  const { signUpData, updateSignUpData } = useSignUp();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSubmit = () => {
    // Navigate to AcademicScreen
   navigation.navigate('AcademicScreen');
  };

  return (
    <View style={styles.container}>
       <BackButton />
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/992ceab560384b3926d9ef05d76326aa12c3e494a33455878dc7b5bf7883a752?placeholderIfAbsent=true&apiKey=3ec34e30ebf54f81be6ec584986e725a",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Sign up for <Text style={[styles.title, { color: "#172554" }]}>Study Buddy</Text>
      </Text>
      <SignUpForm onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 44,
    paddingBottom: 80,
    backgroundColor: 'white',
  },
  logo: {
    width: 194,
    aspectRatio: 1.15,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 24,
  },
});

export default SignUpScreen;
