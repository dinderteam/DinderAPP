import React from "react";
import { StyleSheet, Text, View, Button, } from 'react-native';

export default class IntroFilter extends React.Component {
   
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords.latitude)
                console.log(position.coords.longitude)
            })
    }
    static navigationOptions = {
        title: "Time to EAT!",
        headerStyle: {
            backgroundColor: '#f4511e',
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Checking</Text>
                <Button
                    title="Main page"
                    onPress={() => navigate('Main', { name: 'Jane' })}
                />
            </View>
        );
    }

}