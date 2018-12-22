import React from "react";
import { StyleSheet, Text, View, Dimensions, Button, ImageBackground } from 'react-native';
import ImgSwipe from "../Components/ImgSwipe/ImgSwipe.js"

export default class HomePage extends React.Component {
    state = {
        show:false,
        count: 0,
        swipeState: null,
        currentId: null,
        currentName: null,
        currentImage: 'https://i.imgur.com/d2BjT6D.jpg',
        currentRating: null,
        currentphone: null,
        currentAddress: null,
        currentUrl: null,
        currentReview: null,
        liked: false,
    }

    componentWillMount() {

        this.onSwipeChange()
    }

    turningTrue = () => {
        let idVal = {
            id: this.state.currentId
        }
        fetch('http://localhost:8080/change/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(idVal),
        })
            .then(response => response.json())
            .catch((error) => { console.warn("Unable to change") })
    }


    onSwipeChange = () => {
        fetch('http://localhost:8080/', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(Response => Response.json())
            .then(result => {

                this.setState({
                    count: this.state.count + 1,
                    currentId: result[0]["id"],
                    currentName: result[0]['name'],
                    currentImage: result[0]['image_url'],
                    currentPrice: result[0]['price'],
                    currentRating: result[0]['rating'],
                    currentphone: result[0]['display_phone'],
                    currentAddress: result[0]['location']['display_address'],
                    currentUrl: result[0]['url'],
                    currentReview: result[0]['review_count'],
                })
            })
            .catch((error) => { console.warn("Unable to fetch Data") });

    }


    onChangeHandler = (direction, navigate) => {

        if (direction === "SWIPE_LEFT") {
            this.onSwipeChange()

        } else if (direction === "SWIPE_RIGHT") {
            this.turningTrue()
            this.onSwipeChange()
            if (this.state.count > 2) {
                this.setState({
                    show:true
                })
            }


        }
    }


    static navigationOptions = {
        title: 'DINDER',
        headerStyle: {
            backgroundColor: "#ef21c9",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
            fontFamily: "Cochin",

        },
    }

    render() {
        const { navigate } = this.props.navigation;

        let currentImageMarker = this.state.currentImage;
        if (this.state.currentImage) {
            currentImageMarker = this.state.currentImage
        }

        return (

            <View style={styles.mainContainer}>
                <ImageBackground source={require('../Components/images/bridge.jpg')} style={{ width: '100%', height: '100%' }}>
                    <View style={styles.Name}>
                        <Text style={styles.label}>{this.state.currentName}</Text>
                    </View>

                    <View style={styles.imgContainer}>

                        <View style={styles.dataView}>
                            <Text style={styles.price}>Price:{this.state.currentPrice}</Text>
                            <Text style={styles.rating}>Rating:{this.state.currentRating}</Text>
                        </View>

                       
                        <View style={styles.imageborder}>
                            <ImgSwipe currentImage={currentImageMarker} updateChange={this.onChangeHandler} />
                            </View>
                            <View style={styles.submit}>
                            <Button
                            color="white"
                                title="Winner"
                                onPress={() => { navigate('Winnerpage') }}
                                disabled={!this.state.show}
                                
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
        justifyContent:"space-evenly"
    },
  
    label: {
        fontSize: 36,
        textAlign: "center",
        fontFamily: "Cochin",
        color:"white",
        textDecorationLine: 'underline',
        fontWeight:"bold"


    },
    Name: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "column",

    },
    dataView: {
        flexDirection: "row",
    },
    imgContainer: {
        flex: 6,
        alignItems: "center",
    },
    price: {
        flex: 1,
        textAlign: "left",
        fontSize: 30,
        fontFamily:"Cochin",
        color:"white",
        fontWeight:"bold"

    },
    rating: {
        flex: 1,
        textAlign: "right",
        fontSize: 30,
        fontFamily:"Cochin",
        color:"white",
        fontWeight:"bold"
    },
    imageborder:{
        borderRadius: 4,
        borderWidth: 15,
        borderColor: 'black',

    },
    submit: {
        backgroundColor: "#ef21c9",
        fontWeight: "bold",
        width: 100,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius:90,
        
    },
});
