import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

let customFonts  = {
    'FuturaH': require('../assets/fonts/futurah.ttf'),
    'FuturaL': require('../assets/fonts/futural.ttf'),
  };

export default class UpdateIn extends React.Component  {
  state = {
    fontsLoaded: false,
    markers: [{"latlng":{
        "latitude": 25.76684817404011,
        "longitude": -80.19163068383932,
      }}],
      location:null,
      image: null,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  async componentDidMount(){
      this._loadFontsAsync();
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
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


//   registerUser(){
//     fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/autoplaygeneral', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({"action": "register", "lat" : 2.2222, "lon": 45.225, "email":"e@mail.com", "password" : "somepasswordhere", "spotify": "2222222"})
// })
//     .then((response) => response.json())
//     .then((responseJson) => {
// console.log(responseJson);
//     })
//     .catch((error) => {
//         console.error(error);
//     });
//   }

  render(){
    const { navigation, route } = this.props;
    const { coords } = route.params;
    let { image } = this.state;
    
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
     
      <Text style={{position:'relative',fontSize:35,marginTop:'10%', marginLeft:'5%', textAlign:'left', color:'#000', fontFamily:'FuturaH'}}>Update Incident</Text>
     
     
      {this.state.location &&
       <View style={styles.mapContainer}> 
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: .005,
          longitudeDelta: .005
        }} 
        >
         
                  <MapView.Marker coordinate={coords} >
                  
                   <Image source={require('../assets/crash.png')}></Image>
                </MapView.Marker>

                  
            
              </MapView></View>}
      <TextInput placeholder='Description' multiline={true} numberOfLines={7} style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'30%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center', textAlignVertical:'top'}}></TextInput>
      <Text style={{position:'relative',fontSize:20,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginTop:'5%', backgroundColor:'#000', padding:'3.5%', width:'80%', borderRadius:10, alignSelf:'center', elevation:1}} onPress={()=>this._pickImage()}>+ ADD IMAGE</Text>
        {image && <Image source={{ uri: image }} style={{ width: '80%', height: 200, alignSelf:'center', marginTop:'5%' }} />}
   
      
      <Text style={{position:'absolute',fontSize:20,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaH', bottom:'5%', backgroundColor:'#000', padding:'5%', width:'70%', borderRadius:10, alignSelf:'center', elevation:1}} onPress={()=>{this.registerUser();this.props.navigation.navigate('Login');}}>SUBMIT</Text>

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
    
  },
  header:{
    height:'30%',
    width:'70%',
    marginTop:'20%',
    resizeMode:'contain',
    alignSelf:'center'
  },
  mapContainer: {
    height: '10%',
    width:'80%',
    alignSelf:'center',
    position:'absolute',
    zIndex:2,
    backgroundColor:'#F2F3F5',
    alignContent:'center',
    top:'10%',
    borderRadius:50,
  },
  map: {
    height: '100%',
    borderRadius:100,
    width:'100%',
    margin:'5%',
    alignSelf:'center',
    
  },
  
});