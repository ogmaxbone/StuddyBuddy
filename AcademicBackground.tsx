import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import AcademicForm from './AcademicForm';
import BackButton from './BackButton';
import SignUpForm from './SignUpForm';

type RootStackParamList = {
    SignUp: undefined;
    AcademicScreen: undefined;
    StudyScreen: undefined;
  };

  
const AcademicScreen: React.FC = () => {
  // Access the navigation prop
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSubmit = () => {
    // Navigate to AcademicScreen
    navigation.navigate('StudyScreen');
  };

  return (
    <View style={styles.container}>
         <BackButton />
      <Image
        source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/992ceab560384b3926d9ef05d76326aa12c3e494a33455878dc7b5bf7883a752?placeholderIfAbsent=true&apiKey=3ec34e30ebf54f81be6ec584986e725a" }}
        style={styles.logo}
      />
     <Text style={[styles.title,{color:"#172554"}]}>Academic Background</Text>
      <AcademicForm onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 44,
    paddingBottom: 80,
    backgroundColor: 'white',

  },
  logo: {
    width: 194,
    aspectRatio: 1.15,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 24,
  },
});

export default AcademicScreen;