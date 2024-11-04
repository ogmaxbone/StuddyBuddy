import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface StudyFormProps {
  onSubmit: () => void;
}

const StudyForm: React.FC<StudyFormProps> = ({ onSubmit }) => {
  // Data for each dropdown
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

  // State for each dropdown
  const [studyTime, setStudyTime] = useState<string | null>(null);
  const [groupSize, setGroupSize] = useState<string | null>(null);
  const [studyDuration, setStudyDuration] = useState<string | null>(null);
  const [demographic, setDemographic] = useState<string | null>(null);

  // Focus states for styling
  const [studyTimeFocus, setStudyTimeFocus] = useState(false);
  const [groupSizeFocus, setGroupSizeFocus] = useState(false);
  const [studyDurationFocus, setStudyDurationFocus] = useState(false);
  const [demographicFocus, setDemographicFocus] = useState(false);

  return (
    <View style={styles.container}>
      {/* Preferred Study Time Dropdown */}
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
        value={studyTime}
        onFocus={() => setStudyTimeFocus(true)}
        onBlur={() => setStudyTimeFocus(false)}
        onChange={item => {
          setStudyTime(item.value);
          setStudyTimeFocus(false);
        }}
      />

      {/* Preferred Group Size Dropdown */}
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
        value={groupSize}
        onFocus={() => setGroupSizeFocus(true)}
        onBlur={() => setGroupSizeFocus(false)}
        onChange={item => {
          setGroupSize(item.value);
          setGroupSizeFocus(false);
        }}
      />

      {/* Preferred Study Duration Dropdown */}
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
        value={studyDuration}
        onFocus={() => setStudyDurationFocus(true)}
        onBlur={() => setStudyDurationFocus(false)}
        onChange={item => {
          setStudyDuration(item.value);
          setStudyDurationFocus(false);
        }}
      />

      {/* Preferred Demographic Dropdown */}
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
        value={demographic}
        onFocus={() => setDemographicFocus(true)}
        onBlur={() => setDemographicFocus(false)}
        onChange={item => {
          setDemographic(item.value);
          setDemographicFocus(false);
        }}
      />

      {/* Continue Button */}
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
