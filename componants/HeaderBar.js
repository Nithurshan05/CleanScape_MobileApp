import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react';
import * as Icon from 'react-native-feather';



export default function HeaderBar() {
  return (
    <ScrollView style = {{backgroundColor:'#fff'}}>
      <SafeAreaView>
        {/* Statusbar */}
        <View style = {{padding: "20"}}>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:10, paddingTop:10,paddingBottom:5, backgroundColor:'#2A9A72'}}>
            <View style = {{flexDirection:'row', alignItems:'center'}}>
              <Image 
              style = {{
                width: 45,
                height: 45, 
                borderRadius:30, 
                marginRight:10,
                borderColor: '#0000',
              }}
              source = {require("../assets/images/Icons/SamplePic.jpg")}/>
              <Text 
              style = {{
                
                fontWeight: "800",
                color: "#000",
                marginTop: 0,
                marginBottom: 10,
                marginRight: 10,
                marginLeft: 10,
                textAlign: "center"
              }}> 
              Nithurshan Manokaran</Text>
            </View>
            {/* <View 
            style = {{
              flexDirection: 'row', 
              alignItems:'center'
              }}>
              <TouchableOpacity 
              style = {{
                marginRight: 10
              }}>
                <Icon.Bell size={50} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
              style = {{
                marginRight: 20, 
              }}>
                <Icon.Menu size={50} color="#000" /> 
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        </SafeAreaView>
      </ScrollView>
  )
}
