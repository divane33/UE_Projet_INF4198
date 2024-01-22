import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function ForgetPass() {

    //Constantes du champ du formulaire
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();

   // constante pour ouvrir ma base de données GFOOD 
   const db = SQLite.openDatabase("GFOOD_db");

   // Fonction permettant de vérifier les informations entrées par l'utilisateur pour se login
   const searchPassword = () => {

    if(!username || !email){
        alert("Veuillez remplir tous les champs s'il vous plaît !");
    }else{
       
                      try {
                              db.transaction(tx => {
                                tx.executeSql(
                                  "SELECT * FROM Users",
                                  [],
                                  (_, { rows }) => {
                                    if (rows.length > 0) {
                                      for(let i=0; i<rows.length; i++){
                                          
                                          if(rows.item(i).Username == username && rows.item(i).Email == email){
                                               //alert("Connecté avec succès");
                                               alert("Votre mot de passe est: "+rows.item(i).Password);
                                               return
                                          }else{
                                            if(i == rows.length-1){ 
                                              alert("Utilisateur non retrouvable. Veuillez essayer de nouveau !");
                                              return
                                            }
                                          }
                                      }
                                    } else {
                                      alert("Utilisateur non retrouvable. Veuillez essayer de nouveau !");
                                    }
                                  },
                                  (_, error) => {
                                    console.log("Error fetching user details:", error);
                                    alert("Error fetching user details: " + error);
                                  }
                                );
                              });
                      
                           } catch (error) {
                                alert("Il y'a eu des erreurs lors de la vérification de vos informations: " + error);
                      }

    }

}


  return (
    <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      <ScrollView>
          <View style={{
              alignItems: 'center',
              paddingBottom: '10%'
          }}>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '15%',
                  paddingHorizontal: '5%',
                  fontStyle: 'italic',
                  color: 'rgb(204, 117, 3)'
                }}>
                    Veuillez remplir le formulaire suivant afin de recupérer votre mot de passe !
                </Text>

                <View style={{
                    borderWidth: 4,
                    marginTop: '14%',
                    width: '85%',
                    height: 400,
                    borderRadius: 20,
                    borderColor: 'rgb(204, 117, 3)',
                    alignItems: 'center',
                    paddingVertical: '18%'
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        marginBottom: '2%'
                    }}>Username:</Text>
                    <TextInput
                     placeholder='Appuyer ici pour remplir'
                     style={{
                         backgroundColor: 'rgb(235, 217, 194)',
                         padding: '2%',
                         paddingLeft: '5%',
                         width: '80%',
                         borderRadius: 7,
                         marginBottom: '8%'
                     }}

                      onChangeText={setUsername}

                    ></TextInput>

                   <Text style={{
                        fontWeight: 'bold',
                        marginBottom: '2%'
                    }}>Email:</Text>
                    <TextInput
                     placeholder='Appuyer ici pour remplir'
                     style={{
                         backgroundColor: 'rgb(235, 217, 194)',
                         padding: '2%',
                         paddingLeft: '5%',
                         width: '80%',
                         borderRadius: 7
                     }}

                     onChangeText={setEmail}

                    ></TextInput>

                    <TouchableOpacity style={{
                        //borderWidth: 2,
                        width: '60%',
                        padding: '3%',
                        backgroundColor: 'rgb(39, 149, 223)',
                        borderRadius: 10,
                        marginTop: '20%'
                        
                    }}
                    
                       onPress = {searchPassword}
                    
                    >
                         <Text style={{
                             fontSize: 20,
                             fontWeight: 'bold',
                             textAlign: 'center',
                             color: 'white'
                         }}>
                             Recupérer
                         </Text>
                    </TouchableOpacity>

                </View>

          </View>
       </ScrollView>
    </View>
  )
}
