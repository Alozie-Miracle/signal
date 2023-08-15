import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../components/CustomListItem";
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import { PencilIcon, CameraIcon } from "react-native-heroicons/outline";
import { db } from "../App";

const HomeScreen = ({ navigation, route }) => {
  const [chats, setChats] = useState([]);
  const auth = getAuth();

  const signout = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 5, marginRight: 150 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signout}>
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
                borderRadius: 100,
              }}
              source={{ uri: route?.params?.photoURL }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <TouchableOpacity>
            <CameraIcon size={20} style={{ color: "black" }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
            <PencilIcon size={20} style={{ color: "black" }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const getChat = async () => {
      const querySnapshot = await getDocs(collection(db, "chat"));
      const fetchedChats = [];

      querySnapshot.forEach((doc) => {
        fetchedChats.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setChats(fetchedChats);
      // console.log(chats); // This will show the previous state, not the updated state
    };

    getChat();
  }, [navigation, chats]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, chatName }) => (
          <CustomListItem
            chatName={chatName}
            id={id}
            key={id}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
});
