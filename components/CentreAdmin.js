import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function CentreAdmin() {
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
                    Ici vous pouvez faire la gestion de l'application
                </Text>
          </View>
       </ScrollView>
    </View>
  )
}
