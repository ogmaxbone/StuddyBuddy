import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const CustomProfilePic = ({ profileImageUrl, name, style }) => {
  // Function to generate initials from a name
  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  // Function to generate a random background color
  const getRandomBackgroundColor = () => {
    const colors = ['white']; // Add more colors as needed
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Placeholder URL for comparison
  const placeholderUrl = 'https://lirp.cdn-website.com/b0d45fe0/dms3rep/multi/opt/B-R_Field_Services_Logo-1-312w.jpg';
  //console.log(profileImageUrl);
  // Check if profileImageUrl matches the placeholder URL
  if (profileImageUrl === placeholderUrl || profileImageUrl === '') {
    // Display placeholder with initials
    return (
      <View style={[styles.initialsPlaceholder, { backgroundColor: getRandomBackgroundColor() }, style]}>
        <Text style={styles.initialsText}>{getInitials(name)}</Text>
      </View>
    );
  } else {
    // Display the profile image
    return (
      <View>
        <FastImage source={{ uri: profileImageUrl }} style={style} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  initialsPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    // Set a default size for the placeholder or make it dynamic based on props
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  initialsText: {
    color: 'black',
    // Adjust fontSize as needed
    fontSize: 44,
  },
});

export default CustomProfilePic;
