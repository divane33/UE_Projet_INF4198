import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { useState } from 'react';


export default function LaunchingPage() {
 
  const navigation = useNavigation();


  return (
      <View style={styles.container}>
        <StatusBar  backgroundColor='transparent' />
        <View style={styles.decor1}></View>
        <View style={styles.decor2}></View>
         <Text style={styles.textLogo}> COURSO </Text>
         <Text style={styles.appDescription}>Un endroit pour commander tous vos produits en sécurité !</Text>
         <Image style={styles.imageLogo} source={require("../images/LogoApp.png")}/> 
         <TouchableOpacity style={styles.touchable} onPress={()=>{

            navigation.navigate('SignUp')

         }}>
             <Text style={
               {textAlign: 'center', 
               fontWeight: 'bold', 
               color: 'white',
               fontSize: 24,
               fontStyle: 'italic',
               textShadowColor: "black",
               textShadowOffset: {width: -4, height: 6},
               textShadowRadius: 6,
              }}
             >Commencer</Text>
         </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(252, 244, 239)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  decor1: {
    position: 'absolute',
    //borderWidth: 2,
    top: 0,
    left: 0,
    width: '65%',
    height: '35%',
    borderBottomEndRadius: 300,
    backgroundColor: 'rgb(116, 196, 243)',
  },
  decor2: {
    position: 'absolute',
    //borderWidth: 2,
    bottom: 0,
    right: 0,
    width: '75%',
    height: '37%',
    borderTopStartRadius: 400,
    backgroundColor: 'rgb(116, 196, 243)'
    // backgroundColor: 'rgb(245, 198, 149)',
  },
  textLogo: {
      fontSize: 55,
      fontWeight: '900',
      color: 'rgb(35, 106, 187)',
      //color: 'rgb(151, 50, 10)',
      textShadowColor: "rgb(4, 22, 43)",
      textShadowOffset: {width: -3, height: 3},
      textShadowRadius: 6,
  },
  appDescription: {
    paddingHorizontal: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'rgb(11, 60, 116)',
    marginTop: 25
  },
  imageLogo: {
    width: '100%',
    height: '52%',
    //transform: 'scale(0.9)',
    marginTop: -25
  },
  touchable: {
     display:'flex',
     alignContent: 'center',
     justifyContent: 'center',
     padding: 10,
     paddingVertical: '4%',
     //borderWidth: 2,
     width: '65%',
     borderRadius: 15,
     //backgroundColor: 'rgb(34, 133, 226)',
     backgroundColor: 'rgb(5, 45, 90)',
  }
});
