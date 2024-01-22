import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function LivraisonsAF() {
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
                  color: 'rgb(153, 123, 41)'
                }}>
                    Retrouvez ci-dessous vos différentes livraisons à éffectuer !
                </Text>
          </View>
       </ScrollView>
    </View>
  )
}
