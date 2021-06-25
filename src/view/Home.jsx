import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import DailySales from "../components/DailySales";
import MarketingCustomer from "../components/MarketingCustomer";

function Home({ navigation }) {
  const data = navigation.getParam("datas");
  const headName = () => {
    return data.designation === "Sales" ? "Sales" : "Marketing";
  };

  const logOutPress = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header
        title={headName()}
        signoutButton={true}
        logoutClick={logOutPress}
      />
      {/* <DailySales /> */}
      <MarketingCustomer />
      {/* {data.designation === "Sales" ? <DailySales /> : <MarketingCustomer />} */}
      {/* <AdminHome /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
});

export default Home;
