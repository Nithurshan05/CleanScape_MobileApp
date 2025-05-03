import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../config';
import { collection, addDoc } from "firebase/firestore";


export function Register({navigation}) {
    // State to manage password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);
    // State to handle validation errors for passwords
    const [passwordError, setPasswordError] = useState(false);
    // State to detect if the user is typing in the password field
    const [isTyping, setIsTyping] = useState(false);
    // Toggles visibility of the password input field
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    // Handles user input for the password field and checks if the user is typing
    const handlePasswordInput = (text) => {
        setPassword(text);
        setIsTyping(text.length > 0);
    };
    // Handles user input for the confirm password field
    const handleConfirmPasswordInput = (text) => {
        setConfirmPassword(text);
    };
    // States for user registration details
    const [fullname, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');    
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        // Validation to ensure passwords match
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        } 
        // Adds user details to Firestore
        try {
          await addDoc(collection(db, "User Register"), {
            fullname,
            email,
            password,
          });
          alert('User Registered successfully!');
          
          // Clear the form fields after successful registration
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } catch (error) {
          console.error("Error creating account Register: ", error);
          alert('Error creating account');
        }
    }
    // JSX to render the registration screen
    return (
        <View style={styles.container}>
            {/* Background image */}
            <Image style={styles.BGImg} source={require("../../assets/images/wpImg44.jpg")} />          
            {/* Logo */}
            <Image source={require('../../assets/images/Clean Scape.png')} style={styles.logo} />

            <View style={styles.loginWrapper}>
                <Text style={styles.title}>Register</Text>
                {/* Input field for Full Name */}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#fff"
                        value={fullname}
                        onChangeText={setName} 
                    />
                    <FontAwesome name="user" style={styles.icon} />
                </View>
                {/* Input field for Email */}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#fff"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <FontAwesome name="envelope" style={styles.icon} />
                </View>
                {/* Input field for Password */}
                <View style={[styles.inputBox, passwordError ? styles.error : null]}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!passwordVisible} // Toggles password visibility
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        onChangeText={handlePasswordInput}
                        value={password}
                    />
                    <FontAwesome name="lock" style={styles.icon} />
                    {/* Button to toggle password visibility */}
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleIcon}>
                        <FontAwesome name={passwordVisible ? "eye-slash" : "eye"} size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                {/* Input field for Confirm Password */}
                <View style={[styles.inputBox, passwordError ? styles.error : null]}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!passwordVisible}
                        placeholder="Confirm Password"
                        placeholderTextColor="#fff"
                        onChangeText={handleConfirmPasswordInput}
                        value={confirmPassword}
                    />
                    <FontAwesome name="lock" style={styles.icon} />
                </View>
                {/* Register button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Register</Text>
                </TouchableOpacity>
                {/* Link to navigate to the Login page */}
                <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate("LoginPage")}>
                    <Text style={styles.registerText}>
                        Already have an account?{' '}
                        <Text style={styles.registerLinkText}>Login Now</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        left: 130,
        width: '40%',
        height: '15%',
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
    submitButton: {
        width: '100%',
        height: 50,
        borderRadius: 40,
        backgroundColor: '#80b435',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        cursor: 'hand',
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
        fontWeight: '600',
        color: '#3CA680',
    },
});
