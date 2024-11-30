import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useAppSelector } from './hooks';
import { Search } from 'react-native-feather';
import FastImage from 'react-native-fast-image';

interface MessagePreview {
  id: string;
  groupName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

const MessageScreen = ({ navigation }: { navigation: any }) => {
  const userData = useAppSelector((state) => state.user);
  const groups = useAppSelector((state) => state.user.groups);

  // Convert groups to MessagePreview format
  const messagePreviews: MessagePreview[] = groups
    .filter(group => group.members?.includes(userData.username))
    .map(group => ({
      id: group.id,
      groupName: group.groupName,
      lastMessage: 'No messages yet',
      timestamp: '4:02 PM',
      unreadCount: 0
    }));

  const renderMessageCard = ({ item }: { item: MessagePreview }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ChatPage', { 
        groupId: item.id,
        groupName: item.groupName 
      })}
    >
      <FastImage
        source={{ uri: 'https://via.placeholder.com/60' }}
        style={styles.avatar}
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.groupName}>{item.groupName}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unreadCount ? (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      
      <View style={styles.searchContainer}>
        <Search stroke="#9CA3AF" width={20} height={20} style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <FlatList
        data={messagePreviews}
        renderItem={renderMessageCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 80,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#1F2937',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
  },
  unreadBadge: {
    backgroundColor: '#172554',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MessageScreen;