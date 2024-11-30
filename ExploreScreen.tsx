import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Search, Filter } from 'react-native-feather';
import { useAppSelector } from './hooks';
import firestore from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Category {
  emoji: string;
  text: string;
  value: string;
}

interface Group {
  id: string;
  groupName: string;
  members: string[];
  subject: string;
  [key: string]: any; // for other properties
}

type RootStackParamList = {
  ChatPage: { groupId: string; groupName: string };
  GroupDetailsScreen: { groupId: string; groupName: string }; // Add this line
};

type ExploreScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const categories: Category[] = [
  // STEM
  { emoji: '💻', text: 'Computer Science', value: 'cs' },
  { emoji: '〽️', text: 'Calculus', value: 'calc' },
  { emoji: '🧮', text: 'Mathematics', value: 'math' },
  { emoji: '🧬', text: 'Biology', value: 'biology' },
  { emoji: '⚗️', text: 'Chemistry', value: 'chemistry' },
  { emoji: '🔭', text: 'Physics', value: 'physics' },
  { emoji: '⚡', text: 'Engineering', value: 'engineering' },
  { emoji: '🧪', text: 'Lab Sciences', value: 'lab' },
  
  // Business & Economics
  { emoji: '💼', text: 'Business', value: 'business' },
  { emoji: '📊', text: 'Economics', value: 'economics' },
  { emoji: '📈', text: 'Finance', value: 'finance' },
  { emoji: '🎯', text: 'Marketing', value: 'marketing' },

  // Arts & Humanities
  { emoji: '🎨', text: 'Art', value: 'art' },
  { emoji: '📚', text: 'English', value: 'english' },
  { emoji: '🌎', text: 'History', value: 'history' },
  { emoji: '🗣️', text: 'Languages', value: 'languages' },
  { emoji: '🎭', text: 'Theater', value: 'theater' },
  { emoji: '🎵', text: 'Music', value: 'music' },

  // Social Sciences
  { emoji: '🧠', text: 'Psychology', value: 'psychology' },
  { emoji: '👥', text: 'Sociology', value: 'sociology' },
  { emoji: '⚖️', text: 'Law', value: 'law' },
  { emoji: '🏛️', text: 'Political Science', value: 'polisci' },
  { emoji: '📰', text: 'Communications', value: 'communications' },
  { emoji: '🤝', text: 'Social Work', value: 'socialwork' }
];


const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const userData = useAppSelector((state) => state.user);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const groupsSnapshot = await firestore()
        .collection('groups')
        .where('subject', '==', convertMajorToSubject(userData.major))
        .get();

      const fetchedGroups = groupsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          groupName: data.groupName || '',
          members: data.members || [],
          subject: data.subject || '',
          demographic: data.demographic || '',
          groupSize: data.groupSize || '',
          studyDuration: data.studyDuration || '',
          studyTime: data.studyTime || '',
          createdAt: data.createdAt || null
        } as Group;
      });

      setGroups(fetchedGroups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
};

  const convertMajorToSubject = (major: string): string => {
    const majorMap: { [key: string]: string } = {
      'Computer Science': 'cs',
      'Mathematics': 'math',
    };
    return majorMap[major] || major.toLowerCase();
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.value)}
      style={[
        styles.categoryButton,
        selectedCategory === item.value && styles.selectedCategoryButton
      ]}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item.value && styles.selectedCategoryText
      ]}>
        {item.emoji} {item.text}
      </Text>
    </TouchableOpacity>
  );

  const renderCourseCard = ({ item }: { item: Group }) => (
    <TouchableOpacity 
      style={styles.courseCard}
      onPress={() => navigation.navigate('GroupDetailsScreen', { 
        groupId: item.id,
        groupName: item.groupName 
      })}
    >
      <View style={styles.courseContent}>
        <Text style={styles.courseName}>{item.groupName}</Text>
        <View style={styles.availabilityContainer}>
          <View style={styles.dotIndicator} />
          <Text style={styles.availabilityText}>
            {`${item.members?.length || 0} ${item.members?.length === 1 ? 'member' : 'members'}`}
          </Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find groups</Text>
      
      <View style={styles.searchContainer}>
        <Search stroke="#9CA3AF" width={20} height={20} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter stroke="#FFFFFF" width={20} height={20} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      
      <View style={styles.categoryContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryRow}
  contentContainerStyle={styles.categoryRowContent}
      >
        {categories.slice(0, 4).map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => setSelectedCategory(item.value)}
            style={[
              styles.categoryButton,
              selectedCategory === item.value && styles.selectedCategoryButton
            ]}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === item.value && styles.selectedCategoryText
            ]}>
              {item.emoji} {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryRow}
        contentContainerStyle={styles.categoryRowContent}
      >
        {categories.slice(4, 8).map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => setSelectedCategory(item.value)}
            style={[
              styles.categoryButton,
              selectedCategory === item.value && styles.selectedCategoryButton
            ]}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === item.value && styles.selectedCategoryText
            ]}>
              {item.emoji} {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add more ScrollView rows as needed */}
    </View>
      <Text style={styles.sectionTitle}>Suggested Groups</Text>
      <FlatList
        data={groups}
        renderItem={renderCourseCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.groupsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 100,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingLeft: 16,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#172554',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  categoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#172554',
  },
  categoryText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  suggestedGroup: {
    backgroundColor: '#172554',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  groupName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  groupCount: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  arrowContainer: {
    marginLeft: 'auto',
  },
  courseCard: {
    backgroundColor: '#172554',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseContent: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  groupsList: {
    paddingBottom: 20,
  },
  categoryRow: {
    marginBottom: 10,
    paddingLeft: 20, // Keep left padding here
  },
  categoryRowContent: {
    paddingRight: 30, // Add right padding to ensure last item is fully visible
  },
  categoryButton: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    justifyContent: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
  },
});

export default ExploreScreen;