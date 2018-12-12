
import React, {Component} from 'react';
import { StyleSheet, Text, View,Dimensions} from 'react-native';
import SomeComponent from "./Components/SomeComponent/SomeComponent.js"
// import Demo from "./Components/Picker/Picker.js"



export default class App extends Component {

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

componentWillMount(){
  var { height, width } = Dimensions.get('window');
  console.log(height)
  console.log(width)
}

componentDidMount() {
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
      
      // this.setState(() => ({
      //   currentImage: info['businesses'][0]['image_url'] ,
      //   currentName: this.state.currentName ,
      // }));
    
    });
}

pushIntoDB=(info)=>{  
  
  fetch('http://localhost:8080/data/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Got this back', data);
    });
}

onSwipeChange=()=>{  
  fetch('http://localhost:8080/', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  })
    .then(Response => Response.json())
    .then(result => {
      
        this.setState({
          currentName: result[0]['name'],
          currentImage: result[0]['image_url'] ,
          currentPrice: result[0]['price'],
          currentRating: result[0]['rating'],
          currentphone: result[0]['display_phone'],
          currentAddress: result[0]['location']['display_address'],
          currentUrl: result[0]['url'],
          currentReview: result[0]['review_count'],
        })
    })
    .catch((error) => { console.warn("Unable to fetch Data")});
    
}


onChangeHandler=(direction)=>{

  if (direction == "SWIPE_LEFT"){
    this.onSwipeChange()
    console.log("left on me",);
  } else if (direction == "SWIPE_RIGHT"){
    this.onSwipeChange()
    console.log("right on God")
  }
  
}

  render() {
    let currentImageMarker = this.state.currentImage;
    if (this.state.currentImage){
      currentImageMarker = this.state.currentImage
    }

    return (
      // <View style={styles.container}> 
      <View>
        <Text style={styles.label}> DINDER </Text>
          <Text></Text>
          <Text>{this.state.currentName}</Text>
          <Text style={styles.price}>{"Price:" +this.state.currentPrice}</Text>
          <SomeComponent currentImage={currentImageMarker} updateChange={this.onChangeHandler} />
          <Text>{this.state.currentRating}</Text>
          <Text>{this.state.currentReview}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white",
  },
  position:{
    width: 100,
    height:450,
  },
  label:{
    flex:-1,
    backgroundColor: "red",
    fontSize: 28,
    width: 375,
    height:60,
    alignItems: 'baseline',
    alignSelf:"baseline",
    textAlign: "center",
  },
  price:{
   width: 350,
   left:0,
  },
  demo:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height:30,
    width:100,
  }
});
