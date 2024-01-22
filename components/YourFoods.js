import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function AddFood() {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>

    <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45vw',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(212, 240, 233)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100vw',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(212, 240, 233)',
           bottom: 0,
           right: 0
         }}></View>

      <ScrollView>
            <View>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  textAlign: 'center',
                  paddingHorizontal: '5%',
                  marginTop: '12%',
                  color: 'rgb(32, 139, 113)',
                }}>
                  Consulter vos dernières historiques ci-dessous
              </Text>
              <Text style={{
                  marginBottom: 30,
                  fontSize: 17,
                  fontStyle: 'italic',
                  textAlign: 'center',
                  paddingHorizontal: 13,
                  marginTop: 10,
                  color: 'rgb(32, 139, 113)',
                  }}>(Si la page est vierge, alors cela signifit que vous n'avez aucun historique)</Text>
            </View>

            <View style={{
              borderWidth: 3,
              width: '90%',
              marginHorizontal: '5%',
              marginVertical: 10,
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderColor: 'rgb(15, 71, 57)',
              backgroundColor: 'white'
              }}>

                <Text style={{
                  textAlign: 'center',
                  paddingHorizontal: 20,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'rgb(15, 71, 57)'
                  }}>
                    Vous avez éffectué une recharge de 5000 Fcfa le 21/01/2024 à 13:01
                </Text>

            </View>

            <View style={{
              borderWidth: 3,
              width: '90%',
              marginHorizontal: '5%',
              marginVertical: 10,
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderColor: 'rgb(15, 71, 57)',
              backgroundColor: 'white'
              }}>

                <Text style={{
                  textAlign: 'center',
                  paddingHorizontal: 20,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'rgb(15, 71, 57)'
                  }}>
                    Vous avez éffectué une nouvelle commande le 21/01/2024 à 13:01
                </Text>

            </View>

      </ScrollView>
    </View>
  )
}
