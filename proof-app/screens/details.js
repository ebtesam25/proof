import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import SongList from "../components/incidentList";

let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
};

export default class Details extends React.Component  {
  state = {
    fontsLoaded: false,
    playing: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.getLoc()
    this.getloc=setInterval(() => {
  this.getLoc()
}, 60000);

  }

  getLoc(){
    fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/autoplaygeneral', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"action": "location", "lat" : 2.2222, "lon": 45.225, "email":"e@mail.com"})
})
    .then((response) => response.json())
    .then((responseJson) => {
console.log(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  
  getData() {
    return  [
    {
      
    name:"John Doe",
    album:"https://nexter.org/wp-content/uploads/2020/02/car_accident_pic-1280x720.jpg", 
    artist:"Rear end collision, nobody injured, avoid this street for now",
    timestamp:"11/22/2020 5:10 AM"
  },
  {
      
    name:"Jane Doe",
    album:"https://tmcattorneys.com/wp-content/uploads/2019/04/rearendcaraccident3.jpg", 
    artist:"Rear end collision, nobody injured, avoid this street for now",
    timestamp:"11/22/2020 5:10 AM"
  }
  ]
  }

  render(){
    const { navigation, route } = this.props;
    const { coords } = route.params;
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
 <Text style={{position:'relative',fontSize:35,marginTop:'10%', marginLeft:'5%', textAlign:'left', color:'#000', fontFamily:'FuturaH'}}>Incident Report</Text>
      <Text style={{position:'relative',fontSize:20,marginTop:'5%',marginLeft:'5%',textAlign:'left', color:'#000', fontFamily:'FuturaH'}}>Location</Text>
     
      <View style={styles.mapContainer}> 
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: .005,
          longitudeDelta: .005
        }} >

                  <MapView.Marker  coordinate={coords} >
                 
                   <Image source={require('../assets/crash.png')}></Image>
                </MapView.Marker>

                  
    
              </MapView></View>
    
      <ScrollView style={styles.scrollcontainer}>
      <SongList itemList={this.getData()}/>
      </ScrollView>
      <Text style={{borderRadius:10, width:'80%', position:'absolute', zIndex:2,bottom:'2.5%', alignSelf:'center',textAlign:'center', height:70,fontFamily:'FuturaH', fontSize:20, backgroundColor:'#000', textAlignVertical:'center', color:'#FFF'}}  onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('UpdateIn',{coords:coords}
            )}}>ADD INFO</Text>
      
    </View>
    );
    }
    else {
    return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    position:'relative',
    backgroundColor:'#f5f5f5'
  },
  left:{
    height:'7%',
    width:'7%',
    top:'2.5%',
    resizeMode:'contain',
    left:'5%',
    position:'absolute',
  },
  right:{
    height:'7%',
    width:'7%',
    top:'2.5%',
    resizeMode:'contain',
    right:'5%',
    position:'absolute'
  },
  middle:{
    height:'60%',
    width:'60%',
    marginTop:'5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
  },
  album:{
    height:'40%',
    width:'50%',
    marginTop:'7.5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
    borderRadius:10,
  },
  spotify:{
    height:'100%',
    width:'8%',
    marginTop:'7.5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
    marginLeft:'2%',
  },
  mapContainer: {
    height: '10%',
    width:'90%',
    alignSelf:'center',
    position:'relative',
    backgroundColor:'#F2F3F5',
    alignContent:'center',
    marginTop:'5%',
    borderRadius:10,
  },
  map: {
    height: '100%',
    borderRadius:100,
    width:'100%',
    alignSelf:'center',
    
  },
  playing:{
      width:'70%',
      height:'40%',
      elevation:1,
      backgroundColor:'#FFF',
      alignSelf:'center',
      marginTop:'15%',
      borderRadius:20
  },
  scrollcontainer:{
    marginTop:'5%',
    marginBottom:'25%'
  }
  
});