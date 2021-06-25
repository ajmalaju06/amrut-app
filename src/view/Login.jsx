import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import apiCheckLogin from "../api/loginUserApi";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (name, text) => {
    setModel({ ...model, [name]: text });
  };

  const onPress = () => {
    if (model.name && model.password) {
      setLoading(true);
      checkLoginCredentials(model);
    } else {
      alert("Username or Password error!");
    }
  };

  const checkLoginCredentials = async (datas) => {
    const data = await apiCheckLogin.loginUser(datas);
    console.log(data.data);
    if (data.success) {
      setLoading(false);
      await AsyncStorage.setItem("@IsLoged", "1");
      await AsyncStorage.setItem("@Designation", data.data.designation);

      if (data.data.designation === "Marketing") {
        navigation.replace("Marketing", { datas: data.data });
      } else if (data.data.designation === "Sales") {
        navigation.replace("Sales", { datas: data.data });
      } else {
        navigation.replace("AdminHome", { datas: data.data });
      }
    } else {
      setLoading(false);
      alert("Username or password error!");
    }
  };

  const User = () => {​​​​
 return(
      <View style={{flex: 1}}>
        <TextInput onChangeText={​​​​(txt) => console.log(txt)}​​​​ />
        <Button onPress={​​​​() => console.log("do something")}​​​​ />
      </View>
    )
    }
  return (
    <View style={styles.parent}>
      <Spinner
        visible={loading}
        textStyle={styles.spinnerTextStyle}
        color="black"
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.welcomeTxt}>Welcome Back,</Text>
          <Text style={styles.loginTxt}>Login</Text>
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.usernameInput}
            placeholder="Username"
            onChangeText={(text) => onChange("name", text)}
          />

          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            name="password"
            secureTextEntry={true}
            onChangeText={(text) => onChange("password", text)}
          />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.signInButton}>
            <Text style={styles.signInTxt}>SIGN IN</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  parent: {
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 40,
    flex: 1,
  },
  welcomeTxt: {
    fontSize: 35,
  },
  loginTxt: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
  },
  loginContainer: {
    marginTop: "25%",
  },
  usernameInput: {
    minHeight: 45,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  passwordInput: {
    minHeight: 45,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 30,
  },
  footerContainer: {
    backgroundColor: "#E0E0E0",
    minHeight: 60,
    position: "relative",
  },
  signInButton: {
    width: 90,
    height: 50,
    backgroundColor: "black",
    position: "absolute",
    top: -25,
    right: 30,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 3, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  signInTxt: {
    color: "white",
    fontWeight: "500",
  },
});
