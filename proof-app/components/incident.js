import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Song({ route,name,album, artist, timestamp}) {
    const navigation = useNavigation();
    return (
    <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../assets/user.png')} style={styles.spotify}></Image>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text></View>
         <Image source={{ uri: album }} style={styles.photo} />
        <View style={styles.fishdeets}>  
        
       
            <Text style={styles.description}>
                {artist}
            </Text>
         
        </View>
        
        
    </View>
)}



const styles = StyleSheet.create({
    container: {
        flex: 1,
       flexDirection:'column',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation:1,
        alignSelf:'center',
        justifyContent:'center',
        width:'90%',
        
    },
    name: {
        fontSize: 20,
        color: '#000',
        fontFamily:'FuturaH',
        marginTop: '10%',
        textAlignVertical:'center',
        marginLeft:'17%'
    },
     photo: {
        height: 200,
        width: 300,
        justifyContent:'center',
        borderRadius:10,
        marginTop:'5%',
        resizeMode:'contain',
        alignSelf:'center',
        
    },
    fishdeets: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 30,
        marginTop:20,
        marginRight: 30,
        justifyContent: 'center',
        
    },
    timestamp:{
        fontFamily:'FuturaL',
        marginTop:'12%',
        color:'#000',
        marginLeft:'5%'
    },
    spotify:{
        position:'absolute',
        marginTop:'5%',
        resizeMode:'contain',
        left:'5%',
        height:30,
        width:30,
    },
    description: {
        fontSize: 18,
        fontFamily:'FuturaL',
        color:'#000'
    },
   deets:{
       borderRadius:30,
       fontFamily:'FuturaH',
       elevation:2,
       backgroundColor:'#379DA6',
       color:'#FFF',
       fontSize:15,
       padding:'5%',
       textAlign:'center',
       width:'50%',
       left:'22.5%',
       marginTop:'5%',
       marginBottom:'7.5%',
   }
});