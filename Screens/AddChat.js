/* eslint-disable import/no-cycle */

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ChatBubbleLeftRightIcon } from "react-native-heroicons/outline";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../App";

const AddChat = ({ navigation }) => {
  const [chatName, setChatName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chat",
    });
  }, [navigation]);

  const addchat = async () => {
    if (chatName.length === 0) return;
    await addDoc(collection(db, "chat"), {
      chatName: chatName,
    })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Enter chat name</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <ChatBubbleLeftRightIcon size={30} color="black" />
        <TextInput
          placeholder="Chat Name"
          keyboardType="default"
          autoFocus
          value={chatName}
          onChangeText={(e) => setChatName(e)}
          style={styles.inputContainer}
          onSubmitEditing={addchat}
        />
      </View>

      <TouchableOpacity onPress={addchat} style={styles.buttonLogin}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
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
    paddingHorizontal: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#2C68ED",
    fontSize: 20,
    flex: 1,
    width: 500,
  },
  buttonLogin: {
    backgroundColor: "#2C68ED",
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    borderRadius: 8,
    width: 300,
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
});
