import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function Panier() {
  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>
      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '3%',
                  fontStyle: 'italic',
                  color: 'rgb(71, 42, 117)'
                }}>
                    Vos différents produits sélectionnés
                </Text>
                <Text style = {{color: 'rgb(71, 42, 117)', fontSize: 16, textAlign: 'center', fontStyle: 'italic', marginTop: 10, marginHorizontal: '3%'}}> (Vous pouvez modifier la quantité d'un produit en appuyant 
                        simplement sur le nombre de la quantité) 
                    </Text>
          </View>
       </ScrollView>
    </View>
  )
}
