import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import BackButton from './BackButton';
import { Dropdown } from 'react-native-element-dropdown';
import InputField from './InputField';
import { useAppSelector } from './hooks';



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
  
  const subjectData = [
    { label: 'Computer Science', value: 'cs' },
    { label: 'Mathematics', value: 'math' },
    { label: 'Physics', value: 'physics' },
    { label: 'Chemistry', value: 'chemistry' },
    { label: 'Biology', value: 'biology' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Business', value: 'business' },
    { label: 'Economics', value: 'economics' },
    { label: 'Psychology', value: 'psychology' },
    { label: 'Literature', value: 'literature' }
  ];
const CreateGroup = ({ navigation }: { navigation: any }) => {
    const [groupName, setGroupName] = useState('');
    const [studyTime, setStudyTime] = useState('');
    const [groupSize, setGroupSize] = useState('');
    const [subject, setSubject] = useState('');
    const [subjectFocus, setSubjectFocus] = useState(false);
    const [studyDuration, setStudyDuration] = useState('');
    const [demographic, setDemographic] = useState('');
    const [studyTimeFocus, setStudyTimeFocus] = useState(false);
    const [groupSizeFocus, setGroupSizeFocus] = useState(false);
    const [studyDurationFocus, setStudyDurationFocus] = useState(false);
    const [demographicFocus, setDemographicFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userData = useAppSelector((state) => state.user);
    
    const createGroup = async () => {
      if (!groupName || !studyTime || !groupSize || !studyDuration || !demographic || !subject) {
        Alert.alert('Error', 'Please fill out all fields');
        return;
    }
     setIsLoading(true);
        try {
            await firestore().collection('groups').add({
                groupName,
                studyTime,
                groupSize,
                studyDuration,
                demographic,
                subject,
                members: [userData.username],
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
            Alert.alert('Success', 'Group created successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error creating group: ', error);
            Alert.alert('Error', 'Could not create group');
        }
        finally {
            setIsLoading(false);
        }
    };

  return (
    <View style={styles.container}>
           <BackButton />
      <Text style={styles.title}>Create group</Text>
      <Text style={styles.label}>Group name</Text>
<TextInput
  style={styles.input}
  placeholder="Enter group name"
  value={groupName}
  onChangeText={setGroupName}
  autoCapitalize="none"
  placeholderTextColor={"black"}
  
/>
<Text style={styles.label}>Subject</Text>
        <Dropdown
            style={[styles.dropdown, subjectFocus && { borderColor: '#172554' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={subjectData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!subjectFocus ? 'Choose subject' : '...'}
            onFocus={() => setSubjectFocus(true)}
            onBlur={() => setSubjectFocus(false)}
            onChange={item => {
                setSubject(item.value);
                setSubjectFocus(false);
            }}
            value={subject}
            //search
            searchPlaceholder="Search..."
        />
      
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
        onChange={item => {
            setStudyTime(item.value);
            setStudyTimeFocus(false);
        }}
        value={studyTime}
        onFocus={() => setStudyTimeFocus(true)}
        onBlur={() => setStudyTimeFocus(false)}

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
       
        onFocus={() => setGroupSizeFocus(true)}
        onBlur={() => setGroupSizeFocus(false)}
        onChange={item => {
            setGroupSize(item.value);
            setGroupSizeFocus(false);
        }}
        value={groupSize}
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
       // value={studyDuration}
        onFocus={() => setStudyDurationFocus(true)}
        onBlur={() => setStudyDurationFocus(false)}
        onChange={item => {
            setStudyDuration(item.value);
            setStudyDurationFocus(false);
        }}
        value={studyDuration}
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
       // value={demographic}
        onFocus={() => setDemographicFocus(true)}
        onBlur={() => setDemographicFocus(false)}
        onChange={item => {
            setDemographic(item.value);
            setDemographicFocus(false);
        }}
        value={demographic}
      />
<TouchableOpacity 
    style={styles.createButton} 
    onPress={createGroup}
    disabled={isLoading}
>
    {isLoading ? (
        <ActivityIndicator color="white" size="small" />
    ) : (
        <Text style={styles.createButtonText}>Create</Text>
    )}
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 30,
    color: '#000000',
    marginTop: 40,
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 30,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#172554',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
    borderRadius: 30,
    height: 44,
    marginBottom: 20,
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

export default CreateGroup;
