import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import HomeScreen from "./Screens/HomeScreen";

import { Initialize } from "./firebase";
import AddChat from "./Screens/AddChat";

export default function App() {
  Initialize();
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
