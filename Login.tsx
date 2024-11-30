import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import BackButton from './BackButton';
import InputField from './InputField';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from './hooks';
import firestore from '@react-native-firebase/firestore';
import { setUserData } from './slice';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (!formData.password) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }
    return true;
  };


  const fetchAndStoreUserData = async (uid: string) => {
    try {
        const userDoc = await firestore()
            .collection('users')
            .doc(uid)
            .get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            const userDataForRedux = {
                name: `${userData?.firstName} ${userData?.lastName}`,
                username: userData?.username,
                avatar: userData?.avatar || '', // Get existing avatar if it exists
                university: userData?.university,
                major: userData?.major,
                graduationYear: userData?.graduationYear,
                email: userData?.email,
                uid: uid, // Make sure uid is set
            };
            
            dispatch(setUserData(userDataForRedux));
            return userDataForRedux; // Return the data for confirmation
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
        const userCredential = await auth().signInWithEmailAndPassword(
            formData.email,
            formData.password
        );
        
        if (userCredential.user) {
            await fetchAndStoreUserData(userCredential.user.uid);
            console.log('Login successful');
        }
    } catch (error) {
        console.error('Login error:', error);
        Alert.alert(
            'Login Failed',
            'Invalid email or password. Please try again.'
        );
    } finally {
        setLoading(false);
    }
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

      <InputField 
        label="Email" 
        placeholder="johndoe@gmail.com" 
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        autoCapitalize="none"
      />

      <InputField 
        label="Password" 
        placeholder="•••••••••••••••••••" 
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
      />

      <TouchableOpacity 
        style={[
          styles.continueButton,
          loading && styles.disabledButton
        ]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.continueButtonText}>
          {loading ? 'Logging in...' : 'Log in'}
        </Text>
      </TouchableOpacity>

      <View style={{position: "absolute", top: 100}}>
        <BackButton />
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: "white",
    marginTop: -100
  },
  continueButton: {
    backgroundColor: '#172554',
    borderRadius: 30,
    height: 44,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#94a3b8', // lighter color when disabled
    opacity: 0.7,
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