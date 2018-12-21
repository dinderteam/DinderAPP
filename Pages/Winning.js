import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground, } from 'react-native';
import DropDownFood from "../Components/DropDown/DropDown.js"
import DropDownCity from "../Components/DropDownCity/DropDownCity.js"

console.disableYellowBox = true





export default class Winning extends React.Component {

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.mainContainer}>

                <ImageBackground source={{ "uri": "file:///Users/sloop/Desktop/dinder/DinderAPP/Components/images/bridge.jpg" }} style={{ width: '100%', height: '100%' }}>
                    <View style={styles.organize}>

                    </View>

                </ImageBackground>
            </View>
        );
    }

}
const styles = StyleSheet.create({