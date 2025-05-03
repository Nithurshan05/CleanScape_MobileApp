import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../config';
import { collection, query, where, getDocs } from "firebase/firestore";

export function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async () => {
        // Reset error states
        setUsernameError(false);
        setPasswordError(false);
        setLoginError(null);

        // Check if both fields are filled
        if (!username) {
            setUsernameError(true);
            setLoginError("Please fill the username field.");
            return;
        }

        if (!password) {
            setPasswordError(true);
            setLoginError("Please fill the password field.");
            return;
        }

        try {
            // Query the "User Register" collection to find a matching username and password
            const usersRef = collection(db, "User Register");
            const q = query(usersRef, where("fullname", "==", username), where("password", "==", password));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // User found, proceed with login success handling
                setLoginError(null);
                navigation.navigate("HomeScreen"); // Navigate to the desired page after login
            } else {
                // Invalid credentials
                setLoginError("Invalid username or password.");
                setUsernameError(true);
                setPasswordError(true);
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            setLoginError("An error occurred during login.");
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.BGImg} source={require("../../assets/images/wpImg44.jpg")} />
            <Image source={require('../../assets/images/Clean Scape.png')} style={styles.logo} />
            
            <View style={styles.loginWrapper}>
                <Text style={styles.title}>Login</Text>

                <View style={[styles.inputBox, usernameError ? styles.error : null]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#fff"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <FontAwesome name="user" style={styles.icon} />
                </View>

                <View style={[styles.inputBox, passwordError ? styles.error : null]}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!passwordVisible}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <FontAwesome name="lock" style={styles.icon} />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleIcon}>
                        <FontAwesome name={passwordVisible ? "eye-slash" : "eye"} size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {loginError && <Text style={styles.errorText}>{loginError}</Text>}

                <View style={styles.rememberForgot}>
                    <TouchableOpacity>
                        <Text style={styles.rememberText}>Remember Me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
                    <Text style={styles.submitButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.registerLink}>
                    <Text style={styles.registerText}>Don't have an account?{' '}<Text style={styles.registerLinkText}>Register Now</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // Same styles as before
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    BGImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0.7,
    },
    logo: {
        position: 'absolute',
        top: 40,
        left: 110,
        width: '50%',
        height: '20%',
        opacity: 0.5,
    },
    loginWrapper: {
        width: '85%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        backdropFilter: 'blur(30px)',
    },
    title: {
        fontSize: 36,
        color: '#fff',
        marginBottom: 20,
        fontWeight: '800',
    },
    inputBox: {
        position: 'relative',
        width: '100%',
        marginVertical: 15,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        paddingLeft: 20,
        color: '#fff',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 15,
        fontSize: 18,
        color: '#fff',
    },
    toggleIcon: {
        position: 'absolute',
        right: 45,
        top: 15,
    },
    error: {
        borderColor: 'red',
    },
    rememberForgot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20,
    },
    rememberText: {
        color: '#fff',
    },
    forgotText: {
        color: '#ffff00',
    },
    submitButton: {
        width: '100%',
        height: 50,
        borderRadius: 40,
        backgroundColor: '#80b435',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '700',
    },
    registerLink: {
        marginTop: 20,
    },
    registerText: {
        fontSize: 14.5,
        color: '#fff',
    },
    registerLinkText: {
        fontWeight: '700',
        color: '#3CA680',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
