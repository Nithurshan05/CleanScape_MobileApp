import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import HeaderBar from '../componants/HeaderBar';
import { Link } from 'react-native-feather';

export function HomeScreen({ navigation }) {
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [inProgressComplaints, setInProgressComplaints] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);

  useEffect(() => {
    const fetchRecentComplaints = async () => {
      const categories = ['Garbage Complaint', 'StreetLight Complaints', 'Road Complaints'];
      let complaints = [];
      let total = 0, inProgress = 0, pending = 0;

      // Fetch complaints from each category
      for (const category of categories) {
        const querySnapshot = await getDocs(collection(db, category));
        const complaintsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          category,
        }));

        // Update counts based on complaint status
        complaintsData.forEach((complaint) => {
          total += 1;
          if (complaint.status === 'pending') {
            pending += 1;
          } else if (complaint.status === 'solved') {
            inProgress += 1;
          }
        });
        complaints = [...complaints, ...complaintsData];
      }
      setRecentComplaints(complaints);
      setTotalComplaints(total);
      setInProgressComplaints(inProgress);
      setPendingComplaints(pending);
    };

    fetchRecentComplaints();
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
    <SafeAreaView>
      <View style={{ marginTop: 30, backgroundColor: "#fff" }}>
        <HeaderBar />
        <ScrollView style={{ backgroundColor: '#fff' }}>
          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statBox}>
            <View style={styles.statIcon}><Text>📝</Text></View>
              <Text style={styles.statNumber}>{totalComplaints}</Text>
              <Text style={styles.statLabel}>Total Complaints</Text>
            </View>
            <View style={styles.statBox}>
            <View style={styles.statIcon}><Text>✅</Text></View>
              <Text style={styles.statNumber}>{inProgressComplaints}</Text>
              <Text style={styles.statLabel}>Completed Task</Text>
            </View>
            <View style={styles.statBox}>
            <View style={styles.statIcon}><Text>⏳</Text></View>
              <Text style={styles.statNumber}>{pendingComplaints}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>

          {/* Categories Section */}
          <View style={styles.textRow}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity >
              <Text style={styles.sectionSeeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
            <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate("GarbageCompliants")}>
              <Image style={styles.categoryIcon} source={require("../assets/images/garbage.png")} />
              <Text style={styles.categoryText}>Garbage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate("SteetLightCompliant")}>
              <Image style={styles.categoryIcon} source={require("../assets/images/street-light.png")} />
              <Text style={styles.categoryText}>Street Light</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate("RoadCompliants")}>
              <Image style={styles.categoryIcon} source={require("../assets/images/RoadDam.png")} />
              <Text style={styles.categoryText}>Road Damage</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Recent Complaints Section */}
          <View style={styles.textRow}>
            <Text style={styles.sectionTitle}>Recent Complaints</Text>
            <Text style={styles.sectionSeeAll} onPress={() => navigation.navigate("AllComplaints")}>See All</Text>
          </View>
          {recentComplaints.map((complaint) => (
            <View
              key={complaint.id}
              style={styles.recentComplaint}
              // onPress={() => navigation.navigate('ComplaintDetails', { complaintId: complaint.id, category: complaint.category })}
            >
              <View style={styles.complaintIcon}>
                <Image style={styles.categoryIcon} source={renderCategoryImage(complaint.category)} />
              </View>
              <View>
                <Text style={styles.complaintType}>{complaint.category}</Text>
                <Text style={styles.complaintLocation}>{complaint.address || "Location not specified"}</Text>
              </View>
            </View>
          ))}
          <View style={styles.btmNav} onPress={navigation.navigate('Main', { guestHome: false })}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    backgroundColor: '#3CA680',
    padding: 10,
    margin: 20,
    borderRadius: 20,
  },
  statBox: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#e9f7f9',
    width: 100,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel:{
    fontSize: 12,
    color: '#333',
    marginTop: 5,
    fontWeight: 'bold',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionSeeAll: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  categoryList: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  categoryBox: {
    width: 100,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#f1f3f5',
    borderRadius: 15,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  recentComplaint: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#CCE7DE',
    borderRadius: 15,
  },
  complaintIcon: {
    marginRight: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  complaintType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  complaintLocation: {
    fontSize: 12,
    color: 'gray',
  },
});

export default HomeScreen;
