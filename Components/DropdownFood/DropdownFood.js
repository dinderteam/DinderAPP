import React, { Component } from 'react';
// import DropDown, {Select, Option, OptionList, updatePosition
// } from 'react-native-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import {AppRegistry, StyleSheet, Text,View, Image,TouchableOpacity, TouchableHighlight, ScrollView,
  } from 'react-native';



class DropdownFood extends Component {

    componentDidMount = () => {
        console.log(this.props.changeHandler)
    }

    render() {
        return (

            <ModalDropdown 
                options={['Burgers', 'Chinese', 'Italian', 'Thai', 'Japanese', 'Mexican ']}
                onSelect={ this.props.changeHandler }/>



           
        );
    }
}


// // AppRegistry.registerComponent('App', () => App);


export default DropdownFood;

