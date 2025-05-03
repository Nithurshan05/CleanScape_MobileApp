// AllComplaints.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';

export function AllComplaints({ navigation }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchAllComplaints = async () => {
      const categories = ['Garbage Complaint', 'StreetLight Complaints', 'Road Complaints'];
      let allComplaints = [];

      for (const category of categories) {
        const querySnapshot = await getDocs(collection(db, category));
        const complaintsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          category,
        }));
        allComplaints = [...allComplaints, ...complaintsData];
      }

      setComplaints(allComplaints);
    };

    fetchAllComplaints();
  }, []);

  const renderCategoryImage = (category) => {
    switch (category) {
      case 'Garbage Complaint':
        return require('../assets/images/garbage.png');
      case 'StreetLight Complaints':
        return require('../assets/images/street-light.png');
      case 'Road Complaints':
        return require('../assets/images/RoadDam.png');
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
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
});
