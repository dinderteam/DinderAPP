import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

class SomeComponent extends Component {
        
        

    // onSwipeUp(gestureState) {
    //     this.setState({ myText: 'You swiped up!' }); //im going to use this for instant checkout 
    // }

    // onSwipeDown(gestureState) {
    //     this.setState({ myText: 'You swiped down!' });  // seeing reviews and more information about the businesss 
    // }                                                   // such as more images

    onSwipeLeft(gestureState) {
        console.log("leftttt!!!!!!!!")
    }

    onSwipeRight(gestureState) {
        console.log("right!!!!!!!!!!!")
        
    }


    handleLangChange = (gestureState) => {
        this.props.updateChange(gestureState);
    }

    onSwipe(gestureName, gestureState,) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        //this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_UP:
        
                break;
            case SWIPE_DOWN:
                break;
            case SWIPE_LEFT:
                this.handleLangChange(gestureName)
                break;
            case SWIPE_RIGHT:
                this.handleLangChange(gestureName)
                break;
        }
    }

    render() {
        
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
             
            <GestureRecognizer
                onSwipe={(direction,change) => this.onSwipe(direction,change)}
                // onSwipeUp={(state) => this.onSwipeUp(state)}
                // onSwipeDown={(state) => this.onSwipeDown(state)}
                onSwipeLeft={() => this.onSwipeLeft()}
                onSwipeRight={() => this.onSwipeRight()}
                config={config}   
            >

                <Image style={styles.position} source={{ uri: this.props.currentImage }} /> 
            </GestureRecognizer>
            
        );
    }
}
const styles = StyleSheet.create({
    position: {
        width: 450,
        height: 450,
        
    }
});

export default SomeComponent;