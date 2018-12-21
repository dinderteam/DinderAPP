import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground, } from 'react-native';
import DropDownFood from "../Components/DropDown/DropDown.js"
import DropDownCity from "../Components/DropDownCity/DropDownCity.js"

console.disableYellowBox = true

export default class IntroFilter extends React.Component {


    state = {
        longitude: null,
        latitude: null,
        city: null,
        foodtype: null,
    }

    componentDidMount() {
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
        console.log("checking", info)
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
        title: "Welcome to Dinder!!",
        headerStyle: {
            backgroundColor: "#ef21c9",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:30,
            fontFamily: "Cochin",

        },
    }

    handleCity = (city) => {
        console.log(city)
        this.setState({
            city: city
        });
    }

    handleFood = (food) => {
        console.log(food)
        this.setState({
            foodtype: food
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.mainContainer}>

                <ImageBackground source={{ "uri": "file:///Users/sloop/Desktop/dinder/DinderAPP/Components/images/bridge.jpg" }} style={{ width: '100%', height: '100%' }}>
                    <View style={styles.organize}>

                        <Text style={styles.summary}>Find your next favorite resataurant with Dinder.</Text>


                        <View style={styles.dropdownBeh}>
                            <DropDownCity updateChange={this.handleCity} />
                        </View>
                        <View style={styles.buttonBeh}>
                            <DropDownFood updateChange={this.handleFood} />
                        </View>
                        <View style={styles.submit}>
                            <Button
                                color="white"
                                title="Go Dind"

                                onPress={() => {
                                    this.setUp();
                                    navigate('Main');
                                }
                                }


                            />
                        </View>
                    </View>

                </ImageBackground>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
        // alignContent: "center",
        // backgroundColor: "whitesmoke",

    },
    dropdownBeh: {
        // marginTop: -100,
        // marginBottom: 50,
        // top: 32,
        // alignContent: 'center',
        left: 0,
        // backgroundColor: '#4286f4',
        textAlign: 'center',
        marginLeft: "auto",
        marginRight: "auto",

    },
    buttonBeh: {
        // marginBottom: 10,
        // top: 32,
        // alignContent: 'center',
        left: 0,
        // backgroundColor: '#4286f4',
        textAlign: 'center',
        marginLeft: "auto",
        marginRight: "auto",


    },
    Title: {
        textAlign: "center",
        backgroundColor: "#4286f4",
        fontSize: 100,
        fontFamily: "Cochin"
    },

    summary: {
        textAlign: "center",
        // backgroundColor: "#4286f4",
        fontSize: 50,
        color: "white",
        fontWeight: "bold",
        fontFamily: "Cochin"


    },
    submit: {
        backgroundColor: "#ef21c9",
        fontWeight: "bold",
        width: 100,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius:90
    },

    organize:{
        flex:1,
    justifyContent: 'center',
    justifyContent: "space-evenly",



    }



});