import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';

export function Notification({ navigation }) {
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]); // State for notifications

  useEffect(() => {
    const fetchAllComplaintsAndNotifications = async () => {
      const categories = ['Garbage Complaint', 'StreetLight Complaints', 'Road Complaints'];
      let allComplaints = [];
      let allNotifications = [];

      // Fetch complaints from various categories
      for (const category of categories) {
        const querySnapshot = await getDocs(collection(db, category));
        const complaintsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          category,
        }));
        allComplaints = [...allComplaints, ...complaintsData];
      }

      // Fetch notifications from the Notification collection
      const notificationSnapshot = await getDocs(collection(db, 'Notification'));
      allNotifications = notificationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComplaints(allComplaints);
      setNotifications(allNotifications);
    };

    fetchAllComplaintsAndNotifications();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>{notification.title || "Notification"}</Text>
            <Text style={styles.notificationContent}>{notification.message || "No content available"}</Text>
          </View>
        ))}
        {complaints.map((complaint) => (
          <TouchableOpacity
            key={complaint.id}
            style={styles.complaintCard}
            onPress={() => navigation.navigate('ComplaintDetails', { complaintId: complaint.id, category: complaint.category })}
          >
            <Image style={styles.complaintIcon} source={renderCategoryImage(complaint.category)} />
            <View style={styles.complaintDetails}>
              <Text style={styles.complaintType}>{complaint.category}</Text>
              <Text style={styles.complaintLocation}>{complaint.address || "Location not specified"}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  complaintCard: {
    flexDirection: 'row',
    backgroundColor: '#D0F8EB',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  complaintIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  complaintDetails: {
    flex: 1,
  },
  complaintType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  complaintLocation: {
    fontSize: 14,
    color: 'gray',
  },
  notificationCard: {
    backgroundColor: '#FFF4E1',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationContent: {
    fontSize: 14,
    color: 'gray',
  },
});
