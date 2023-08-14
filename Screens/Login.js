import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubsscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const uid = user.uid;
        navigation.replace("Home", {
          displayName,
          email,
          photoURL,
          uid,
        });
      }
    });

    return unsubsscribe;
  }, []);

  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const displayName = userCredential.displayName;
        const email = userCredential.email;
        const photoURL = userCredential.photoURL;
        const uid = userCredential.uid;
        navigation.replace("Home", {
          displayName,
          email,
          photoURL,
          uid,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
            marginVertical: 10,
            borderRadius: 10,
          }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/120px-Signal-Logo.svg.png?20201126050550",
          }}
        />
      </View>

      <View>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoFocus
          value={email}
          onChangeText={(e) => setemail(e)}
          style={styles.inputContainer}
        />

        <TextInput
          style={styles.inputContainer}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
      </View>

      <TouchableOpacity onPress={login} style={styles.buttonLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.buttonRegister}
      >
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#2C68ED",
    fontSize: 20,
  },
  buttonLogin: {
    backgroundColor: "#2C68ED",
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    borderRadius: 8,
  },
  buttonRegister: {
    padding: 20,
    backgroundColor: "white",
    borderColor: "#2C68ED",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
  registerText: {
    fontSize: 16,
  },
});
