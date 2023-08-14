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
import { db } from "../firebase";

const HomeScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
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
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setData(doc.data());
      });
    };

    return getChat;
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {/* {data.map(({ id, chatName }) => (
        ))} */}
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
