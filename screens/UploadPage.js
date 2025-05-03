import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import HeaderBar from '../componants/HeaderBar';
import BottomBar from '../componants/BottomBar';

export function UploadPage() {
  return (
    <ScrollView style = {{backgroundColor:'#fff'}}>
      <SafeAreaView>
        <HeaderBar title="Upload Waste" />
      <View style={styles.container}>
      {/* Image Section */}
      <Image
        source={require("../assets/uploadImg.png")} 
        style={styles.image}
      />

      {/* Waste Type Section */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Type of Waste</Text>
        <Text style={styles.info}>Garbage</Text>
      </View>

      {/* Address Section */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.info}>Batticaloa, Sri Lanka</Text>
      </View>

      {/* Date Section */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.info}>2023/10/10</Text>
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>UPLOAD</Text>
      </TouchableOpacity>
    </View>

    <BottomBar/>

      </SafeAreaView>
    </ScrollView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
     
  },
  infoBox: {
    backgroundColor: '#E0F7E8',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  uploadButton: {
    backgroundColor: '#3CA680',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 100,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
