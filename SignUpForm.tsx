import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from './InputField';

interface SignUpFormProps {
  onSubmit: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.halfWidth}>
          <InputField label="First Name" placeholder="John" />
        </View>
        <View style={styles.halfWidth}>
          <InputField label="Last Name" placeholder="Doe" />
        </View>
      </View>
      <InputField label="Email" placeholder="johndoe@gmail.com" keyboardType="email-address" />
      <InputField label="Username" placeholder="johndoe123" />
      <InputField label="Password" placeholder="•••••••••••••••••••" secureTextEntry />
      <InputField label="Confirm Password" placeholder="•••••••••••••••••••" secureTextEntry />
      <TouchableOpacity style={styles.continueButton} onPress={onSubmit}>
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
    width: '48%', // Adjusts each input to take half the width with some space in between
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
