import React, { Component } from 'react';
// import DropDown, {Select, Option, OptionList, updatePosition
// } from 'react-native-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import {AppRegistry, StyleSheet, Text,View, Image,TouchableOpacity, TouchableHighlight, ScrollView,
  } from 'react-native';
  



class DropdownCity extends Component {


    render() {
        return (
<View style={styles.container} >
            <ModalDropdown options={['Oakland', 'San Francisco', 'Hayward', 'San Jose', "Berkeley"]} 
            onSelect={this.props.changeCity}/>



        </View>
        );
    }
}

const styles = StyleSheet.create({
    
    dropdownStyle:{
      height:10,
      width:10
  
    },
  
    textStyle:{
      fontSize:100 
    }
  });
  


// // AppRegistry.registerComponent('App', () => App);


export default DropdownCity;