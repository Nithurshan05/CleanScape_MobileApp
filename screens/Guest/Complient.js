import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import { MediaType, createAssetAsync, requestPermissionsAsync } from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { db } from '../../config';
import { collection, addDoc } from "firebase/firestore";

export function Complient({navigation}) {
  const [images, setImages] = useState([]);
  const [typeOfWaste, setTypeOfWaste] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState(null);
  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission to access location was denied.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(`${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}`);
    })();
  }, []);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.cancelled) {
      const selectedImageUri = result.assets[0].uri;
      setImages([selectedImageUri]);
      setImageUrl(selectedImageUri); // Update to set the URI of the selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Guest Complaints"), {
        images,
        type_of_waste: typeOfWaste,
        address,
        date,
        location,
      });
      Alert.alert('Compliants Submitted", "Your data has been uploaded!');
      // Clear the form after submission
      setImages('');
      setTypeOfWaste('');
      setAddress('');
      setDate('');
      setLocation('');
      setImageUrl('');
    } catch (error) {
      console.error("Error to Uploading: ", error);
      alert('Error Uploading');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Image Upload Area */}
        <TouchableOpacity style={styles.imageUploadBox} onPress={openGallery}>
          {images.length === 0 ? (
            <Image source={require('../../assets/images/OpenGallery.png')} style={styles.placeholderIcon} />
          ) : (
            <ScrollView horizontal>
              {images.map((img, index) => (
                <Image key={index} source={{ uri: img }} style={styles.imagePreview} />
              ))}
            </ScrollView>
          )}
        </TouchableOpacity>

        {/* Display Image URL */}
        {imageUrl ? <Text style={styles.imageUrlText}>{imageUrl}</Text> : null}

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Type of Waste"
          value={typeOfWaste}
          onChangeText={setTypeOfWaste}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
        />

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
          <Text style={styles.uploadButtonText}>UPLOAD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButton} onPress={()=>{navigation.navigate("GuestHome")}}>
          <Text style={styles.uploadButtonText}>Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FAF5',
    alignItems: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  imageUploadBox: {
    width: 350,
    height: 250,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    borderRadius: 10,
  },
  placeholderIcon: {
    width: 50,
    height: 50,
    tintColor: '#aaa',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  imageUrlText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#B7E2D3',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    width: '90%',
    backgroundColor: '#3CA680',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
imagePreview: {
    width: 350,
    height: 250,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
},
});
