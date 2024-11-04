import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, secureTextEntry = false, keyboardType = 'default' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#172554',
    borderRadius: 30,
    height: 44,
    fontSize: 14,
    width: '100%',
    paddingLeft: 10,
    marginBottom: -10,
  },
});

export default InputField;