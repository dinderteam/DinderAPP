import React, { Component } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { StyleSheet } from 'react-native';

export default class DropDownCity extends Component {
    handler = (key, type)=>{
        this.props.updateChange(type)
    }
    render() {
        return (

            <ModalDropdown 
                style={styles.mainContainer}
                options={['Oakland', 'San Francisco', 'Hayward', 'San Jose', "Berkeley"]}
                onSelect={this.handler}
                dropdownTextStyle={{ fontSize: 30 }}
                defaultValue={'CITY'}
                textStyle={styles.textBeh}
            />

        );
    }

}
const styles = StyleSheet.create({
    textBeh: {
        fontSize: 25, 
        width: 375, 
        textAlign: "center",
        
    },
    
});
