import React from "react";
import { StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import IntroFilter from "./Pages/IntroFilter.js";
import HomePage from "./Pages/HomePage.js";


// import DropdownFood from "./Components/DropdownFood/DropdownFood.js"
// import DropDownCity from "./Components/DropdownCity/DropdownCity.js"
// import { Button } from 'react-native';



console.disableYellowBox = true;

  const AppNavigator = createStackNavigator({
  Home: {
      screen: IntroFilter,
    },
    Main: {
      screen: HomePage,
    },
  },
    {
      initialRouteName: 'Home',
    }
  );


  const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

