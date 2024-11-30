import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSignUp } from './SignupContext';
interface AcademicFormProps {
  onSubmit: () => void;
}
const AcademicForm: React.FC<AcademicFormProps> = ({ onSubmit }) => {
  const { updateSignUpData } = useSignUp();

  const schoolData = [
    { label: 'University of Texas at Austin', value: 'ut_austin' },
    { label: 'Texas A&M University', value: 'tamu' },
    { label: 'Texas Tech University', value: 'ttu' },
    { label: 'University of Houston', value: 'uh' },
    { label: 'Southern Methodist University', value: 'smu' },
  ];

  const majorData = [
    { label: 'Computer Science', value: 'cs' },
    { label: 'Mechanical Engineering', value: 'me' },
    { label: 'Business Administration', value: 'ba' },
    { label: 'Psychology', value: 'psych' },
    { label: 'Biology', value: 'bio' },
  ];

  const graduationDateData = [
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
  ];

  const [formData, setFormData] = useState({
    school: '',
    major: '',
    graduationDate: ''
  });

  // Focus states
  const [schoolFocus, setSchoolFocus] = useState(false);
  const [majorFocus, setMajorFocus] = useState(false);
  const [graduationDateFocus, setGraduationDateFocus] = useState(false);

  const validateForm = () => {
    if (!formData.school) {
      Alert.alert('Error', 'Please select your school');
      return false;
    }
    if (!formData.major) {
      Alert.alert('Error', 'Please select your major');
      return false;
    }
    if (!formData.graduationDate) {
      Alert.alert('Error', 'Please select your graduation date');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Get the label values instead of codes
      const schoolLabel = schoolData.find(item => item.value === formData.school)?.label;
      const majorLabel = majorData.find(item => item.value === formData.major)?.label;

      // Update the signup context
      updateSignUpData({
        university: schoolLabel,
        major: majorLabel,
        graduationYear: formData.graduationDate
      });

      onSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>School Name</Text>
      <Dropdown
        style={[styles.dropdown, schoolFocus && { borderColor: '#172554' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={schoolData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!schoolFocus ? 'Choose school' : '...'}
        searchPlaceholder="Search..."
        search={false}
        value={formData.school}
        onFocus={() => setSchoolFocus(true)}
        onBlur={() => setSchoolFocus(false)}
        onChange={item => {
          setFormData(prev => ({ ...prev, school: item.value }));
          setSchoolFocus(false);
        }}
      />

      <Text style={styles.label}>Major</Text>
      <Dropdown
        style={[styles.dropdown, majorFocus && { borderColor: '#172554' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={majorData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!majorFocus ? 'Choose major' : '...'}
        searchPlaceholder="Search..."
        search={false}
        value={formData.major}
        onFocus={() => setMajorFocus(true)}
        onBlur={() => setMajorFocus(false)}
        onChange={item => {
          setFormData(prev => ({ ...prev, major: item.value }));
          setMajorFocus(false);
        }}
      />

      <Text style={styles.label}>Graduation Date</Text>
      <Dropdown
        style={[styles.dropdown, graduationDateFocus && { borderColor: '#172554' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={graduationDateData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!graduationDateFocus ? 'Choose graduation date' : '...'}
        searchPlaceholder="Search..."
        search={false}
        value={formData.graduationDate}
        onFocus={() => setGraduationDateFocus(true)}
        onBlur={() => setGraduationDateFocus(false)}
        onChange={item => {
          setFormData(prev => ({ ...prev, graduationDate: item.value }));
          setGraduationDateFocus(false);
        }}
      />

      <TouchableOpacity 
        style={styles.continueButton} 
        onPress={handleSubmit}
      >
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
  dropdown: {
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
    borderRadius: 30,
    height: 44,
    marginBottom: 20,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    paddingLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});

export default AcademicForm;
