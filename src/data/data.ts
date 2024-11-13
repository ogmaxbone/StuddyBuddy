export interface OnboardingData {
  id: number;
  animation: any; // We'll type this as 'any' temporarily to rule out type issues
  text: string;
  textColor: string;
  subText: string;
  backgroundColor: string;
}
const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../assets/animations/Lottie1.json'),
    text: 'Find Your Study Buddies',
    subText: 'Connect with like-minded students who share your academic goals and schedule',
    textColor: '#172554',
    backgroundColor: 'white',
  },
  {
    id: 2,
    animation: require('../assets/animations/Lottie2.json'),
    text: 'Effortless Organization',
    subText: 'Schedule and coordinate study sessions with real-time updates and reminders',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: require('../assets/animations/Lottie3.json'),
    text: 'Better Together',
    subText: 'Boost your academic success through meaningful peer collaboration',
    textColor: '#172554',
    backgroundColor: 'white',
  },
];

export default data;