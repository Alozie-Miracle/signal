import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../App";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setchatMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      // Fetch messages from the "messages" subcollection of the chat document
      const messagesRef = collection(db, "chat", id, "messages");
      const messagesQuery = query(messagesRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(messagesQuery);
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({
          ...doc.data(),
        });
      });
      setchatMessages(fetchedMessages);
    };

    fetchMessages();

    return fetchMessages;
  }, [id]);

  return (
    <TouchableOpacity
      onPress={() => enterChat(id, chatName)}
      key={id}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 10,
        marginVertical: 10,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        borderStyle: "dotted",
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          resizeMode: "contain",
        }}
        source={{
          uri:
            chatMessages[0]?.photoURL ||
            "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        }}
      />
      <View>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>{chatName}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {chatMessages[0]?.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomListItem;
