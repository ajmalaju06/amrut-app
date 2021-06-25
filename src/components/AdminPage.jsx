import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import AmrutImage from "../images/amrut_img.jpeg";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";

function AdminPage({ navigation }) {
  const logOutPress = () => {
    navigation.replace("Login");
  };

  return (
    <View>
      <StatusBar style="light" />
      <Header
        title={"Admin Home"}
        signoutButton={true}
        logoutClick={logOutPress}
      />
      <ScrollView style={styles.scrollStyle}>
        <View style={styles.container}>
          <View style={styles.cardImageStyle}>
            <Image style={styles.logoImage} source={AmrutImage} />
          </View>

          <View style={styles.menuContainer}>
            <TouchableWithoutFeedback
              onPress={() => navigation.push("AddEmployee")}
            >
              <View style={styles.menuLeftContainer}>
                <Ionicons name="person-add" size={30} color="gray" />
                <Text style={styles.menuTxtStyle}>Add Employee</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => navigation.push("AddRoutes")}
            >
              <View style={styles.menuRightContainer}>
                <FontAwesome5 name="route" size={30} color="gray" />
                <Text style={styles.menuTxtStyle}>Add Route</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* <View style={styles.menuContainer}>
            <TouchableWithoutFeedback
              onPress={() => navigation.push("AddHomeType")}
            >
              <View style={styles.menuLeftContainer}>
                <AntDesign name="home" size={30} color="gray" />
                <Text style={styles.menuTxtStyle}>Add Flat/Villa/Shop</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.push("AddFOC")}>
              <View style={styles.menuRightContainer}>
                <Ionicons name="cash-outline" size={30} color="gray" />
                <Text style={styles.menuTxtStyle}>Add FOC</Text>
              </View>
            </TouchableWithoutFeedback>
          </View> */}

          <View style={styles.menuContainer}>
            {/* <TouchableWithoutFeedback
              onPress={() => navigation.push("AddPaymentType")}
            >
              <View style={styles.menuLeftContainer}>
                <Ionicons name="cash-outline" size={30} color="gray" />
                <Text style={styles.menuTxtStyle}>Add Cash/Coupon</Text>
              </View>
            </TouchableWithoutFeedback> */}

            <TouchableWithoutFeedback
              onPress={() => navigation.push("AddTypeOfCustomer")}
            >
              <View style={styles.menuLeftContainer}>
                <Ionicons name="person" size={30} color="gray" />
                <Text style={styles.menuTxtStyle}>Add Type of customer</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => navigation.push("AddLocation")}
            >
              <View style={styles.menuRightContainer}>
                <EvilIcons name="location" size={35} color="gray" />
                <Text style={styles.menuTxtStyle}>Add Location</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* <View style={styles.menuContainer}>
            <TouchableWithoutFeedback
              onPress={() => navigation.push("AddTypeOfCustomer")}
            >
              <View style={styles.menuLeftContainer}>
                <Ionicons name="person" size={30} color="gray" />
                <Text style={styles.menuTxtStyle}>Add Type of customer</Text>
              </View>
            </TouchableWithoutFeedback>

            <View style={[styles.menuRightContainer, { borderColor: "white" }]}>
              <EvilIcons name="location" size={35} color="gray" />
              <Text style={styles.menuTxtStyle}>Add Location</Text>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}

export default AdminPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    display: "flex",
    paddingBottom: 150,
  },
  scrollStyle: {
    backgroundColor: "white",
    height: "100%",
  },
  cardImageStyle: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 10,
    shadowColor: "gray",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    minHeight: 100,
  },
  logoImage: {
    borderRadius: 5,
    width: "100%",
  },
  cardStyle: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    minHeight: 120,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
  },
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  menuLeftContainer: {
    borderRadius: 5,
    minHeight: 120,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    flex: 1,
    marginRight: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  menuRightContainer: {
    borderRadius: 5,
    minHeight: 120,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    flex: 1,
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  menuIconStyle: {},
  menuTxtStyle: {
    marginTop: 10,
  },
});
