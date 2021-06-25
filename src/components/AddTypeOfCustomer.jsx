import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import apiSaveCustomerType from "../api/saveTypeOfCustomer";

function AddTypeOfCustomer({ navigation }) {
  const [model, setModel] = useState({});

  const backpress = () => {
    navigation.goBack();
  };

  const onChange = (name, text) => {
    setModel({ ...model, [name]: text });
  };

  const onSubmitClick = () => {
    if (model.name) {
      console.log("success");
      saveForm(model);
    } else {
      alert("Please fill required fields");
    }
  };

  const saveForm = async (datas) => {
    const data = await apiSaveCustomerType.saveTypeOfCustomer(datas);
    if (data.success) {
      Alert.alert("Success", "", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <StatusBar style="light" />
      <Header back={true} title={"Add Type Of Customer"} nav={backpress} />

      <ScrollView style={styles.scrollStyle}>
        <View style={styles.container}>
          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>Type Of Customer</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Type of Customer"
                  onChangeText={(text) => onChange("name", text)}
                />
              </View>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={onSubmitClick}>
            <View style={styles.ButtonCardStyle}>
              <Text style={styles.buttonTxtStyle}>Submit</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
}

export default AddTypeOfCustomer;

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
  badgeColor: {
    backgroundColor: "gray",
    height: 15,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  cardContentStyle: {
    padding: 10,
  },
  dailySalesTxt: {
    fontSize: 24,
    fontWeight: "500",
  },
  subTxt: {
    fontSize: 13,
    marginTop: 15,
    marginLeft: 2,
  },
  requiredTxt: {
    fontSize: 13,
    marginTop: 15,
    marginLeft: 2,
    marginBottom: 10,
    color: "red",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
  },
  headingTxt: {
    fontSize: 18,
    fontWeight: "400",
  },
  headingAstriskTxt: {
    fontSize: 18,
    fontWeight: "400",
    color: "red",
    marginLeft: 3,
  },
  inputContainer: {
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 10,
    width: 200,
  },
  txtInputStyle: {
    minHeight: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  adressInputStyle: {
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 10,
  },
  ButtonCardStyle: {
    width: "100%",
    backgroundColor: "black",
    borderRadius: 5,
    elevation: 10,
    minHeight: 50,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
  },
  buttonTxtStyle: {
    color: "white",
    fontWeight: "400",
    textAlign: "center",
  },
  dropdownPickerContainer: {
    width: 200,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
  },
  dropdownPickerStyle: {
    width: 200,
  },
  dropdownListStyle: {
    width: 200,
    padding: 10,
  },
  dropdownListTxtStyle: {
    fontSize: 15,
    padding: 5,
  },
});
