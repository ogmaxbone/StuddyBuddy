import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import BackButton from './BackButton';
import { useAppSelector } from './hooks';
import FastImage from 'react-native-fast-image';

// Add interface for group details and rest of the code...

interface GroupDetails {
    id: string;
    groupName: string;
    members: string[];
    demographic: string;
    groupSize: string;
    studyDuration: string;
    studyTime: string;
    subject: string;
    createdAt: any;
  }
  
  const GroupDetailsScreen = ({ route, navigation }: { route: any; navigation: any }) => {
    const { groupId } = route.params;
    const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  
    useEffect(() => {
      const fetchGroupDetails = async () => {
        const doc = await firestore().collection('groups').doc(groupId).get();
        if (doc.exists) {
          setGroupDetails({ id: doc.id, ...doc.data() as Omit<GroupDetails, 'id'> });
        }
      };
      
      fetchGroupDetails();
    }, [groupId]);
  
    if (!groupDetails) return null;
  
    const formatValue = (value: string) => {
      switch (value) {
        case 'morning': return 'Morning';
        case 'evening': return 'Evening';
        case 'afternoon': return 'Afternoon';
        case 'small': return 'Small (2-3 people)';
        case 'medium': return 'Medium (4-6 people)';
        case 'large': return 'Large (7+ people)';
        case '30min': return '30 Minutes';
        case '1hr': return '1 Hour';
        case '2hrs': return '2 Hours';
        case '3hrs_plus': return '3+ Hours';
        case 'local': return 'Local';
        case 'international': return 'International';
        default: return value;
      }
    };
  
    return (
      <View style={styles.container}>
        <BackButton />
        <View style={styles.header}>
          <Text style={styles.groupName}>{groupDetails.groupName}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{groupDetails.subject.toUpperCase()}</Text>
          </View>
        </View>
  
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Study Time</Text>
            <Text style={styles.value}>{formatValue(groupDetails.studyTime)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Group Size</Text>
            <Text style={styles.value}>{formatValue(groupDetails.groupSize)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>{formatValue(groupDetails.studyDuration)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Demographic</Text>
            <Text style={styles.value}>{formatValue(groupDetails.demographic)}</Text>
          </View>
        </View>
  
        <Text style={styles.sectionTitle}>Members</Text>
        <FlatList
          data={groupDetails.members}
          renderItem={({ item }) => (
            <View style={styles.memberItem}>
              <View style={styles.memberAvatar}>
                <Text style={styles.avatarText}>{item[0].toUpperCase()}</Text>
              </View>
              <Text style={styles.memberName}>@{item}</Text>
            </View>
          )}
          keyExtractor={(item) => item}
        />
  
        <TouchableOpacity 
          style={styles.joinButton}
          onPress={() => navigation.navigate('ChatPage', { 
            groupId: groupDetails.id,
            groupName: groupDetails.groupName 
          })}
        >
          <Text style={styles.joinButtonText}>Join Group Chat</Text>
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
    header: {
      marginTop: 60,
      marginBottom: 24,
    },
    groupName: {
      fontSize: 24,
      fontWeight: '600',
      //marginBottom: 8,
      textAlign: 'center',
      marginTop: -20,
      marginBottom: 30
    },
    badge: {
      backgroundColor: '#172554',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 16,
      alignSelf: 'flex-start',
    },
    badgeText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '500',
    },
    infoSection: {
      backgroundColor: '#F8FAFC',
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    label: {
      color: '#64748B',
      fontSize: 14,
    },
    value: {
      color: '#0F172A',
      fontSize: 14,
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    memberItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
            
    },
    memberAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#172554',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    avatarText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
    },
    memberName: {
      fontSize: 16,
      color: '#0F172A',
    },
    joinButton: {
      backgroundColor: '#172554',
      padding: 16,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 'auto',
    },
    joinButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  export default GroupDetailsScreen;