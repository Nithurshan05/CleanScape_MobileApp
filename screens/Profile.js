import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../config';
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore methods
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // To select an image from local storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../config'; // Firebase storage

export function Profile() {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [profileName, setProfileName] = useState('John'); // Default profile name
  useEffect(() => {
    // Fetch user data from Firestore on component mount
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, "User Register"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // Assuming the document has a 'fullname' field
          setFullname(doc.data().fullname);
          setEmail(doc.data().email);
          setAddress(doc.data().address);
          setGender(doc.data().gender);
          setMobile(doc.data().mobile);
          setImageURL(doc.data().imageURL || ''); // Set image URL if available
        });
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchUserData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      // Update user details in Firestore
      // Replace the update logic as necessary (e.g., using setDoc or updateDoc)
      alert('User Details Updated successfully!');
    } catch (error) {
      console.error("Error updating user details: ", error);
      alert('Error updating details');
    }
  };
  const handleImagePick = async () => {
    // Request camera roll permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }
    // Pick an image
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!pickerResult.cancelled) {
      const imageUri = pickerResult.uri;
      setImageURL(imageUri);
      // Optionally upload image to Firebase Storage
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `avatars/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const imageURL = await getDownloadURL(storageRef);   
      // Update imageURL in Firestore
      // You can save the URL in Firestore if needed
      alert('Avatar updated successfully!');
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image 
            source = {require("../assets/images/Icons/SamplePic.jpg")}
            style={styles.profileImage} 
          />
          <TouchableOpacity onPress={handleImagePick}>
            <FontAwesome name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{fullname || profileName}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🪙</Text>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Task Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>📝</Text>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Complaints</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>⚠️</Text>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Recent Complaints Section */}
      <View style={styles.complaintBox}>
        <TouchableOpacity onPress={() => navigation.navigate('AllComplaints')}>
          <Text style={styles.sectionLink}>Recent Complaints</Text>
        </TouchableOpacity>
      </View>

      {/* User Profile Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="gray"
            value={fullname}
            onChangeText={setFullname}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="gray"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Gender"
            placeholderTextColor="gray"
            value={gender}
            onChangeText={setGender}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            placeholderTextColor="gray"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#3CA680',
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImageContainer: {

    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
   complaintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7E8',
    padding: 15,
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E0F7E8',
    paddingVertical: 20,
    margin: 20,
    borderRadius: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 30,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  sectionLink: {
    fontSize: 16,
    color: '#3CA680',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#3CA680',
    paddingVertical: 15,
    marginVertical: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
