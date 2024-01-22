import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function Statistics() {
  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>
      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '3%'
                }}>
                    Consultez vos statistiques ci-dessous
                </Text>
          </View>
       </ScrollView>
    </View>
  )
}
