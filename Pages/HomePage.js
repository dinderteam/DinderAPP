import React from "react";
import { StyleSheet, Text, View, Dimensions,Button } from 'react-native';
import ImgSwipe from "../Components/ImgSwipe/ImgSwipe.js"
//import IntroFilter from "./IntroFilter.js";

export default class HomePage extends React.Component {
    state = {
        count:0,
        swipeState: null,
        currentId:null,
        currentName: null,
        currentImage: 'https://i1.wp.com/www.foot.com/wp-content/uploads/2017/03/placeholder.gif?ssl=1',
        currentPrice: null,
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
   
    turningTrue=()=>{
        let idVal = {
            id:this.state.currentId
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
                    count:this.state.count+1,
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


    onChangeHandler = (direction,navigate) => {

        if (direction === "SWIPE_LEFT") {
            this.onSwipeChange()

        } else if (direction === "SWIPE_RIGHT") {
            this.turningTrue()
            this.onSwipeChange()
            if (this.state.count === 2) {
                console.log(this.state.count)
            }
            

        }
    }

    // allTrues=()=> {
    //     fetch('http://localhost:8080/truevalues/', {
    //         method: "GET",
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //         .then(Response => Response.json())
    //         .then(result => {
    //             console.log("checking if the array is passed back", result)
    //         })
        
    // }


    static navigationOptions = {
        title: 'DINDER',
        headerStyle: {
            backgroundColor: '#f4511e',
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        
        let currentImageMarker = this.state.currentImage;
        if (this.state.currentImage) {
            currentImageMarker = this.state.currentImage
        }
    
        return (

            <View style={styles.mainContainer}>
               
                <View style={styles.restName}>
                    <Text style={styles.label}>{this.state.currentName}</Text>
                </View>

                <View style={styles.imgContainer}>

                    <View style={styles.dataView}>
                        <Text style={styles.price}>{this.state.currentPrice}</Text>
                        <Text style={styles.rating}>{this.state.currentRating}</Text>
                    </View>

                    <View>
                        <ImgSwipe currentImage={currentImageMarker} updateChange={this.onChangeHandler} />
                        <Button
                            title="Submit"
                            onPress={() => {navigate('Winnerpage')}}
                        />
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    labelContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
    },
    label: {
        fontSize: 36,
        textAlign: "center",

    },
    restName: {
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
        fontSize: 16,
    },
    rating: {
        flex: 1,
        textAlign: "right",
        fontSize: 16,
    }
});
