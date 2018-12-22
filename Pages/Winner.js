import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground, Image } from 'react-native';

export default class Winner extends React.Component {

    state = {
        winningName: null,
        winningImage: 'https://i1.wp.com/www.foot.com/wp-content/uploads/2017/03/placeholder.gif?ssl=1',
    }
    componentDidMount() {
        this.allTrues()
       
    }

    allTrues = () => {
        fetch('http://localhost:8080/truevalues/', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(Response => Response.json())
            .then(result => {
                console.log("checking if the array is passed back", result)

                this.setState({
                    winningName: result[0]['name'],
                    winningImage: result[0]['image_url'],
                    winningPrice: result[0]['price'],
                    winningRating: result[0]['rating']
                })
            })
            



    }

    static navigationOptions = {
        title: "WINNER",
        headerStyle: {
            backgroundColor: '#ef21c9',
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

        let currentImageMarker = this.state.winningImage;
        if (this.state.winningImage) {
            currentImageMarker = this.state.winningImage
        }
        
    
    

        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={require('../Components/images/bridge.jpg')} style={{ width: '100%', height: '100%' }}>
                    <View style={styles.Name}>
                        <Text style={styles.label}>{this.state.winningName}</Text>
                    </View>

                    <View style={styles.imgContainer}>

                        <View style={styles.dataView}>
                            <Text style={styles.price}>Price:{this.state.winningPrice}</Text>
                            <Text style={styles.rating}>Rating:{this.state.winningRating}</Text>
                        </View>


                        <View style={styles.imageborder}>

                            <Image style={styles.position} source={{ uri: this.state.winningImage }} />
                        </View>

                        {console.log("are u working",this.state.winningName)}

                    </View>
                </ImageBackground>
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


    label: {
        fontSize: 36,
        textAlign: "center",
        fontFamily: "Cochin",
        color: "white",
        textDecorationLine: 'underline',
        fontWeight: "bold"


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
        fontFamily: "Cochin",
        color: "white",
        fontWeight: "bold"

    },
    rating: {
        flex: 1,
        textAlign: "right",
        fontSize: 30,
        fontFamily: "Cochin",
        color: "white",
        fontWeight: "bold"
    },
    imageborder: {
        borderRadius: 4,
        borderWidth: 15,
        borderColor: 'black',
    },

    position: {
        width: 375,
        height: 450,
    }


});