import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import InputField from './InputField';

const LoginScreen = () => {
  const handleLogin = () => {
    // Handle login action here, such as form validation or API call
    console.log("Login button pressed");
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/992ceab560384b3926d9ef05d76326aa12c3e494a33455878dc7b5bf7883a752?placeholderIfAbsent=true&apiKey=3ec34e30ebf54f81be6ec584986e725a",
        }}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.title}>
        Log in to <Text style={[styles.title, { color: "#172554" }]}>Study Buddy</Text>
      </Text>
      <InputField label="Email" placeholder="johndoe@gmail.com" keyboardType="email-address" />
      <InputField label="Password" placeholder="•••••••••••••••••••" secureTextEntry />

      <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
        <Text style={styles.continueButtonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center', // Center vertically
    backgroundColor: "white",
    marginTop: -100
  },
  continueButton: {
    backgroundColor: '#172554', // Blue color for buttons
    borderRadius: 30,
    height: 44,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  logo: {
    width: 194,
    aspectRatio: 1.15,
    alignSelf: "center"
  },
  title: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default LoginScreen;
