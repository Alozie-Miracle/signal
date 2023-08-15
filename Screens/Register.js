import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, []);

  const handleSubmit = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Create a Signal account</Text>
      </View>

      <View>
        <TextInput
          style={styles.inputContainer}
          placeholder="Full Name"
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Profile picture URL (optional)"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          placeholderTextColor="gray"
          onSubmitEditing={handleSubmit}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.Text}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 10,
  },
  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#2C68ED",
    fontSize: 20,
    width: 500,
  },
  button: {
    backgroundColor: "#2C68ED",
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 8,
    width: 300,
  },
  Text: {
    color: "white",
    fontSize: 16,
  },
});
