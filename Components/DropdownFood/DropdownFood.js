import React, { Component } from 'react';
// import DropDown, {Select, Option, OptionList, updatePosition
// } from 'react-native-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import {AppRegistry, StyleSheet, Text,View, Image,TouchableOpacity, TouchableHighlight, ScrollView,
  } from 'react-native';



export default class DropdownFood extends Component {

    componentDidMount = () => {
        console.log(this.props.changeHandler)
    }

    render() {
        return (

            <ModalDropdown 
                options={['HI', 'Chinese', 'Italian', 'Thai', 'Japanese', 'Mexican ']}
                onSelect={ this.props.changeHandler }
                dropdownTextStyle={{
                    fontSize: 30,
                    backgroundColor: '#4286f4',
                    color: 'black',
                    content: 'center',
                    borderWidth: 1,
                    borderRadius: 3,
                    textAlign:"center",
                    fontFamily:"Cochin",
                    fontweight:"bold"

                }}
                defaultValue={'CITY'}
                textStyle={styles.textBeh}
            />



           
        );
    }
}
const styles = StyleSheet.create({
    buttonBeh: {
        fontSize: 25,
        width: 375,
        textAlign: "center",

    },

});






