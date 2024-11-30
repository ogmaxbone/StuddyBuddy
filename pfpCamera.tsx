import { launchImageLibrary, Asset, launchCamera } from 'react-native-image-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Alert } from 'react-native';
import { useState } from 'react';
import { Image } from 'react-native-compressor';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useAppDispatch, useAppSelector } from './hooks';
import { setUserData } from './slice';

export const useCameraHook2 = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const userData = useAppSelector((state) => state.user);
    const myUID = userData.uid;

    const uploadImageAndGetURL = async (imagePath: string): Promise<string> => {
        try {
            const reference = storage().ref(`avatars/${myUID}`);
            await reference.putFile(imagePath);
            return await reference.getDownloadURL();
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const updateProfilePicture = async (imageUri: string) => {
        setLoading(true);
        try {
            if (!myUID) {
                throw new Error('User ID not found');
            }

            const userDocRef = firestore().collection('users').doc(myUID);
            const url = await uploadImageAndGetURL(imageUri);
            
            await userDocRef.update({ avatar: url });
            dispatch(setUserData({ avatar: url }));
            
            Alert.alert('Success', 'Profile picture updated successfully');
        } catch (error) {
            console.error('Error updating profile picture:', error);
            Alert.alert('Error', 'Failed to update profile picture. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageSelection = async (uri: string) => {
        try {
            const compressedUri = await Image.compress(uri, {
                compressionMethod: 'manual',
                maxWidth: 800,
                maxHeight: 800,
                quality: 0.1,
            });
            await updateProfilePicture(compressedUri);
        } catch (error) {
            console.error('Error processing image:', error);
            Alert.alert('Error', 'Failed to process image. Please try again.');
        }
    };

    const openCamera = async () => {
        const permission = await request(PERMISSIONS.IOS.CAMERA);
        if (permission !== RESULTS.GRANTED) {
            Alert.alert(
                'Permission Required',
                'Please enable camera access in your device settings.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
            );
            return;
        }

        launchCamera({
            mediaType: 'photo',
            includeBase64: false,
            cameraType: 'front',
            maxWidth: 800,
            maxHeight: 800,
            quality: 1,
        }, async (response) => {
            if (response.didCancel || response.errorMessage) return;
            
            const asset = response.assets?.[0];
            if (asset?.uri) {
                await handleImageSelection(asset.uri);
            }
        });
    };

    const openLibrary = async () => {
        const permission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (permission !== RESULTS.GRANTED) {
            Alert.alert(
                'Permission Required',
                'Please enable photo library access in your device settings.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
            );
            return;
        }
        console.log('test',myUID);
        launchImageLibrary({
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
            presentationStyle: 'popover',
            quality: 1,
        }, async (response) => {
            if (response.didCancel || response.errorMessage) return;
            
            const asset = response.assets?.[0];
            if (asset?.uri) {
                await handleImageSelection(asset.uri);
            }
        });
    };

    const showOptions = () => {
        Alert.alert(
            'Choose Profile Picture',
            'Your profile picture helps your friends recognize you and will be visible to everyone.',
            [
                {
                    text: 'Photo Library',
                    onPress: openLibrary,
                    style: 'default',
                },
                {
                    text: 'Camera',
                    onPress: openCamera,
                    style: 'default',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    return { showOptions, loading };
};

export default useCameraHook2;