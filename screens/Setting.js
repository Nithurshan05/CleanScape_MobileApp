import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Switch, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { db } from '../config';
import { collection, addDoc } from "firebase/firestore";
export function Settings({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [rating, setRating] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const toggleDarkMode = () => setDarkMode((previousMode) => !previousMode);
const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      if (feedbackComment && rating) {
        await addDoc(collection(db, "Feedback"), {
          feedbackComment,
          rating,
          date: new Date(), // Optional: to store the current date and time
        });
        Alert.alert("Feedback Submitted", "Thank you for your feedback!");
        setFeedbackComment('');
        setRating('');
      } else {
        Alert.alert("Incomplete", "Please fill in both the comment and rating.");
      }
    } catch (error) {
      Alert.alert("Error", "There was an error submitting your feedback.");
      console.error("Error submitting feedback: ", error);
    } 
  };
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? ",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => Alert.alert("Account Deleted") }
      ]
    );
  };
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        {/* Feedback Section */}
        <TouchableOpacity style={styles.option} onPress={() => setShowFeedback(!showFeedback)}>
          <Text style={[styles.optionText, { color: darkMode ? '#fff' : '#000' }]}>Feedback</Text>
        </TouchableOpacity>
        {showFeedback && (
          <View style={styles.feedbackContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your feedback"
              placeholderTextColor="#888"
              value={feedbackComment}
              onChangeText={setFeedbackComment}
            />
            <TextInput
              style={styles.input}
              placeholder="Rate us (1-5)"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={rating}
              onChangeText={setRating}
            />
            <Button title="Submit Feedback" onPress={handleFeedbackSubmit} />
          </View>
        )}

        {/* Dark Mode Toggle */}
        <View style={styles.option}>
          <Text style={[styles.optionText, { color: darkMode ? '#fff' : '#000' }]}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        {/* Delete Account Option */}
        <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
          <Text style={[styles.optionText, { color: 'red' }]}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
    paddingTop: 50,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#D0F8EB',
    borderRadius: 10,
    marginVertical: 8,
  },
  optionText: {
    fontSize: 16,
  },
  feedbackContainer: {
    padding: 15,
    backgroundColor: '#e0f7f5',
    borderRadius: 10,
    marginVertical: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    padding: 8,
    marginBottom: 10,
    color: '#000',
  },
});

