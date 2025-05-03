import { ScrollView, StyleSheet, Text, View,Image,Tab, Screen} from 'react-native'
import React from 'react'

export default function BottomBar() {
  return (
      <View >
      <View style = {{flexDirection: 'row', justifyContent:'space-evenly', backgroundColor: '#f5f5f5', padding: 0, paddingTop:15, height: 70, backgroundColor:'#2A9A72',borderRadius:30, width:'100%',marginTop:-10}}>
      {/* <Tab.Screen name="Home" component={HomeScreen} options={{title:"Home", tabBarShowLabel:false ,tabBarIcon: ({focused}) =>(
          <Image style={{paddingtop:-50}} source={require("../assets/images/Icons/CS_Home.png")}/>
        ),
        }}/> */}
          <Image style={{paddingtop:-50}} source={require("../assets/images/Icons/CS_Home.png")}/>
          <Image style={styles.categoryIcon} source={require("../assets/images/Icons/CS_customer-service.png")}/>
          <Image style={styles.categoryIcon} source={require("../assets/images/Icons/CS_capture.png")}/>
          <Image style={styles.categoryIcon} source={require("../assets/images/Icons/CS_notification.png")}/>
          <Image style={styles.categoryIcon} source={require("../assets/images/Icons/CS_settings.png")}/>
      </View>
      <View style={{height: 1, backgroundColor: '#cccccc', marginVertical: 10}}></View>
      </View>
  )
}

const styles = StyleSheet.create({})