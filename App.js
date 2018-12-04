
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import SomeComponent from "./Components/SomeComponent/SomeComponent.js"



export default class App extends Component {

  state = {
    swipeState: null,
    currentName:null,
    currentImage: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
  }

componentWillMount(){
  fetch("https://api.yelp.com/v3/businesses/search?term=food&radius=16093&location=oakland", {
    method: "GET",
    headers: new Headers({
      "Content-type": "application/json",
      'Authorization': ' Bearer ' + "EgNHeojg_ryrKUYzlgCaPMXU7i60GOR-Yy1qxnoYvIDNM8OEq1bfq1a5cbuiExw94-oDF86cKIGfZI73iQoXsxZYndshHdSCeqUMjCi1C-KqdY1jA2Rkw5O4OQWwWnYx",
    }),

  })
    .then(response => response.json())
    .then(info => {
    
      info['businesses'].map(data => {
        console.log(data)
      })

      this.setState(()=>({
      currentImage: info['businesses'][0]['image_url'],
      currentName: info['businesses'][0]['name']
      }));
    });
}
// componentDidMount() {
//   fetch("https://api.yelp.com/v3/businesses/search?term=food&radius=16093&location=oakland", {
//     method: "GET",
//     headers: new Headers({
//       'Authorization': ' Bearer ' + "EgNHeojg_ryrKUYzlgCaPMXU7i60GOR-Yy1qxnoYvIDNM8OEq1bfq1a5cbuiExw94-oDF86cKIGfZI73iQoXsxZYndshHdSCeqUMjCi1C-KqdY1jA2Rkw5O4OQWwWnYx",
//     }),
//   })
//     .then(response => response.json())
//     .then(info => info)
// }

  render() {
    let currentImageMarker =  this.state.currentImage;
    if (this.state.currentImage){
      currentImageMarker = this.state.currentImage
    }
    return (
      <View style={styles.container}>
        <Text>stars</Text>
        <Text>{this.state.currentName}</Text>
        <SomeComponent>
        <Image style={styles.position} source={{uri: currentImageMarker}}/>
        </SomeComponent>
        <Text>Type</Text>
        <Text>Contact</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  position:{
    width:"100%",
    height:450,
    // backgroundColor: "red",
  }
});
