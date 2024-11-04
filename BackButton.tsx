// BackButton.tsx

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <ChevronLeft stroke="#172554" width={30} height={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 60, // adjust as needed for safe area compatibility
    left: 10,
    zIndex: 10,
  },
});

export default BackButton;
