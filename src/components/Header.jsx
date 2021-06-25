import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

function Header(props) {
  const logout = () => {
    alert("Signout");
  };

  return (
    <View style={styles.container}>
      {props.back && (
        <Ionicons
          name="arrow-back-outline"
          size={25}
          color="white"
          style={styles.backArrowStyle}
          onPress={props.nav}
        />
      )}
      <Text style={styles.headNameTxt}>{props.title}</Text>
      {props.signoutButton && (
        <AntDesign
          name="poweroff"
          size={20}
          color="white"
          style={styles.logoutStyle}
          onPress={props.logoutClick}
        />
      )}
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    backgroundColor: "black",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  headNameTxt: {
    color: "white",
    marginTop: 40,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: 20,
    flex: 1,
  },
  logoutStyle: {
    marginTop: 40,
    marginRight: 20,
    marginBottom: 5,
  },
  backArrowStyle: {
    marginTop: 38,
    marginLeft: 20,
  },
});
