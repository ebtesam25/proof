import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location';

export default class TheMap extends Component {

  constructor() {
    super();
    this.state = {
      show: false,
      markers: [{"latlng":{
        "latitude": 25.76684817404011,
        "longitude": -80.19163068383932,
      }}],
      location:null,
      details: 'Hello',
    };
  }
  async componentDidMount(){
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords.latitude, location.coords.longitude)
      let coord = {latitude:location.coords.latitude, longitude:location.coords.longitude};
      console.log(coord);
      this.setState({location:coord});
    } catch (error) {
      console.log(error);
    }
  }
    
  


  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  render() {
    return (
      <View style={{backgroundColor:'#FFF', flex:1}}>
       
        <View style={styles.mapContainer}> 
        {this.state.location &&
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
          latitudeDelta: .005,
          longitudeDelta: .005
        }} 
        onLongPress={this.ShowHideComponent}
        onPress={(e) => this.setState({ markers: [...this.state.markers,{ latlng: e.nativeEvent.coordinate }] })}>
          {
              this.state.markers.map((marker, i) => (
                  <MapView.Marker key={i} coordinate={marker.latlng} >
                   {console.log(marker.latlng)}
                   {console.log(this.state.markers)}
                   <Image source={require('../assets/crash.png')}></Image>
                   <Callout onPress={()=>this.props.navigation.navigate('Details',{coords:marker.latlng})}>
                <Text >{this.state.details}</Text>
            </Callout>
                </MapView.Marker>

                  
              ))}
              {this.state.location!=null &&
              <MapView.Marker  coordinate={this.state.location}  >
                <Image source={require('../assets/car.png')} height={10} width={10}></Image>
                
                </MapView.Marker>}
           
              
      </MapView>
  }
      </View>
     
      <Text style={{borderRadius:10, width:'80%', position:'absolute', zIndex:2,bottom:'2.5%', alignSelf:'center',textAlign:'center', height:70,fontFamily:'FuturaH', fontSize:20, backgroundColor:'#000', textAlignVertical:'center', color:'#FFF'}}  onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('NewInc'
            )}}>REPORT INCIDENT</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray'
  },
  mapContainer: {
    height: '100%',
    width:'100%',
    alignSelf:'center',
    position:'absolute',
    zIndex:2,
    backgroundColor:'#F2F3F5',
    alignContent:'center',
  },
  map: {
    height: '90%',
    borderRadius:100,
    width:'90%',
    margin:'5%',
    alignSelf:'center',
    
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});