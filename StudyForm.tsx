import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSignUp } from './SignupContext';
interface StudyFormProps {
  onSubmit: () => void;
}

const StudyForm: React.FC<StudyFormProps> = ({ onSubmit }) => {
  const { updateSignUpData } = useSignUp();

  const studyTimeData = [
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
  ];

  const groupSizeData = [
    { label: 'Small (2-3 people)', value: 'small' },
    { label: 'Medium (4-6 people)', value: 'medium' },
    { label: 'Large (7+ people)', value: 'large' },
  ];

  const studyDurationData = [
    { label: '30 minutes', value: '30min' },
    { label: '1 hour', value: '1hr' },
    { label: '2 hours', value: '2hrs' },
    { label: '3+ hours', value: '3hrs_plus' },
  ];

  const demographicData = [
    { label: 'Local', value: 'local' },
    { label: 'International', value: 'international' },
  ];

  const [formData, setFormData] = useState({
    studyTime: '',
    groupSize: '',
    studyDuration: '',
    demographic: ''
  });

  // Focus states
  const [studyTimeFocus, setStudyTimeFocus] = useState(false);
  const [groupSizeFocus, setGroupSizeFocus] = useState(false);
  const [studyDurationFocus, setStudyDurationFocus] = useState(false);
  const [demographicFocus, setDemographicFocus] = useState(false);

  const validateForm = () => {
    if (!formData.studyTime) {
      Alert.alert('Error', 'Please select your preferred study time');
      return false;
    }
    if (!formData.groupSize) {
      Alert.alert('Error', 'Please select your preferred group size');
      return false;
    }
    if (!formData.studyDuration) {
      Alert.alert('Error', 'Please select your preferred study duration');
      return false;
    }
    if (!formData.demographic) {
      Alert.alert('Error', 'Please select your preferred demographic');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Get the label values instead of codes
      const studyTimeLabel = studyTimeData.find(item => item.value === formData.studyTime)?.label;
      const groupSizeLabel = groupSizeData.find(item => item.value === formData.groupSize)?.label;
      const studyDurationLabel = studyDurationData.find(item => item.value === formData.studyDuration)?.label;
      const demographicLabel = demographicData.find(item => item.value === formData.demographic)?.label;

      // Update the signup context
      updateSignUpData({
        studyPreferences: {
          preferredTime: studyTimeLabel,
          preferredGroupSize: groupSizeLabel,
          preferredDuration: studyDurationLabel,
          preferredDemographic: demographicLabel
        }
      });

      onSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Preferred Study Time</Text>
      <Dropdown
        style={[styles.dropdown, studyTimeFocus && { borderColor: '#172554' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={studyTimeData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!studyTimeFocus ? 'Choose preferred time' : '...'}
        value={formData.studyTime}
        onFocus={() => setStudyTimeFocus(true)}
        onBlur={() => setStudyTimeFocus(false)}
        onChange={item => {
          setFormData(prev => ({ ...prev, studyTime: item.value }));
          setStudyTimeFocus(false);
        }}
      />

      <Text style={styles.label}>Preferred Group Size</Text>
      <Dropdown
        style={[styles.dropdown, groupSizeFocus && { borderColor: '#172554' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={groupSizeData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!groupSizeFocus ? 'Choose group size' : '...'}
        value={formData.groupSize}
        onFocus={() => setGroupSizeFocus(true)}
        onBlur={() => setGroupSizeFocus(false)}
        onChange={item => {
          setFormData(prev => ({ ...prev, groupSize: item.value }));
          setGroupSizeFocus(false);
        }}
      />

      <Text style={styles.label}>Preferred Study Duration</Text>
      <Dropdown
        style={[styles.dropdown, studyDurationFocus && { borderColor: '#172554' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={studyDurationData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!studyDurationFocus ? 'Choose study duration' : '...'}
        value={formData.studyDuration}
        onFocus={() => setStudyDurationFocus(true)}
        onBlur={() => setStudyDurationFocus(false)}
        onChange={item => {
          setFormData(prev => ({ ...prev, studyDuration: item.value }));
          setStudyDurationFocus(false);
        }}
      />

      <Text style={styles.label}>Preferred Demographic</Text>
      <Dropdown
        style={[styles.dropdown, demographicFocus && { borderColor: '#172554' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={demographicData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!demographicFocus ? 'Choose demographic' : '...'}
        value={formData.demographic}
        onFocus={() => setDemographicFocus(true)}
        onBlur={() => setDemographicFocus(false)}
        onChange={item => {
          setFormData(prev => ({ ...prev, demographic: item.value }));
          setDemographicFocus(false);
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

export default StudyForm;
