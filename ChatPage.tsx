import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Send } from 'react-native-feather';
import FastImage from 'react-native-fast-image';
import { useAppSelector } from './hooks';
import firestore from '@react-native-firebase/firestore';
import BackButton from './BackButton';

interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: any;
    senderName?: string; // Add these if you want to show who sent the message
    senderUsername?: string;
}

const ChatPage = ({ route, navigation }: { route: any; navigation: any }) => {
  const { groupId, groupName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchGroupAndMessages = async () => {
      // First check if user is member of the group
      const groupDoc = await firestore()
        .collection('groups')
        .doc(groupId)
        .get();
  
      const groupData = groupDoc.data();
      if (!groupData?.members?.includes(userData.username)) {
        navigation.goBack();
        return;
      }
  
      // If user is a member, subscribe to messages
      const unsubscribe = firestore()
        .collection('groups')
        .doc(groupId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          const messagesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Message[];
          setMessages(messagesData);
        });
  
      return () => unsubscribe();
    };
  
    fetchGroupAndMessages();
  }, [groupId, userData.username]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
        await firestore()
            .collection('groups')
            .doc(groupId)
            .collection('messages')
            .add({
                text: message,
                senderId: userData.uid,
                senderName: userData.name,
                senderUsername: userData.username,
                timestamp: firestore.FieldValue.serverTimestamp(),
            });
        setMessage('');
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

  const renderMessage = ({ item }: { item: Message }) => {
    const isMyMessage = item.senderId === userData.uid;

    return (
      <View style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessage : styles.theirMessage
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -10 : 0}
    >
      <BackButton />
      <Text style={styles.headerTitle}>{groupName}</Text>
  
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={styles.messagesContainer}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Send stroke="#FFFFFF" width={20} height={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  placeholder: {
    width: 30, // Same width as BackButton for centering
  },
  messagesContainer: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#172554',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginBottom: Platform.OS === "ios" ? 0 : 20,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    marginBottom: 20
  },
  sendButton: {
    backgroundColor: '#172554',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatPage;