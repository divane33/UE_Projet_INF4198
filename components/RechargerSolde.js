import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function RechargerSolde() {

  const [montant, setMontant] = useState(0);
  const [profilUser, setProfilUser] = useState("");
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");

  const navigation = useNavigation();

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // Fonction permettant de récupérer le profil, l'username et le téléphone de l'utilisateur dans le localstorage
  async function getInfos() {
    let profil = await AsyncStorage.getItem("LienProfil");
    let nom = await AsyncStorage.getItem("activeUser");
    let téléphone = await AsyncStorage.getItem("Tel");

    setProfilUser(profil);
    setUsername(nom);
    setTel(téléphone);
  }

  // Fonction qui vérifit le montant entré par l'utilisateur
  const checkMontant = () => {
        if (!(montant >= 500) || (montant > 500000)) {
          alert ("Vous devez entrer un montant supérieur ou égale à 500, et aussi n'entrez que des nombres dans le champ. Le montant maximum de dépôt est de 500 000 fcfa");
        }
        else {
            // alert ("Montant validé et prise en compte !");
            let dat = new Date();
            let date = dat.getDate() +"/"+ (dat.getMonth()+1) +"/"+ dat.getFullYear();

            let heure = dat.getHours()+":"+dat.getMinutes();

            // Requête permettant d'ajouter la demande dans la table Recharges de la BD
                  db.transaction((tx) => {
                      tx.executeSql(
                      "INSERT INTO Recharges (Profil, Username, Tel, Montant) VALUES (?,?,?,?)",
                      [profilUser, username, tel, montant]
                      )
                  } );

              // Requête permettant d'ajouter l'historique de la recharge dans la BD
                  db.transaction((tx) => {
                      tx.executeSql(
                      "INSERT INTO Historiques (Username, Type, DateHistorique, Heure, Montant) VALUES (?,?,?,?,?)",
                      [username, "recharge", date, heure, montant]
                      )
                  } );

                  alert("Demande de recharge éffectuée avec succès !");
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });

        }
  }

  useEffect(() => {

        // Crée la table Recharges s'il n'en existe pas
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Recharges (id INTEGER PRIMARY KEY AUTOINCREMENT, Profil TEXT, Username TEXT, Tel TEXT, Montant REAL)',
            [],
          );
        });

        getInfos();

  }, [])


  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>

         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45%',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(208, 238, 200)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100%',
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

               keyboardType="numeric"
               
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
