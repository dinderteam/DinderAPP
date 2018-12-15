import React from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import ImgSwipe from "../Components/ImgSwipe/ImgSwipe.js"
import IntroFilter from "./IntroFilter.js";

export default class HomePage extends React.Component {
    state = {
        swipeState: null,
        currentName: null,
        currentImage: 'https://i1.wp.com/www.foot.com/wp-content/uploads/2017/03/placeholder.gif?ssl=1',
        currentPrice: null,
        currentRating: null,
        currentphone: null,
        currentAddress: null,
        currentUrl: null,
        currentReview: null,
    }

    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        console.log(height)
        console.log(width)
    }

    componentDidMount() {
        // fetch("https://api.yelp.com/v3/businesses/search?term=food&radius=16093&location=oakland", {
        //     method: "GET",
        //     headers: new Headers({
        //         "Content-type": "application/json",
        //         'Authorization': ' Bearer ' + "EgNHeojg_ryrKUYzlgCaPMXU7i60GOR-Yy1qxnoYvIDNM8OEq1bfq1a5cbuiExw94-oDF86cKIGfZI73iQoXsxZYndshHdSCeqUMjCi1C-KqdY1jA2Rkw5O4OQWwWnYx",
        //     }),

        // })
        //     .then(response => response.json())
        //     .then(info => {
        //         this.pushIntoDB(info);
        //     })
        //     .catch((error) => { console.warn("Unable to connect to network.") })
    }

    // pushIntoDB = (info) => {

    //     fetch('http://localhost:8080/data/', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(info),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Got this back', data);
    //         })
    //         .catch((error) => { console.warn("Unable to push to DB") })
    // }

    onSwipeChange = () => {
        fetch('http://localhost:8080/', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(Response => Response.json())
            .then(result => {

                this.setState({
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


    onChangeHandler = (direction) => {

        if (direction === "SWIPE_LEFT") {
            this.onSwipeChange()

        } else if (direction === "SWIPE_RIGHT") {
            this.onSwipeChange()

        }
    }

   

    static navigationOptions = {
        title: 'DINDER',
        headerStyle: {
            backgroundColor: '#f4511e',
        }
    }

    render() {
    
        let currentImageMarker = this.state.currentImage;
        if (this.state.currentImage) {
            currentImageMarker = this.state.currentImage
        }
    

        return (

            <View style={styles.mainContainer}>
                {/* <View style={styles.labelContainer}>
                    <Text style={styles.label}> DINDER </Text>
                </View> */}

                <View style={styles.restName}>
                    <Text style={styles.label}>{"Name:" + this.state.currentName}</Text>
                </View>

                <View style={styles.imgContainer}>

                    <View style={styles.dataView}>
                        <Text style={styles.price}>{"Price:" + this.state.currentPrice}</Text>
                        <Text style={styles.rating}>{"Rating:" + this.state.currentRating}</Text>
                    </View>

                    <View>
                        <ImgSwipe currentImage={currentImageMarker} updateChange={this.onChangeHandler} />
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
    },
    rating: {
        flex: 1,
        textAlign: "right",
    }
});
