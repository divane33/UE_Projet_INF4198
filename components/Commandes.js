import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function Commandes() {

  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
       <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45vw',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(231, 209, 177)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100vw',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(231, 209, 177)',
           bottom: 0,
           right: 0
         }}></View>
      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  color: 'rgb(126, 77, 4)',
                  fontStyle: 'italic',
                  paddingHorizontal: '3%',
                  marginBottom: 20
                }}>
                    Retrouvez vos commandes ci-dessous
                </Text>
                <Text style={{
                  marginBottom: 30,
                  fontSize: 17,
                  fontStyle: 'italic',
                  textAlign: 'center',
                  paddingHorizontal: 13,
                  marginTop: 10,
                  color: 'rgb(126, 77, 4)',
                  }}>(Si la page est vierge, alors cela signifit que vous n'avez aucune commande pour le moment)</Text>
          </View>

          <View style={{
            borderWidth: 2,
            marginHorizontal: '5%',
            marginVertical: 15,
            height: 250,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: 'white'
          }}>

             <Text style={{fontSize: 20, fontWeight: 'bold'}}>Ref_Commande:</Text>
             <Text style={{fontSize: 17}}>00000000000xfe00112</Text>

             <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Date: <Text style={{fontSize: 17, fontWeight: '0', color: 'rgb(80, 78, 78)'}}>21/01/2024</Text></Text>

             <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Tel_Livreur: <Text style={{fontSize: 17, fontWeight: '0', color: 'rgb(80, 78, 78)'}}>658971136</Text></Text>

             <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Status: <Text style={{fontSize: 17, fontWeight: '0', color: 'rgb(80, 78, 78)'}}>En cours...</Text></Text>

             <Text style={{
               //borderWidth: 2,
               paddingVertical: 10,
               fontSize: 18,
               fontWeight: 'bold',
               width: '80%',
               textAlign: 'center',
               marginTop: 12,
               borderRadius: 10,
               backgroundColor: 'orangered',
               color: 'white'
             }}
             
                  onPress = {() => {navigation.navigate("Messaging support")}}
              
             >Signaler un problème</Text>

          </View>

       </ScrollView>
    </View>
  )
}
