import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  PaperAirplaneIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  subcollection,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../App";

const Chat = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const auth = getAuth();

  const scrollViewRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitle: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
              borderRadius: 100,
            }}
            source={{
              uri:
                messages[0]?.photoURL ||
                "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 50,
          }}
        >
          <TouchableOpacity>
            <VideoCameraIcon size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <PhoneIcon size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchMessages = async () => {
      // Fetch messages from the "messages" subcollection of the chat document
      const messagesRef = collection(db, "chat", route.params.id, "messages");
      const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(messagesQuery);
      const fetchedMessages = [];

      querySnapshot.forEach((doc) => {
        fetchedMessages.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setMessages(fetchedMessages);
    };

    fetchMessages();

    return fetchMessages;
  }, [route.params.id, messages]);

  // Re-run when route.params.id changes

  const sendMessage = async () => {
    Keyboard.dismiss();

    if (input) {
      const messagesRef = collection(db, "chat", route.params.id, "messages");

      // Add a new message to the subcollection
      await addDoc(messagesRef, {
        message: input,
        displayName: auth.currentUser.displayName,
        timestamp: serverTimestamp(),
        photoURL: auth.currentUser.photoURL,
        email: auth.currentUser.email,
      });

      // Clear the input field after sending the message
      setInput("");

      // Scroll to the end of the ScrollView
      scrollViewRef.current.scrollToEnd({ animated: true });
    }

    return;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{ flexGrow: 1 }}
              inverted
            >
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={{
                    justifyContent: `${
                      message.displayName === auth.currentUser.displayName &&
                      "flex-end"
                    }`,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    margin: 5,
                    gap: 2,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        backgroundColor: `${
                          message.email === auth.currentUser.email
                            ? "blue"
                            : "gray"
                        }`,
                        color: "white",
                        padding: 20,
                        borderRadius: 30,
                      }}
                    >
                      {message.message}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: `${
                          message.email === auth.currentUser.email
                            ? "flex-end"
                            : "flex-start"
                        }`,
                        gap: 10,
                      }}
                    >
                      <Image
                        style={{
                          display: `${
                            message.email === auth.currentUser.email
                              ? "none"
                              : "flex"
                          }`,
                          width: 15,
                          height: 15,
                          resizeMode: "contain",
                          borderRadius: 100,
                        }}
                        source={{
                          uri: message.photoURL,
                        }}
                      />
                      <Text style={{ fontSize: 10, marginVertical: 10 }}>
                        {message.displayName}
                      </Text>
                      <Image
                        style={{
                          display: `${
                            message.email !== auth.currentUser.email
                              ? "none"
                              : "flex"
                          }`,
                          width: 15,
                          height: 15,
                          resizeMode: "contain",
                          borderRadius: 100,
                        }}
                        source={{
                          uri: auth.currentUser.photoURL,
                        }}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                style={styles.textInput}
                placeholder="Signal message"
                value={input}
                onChangeText={(text) => setInput(text)}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <PaperAirplaneIcon size={30} color="blue" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
