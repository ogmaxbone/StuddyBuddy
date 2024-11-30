import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ChevronRight, Plus } from 'react-native-feather';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from './hooks';
import { setGroups } from './slice';
import CustomProfilePic from './pfp';
import {useCameraHook2} from './pfpCamera'
interface Group {
    id: string;
    groupName: string;
    studyTime: string;
    groupSize: string;
    studyDuration: string;
    demographic: string;
    image: string;
    createdAt: any;
  }

  
  

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const userData = useAppSelector((state) => state.user);
  const {showOptions} = useCameraHook2();

  const fetchGroups = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const groupsSnapshot = await firestore()
        .collection('groups')
        .orderBy('createdAt', 'desc')
        .get();

      const fetchedGroups: Group[] = groupsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          groupName: data.groupName || '',
          studyTime: data.studyTime || '',
          groupSize: data.groupSize || '',
          studyDuration: data.studyDuration || '',
          demographic: data.demographic || '',
          image: 'https://via.placeholder.com/60',
          createdAt: data.createdAt ? data.createdAt.toMillis() : null,
          members: data.members || [],
        };
      })
      .filter(group => group.members.includes(userData.username));
      dispatch(setGroups(fetchedGroups));
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };
  // Initial fetch when component mounts
  useEffect(() => {
    fetchGroups();
  }, []);

  // Refetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchGroups();
      return () => {};
    }, [])
  );

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const formatGroupSize = (size: string) => {
    switch (size) {
      case 'small': return 'Small';
      case 'medium': return 'Medium';
      case 'large': return 'Large';
      default: return size;
    }
  };
  
  const formatStudyTime = (time: string) => {
    switch (time) {
      case 'morning': return 'Morning';
      case 'afternoon': return 'Afternoon';
      case 'evening': return 'Evening';
      default: return time;
    }
  };
  
  const formatDuration = (duration: string) => {
    switch (duration) {
      case '30min': return '30 minutes';
      case '1hr': return '1 hour';
      case '2hrs': return '2 hours';
      case '3hrs_plus': return '3+ hours';
      default: return duration;
    }
  };

  const renderGroupCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <View style={styles.cardContent}>
        <Text style={styles.groupTitle}>{item.groupName}</Text>
        <Text style={styles.spotsText}>
        {formatGroupSize(item.groupSize)} · {formatStudyTime(item.studyTime)} · {formatDuration(item.studyDuration)}
        </Text>
      </View>
      <ChevronRight color={"white"} width={22} height={22} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
      <View style={styles.profileHeader}>

          <TouchableOpacity onPress={showOptions}>
          <CustomProfilePic
            profileImageUrl={userData.avatar}
            name={userData.name}
            style={styles.profileImage}
          />
           </TouchableOpacity>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.username}>@{userData.username}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>My groups</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateGroup')}
        >
          <Plus color={"white"} width={22} height={22} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={userData.groups}
        renderItem={renderGroupCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.groupList}
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 80,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  username: {
    fontSize: 16,
    color: '#666666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '500',
    color: '#000000',
  },
  addButton: {
    backgroundColor: '#172554',
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#172554',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  groupTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spotsText: {
    color: '#D1D5DB',
    fontSize: 14,
    marginTop: 1,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  signOutButton: {
    backgroundColor: '#172554',

    borderRadius: 10,
    position: 'absolute',
    right: 20,
    top: 55,
    padding: 10
    
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: -20,

   // padding: 10,
   // paddingTop: 55,
    marginBottom: 20,
  },
  

});

export default ProfileScreen;
