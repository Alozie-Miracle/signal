/* eslint-disable import/no-cycle */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import HomeScreen from "./Screens/HomeScreen";
import AddChat from "./Screens/AddChat";

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Chat from "./Screens/Chat";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRsz_1QjV2ty4oqGODreiQNLSUTNFR5s0",
  authDomain: "signal-3c48c.firebaseapp.com",
  projectId: "signal-3c48c",
  storageBucket: "signal-3c48c.appspot.com",
  messagingSenderId: "160121065034",
  appId: "1:160121065034:web:662ec08a95b6490a73a0b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const Stack = createNativeStackNavigator();

  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#2C68ED" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { db };
