import DropdownMenu from 'react-native-dropdown-menu';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Picker } from 'react-native';

class Demo extends Component {

    
    render() {
        var data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 100 }} />
                <DropdownMenu
                    style={{ flex: 1 }}
                    bgColor={'white'}
                    tintColor={'#666666'}
                    activityTintColor={'green'}
                   
                    handler={(selection, row) => this.setState({ text: data[selection][row] })}
                    data={data}
                >
                
                </DropdownMenu>
            </View>
        );
    }
}
export default Demo;