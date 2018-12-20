import React from "react";
import { StyleSheet, Text, View, Button, } from 'react-native';
import DropDownFood  from "../Components/DropDown/DropDown.js"
import DropDownCity from "../Components/DropDownCity/DropDownCity.js"

console.disableYellowBox = true

export default class IntroFilter extends React.Component {


    state = {
        longitude: null,
        latitude:null,
        city:null,
        foodtype:null,
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            location => {
                this.setState({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                });
            });
    
    }

    setUp = () => {
        
        let url = "https:api.yelp.com/v3/businesses/search?term=food&radius=16093&location=" + this.state.city + "&categories=" + this.state.foodtype.toLowerCase();

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-type": "application/json",
                'Authorization': ' Bearer ' + "EgNHeojg_ryrKUYzlgCaPMXU7i60GOR-Yy1qxnoYvIDNM8OEq1bfq1a5cbuiExw94-oDF86cKIGfZI73iQoXsxZYndshHdSCeqUMjCi1C-KqdY1jA2Rkw5O4OQWwWnYx",
            }),

        })
            .then(response => response.json())
            .then(info => {
                this.pushIntoDB(info)
            })

    };

    pushIntoDB = (info) => {    
        fetch('http://localhost:8080/data/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        
        })
            .then(response => response.json())
             .then(info => {
                 console.log('Got this back', info);
             })
            .catch((error) => { console.warn("Unable to push to DB") })
    }

    static navigationOptions = {
        title: "Time to EAT!",
        headerStyle: {
            backgroundColor: '#f4511e',
        }
    }

    handleCity = (city) => {
        console.log(city)
        this.setState({
            city:city
        });
    }

    handleFood = (food) =>{
        console.log(food)
        this.setState({
            foodtype: food
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View style={styles.mainContainer}>
                <View style={styles.dropdownBeh}>
                    <DropDownCity updateChange={this.handleCity}/>
                </View>
                <View style={styles.buttonBeh}>
                    <DropDownFood  updateChange={this.handleFood}/>
                </View>
                <Button
                    title="Submit"
                    onPress={() => {
                        this.setUp();
                        navigate('Main');
                    }
                    }
                    />
                
            </View>
        );
    }

}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "whitesmoke"
    },
    dropdownBeh:{
       marginTop: -100,
       marginBottom: 50,
    },
    buttonBeh:{
        marginBottom: 50,
    }

    
});