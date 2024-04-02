import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function MessagesRecus() {

  // Constante de chargement
  const [loading, setLoading] = useState(true);

  // Constante de navigation
  const navigation = useNavigation();

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // constante du tableau qui contiendra les différents historiques recupérés de la BD
     const [tabMessages, setTabMessages] = useState([]);

 
     useEffect (() => {
        let tab = [];

          db.transaction(tx => {

            tx.executeSql(
              "SELECT * FROM Notifications",
              [],
              (_, { rows }) => {
                if (rows.length > 0) {
                  //alert("Oui")
                  for(let i=0; i<rows.length; i++){
                    //alert(rows.item(i).User+"     "+rows.item(i).AEnvoyé)
                      if (rows.item(i).AEnvoyé == "oui"){
                          tab.unshift({
                          profil: rows.item(i).Profil,
                          username: rows.item(i).User
                          })
                    }
                  }  
                  setTabMessages(tab);
                  setLoading(false);
                } else {
                  setLoading(false);
                }
              })});

      }, [])

      // Fonction permettant d'afficher un à un les utilisateurs ayant envoyé un message
      const afficherMessages = () => {
           
        return tabMessages.map((message, index) => {
               return (
                    <TouchableOpacity key={index} 
                    
                       onPress = {() => {
                          updateInfos(message.username);
                       }}

                    style={{marginBottom: 10, backgroundColor: 'rgb(127, 193, 243)', borderRadius: 15, flexDirection: 'row', width: '80%', marginLeft: '10%', padding: 7, alignItems: 'center'}}>
                        <Text style={{height: 10, borderWidth: 10, position: 'absolute', right: -5, top: -7, borderRadius: 50, borderColor: 'red'}}></Text>
                        <Image style={{height: 70, width: 70, borderRadius: 50, marginLeft: 7, marginRight: 14}} source={message.profil ? {uri: message.profil} : require("../images/Profil.png")}/>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>{message.username}</Text>
                    </TouchableOpacity>
               )
        })
    }


    // Fonction permettant de changer l'interlocuteur dans le localstorage et de mettre AEnvoyé du client en question à non
    const updateInfos = async (info) => {
         
            await AsyncStorage.setItem("Interlocuteur", info);

            db.transaction(tx => {
                tx.executeSql(
                "UPDATE Notifications SET AEnvoyé = ? WHERE User = ?",
                ["non", info],
                )
             });

             navigation.reset({
                index: 0,
                routes: [{ name: 'Home'}, {name: 'Centre Administrateur'}, {name: 'Messages reçus'}, {name: 'Messaging support' }],
              });

    }

  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>

        {/* View qui affiche le loading de la page */}
        {loading && <View style={{position: 'absolute', width: "100%", height: '100%', zIndex: 200, backgroundColor: "rgba(0, 0, 0, 0.752)", justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={75} color={"violet"} />
                    </View>}

        <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45%',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(218, 237, 252)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100%',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(218, 237, 252)',
           bottom: 0,
           right: 0
         }}></View>
      <ScrollView>
          <View style={{marginBottom: 45}}>
                <Text style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '10%'
                }}>
                    Consultez les messages recus des différents clients ci-dessous
                </Text>
                <Text style={{paddingHorizontal: '10%', textAlign: 'center', fontStyle: 'italic', marginTop: 10, marginBottom: 40}}>(Si la page est vierge, alors cela veut tout simplement dire qu'il n'y a aucun message)</Text>
                {afficherMessages()}
          </View>
       </ScrollView>
    </View>
  )
}
