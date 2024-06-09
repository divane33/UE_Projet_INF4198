import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from "expo-sqlite";
//import { useState } from 'react';


export default function LaunchingPage() {

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // tableau contenant les catégories à ajouter par défaut
  const tabCategorie = [
    {
      nom: "Produits Alimentaire",
      image: 4.0,
    },
    {
      nom: "Produits Electronique",
      image: 5.0,
    }
  ]
 
  const navigation = useNavigation();


  // Fonction pour l'ajout des catégories par défaut
  function ajoutCatégories() {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Categorie",
        [],
        (_, { rows }) => {
          if (rows.length <= 0) {
              for( let elt of tabCategorie) {
  
                          db.transaction((tx) => {
                              tx.executeSql(
                              "INSERT INTO Categorie (Nom, Image) VALUES (?,?)",
                              [elt.nom, elt.image]
                              )
                          } );
  
              }
          }
        })
     })

      // Requête pour ajouter le produit par défaut: pain
      db.transaction((tx) => {

        tx.executeSql(
          "SELECT * FROM Produits",
          [],
          (_, { rows }) => {
            if (rows.length <= 0) {
                tx.executeSql(
                  "INSERT INTO Produits (Nom, Description, DatePublication, Categorie, Image, Prix, Commentaires, Quantité, Solde) VALUES (?,?,?,?,?,?,?,?,?)",
                  ["Gros pain", "Pain à déguster au petit déjeuner", "4/3/2024", "Produits Alimentaire", 7.0, 250, "", 50, 0]
                )
                tx.executeSql(
                  "INSERT INTO Produits (Nom, Description, DatePublication, Categorie, Image, Prix, Commentaires, Quantité, Solde) VALUES (?,?,?,?,?,?,?,?,?)",
                  ["Petit pain", "Très délicieux petits pains à déguster", "4/3/2024", "Produits Alimentaire", 8.0, 50, "", 85, 0]
                )
            }
          })
     } );

  }

  useEffect(()=>{

    // Crée la table Categorie s'il n'en existe pas
     db.transaction(tx => {
           tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Categorie (id INTEGER PRIMARY KEY AUTOINCREMENT, Nom TEXT, Image TEXT)',
             [],
           // (_, error) => console.error('Erreur lors de la création de la table : ', error)
           );
         });

         db.transaction(tx => {
          tx.executeSql(
              'CREATE TABLE IF NOT EXISTS Produits (id INTEGER PRIMARY KEY AUTOINCREMENT, Nom TEXT, Description TEXT, DatePublication TEXT, Categorie TEXT, Image TEXT, Prix REAL, Commentaires TEXT, Quantité INTEGER, Solde REAL)',
              [],
            // (_, error) => console.error('Erreur lors de la création de la table : ', error)
            );
          });

          db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, Envoyeur TEXT, Recepteur TEXT, Message TEXT, Image TEXT, NomEnvoyeur TEXT, GenreEnvoyeur TEXT)',
                [],
              // (_, error) => console.error('Erreur lors de la création de la table : ', error)
              );
            });

            db.transaction(tx => {
              tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS Notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, User TEXT, Notif TEXT, AEnvoyé TEXT, Profil TEXT)',
                  [],
                // (_, error) => console.error('Erreur lors de la création de la table : ', error)
                );
              });

          // Crée la table Historiques s'il n'en existe pas
              db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS Historiques (id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Type TEXT, DateHistorique TEXT, Heure Text, Montant REAL)',
                  [],
                );
            });
          // ----------------

            // Crée la table Commentaires pour les différents produits s'il n'en existe pas
            db.transaction(tx => {
              tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS Commentaires (id INTEGER PRIMARY KEY AUTOINCREMENT, Profil TEXT, Produit TEXT, Messages TEXT, Username TEXT)',
                  [],
              );
              });
            // ----------------


          // Crée la table Recharges s'il n'en existe pas
              db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS Recharges (id INTEGER PRIMARY KEY AUTOINCREMENT, Profil TEXT, Username TEXT, Tel TEXT, Montant REAL)',
                  [],
                );
              });


        // db.transaction(tx => {
        //   tx.executeSql(
        //     "DROP TABLE IF EXISTS Commandes",
        //     [],
        //   // (_, error) => console.error('Erreur lors de la création de la table : ', error)
        //   );
        // });

          // Crée la table Commandes s'il n'en existe pas
              db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS Commandes (id INTEGER PRIMARY KEY AUTOINCREMENT, Ref TEXT, DateCommande TEXT, Tel_Livreur REAL, Tel_Client REAL, Status TEXT, Produits TEXT, Code TEXT, AdresseLivraison TEXT, Total REAL, Renvoi TEXT, Motif TEXT)',
                  [],
                );
              });

         ajoutCatégories();

  }, [ajoutCatégories]);



  return (
      <View style={styles.container}>
        <StatusBar  backgroundColor='transparent' />
        <View style={styles.decor1}></View>
        <View style={styles.decor2}></View>
         <Text style={styles.textLogo}> Premier </Text>
         <Text style={styles.appDescription}>Un endroit pour commander tous vos produits en sécurité !</Text>
         <Image style={styles.imageLogo} source={require("../images/LogoApp.png")}/> 
         <TouchableOpacity style={styles.touchable} onPress={()=>{

            navigation.navigate('SignUp')

         }}>
             <Text style={
               {textAlign: 'center', 
               fontWeight: 'bold', 
               color: 'white',
               fontSize: 24,
               fontStyle: 'italic',
               textShadowColor: "black",
               textShadowOffset: {width: -4, height: 6},
               textShadowRadius: 6,
              }}
             >Commencer</Text>
         </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(252, 244, 239)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  decor1: {
    position: 'absolute',
    //borderWidth: 2,
    top: 0,
    left: 0,
    width: '65%',
    height: '35%',
    borderBottomEndRadius: 300,
    backgroundColor: 'rgb(116, 196, 243)',
  },
  decor2: {
    position: 'absolute',
    //borderWidth: 2,
    bottom: 0,
    right: 0,
    width: '75%',
    height: '37%',
    borderTopStartRadius: 400,
    backgroundColor: 'rgb(116, 196, 243)'
    // backgroundColor: 'rgb(245, 198, 149)',
  },
  textLogo: {
      fontSize: 55,
      fontWeight: '900',
      color: 'rgb(35, 106, 187)',
      //color: 'rgb(151, 50, 10)',
      textShadowColor: "rgb(4, 22, 43)",
      textShadowOffset: {width: -3, height: 3},
      textShadowRadius: 6,
  },
  appDescription: {
    paddingHorizontal: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'rgb(11, 60, 116)',
    marginTop: 25
  },
  imageLogo: {
    width: '100%',
    height: '52%',
    //transform: 'scale(0.9)',
    marginTop: -25
  },
  touchable: {
     display:'flex',
     alignContent: 'center',
     justifyContent: 'center',
     padding: 10,
     paddingVertical: '4%',
     //borderWidth: 2,
     width: '65%',
     borderRadius: 15,
     //backgroundColor: 'rgb(34, 133, 226)',
     backgroundColor: 'rgb(5, 45, 90)',
  }
});
