import { View, Text, Platform, StyleSheet,notificationCount } from 'react-native';
import React from 'react';
import { HomeScreen } from "./HomeScreen";
import { GuestHome } from "./Guest/GuestHome";
import { Camera } from "./CameraOpen";
import { Profile } from "./Profile";
import { Chat } from './Chat';
import { Settings } from './Setting';
import { Notification } from './Notification';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../constants/colors';

export function Main({ route }) {
    const Tab = createBottomTabNavigator();
    const screenOptions = {
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
            position: "absolute",
            bottom: -5,
            right: 0,
            left: 0,
            elevation: 2,
            height: Platform.OS === 'ios' ? 90 : 60,
            backgroundColor: "#D0F8EB",
            borderRadius: 10,
        }
    };

    // Check if the user is a guest
    const isGuestHome = route?.params?.guestHome === true;

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            {/* For guests, only Camera, Profile, and Settings tabs are visible */}
            {isGuestHome ? (
                <>
                <Tab.Screen
                        name="GuestHome"
                        component={GuestHome}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Ionicons name="home" size={24} color={focused ? COLORS.primary : COLORS.brown} />
                                    <Text style={{ fontSize: 10, color: COLORS.brown }}>HOME</Text>
                                </View>
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Camera"
                        component={Camera}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: COLORS.primary,
                                        width: Platform.OS === "ios" ? 40 : 45,
                                        height: Platform.OS === "ios" ? 40 : 45,
                                        top: Platform.OS === "ios" ? 0 : 0,
                                        borderRadius: Platform.OS === "ios" ? 20 : 10
                                    }}
                                >
                                    <Ionicons name="camera" size={30} color={COLORS.white} />
                                </View>
                            )
                        }}
                    />

                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Ionicons name="person-circle" size={24} color={focused ? COLORS.primary : COLORS.brown} />
                                    <Text style={{ fontSize: 10, color: COLORS.brown }}>PROFILE</Text>
                                </View>
                            )
                        }}
                    />

                    <Tab.Screen
                        name="Settings"
                        component={Settings} // Assuming Chat is used for Settings for now
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Ionicons name="settings" size={24} color={focused ? COLORS.primary : COLORS.brown} />
                                    <Text style={{ fontSize: 10, color: COLORS.brown }}>SETTINGS</Text>
                                </View>
                            )
                        }}
                    />
                </>
            ) : (
                // For non-guests, show all tabs
                <>
                    <Tab.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Ionicons name="home" size={24} color={focused ? COLORS.primary : COLORS.brown} />
                                    <Text style={{ fontSize: 10, color: COLORS.brown }}>HOME</Text>
                                </View>
                            )
                        }}
                    />

                    <Tab.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Ionicons name="settings" size={24} color={focused ? COLORS.primary : COLORS.brown} />
                                    <Text style={{ fontSize: 10, color: COLORS.brown }}>SETTINGS</Text>
                                </View>
                            )
                        }}
                    />

                    <Tab.Screen
                        name="Camera"
                        component={Camera}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: COLORS.primary,
                                        width: Platform.OS === "ios" ? 40 : 45,
                                        height: Platform.OS === "ios" ? 40 : 45,
                                        top: Platform.OS === "ios" ? 0 : 0,
                                        borderRadius: Platform.OS === "ios" ? 20 : 10
                                    }}
                                >
                                    <Ionicons name="camera" size={30} color={COLORS.white} />
                                </View>
                            )
                        }}
                    />

                    <Tab.Screen
                      name="Notification"
                      component={Notification}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="notifications" size={24} color={focused ? COLORS.primary : COLORS.brown} />

                            {/* Notification Badge */}
                            {notificationCount > 0 && (
                              <View style={styles.badgeContainer}>
                                <Text style={styles.badgeText}>{notificationCount}</Text>
                              </View>
                            )}

                            <Text style={{ fontSize: 10, color: COLORS.brown }}>NOTIFICATION</Text>
                          </View>
                        ),
                      }}
                    />

                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Ionicons name="person-circle" size={24} color={focused ? COLORS.primary : COLORS.brown} />
                                    <Text style={{ fontSize: 10, color: COLORS.brown }}>PROFILE</Text>
                                </View>
                            )
                        }}
                    />
                </>
            )}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
      position: 'absolute',
      top: -5,
      right: -10,
      backgroundColor: 'red',
      borderRadius: 8,
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });
