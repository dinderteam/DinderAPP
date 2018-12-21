import React, { Component } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { StyleSheet } from 'react-native';

export default class DropDownFood extends Component {
    handler = (e, type) => {
        this.props.updateChange(type)
    }
    render() {
        return (
            <ModalDropdown
                options={['Burgers', 'Chinese', 'Italian', 'Thai', 'Japanese', 'Mexican ']}
                onSelect={this.handler}
                style={{
                    // backgroundColor: '#4286f4',
                    content: 'center',
                    borderWidth: 1,
                    borderRadius: 3,
                    
                    backgroundColor:"#8d85e2",

                }}
                dropdownTextStyle={{
                    fontSize: 30,
                    textAlign:"center",
                    fontWeight:"bold",
                    fontFamily:"Cochin",

                }}

                dropdownStyle={{
                   
                     borderWidth: 2,
                    borderRadius: 3,
                    width:200


                }}
                defaultValue={'Choose a food!'}
                textStyle={styles.textBeh}
            />

        );
    }

}
const styles = StyleSheet.create({
    textBeh: {
        fontSize: 25,
        width: 200,
        textAlign: "center",
        fontWeight:"bold",
        fontFamily:"Cochin"
        
        


    },

});



