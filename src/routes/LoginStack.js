import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginScreen from "../view/Login";
import HomeScreen from "../view/Home";
import AdminStack from "./AdminHomeStack";

import AdminPageHome from "../components/AdminPage";
import AddEmployee from "../components/AddEmployee";
import AddRoutes from "../components/AddRoute";
import AddHomeType from "../components/AddHomeType";
import AddFOC from "../components/AddFoc";
import AddPaymentType from "../components/AddPaymentType";
import AddLocation from "../components/AddLocation";
import AddTypeOfCustomer from "../components/AddTypeOfCustomer";
import DailySales from "../components/DailySales";
import MarketingCustomer from "../components/MarketingCustomer";
import SplashScreen from "../view/SplashScreen";

const screens = {
  Splash: {
    screen: SplashScreen,
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
  Sales: {
    screen: DailySales,
    navigationOptions: {
      header: null,
    },
  },
  Marketing: {
    screen: MarketingCustomer,
    navigationOptions: {
      header: null,
    },
  },
  // AdminHome: {
  //   screen: AdminStack,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },

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
};

const LoginStack = createStackNavigator(screens, {});

export default createAppContainer(LoginStack);
