import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function FoodPage() {
  return (
    <View style={{backgroundColor: 'white'}}>
      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%'
                }}>
                    Foods Informations
                </Text>
          </View>
       </ScrollView>
    </View>
  )
}
