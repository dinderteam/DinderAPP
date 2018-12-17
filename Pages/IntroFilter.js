import React from "react";
import { StyleSheet, Text, View, Button, } from 'react-native';
import Dropdowns from "../Components/DropDown/DropDown.js"



export default class IntroFilter extends React.Component {

    state = {
        longitude: null,
        latitude:null,
    }
   
    componentDidMount(){
        fetch("https://api.yelp.com/v3/businesses/search?term=food&radius=16093&location=oakland", {
            method: "GET",
            headers: new Headers({
                "Content-type": "application/json",
                'Authorization': ' Bearer ' + "EgNHeojg_ryrKUYzlgCaPMXU7i60GOR-Yy1qxnoYvIDNM8OEq1bfq1a5cbuiExw94-oDF86cKIGfZI73iQoXsxZYndshHdSCeqUMjCi1C-KqdY1jA2Rkw5O4OQWwWnYx",
            }),

        })
            .then(response => response.json())
            .then(info => {
                this.pushIntoDB(info);
            })
            .catch((error) => { console.warn("Unable to connect to network.") })

       this.passingGeolocation()
    }

    pushIntoDB = (info) => {

        fetch('http://localhost:8080/data/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Got this back', data);
            })
            .catch((error) => { console.warn("Unable to push to DB") })
    }

    static navigationOptions = {
        title: "Time to EAT!",
        headerStyle: {
            backgroundColor: '#f4511e',
        }
    }
   
    passingGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            location => {
                this.setState({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                }); 
            });

    }
    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View>
                <Text>This is where the dropdown will go</Text>
                <Text>{this.state.longitude}</Text>
                <Text>{this.state.latitude}</Text>
                <Button
                    title="Main page"
                    onPress={() => this.passingGeolocation()}
                    onPress={() => navigate('Main')}
                />
                <Dropdowns />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});