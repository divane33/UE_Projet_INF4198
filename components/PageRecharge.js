import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator} from 'react-native';
import { Searchbar } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function PageRecharge() {

  // Constante de chargement
  const [loading, setLoading] = useState(true);

   // Constante de la recherche
   const [searchQuery, setSearchQuery] = useState("");

   const navigation = useNavigation();

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // Constante du tableau pour récupérer les différentes demandes de recharges de la BD
  const [tabRecharges, setTabRecharges] = useState([]);

  useEffect(() => {

    let i = 0;

   let interRecharge = setInterval(() => {

       if(i==2) {
         clearInterval(interRecharge);
       }

      db.transaction(tx => {

        tx.executeSql(
          "SELECT * FROM Recharges",
          [],
          (_, { rows }) => {
            if (rows.length > 0) {
                let tab = [];
              for(let i=0; i<rows.length; i++){
  
                  tab.unshift({
                      profil: rows.item(i).Profil,
                      user: rows.item(i).Username,
                      tel: rows.item(i).Tel,
                      montant: rows.item(i).Montant
                  })
  
              }
              setTabRecharges(tab);
              setLoading(false);
            } else {
              setLoading(false);
            }
          }
        )
        })
        i++;
    }, 750);

  }, [])

  // Fonction permettant d'afficher les demandes de recharges un à un
    function displayRecharges() {
        
          return tabRecharges.map((recharge, index) => {

               if(recharge.user.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                  (recharge.tel == searchQuery) || (recharge.montant == searchQuery)) {

                    return (
                        <View key={index} style={{
                            //borderWidth: 2,
                            width: "75%",
                            marginLeft: '12.5%',
                            padding: 6,
                            paddingVertical: 12,
                            alignItems: 'center',
                            justifyContent: "center",
                            backgroundColor: 'rgb(236, 207, 386)',
                            borderRadius: 20,
                            marginBottom: 10
                        }}>
                             <Image style={{width: 90, height: 90, borderRadius: 50}} source={recharge.profil ? {uri: recharge.profil} : require("../images/Profil.png")}/>
                             <Text style={{fontSize: 18, marginTop: 3, fontWeight: 'bold'}}>{recharge.user}</Text>
                             <Text style={{fontSize: 16, fontWeight: '600', fontStyle: 'italic', marginTop: 5}}>Tel: <Text style={{fontWeight: '300'}}>{recharge.tel}</Text></Text>
                             <Text style={{fontSize: 16, fontWeight: '600', fontStyle: 'italic'}}>Montant: <Text style={{fontWeight: '300'}}>{recharge.montant} fcfa</Text></Text>
                             <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5, alignItems: "center"}}>
                                 <Text style={{backgroundColor: "white", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, marginRight: 10, fontSize: 19, fontWeight: 'bold', borderWidth: 3, borderColor: "green", color: "green"}}
                                 
                                   onPress={() => {
                                        db.transaction(tx => {
                                          tx.executeSql(
                                            "UPDATE Users SET Solde = Solde+? WHERE Username = ?",
                                            [recharge.montant, recharge.user],
                                          );
                                        });

                                        db.transaction((tx) => {
                                          tx.executeSql(
                                          "DELETE FROM Recharges WHERE Username = ?",
                                          [recharge.user],
                                          )
                                        } );

                                        navigation.reset({
                                          index: 0,
                                          routes: [{ name: 'Home' },{ name: 'Centre Administrateur' },{ name: 'Gerer les recharges' }],
                                        });

                                    }}
                                 
                                 >Approuver</Text>
                                 <Text style={{backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, marginRight: 10, fontSize: 19, fontWeight: 'bold', color: "white"}}
                                 
                                    onPress = {() => {
                                      db.transaction((tx) => {
                                        tx.executeSql(
                                        "DELETE FROM Recharges WHERE Username = ?",
                                        [recharge.user],
                                        )
                                      } );

                                      navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Home' },{ name: 'Centre Administrateur' },{ name: 'Gerer les recharges' }],
                                        });
                                      }}
                                 
                                 >Rejetter</Text>
                             </View>
                        </View>
                    )

               }

          })

    }

  return (
    <View style={{backgroundColor: 'white', height: "100%", paddingBottom: 25}}>

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
           backgroundColor: 'rgb(230, 222, 236)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100%',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(230, 222, 236)',
           bottom: 0,
           right: 0
         }}></View>
      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '3%',
                  fontSize: 22,
                  paddingHorizontal: 45
                }}>
                    Consultez les demandes de recharges des clients ci-dessous
                </Text>
                <Text style={{textAlign: "center", paddingHorizontal: 14, fontSize: 16, fontStyle: "italic", marginTop: 10}}>(Si la page est vierge, cela signifit qu'aucun utilisateur n'a fait une demande)</Text>
          
                <Searchbar
                     placeholder="Rechercher une recharge"
                     onChangeText={(query) => {

                        setSearchQuery(query);

                     }}
                     //value={searchQuery}
                     //placeholderTextColor = "white"

                     onSubmitEditing = {() => {
                        //alert("OK !");
                     }}

                     style={{
                        //marginVertical: 25,
                        marginBottom: '8%',
                        width: '90%',
                        marginStart: '5%',
                        backgroundColor: 'hsl(282, 58%, 84%)',
                        marginTop: "10%"
                     }}
               />

               {displayRecharges()}
          
          </View>
       </ScrollView>
    </View>
  )
}
