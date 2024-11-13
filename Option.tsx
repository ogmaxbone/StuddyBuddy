import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <FastImage
        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/992ceab560384b3926d9ef05d76326aa12c3e494a33455878dc7b5bf7883a752?placeholderIfAbsent=true&apiKey=3ec34e30ebf54f81be6ec584986e725a' }}
        style={styles.logo}
      />

      {/* App Name */}
      <Text style={styles.appName}>Study Buddy</Text>

      {/* Marketing Slogan */}
      <Text style={styles.slogan}>Empowering Your Academic Journey</Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp' as never)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen' as never)}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Copyright Text */}
      <Text style={styles.copyright}>© 2024 Study Buddy. All rights reserved.</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background
  },
  logo: {
    width: 194,
    aspectRatio: 1.15,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    color: '#172554', // Darker color for the text
    fontWeight: '500', // Medium weight
    textAlign: 'center',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 16,
    color: '#666', // Slightly lighter color for the slogan
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#172554', // Blue color for buttons
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
    width: "90%",
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  copyright: {
    position: 'absolute',
    bottom: 30,
    color: '#888', // Gray color for the copyright text
    fontSize: 12,
    textAlign: 'center',
  },
});
