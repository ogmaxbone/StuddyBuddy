import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';


type MeetingItem = {
  id: string;
  groupName: string;
  date: string;
  time: string;
  avatars: string[];
};




const mockData: MeetingItem[] = [
  {
    id: '1',
    groupName: 'Tree Traversal Techniques',
    date: '10/11',
    time: '4:00 pm',
    avatars: [
      'https://via.placeholder.com/40', // Replace with actual avatar URLs
      'https://via.placeholder.com/40',
    ],
  },
  {
    id: '2',
    groupName: 'Inheritance & Polymorphism',
    date: '10/11',
    time: '6:00 pm',
    avatars: [
      'https://via.placeholder.com/40',
      'https://via.placeholder.com/40',
    ],
  },
  {
    id: '3',
    groupName: 'Process Scheduling Algorithms',
    date: '10/12',
    time: '6:00 pm',
    avatars: [
      'https://via.placeholder.com/40',
      'https://via.placeholder.com/40',
    ],
  },
];

const HomePage = () => {
  // Handle sign out
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const renderCard = ({ item }: { item: MeetingItem }) => (
    <View style={styles.card}>
      <Text style={styles.groupName}>Group Name</Text>
      <Text style={styles.cardTitle}>{item.groupName}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardTime}>
          {`${item.date} at ${item.time}`}
        </Text>
        <View style={styles.avatars}>
          {item.avatars.map((avatar, index) => (
            <Image
              key={index}
              source={{ uri: avatar }}
              style={styles.avatar}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meetings</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleButtonActive}>
          <Text style={styles.toggleTextActive}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>Ended</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mockData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

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
    color: '#000000',
    marginBottom: 20,
    marginTop: 80,
       
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  toggleButtonActive: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#172554',
    marginHorizontal: 5,
  },
  toggleText: {
    color: '#000000',
    fontSize: 14,
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#172554',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  groupName: {
    color: '#D1D5DB',
    fontSize: 12,
    marginBottom: 5,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTime: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  avatars: {
    flexDirection: 'row',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: -10,
    borderWidth: 2,
    borderColor: '#172554',
  },
  signOutButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
