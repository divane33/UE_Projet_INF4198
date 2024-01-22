import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function RechargerSolde() {

  const [montant, setMontant] = useState(0);

  // Fonction qui vérifit le montant entré par l'utilisateur
  const checkMontant = () => {
        if (montant < 500) {
          alert ("Vous devez entrer un montant supérieur ou égale à 500");
        }
  }


  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>

         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45vw',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(208, 238, 200)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100vw',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(208, 238, 200)',
           bottom: 0,
           right: 0
         }}></View>


      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 22,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '3%',
                  fontStyle: 'italic',
                  color: 'rgb(38, 92, 22)'
                }}>
                    Remplissez le formulaire ci-dessous pour éffectuer une recharge !
                </Text>
                <Text style = {{color: 'rgb(38, 92, 22)', fontSize: 16, textAlign: 'center', fontStyle: 'italic', marginTop: 10, marginHorizontal: '3%'}}> 
                (Votre demande sera approuvrée lorsque l'administrateur validera votre demande) 
                    </Text>
          </View>

          <View style={{
            borderWidth: 2,
            height: 250,
            marginHorizontal: '6%',
            marginVertical: 25,
            marginTop: 75,
            borderColor: 'rgb(38, 92, 22)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: 'white'
          }}>

               <Text style={{
                 fontSize: 20,
                 color: 'rgb(38, 92, 22)',
                 fontWeight: 'bold'
                 }}>Montant:</Text>
               <TextInput 
               placeholder='Entrer votre montant ici'
               placeholderTextColor={"gray"}
               style={{
                 backgroundColor: 'rgb(196, 218, 189)',
                 paddingVertical: 10,
                 paddingHorizontal: 10,
                 width: '80%',
                 textAlign: 'center',
                 borderRadius: 10,
                 fontSize: 17,
                 marginTop: 10
               }}
               
                  onChangeText = {setMontant}
               
               ></TextInput>
               <Text style={{
                 fontSize: 18,
                 //borderWidth: 2,
                 borderRadius: 12,
                 paddingVertical: 13,
                 width: '50%',
                 textAlign: 'center',
                 marginTop: 23,
                 fontSize: 22,
                 fontWeight: 'bold',
                 backgroundColor: 'rgb(97, 182, 72)',
                 color: 'white'
                 }}
                 
                   onPress = {checkMontant}
                 
                 >
                   Valider
               </Text>

          </View>
          
       </ScrollView>
    </View>
  )
}
