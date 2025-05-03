import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity} from 'react-native'
import React from 'react';
import * as Icon from 'react-native-feather';
import HeaderBar from '../../componants/HeaderBar';
import BottomBar from '../../componants/BottomBar';
import { Main } from '../Main';


export function GuestHome({navigation}) {
  return (
    <SafeAreaView>
      <View style = {{marginTop: 30,backgroundColor:"#fff"}}>
        {/* Statusbar */}
        <HeaderBar/>
        {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <View style={styles.statIcon}><Text>📄</Text></View>
          <Text style={styles.statNumber}>--</Text>
          <Text style={styles.statLabel}>Total Complaints</Text>
        </View>
        <View style={styles.statBox}>
          <View style={styles.statIcon}><Text>✅</Text></View>
          <Text style={styles.statNumber}>--</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statBox}>
          <View style={styles.statIcon}><Text>⏳</Text></View>
          <Text style={styles.statNumber}>--</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.textRow}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <Text style={styles.sectionSeeAll}>See All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
        <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate("Complient")}>
          <Image style={styles.categoryIcon} source={require("../../assets/images/garbage.png")}/>
          <Text style={styles.categoryText}>Garbage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}>
        <Image style={styles.categoryIcon} source={require("../../assets/images/street-light.png")}/>
          <Text style={styles.categoryText}>Street Light</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}>
        <Image style={styles.categoryIcon} source={require("../../assets/images/RoadDam.png")}/>
          <Text style={styles.categoryText}>Road Damage</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Recent Complaints Section */}
      <View style={styles.textRow}>
      <Text style={styles.sectionTitle}>Recent Complaints</Text>
      <Text style={styles.sectionSeeAll}>See All</Text>
      </View>
      <View>
        <Image style={styles.SignUpImg} source={require('../../assets/images/signup.jpg')}/>
        <Text style={styles.RegNote}>To join our community and unlock more features, please register in the app first!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.RegBtn}>
                <Text style={styles.RegBtnText}>Register!</Text>               
            </TouchableOpacity>
      </View>
      <View style={styles.btmNav} onPress={navigation.navigate('Main', { guestHome: true })}>
      </View>
      </View>
    </SafeAreaView>
    
  );
};
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
  statIcon: {
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
    textRow: {
      flexDirection: 'row',
      justifyContent:'space-between',
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
  // category
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
  // recentComplaint
  recentComplaint: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#D0F8EB',
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
  SignUpImg:{
    width: '100%',
    height: 250,
    marginBottom: 10,
    borderRadius: 15,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 20,
    marginTop: 10,
    opacity: 0.7,
  },
  RegBtn: {
    position: "absolute",
    backgroundColor: "#9cc44c",
    borderRadius: 20,
    paddingVertical: 10,
    width: "60%",
    alignItems: "center",
    top: 100,
    left:80     
},
RegBtnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    fontStyle: "italic",
    textShadowColor: "#495057",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
},
RegNote:{
  fontSize: 14,
  color: 'gray',
  marginTop: -100,
  marginBottom: 20,
  textAlign: 'center',
  fontStyle: "italic",
  textShadowColor: "#495057",
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 1,  
  color: "#000",
},
btmNav:{
  backgroundColor: '#fff',
  marginBottom: 50,
  paddingVertical: 110,
}
});