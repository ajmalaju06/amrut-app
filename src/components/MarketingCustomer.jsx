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
import apiGetEmployee from "../api/addEmployee";
import Spinner from "react-native-loading-spinner-overlay";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import apiGetLocation from "../api/saveLocation";
import apiGetRoutes from "../api/saveRoutes";
import apiCustomerType from "../api/saveTypeOfCustomer";
import apiSaveCustomer from "../api/saveCustomer";
import { typeOfCustomer, typeOfBuilding, couponsSold } from "../datas/data";

function MarketingCustomer({ navigation }) {
  const [model, setModel] = useState({
    salesPerson: null,
    emirate: null,
    typeOfCustomer: "",
    routeId: null,
    customerName: "",
    customerNumber: null,
    typeOfBuilding: "",
    buildingNumber: "",
    location: "",
    typeOfShop: null,
    email: "",
    address: "",
    couponSold: "",
    previousBrand: "",
    qtyOfJarSold: null,
    qtyOfJarreturn: null,
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({});
  const [employeeOrginal, setEmployeeOrginal] = useState({});
  const [emirate, setEmirate] = useState({});
  const [emirateOrginal, setEmirateOrginal] = useState({});
  const [routes, setRoutes] = useState([]);
  const [orginalRoute, setOrginalRoute] = useState([]);
  const [customerType, setCustomerType] = useState([]);
  const [orginalCustomerType, setOrginalCustomerType] = useState([]);
  const [refresh, setrefresh] = useState(1);

  useEffect(() => {
    getEmployee();
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const dateOfCreation = year + "-" + month + "-" + date;
    onChange("createdDate", dateOfCreation);
  }, []);

  const onChange = (name, text) => {
    setModel({ ...model, [name]: text });
  };

  const logOutPress = () => {
    navigation.replace("Login");
  };

  const getEmployee = async () => {
    setLoading(true);
    const data = await apiGetEmployee.getEmployee();
    const employeeNames = data.data.map((e) => e.name);
    setLoading(false);
    if (data.success && employeeNames.length) {
      setEmployeeOrginal(data.data);
      setEmployee(employeeNames);
    } else {
      alert("Something went wrong. Please try again!");
    }
    getEmirate();
  };

  const getEmirate = async () => {
    setLoading(true);
    const data = await apiGetLocation.getLocation();
    const locationNames = data.data.map((e) => e.locationName);
    setLoading(false);
    if (data.success && locationNames.length) {
      setEmirateOrginal(data.data);
      setEmirate(locationNames);
    } else {
      alert("Something went wrong. Please try again!");
    }
    getRouts();
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
    getCustomerType();
  };

  const getCustomerType = async () => {
    const data = await apiCustomerType.getTypeOfCustomer();
    const customerNames = data.data.map((e) => e.name);
    if (data.success && customerNames.length) {
      setOrginalCustomerType(data.data);
      setCustomerType(customerNames);
    } else {
      alert("Something went wrong. Please try again!");
    }
  };

  const onSubmitClick = () => {
    console.log(model);
    if (
      model.salesPerson &&
      model.emirate &&
      model.typeOfCustomer &&
      model.routeId &&
      model.customerName &&
      model.customerNumber &&
      model.typeOfBuilding &&
      model.buildingNumber &&
      model.typeOfShop &&
      model.couponSold &&
      model.qtyOfJarSold &&
      model.qtyOfJarreturn
    ) {
      setLoading(true);
      saveForm(model);
    } else {
      alert("Please fill required * fields");
    }
    console.log(model);
  };

  const saveForm = async (datas) => {
    const data = await apiSaveCustomer.saveCustomer(datas);
    if (data.sucess) {
      setLoading(false);
      setTimeout(() => {
        Alert.alert("Success", "", [
          { text: "OK", onPress: () => clearData() },
        ]);
      }, 1000);
    } else {
      setLoading(false);
      console.log(data);
    }
  };
  const clearData = () => {
    setModel({
      salesPerson: null,
      emirate: null,
      typeOfCustomer: "",
      routeId: null,
      customerName: "",
      customerNumber: null,
      typeOfBuilding: "",
      buildingNumber: "",
      location: "",
      typeOfShop: null,
      email: "",
      address: "",
      couponSold: "",
      previousBrand: "",
      qtyOfJarSold: null,
      qtyOfJarreturn: null,
      comments: "",
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
      <Header
        title={"Marketing"}
        signoutButton={true}
        logoutClick={logOutPress}
      />
      <ScrollView style={styles.scrollStyle}>
        <View style={styles.container}>
          <View style={styles.cardImageStyle}>
            <Image style={styles.logoImage} source={AmrutImage} />
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.badgeColor}></View>
            <View style={styles.cardContentStyle}>
              <Text style={styles.dailySalesTxt}>AMRUT CUSTOMER</Text>
              <Text style={styles.subTxt}>NEW MEMBERS TO OUR CIRCLE</Text>
              <Text style={styles.requiredTxt}>*Required</Text>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>SALES PERSON</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.dropdownPickerContainer}>
                <ModalDropdown
                  style={styles.dropdownPickerStyle}
                  dropdownStyle={styles.dropdownListStyle}
                  textStyle={styles.dropdownListTxtStyle}
                  options={employee}
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  defaultValue="Choose Sales Person"
                  onSelect={(value) =>
                    onChange("salesPerson", employeeOrginal[value].employeeId)
                  }
                ></ModalDropdown>
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>EMIRATE</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.dropdownPickerContainer}>
                <ModalDropdown
                  style={styles.dropdownPickerStyle}
                  dropdownStyle={styles.dropdownListStyle}
                  textStyle={styles.dropdownListTxtStyle}
                  options={emirate}
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  defaultValue="Choose Emirate"
                  onSelect={(value) =>
                    onChange("emirate", emirateOrginal[value].locationId)
                  }
                ></ModalDropdown>
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>NEW / OLD CUSTOMER</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.dropdownPickerContainer}>
                <ModalDropdown
                  style={styles.dropdownPickerStyle}
                  dropdownStyle={styles.dropdownListStyle}
                  textStyle={styles.dropdownListTxtStyle}
                  options={typeOfCustomer}
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  defaultValue="Choose NEW/OLD"
                  onSelect={(value) =>
                    onChange("typeOfCustomer", typeOfCustomer[value])
                  }
                ></ModalDropdown>
              </View>
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
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  defaultValue="Choose Routes"
                  onSelect={(value) =>
                    onChange("routeId", orginalRoute[value].routeId)
                  }
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
                <Text style={styles.headingTxt}>TYPE OF CUSTOMER </Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>
              <View style={styles.dropdownPickerContainer}>
                <ModalDropdown
                  style={styles.dropdownPickerStyle}
                  dropdownStyle={styles.dropdownListStyle}
                  textStyle={styles.dropdownListTxtStyle}
                  options={customerType}
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  defaultValue="Choose Customer"
                  onSelect={(value) =>
                    onChange(
                      "typeOfShop",
                      orginalCustomerType[value].customerTypeId
                    )
                  }
                ></ModalDropdown>
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>EMAIL</Text>
                {/* <Text style={styles.headingAstriskTxt}>*</Text> */}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  keyboardType="email-address"
                  onChangeText={(text) => onChange("email", text)}
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
                <Text style={styles.headingTxt}>COUPONS SOLD </Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>
              <View style={styles.dropdownPickerContainer}>
                <ModalDropdown
                  style={styles.dropdownPickerStyle}
                  dropdownStyle={styles.dropdownListStyle}
                  textStyle={styles.dropdownListTxtStyle}
                  options={couponsSold}
                  dropdownTextStyle={styles.dropdownListTxtStyle}
                  defaultValue="Choose Coupon Sold"
                  onSelect={(value) =>
                    onChange("couponSold", couponsSold[value])
                  }
                ></ModalDropdown>
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>PREVIOUS BRAND</Text>
                {/* <Text style={styles.headingAstriskTxt}>*</Text> */}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  onChangeText={(text) => onChange("previousBrand", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>QUANTITY OF JAR SOLD</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  keyboardType="numeric"
                  onChangeText={(text) => onChange("qtyOfJarSold", text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.cardContentStyle}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingTxt}>QUANTITY OF JAR RETURN</Text>
                <Text style={styles.headingAstriskTxt}>*</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.txtInputStyle}
                  placeholder="Your answer"
                  keyboardType="numeric"
                  onChangeText={(text) => onChange("qtyOfJarreturn", text)}
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
                  onChangeText={(text) => onChange("comments", text)}
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

export default MarketingCustomer;
