import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddFood() {

   // Constante du chargement
   const [loading, setLoading] = useState(true); 

   // constante pour ouvrir ma base de données GFOOD 
      const db = SQLite.openDatabase("GFOOD_db");

   // constante du tableau qui contiendra les différents historiques recupérés de la BD
      const [tabHistoriques, setTabHistoriques] = useState([]);

    // Fonction permettant de recupérer l'utilisateur actif
       const getUser = async () => {

              let User = await AsyncStorage.getItem("activeUser");
              return User;

          
       }

      useEffect (() => {

        let activeUser;

        getUser().then(active => {
          activeUser = active;

          let tab = [];

          db.transaction(tx => {

            tx.executeSql(
              "SELECT * FROM Historiques",
              [],
              (_, { rows }) => {
                if (rows.length > 0) {
                  for(let i=0; i<rows.length; i++){
                    if(rows.item(i).Username === activeUser) {
                      tab.unshift({
                          type: rows.item(i).Type,
                          date: rows.item(i).DateHistorique,
                          heure: rows.item(i).Heure,
                          montant: rows.item(i).Montant
                      })

                     // alert (rows.item(i).Username +" "+ rows.item(i).Type +" "+ rows.item(i).DateHistorique +" "+ rows.item(i).Heure +" "+ rows.item(i).Montant)

                    }
                  }  
                  setTabHistoriques(tab);
                  setLoading(false)
                }else {
                  setLoading(false);
                }
              })});

        });;
        //alert(active)
       

      }, [])

      // Fonction permettant d'afficher les historiques de l'utilisateur un à un
      const afficherHistoriques = () => {
           
        return tabHistoriques.map((historique, index) => {
             
                return (
                  <View key={index} style={{
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
                          Vous avez éffectué une nouvelle {historique.type} de {historique.montant} Fcfa le {historique.date} à {historique.heure}
                      </Text>
      
                  </View>
                )

        })

      }

  return (
    <View style={{backgroundColor: 'white', height: '100%', paddingBottom: 55}}>

      {/* View qui affiche le loading de la page */}
      {loading && <View style={{position: 'absolute', width: "100%", height: '100%', zIndex: 200, backgroundColor: "rgba(0, 0, 0, 0.752)", justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={75} color={"orange"} />
                    </View>}

    <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45%',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(212, 240, 233)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100%',
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

            {afficherHistoriques()}

      </ScrollView>
    </View>
  )
}
