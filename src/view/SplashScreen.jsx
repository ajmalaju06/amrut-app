import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SplashScreen({ navigation }) {
  useEffect(() => {
    splashTime();
  }, []);

  const splashTime = () => {
    setTimeout(async () => {
      //   alert("Time reched ");
      //   navigation.replace("Login");
      const logId = await isLogedIn();
      const designation = await AsyncStorage.getItem("@Designation");
      console.log(designation);
      if (logId == null || logId === 0) {
        navigation.replace("Login");
      } else {
        if (designation === "Marketing") {
          navigation.replace("Marketing");
        } else if (designation === "Sales") {
          navigation.replace("Sales");
        } else {
          navigation.replace("AdminHome");
        }
      }
    }, 3000);
  };

  const isLogedIn = () => {
    try {
      return AsyncStorage.getItem("@IsLoged");
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.headNameTextStyle}>AMRUT WATER</Text>
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  splashContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headNameTextStyle: {
    fontSize: 25,
    fontWeight: "600",
  },
});
