import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import AmrutImage from "../images/amrut_img.jpeg";
import DropDownPicker from "react-native-dropdown-picker";
import ModalDropdown from "react-native-modal-dropdown";
import apiGetRoutes from "../api/saveRoutes";
import apiSaveSales from "../api/saveSales";
import { typeOfBuilding, focData, typeOfPaymentData } from "../datas/data";
import Spinner from "react-native-loading-spinner-overlay";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DailySales({ navigation }) {
  const data = navigation.getParam("datas");
  const [model, setModel] = useState({
    customerName: "",
    typeOfBuilding: "",
    location: "",
    address: "",
    freeOfCost: "",
    typeOfPayment: "",
    cashRecieved: "",
    couponRecieved: "",
    creditRecieved: "",
    balanceCredit: "",
    bottleStatus: "",
    comment: "",
    totalAmount: 0,
    routeId: null,
    customerNumber: null,
    buildingNumber: null,
    qtyOfSale: null,
    qtyEmptyReturn: null,
    rate: null,
  });
  const [routes, setRoutes] = useState([]);
  const [orginalRoute, setOrginalRoute] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setrefresh] = useState(1);

  useEffect(() => {
    getRouts();
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const dateOfCreation = year + "-" + month + "-" + date;
    onChange("createdDate", dateOfCreation);
  }, []);

  const logOutPress = () => {
    navigation.replace("Login");
  };

  const onChange = (name, text) => {
    setModel({ ...model, [name]: text });
  };

  const getRouts = async () => {
    const data = await apiGetRoutes.getRoutes();
    const routeNames = data.data.map((e) => e.routeName);
    if (data.success && routeNames.length) {
      setOrginalRoute(data.data);
      setRoutes(routeNames);
    } else {
      alert("Something went wrong. Please try again!");
    }
  };

  const routeSelection = (value) => {
    const data = orginalRoute.filter((e) => e.routeName === value);
    if (data.length) {
      onChange("routeId", data[0].routeId);
    }
  };

  const submitClick = () => {
    if (
      model.routeId &&
      model.customerName &&
      model.customerNumber &&
      model.typeOfBuilding &&
      model.buildingNumber &&
      model.qtyOfSale &&
      model.qtyEmptyReturn &&
      model.freeOfCost &&
      model.rate &&
      model.typeOfPayment &&
      model.cashRecieved &&
      model.couponRecieved &&
      model.creditRecieved &&
      model.balanceCredit &&
      model.bottleStatus
    ) {
      setLoading(true);
      console.log(model);
      saveForm(model);
    } else {
      alert("Please fill required * fields");
    }
  };

  const saveForm = async (datas) => {
    const data = await apiSaveSales.saveSales(datas);
    console.log(data);
    if (data.success) {
      setLoading(false);
      setTimeout(() => {
        Alert.alert("Success", "", [
          { text: "OK", onPress: () => clearData() },
        ]);
      }, 1000);
    } else {
      alert("Something went wrong. Please try again!");
    }
  };

  const clearData = () => {
    setModel({
      customerName: "",
      typeOfBuilding: "",
      location: "",
      address: "",
      freeOfCost: "",
      typeOfPayment: "",
      cashRecieved: "",
      couponRecieved: "",
      creditRecieved: "",
      balanceCredit: "",
      bottleStatus: "",
      comment: "",
      totalAmount: 0,
      routeId: null,
      customerNumber: null,
      buildingNumber: null,
      qtyOfSale: null,
      qtyEmptyReturn: null,
      rate: null,
    });

    setrefresh(refresh + 1);
  };

  return (
    <View key={refresh}>
      <Spinner
        visible={loading}
        textStyle={styles.spinnerTextStyle}
        color="black"
      />
      <StatusBar style="light" />
      <Header title={"Sales"} signoutButton={true} logoutClick={logOutPress} />
      <ScrollView style={styles.scrollStyle}>
        <View style={styles.container}>
          <View style={styles.cardImageStyle}>
            <Image style={styles.logoImage} source={AmrutImage} />
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.badgeColor}></View>
            <View style={styles.cardContentStyle}>
              <Text style={styles.dailySalesTxt}>DAILY SALES</Text>
              <Text style={styles.subTxt}>SALES UPDATION</Text>
              <Text style={styles.requiredTxt}>*Required</Text>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>ROUTE CODE</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.dropdownPickerContainer}>
                <ModalDropdown
                  style={styles.dropdownPickerStyle}
                  dropdownStyle={styles.dropdownListStyle}
                  textStyle={styles.dropdownListTxtStyle}
                  options={routes}
                  defaultValue="Choose Route"
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  onSelect={(value) => routeSelection(routes[value])}
                ></ModalDropdown>
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>CUSTOMER NAME</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("customerName", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>CUSTOMER CONTACT NUMBER</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  maxLength={10}
                  onChangeText={(text) => onChange("customerNumber", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>FLAT / VILLA / SHOP </Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>
              <View style={styles.dropdownPickerContainer}>
                <ModalDropdown
                  style={styles.dropdownPickerStyle}
                  dropdownStyle={styles.dropdownListStyle}
                  textStyle={styles.dropdownListTxtStyle}
                  options={typeOfBuilding}
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  defaultValue="Choose Building"
                  onSelect={(value) =>
                    onChange("typeOfBuilding", typeOfBuilding[value])
                  }
                ></ModalDropdown>
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>
                  FLAT / VILLA / SHOP NAME OR NUMBER
                </Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("buildingNumber", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>LOCATION</Text>
                {/* <Text style={styles.headingAstriskTxt}>*</Text> */}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("location", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>ADDRESS</Text>
                {/* <Text style={styles.headingAstriskTxt}>*</Text> */}
              </View>

              <View style={styles.adressInputStyle}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("address", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>QTY SALE </Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  maxLength={10}
                  onChangeText={(text) => onChange("qtyOfSale", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>QTY EMPTY RETURN </Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  maxLength={10}
                  onChangeText={(text) => onChange("qtyEmptyReturn", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>F O C </Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>
              <View style={styles.dropdownPickerContainer}>
                <ModalDropdown
                  style={styles.dropdownPickerStyle}
                  dropdownStyle={styles.dropdownListStyle}
                  textStyle={styles.dropdownListTxtStyle}
                  options={focData}
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  defaultValue="Choose FOC"
                  onSelect={(value) => onChange("freeOfCost", focData[value])}
                ></ModalDropdown>
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>RATE</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  keyboardType="numeric"
                  onChangeText={(text) => onChange("rate", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>TOTAL AMOUNT</Text>
                {/* <Text style={styles.headingAstriskTxt}>*</Text> */}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  keyboardType="numeric"
                  onChangeText={(text) => onChange("totalAmount", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>CASH/COUPON</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.dropdownPickerContainer}>
                <ModalDropdown
                  style={styles.dropdownPickerStyle}
                  dropdownStyle={styles.dropdownListStyle}
                  textStyle={styles.dropdownListTxtStyle}
                  options={typeOfPaymentData}
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  defaultValue="Choose Payment Type"
                  onSelect={(value) =>
                    onChange("typeOfPayment", typeOfPaymentData[value])
                  }
                ></ModalDropdown>
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>CASH RECEIVED</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("cashRecieved", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>COUPON RECEIVED</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("couponRecieved", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>CREDIT RECEIVED</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("creditRecieved", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>BALANCE CREDIT</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("balanceCredit", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>BOTTLE STATUS</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("bottleStatus", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>COMMENT</Text>
                {/* <Text style={styles.headingAstriskTxt}>*</Text> */}
              </View>

              <View style={styles.adressInputStyle}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("comment", text)}
                />
              </View>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={submitClick}>
            <View style={styles.ButtonCardStyle}>
              <Text style={styles.buttonTxtStyle}>Submit</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
}

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

export default DailySales;
