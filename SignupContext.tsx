// contexts/SignUpContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'; 
import firestore from '@react-native-firebase/firestore'; 

interface SignUpData {
  // Basic Info (SignUp Screen)
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  // Academic Background
  university?: string;
  major?: string;
  graduationYear?: string;
  
  studyPreferences?: {
    preferredTime?: string;
    preferredGroupSize?: string;
    preferredDuration?: string;
    preferredDemographic?: string;
  };
  
  // Interests
  interests?: string[];  
}

interface SignUpContextType {
  signUpData: SignUpData;
  updateSignUpData: (newData: Partial<SignUpData>) => void;
  submitSignUpData: () => Promise<void>;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export function SignUpProvider({ children }: { children: ReactNode }) {
  const [signUpData, setSignUpData] = useState<SignUpData>({});

  const updateSignUpData = (newData: Partial<SignUpData>) => {
    setSignUpData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  const submitSignUpData = async () => {
    try {

              // Type guard validation
      if (!signUpData.email || !signUpData.password) {
        throw new Error('Email and password are required');
      }

      // First create the user account
      const userCredential = await auth().createUserWithEmailAndPassword(
        signUpData.email!,
        signUpData.password!
      );

      await auth().signInWithEmailAndPassword(
        signUpData.email.trim(),
        signUpData.password
      );

      // Get the user ID
      const uid = userCredential.user.uid;

      // Remove password from data to be stored
      const { password, ...dataToStore } = signUpData;

      // Store the user data in Firestore
      await firestore()
        .collection('users')
        .doc(uid)
        .set({
          ...dataToStore,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

    } catch (error) {
      console.error('Error during sign up:', error);
      throw error;
    }
  };

  return (
    <SignUpContext.Provider value={{ signUpData, updateSignUpData, submitSignUpData }}>
      {children}
    </SignUpContext.Provider>
  );
}

export function useSignUp() {
  const context = useContext(SignUpContext);
  if (undefined === context) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
}