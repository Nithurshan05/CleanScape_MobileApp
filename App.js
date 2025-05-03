import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, WelcomePage, Main} from "./screens";
import { GuestHome} from "./screens/Guest/GuestHome";
import { Login} from "./screens/LoginPage/LoginPage";
import { Register} from "./screens/LoginPage/Register";
import { Camera} from "./screens/CameraOpen";
import { Complient} from "./screens/Guest/Complient";
import { GarbageCompliants} from "./screens/GarbageCompliant";
import { SteetLightCompliant} from "./screens/SteetLightCompliant";
import { RoadCompliants} from "./screens/RoadCompliants";
import { AllComplaints} from "./screens/AllComplaints";
import { Settings} from "./screens/Setting";

 const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomePage'>
        <Stack.Screen
          name='WelcomePage'
          component={WelcomePage}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='LoginPage'
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='GuestHome'
          component={GuestHome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Main'
          component={Main}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Register'
          component={Register}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='camera'
          component={Camera}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Complient'
          component={Complient}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='GarbageCompliants'
          component={GarbageCompliants}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='SteetLightCompliant'
          component={SteetLightCompliant}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='RoadCompliants'
          component={RoadCompliants}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='AllComplaints'
          component={AllComplaints}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Settings'
          component={Settings}
          options={{
            headerShown: false
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
