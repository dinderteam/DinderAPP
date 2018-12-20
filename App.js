import React from "react";
import { StyleSheet} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import IntroFilter from "./Pages/IntroFilter.js"
import HomePage from "./Pages/HomePage.js";


import DropdownFood from "./Components/DropdownFood/DropdownFood.js"
import DropdownCity from "./Components/DropdownCity/DropdownCity.js"
import { Button } from 'react-native';



console.disableYellowBox = true;


export default class App extends Component {

  state = {
    swipeState: null,
    currentName: null,
    currentImage: 'https://i1.wp.com/www.foot.com/wp-content/uploads/2017/03/placeholder.gif?ssl=1',
    currentPrice: null,
    currentRating: null,
    currentphone: null,
    currentAddress: null,
    currentUrl: null,
    currentReview: null,
    bayarea: "SAN FRANCISCO",
    food: "BURGERS",
    restaurants: {}


const AppNavigator = createStackNavigator({
 Home: {
   screen: IntroFilter,
  },
  Main:{
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
