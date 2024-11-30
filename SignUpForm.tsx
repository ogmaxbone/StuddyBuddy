import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InputField from './InputField';
import { useSignUp } from './SignupContext';

interface SignUpFormProps {
  onSubmit: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const { updateSignUpData } = useSignUp();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!formData.email) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (!formData.username) {
      Alert.alert('Error', 'Please enter a username');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Update the signup context with form data
      updateSignUpData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
     //   username: formData.username,
        password: formData.password
      });
      
      // Call the onSubmit prop to navigate to next screen
      onSubmit();
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.halfWidth}>
          <InputField 
            label="First Name" 
            placeholder="John" 
            value={formData.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
          />
        </View>
        <View style={styles.halfWidth}>
          <InputField 
            label="Last Name" 
            placeholder="Doe" 
            value={formData.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
          />
        </View>
      </View>
      
      <InputField 
        label="Email" 
        placeholder="johndoe@gmail.com" 
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        autoCapitalize="none"
      />
      
      <InputField 
        label="Username" 
        placeholder="johndoe123" 
        value={formData.username}
        onChangeText={(text) => handleInputChange('username', text)}
        autoCapitalize="none"
      />
      
      <InputField 
        label="Password" 
        placeholder="•••••••••••••••••••" 
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
      />
      
      <InputField 
        label="Confirm Password" 
        placeholder="•••••••••••••••••••" 
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => handleInputChange('confirmPassword', text)}
      />
      
      <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  continueButton: {
    backgroundColor: '#172554',
    borderRadius: 30,
    height: 44,
    marginTop: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 12,
  },
});

export default SignUpForm;