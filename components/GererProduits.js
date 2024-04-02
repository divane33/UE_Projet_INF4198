import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as SQLite from "expo-sqlite";
import { Searchbar } from 'react-native-paper';
import { Icon } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GererProduits() {

   // Constante du chargement
   const [loading, setLoading] = useState(true);

     // constante pour ouvrir ma base de données GFOOD 
     const db = SQLite.openDatabase("GFOOD_db");

   // Constante de la recherche
   const [searchQuery, setSearchQuery] = useState("");

   // Constante du tableau contenant tous les produits de la BD
   const [tabProduits, setTabProduits] = useState([]);

   const navigation = useNavigation();

   useEffect (() => {
     let i=0;
     let inter = setInterval(() => {
              db.transaction(tx => {
                tx.executeSql(
                "SELECT * FROM Produits",
                [],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        let TAB = [];
                    for(let i=0; i<rows.length; i++){
                        TAB.unshift({
                            nom: rows.item(i).Nom,
                            image: rows.item(i).Image,
                            description: rows.item(i).Description,
                            categorie: rows.item(i).Categorie
                        })
                      // alert(rows.item(i).Nom +" "+ rows.item(i).Image)
                    }

                    setTabProduits(TAB);
                    setLoading(false)
                }else {
                  setLoading(false);
                }
                })
            })
            if(i++ == 2) {
              clearInterval(inter)
            }
     }, 500);
   }, [])

   // Fonction enregistrant un produit à modifier dans localStorage
   const modifyProduct = async (nameProduct) => {
    try {
      await AsyncStorage.setItem("Produitàmodifier", nameProduct);
      //alert('ok now');
    } catch (error) {
      // Gérer l'erreur de sauvegarde
    }
  };


     // Fonction retournant chaque produit de tabProduits
     const tousProduits = () => {
     
        return tabProduits.map((produit, index) => {
            if(produit.nom.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
               produit.description.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
               produit.categorie.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ){
                return (
                        <View key={index} style = {{
                            width: "85%",
                            borderWidth: 2,
                            borderColor: "rgb(149, 177, 184)",
                            borderRadius: 20,
                            overflow: "hidden",
                            backgroundColor: 'rgb(214, 240, 245);',
                            marginBottom: 20
                        }}>
                            {/* <Image style={{
                                height: 200
                            }} source={{uri: produit.image}}/>  */}
                            {(produit.image == 7.0) && <Image style={{
                            width: "100%",
                            height: 200
                         }} source={require("../images/pain.jpg")} />}

                         {(produit.image == 8.0) && <Image style={{
                            width: "100%",
                            height: 200
                         }} source={require("../images/pain1.jpeg")} />}

                         {(produit.image != 7.0 && produit.image != 8.0) && <Image style={{
                            width: "100%",
                            height: 200
                         }} source={{uri: produit.image}} />}

                        <Text style = {{
                            textAlign: "center",
                            fontSize: 18,
                            fontWeight: 'bold',
                            fontStyle: "italic",
                            marginTop: 15
                        }}>{produit.nom}</Text>

                            <View style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style = {{
                                //borderWidth: 2,
                                borderColor: "green",
                                padding: 12,
                                fontSize: 18,
                                fontWeight: 'bold',
                                borderRadius: 10,
                                backgroundColor: "rgb(2, 173, 2)",
                                color: "white",
                                marginRight: 25,
                                marginTop: 15,
                                marginBottom: 15
                            }}
                            
                              onPress = {() => { 
                                modifyProduct(produit.nom);
                                navigation.navigate("ModifierProduit");
                              }}
                            
                            >
                                Modifier</Text>

                            <Text style = {{
                                //borderWidth: 2,
                                borderColor: "green",
                                padding: 12,
                                fontSize: 18,
                                fontWeight: 'bold',
                                borderRadius: 10,
                                backgroundColor: "red",
                                color: "white",
                                marginTop: 15,
                                marginBottom: 15
                            }}
                            
                            onPress = { () => {
                                try {
                                    db.transaction((tx) => {
                                      tx.executeSql(
                                      "DELETE FROM Produits WHERE Nom = ?",
                                      [produit.nom]
                                      )
                                    } );
            
                                     //alert("Le produit a bien été supprimé !");
                                     navigation.reset({
                                      index: 0,
                                      routes: [{ name: 'Home' },{ name: 'Centre Administrateur' },{ name: 'GererProduits' }],
                                    });
                                    //  navigation.navigate("Your Foods")
                                    //  navigation.navigate("Home")
                                    //  navigation.navigate("Centre Administrateur")
                                    //  navigation.navigate("GererProduits")
                        
                                } catch (error) {
                                      alert("Il y'a eu une erreur lors de la suppression du produit : " + error);
                                 }
                            }}
                            
                            >Supprimer</Text>
                            </View>
                        </View>
                )
            }
        })  

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

        <Text style = {{
            //borderWidth: 2,
            position: 'absolute',
            bottom: 50,
            right: 25,
            padding: 7,
            borderRadius: 50,
            backgroundColor: 'rgb(0, 132, 255)',
            zIndex: 50
        }}
        
        onPress = {() => {navigation.navigate("Add Food")}}
        
        >
             <Icon
                source="plus"
                size={50}
                color="white"
              />
        </Text>

      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '6%',
                  fontStyle: "italic",
                  color: 'indigo'
                }}>
                    Consultez et gérer les produits ajoutés ci-dessous
                </Text>

                <Searchbar
                     placeholder="Rechercher un produit"
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

                 <View style = {{
                     //borderWidth: 2,
                     alignItems: "center",
                     marginBottom: 100
                 }}>

                    {tousProduits()}
                    

                 </View>

          </View>
       </ScrollView>
    </View>
  )
}
