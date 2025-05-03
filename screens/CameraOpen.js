import { MediaType, createAssetAsync, requestPermissionsAsync } from 'expo-media-library';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, PermissionsAndroid, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export function Camera({navigation}) {
    const [cameraPhoto, setCameraPhoto] = useState(null);
    const [saveMessage, setSaveMessage] = useState('');
    let options = {
        saveToPhotos: true,
        mediaType: MediaType.photo,
    };
    const openCamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await ImagePicker.launchCameraAsync(options);
            if (!result.cancelled) {
                setCameraPhoto(result.assets[0].uri);
                setSaveMessage('');  // Reset save message
            }
        }
    };
    const saveToGallery = async () => {
        if (cameraPhoto) {
            const { status } = await requestPermissionsAsync();  // Request media library permissions
            if (status === 'granted') {
                try {
                    await createAssetAsync(cameraPhoto);  // Save photo to gallery
                    setSaveMessage('Saved to Gallery');  // Display success message
                } catch (error) {
                    Alert.alert('Error', 'Failed to save photo to gallery.');
                }
            } else {
                Alert.alert('Permission Denied', 'Media library permission is required to save photos.');
            }
        } else {
            Alert.alert('No Photo', 'Please capture a photo before saving.');
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer} onPress={openCamera}>
                <Image style={styles.icon} source={require('../assets/images/openCamera.png')} />
                <Text style={styles.iconText}>Open Camera</Text>
            </TouchableOpacity>
            {cameraPhoto && (
                <Image style={styles.imagePreview} source={{ uri: cameraPhoto }} />
            )}
            <TouchableOpacity style={styles.saveButton} onPress={saveToGallery}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <View>
            <TouchableOpacity style={styles.complientButton} onPress={() => navigation.navigate("Complient")}>
                <Text style={styles.buttonText}>Complient >>></Text>
            </TouchableOpacity>
            </View>
            {saveMessage ? <Text style={styles.saveMessage}>{saveMessage}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3CA680',
    },
    iconContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    icon: {
        width: 45,
        height: 45,
    },
    iconText: {
        marginTop: 8,
        fontSize: 16,
        color: '#333',
    },
    imagePreview: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
    saveButton: {
        backgroundColor: 'yellow', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    complientButton: {
        backgroundColor: 'yellow', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',  // White text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveMessage: {
        marginTop: 15,
        fontSize: 16,
        color: '#fff',
    },
});
