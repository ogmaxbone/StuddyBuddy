import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BackButton from './BackButton';

type InterestButtonProps = {
  emoji: string;
  text: string;
  isSelected: boolean;
  onPress: () => void;
};

const InterestButton: React.FC<InterestButtonProps> = ({ emoji, text, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.interestButton, isSelected && styles.selectedInterestButton]}
  >
    <Text style={isSelected ? styles.selectedInterestText : styles.interestText}>
      {emoji} {text}
    </Text>
  </TouchableOpacity>
);

const interests = [
  { emoji: '💪', text: 'Fitness' },
  { emoji: '📸', text: 'Photography' },
  { emoji: '🎮', text: 'Gaming' },
  { emoji: '✈️', text: 'Traveling' },
  { emoji: '🎵', text: 'Music' },
  { emoji: '🍃', text: 'Nature' },
  { emoji: '🍿', text: 'Movies & TV Shows' },
  { emoji: '📚', text: 'Reading' },
  { emoji: '🧑‍🍳', text: 'Cooking' },
  { emoji: '🖼️', text: 'Art' },
  { emoji: '💃', text: 'Dancing' },
  { emoji: '💻', text: 'Technology' },
];

const InterestsSelection: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < 3
        ? [...prev, interest]
        : prev
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
       
      <View style={styles.innerContainer}>  <BackButton />
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/992ceab560384b3926d9ef05d76326aa12c3e494a33455878dc7b5bf7883a752?placeholderIfAbsent=true&apiKey=3ec34e30ebf54f81be6ec584986e725a",
          }}
          style={styles.logo}
          accessibilityLabel="App logo"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Select up to <Text style={[styles.titleText,{color:"#172554"}]}>3 interests</Text></Text>
        </View>
        <View style={styles.interestsContainer}>
          {interests.map((interest) => (
            <InterestButton
              key={interest.text}
              emoji={interest.emoji}
              text={interest.text}
              isSelected={selectedInterests.includes(interest.text)}
              onPress={() => toggleInterest(interest.text)}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {/* Handle sign up */}}
          accessibilityLabel="Sign up"
          accessibilityRole="button"
        >
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
    maxWidth: 480,
    width: '100%',
  },
  logo: {
    width: 194,
    aspectRatio: 1.15,
    resizeMode: 'contain',
    marginTop: 22.5
  },
  titleContainer: {
    marginTop: 10,
  },
  titleText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: -10
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
    width: '100%',
  },
  interestButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 30,
    backgroundColor: 'white',
    margin: 5,
  },
  selectedInterestButton: {
    backgroundColor: '#172554',
  },
  interestText: {
    color: '#000',
    fontSize: 14,
  },
  selectedInterestText: {
    color: '#fff',
    fontSize: 14,
  },
  signUpButton: {
   // paddingHorizontal: 40,
   width: '100%',
    paddingVertical: 16,
    marginTop: 24,
    backgroundColor: '#172554',
    borderRadius: 30,
    borderColor: '#d1d5db',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default InterestsSelection;
