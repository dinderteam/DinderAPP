import React from "react";
import { StyleSheet, Text, View, Button, } from 'react-native';

export default class Winner extends React.Component {

    state = {
        winningName: null,
        winningImage: null,
    }
    componentWillMount(){
        
    }

    allTrues = () => {
        fetch('http://localhost:8080/truevalues/', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(Response => Response.json())
            .then(result => {
                console.log("checking if the array is passed back", result)
                
                this.state({
                    winningName: result[0]['name'],
                    winningImage: result[0]['image_url'],
                })
            })

            

    }

    static navigationOptions = {
        title: "WINNER",
        headerStyle: {
            backgroundColor: '#f4511e',
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        this.allTrues()
        
        return (
            <View style={styles.mainContainer}>
                <Button
                    title="main"
                    onPress={() => { navigate('Main') }}
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
});