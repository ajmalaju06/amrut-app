import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import AdminPageHome from "../components/AdminPage";
import AddEmployee from "../components/AddEmployee";
import AddRoutes from "../components/AddRoute";
import AddHomeType from "../components/AddHomeType";
import AddFOC from "../components/AddFoc";
import AddPaymentType from "../components/AddPaymentType";
import AddLocation from "../components/AddLocation";
import AddTypeOfCustomer from "../components/AddTypeOfCustomer";
import LoginScreen from "../view/Login";

const screens = {
  AdminHome: {
    screen: AdminPageHome,
    navigationOptions: {
      header: null,
    },
  },
  AddEmployee: {
    screen: AddEmployee,
    navigationOptions: {
      header: null,
    },
  },
  AddRoutes: {
    screen: AddRoutes,
    navigationOptions: {
      header: null,
    },
  },
  AddHomeType: {
    screen: AddHomeType,
    navigationOptions: {
      header: null,
    },
  },
  AddFOC: {
    screen: AddFOC,
    navigationOptions: {
      header: null,
    },
  },
  AddPaymentType: {
    screen: AddPaymentType,
    navigationOptions: {
      header: null,
    },
  },
  AddLocation: {
    screen: AddLocation,
    navigationOptions: {
      header: null,
    },
  },
  AddTypeOfCustomer: {
    screen: AddTypeOfCustomer,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
};

const LoginStack = createStackNavigator(screens, {});

export default createAppContainer(LoginStack);
