import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./Pages/HomePage.js"


const AppNavigator = createStackNavigator({
 Home: {
    screen: HomeScreen,
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
