import React, { Component } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { StyleSheet } from 'react-native';

export default class DropDownFood  extends  Component {
    handler = (e, type) => {
        this.props.updateChange(type)
    }
    render(){
        return(
            <ModalDropdown
                options={['Burgers', 'Chinese', 'Italian', 'Thai', 'Japanese', 'Mexican ']}
                onSelect={this.handler} 
                dropdownTextStyle={{ fontSize: 30}}
                defaultValue={'Food Type'}
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



