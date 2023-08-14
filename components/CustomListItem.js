import { View, Text, Image } from "react-native";
import React from "react";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 10,
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
          uri: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        }}
      />
      <View>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>Youtube Chat</Text>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error est{" "}
        </Text>
      </View>
    </View>
  );
};

export default CustomListItem;
