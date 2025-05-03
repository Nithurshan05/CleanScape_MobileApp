import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Navigator } from 'react-native';
import React from 'react';
import { HomeScreen } from './HomeScreen'; 
import { Login} from '../screens/LoginPage/LoginPage';
import { GuestHome} from '../screens/Guest/GuestHome';	

export function WelcomePage({ navigation }) {
    return (
        <View style={styles.Container}>
            <Image style={styles.BGImg} source={require("../assets/images/wpimg4.jpg")}></Image>
            <Image style={styles.cenImg} source={require("../assets/images/Clean Scape.png")}></Image>
            <TouchableOpacity onPress={() => navigation.navigate("GuestHome")} style={styles.CleanNow}>
                <Text style={styles.CleanNowText}>Clean Now!</Text>               
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")} style={styles.loginPrompt}>
            <Text style={styles.loginText}>You have already an Account? <Text style={styles.loginLink}>Login</Text></Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    BGImg :{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0.7,
      },
    cenImg: {
        position: 'absolute',
        top: 100,
        justyfyContent: 'center',
        width: 450,
        height: 450,
    },
    Text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    CleanNow: {
        position: "absolute",
        backgroundColor: "#ee9b00",
        borderRadius: 30,
        paddingVertical: 10,
        width: "60%",
        alignItems: "center",
        top: 600,
    },
    CleanNowText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
        fontStyle: "italic",
        textShadowColor: "#495057",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    loginPrompt: {
        marginTop: 20,
        top: 230,
      },
      loginText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "900",
      },
      loginLink: {
        color: "#ee9b00", 
        fontWeight: "900",
      },
});
