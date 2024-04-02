//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { Icon } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
//import { Drawer } from 'react-native-paper';


export default function Home() {

   // Constante du tableau contenant tous les produits de la BD
   const [tabProduits, setTabProduits] = useState([]);

   // Constante du tableau permettant de récupérer les différentes catégories dans la BD
   const [tabCategories, setTabCategories] = useState([]);


  // Constante de notification de la messagerie
   const [color, setColor] = useState('transparent');
  // Constante de notification du panier 
   const [notifPanier, setNotifPanier] = useState("none");
   const [panierVide, setPanierVide] = useState(true);

   // Constante de notification d'ajout au panier
   const [messageAjout, setMessageAjout] = useState("none");
   const [reinitialiser, setReinitialiser] = useState(1);
   // Fonction qui ajoute et rétire le message d'ajout
   function displayAjoutMessage() {

            let i = 0;
            setMessageAjout("none");

            setTimeout(() => {
               setMessageAjout("flex");
               //alert(un)
            }, 50);
      
            // setReinitialiser(0);
            // let un = reinitialiser;
            // alert (un);

            let inter = setInterval(() => {

               i = i + 200; 

                if(i == 800){
                  setMessageAjout("none");
                  clearInterval(inter);
               }
            }, 200);

   }

   // Constantes d'affichage des différentes sections de catégories de nourritures
   const [displayStarchy, setDisplayStarchy] = useState(true);
   const [displayFV, setDisplayFV] = useState(true);

   const navigation = useNavigation();

   const [userID, setUserID] = useState();

   // constante pour ouvrir ma base de données GFOOD 
    const db = SQLite.openDatabase("GFOOD_db");

   // Fonction permettant de mettre le panier à zero ie d'instancier un panier vide
   const initPanier = async () => {
      await AsyncStorage.setItem("Panier", JSON.stringify([]));
      //setNotifPanier("none");
   }

   // Fonction permettant de recupérer les différentes catégories présentes dans la BD
   const getCatégories = () => {

      // Requête permettant de récupérer les catégories
      db.transaction(tx => {
         tx.executeSql(
         "SELECT * FROM Categorie",
         [],
         (_, { rows }) => {
            if (rows.length > 0) {
               let TABCat = [];
            for(let i=0; i<rows.length; i++){
               TABCat.push({
                  nom: rows.item(i).Nom,
                  image: rows.item(i).Image, 
               })

              // alert(rows.item(i).Image)
            }
            setTabCategories(TABCat);
         }})
      })

      // Requête permettant de savoir si un utilisateur a une notification
      db.transaction(tx => {
         tx.executeSql(
         "SELECT * FROM Notifications",
         [],
         async (_, { rows }) => {
            let user = await AsyncStorage.getItem("activeUser");
            if (rows.length > 0) {
            for(let i=0; i<rows.length; i++){
               if (rows.item(i).User == user && rows.item(i).Notif == "oui") {
                   setColor("red");
                   return
               }
            }
         }})
      })

   }

   // Fonction permettant de retourner les catégories par leur nom un à un
   const displayCategorieName = () => {
       return tabCategories.map((catégorie, index) => {
          if(catégorie.nom == searchQuery){
              return (
                <Text onPress={() => {setSearchQuery(catégorie.nom); setBgcTous("orange")}} key={index} style={{padding: 10, marginRight: 10, textAlignVertical: "center", backgroundColor: 'rgb(212, 90, 8)', color: 'white', fontSize: 18, textAlign: 'center', borderRadius: 15, fontWeight: 'bold'}}>{catégorie.nom}</Text>
              )
            }
           else {
            return (
               <Text onPress={() => {setSearchQuery(catégorie.nom); setBgcTous("orange")}} key={index} style={{padding: 10, marginRight: 10, textAlignVertical: "center", backgroundColor: 'orange', color: 'white', fontSize: 18, textAlign: 'center', borderRadius: 15, fontWeight: 'bold'}}>{catégorie.nom}</Text>
             )
           }
       })
   }

   // Constante de la couleur d'arrière plan du bouton Tous, dans le Home
      const [bgcTous, setBgcTous] = useState("rgb(212, 90, 8)");

   // Fonction permettant de retourner les catégories par leur nom et leur image un à un
   const displayCategorie = () => {
      return tabCategories.map((catégorie, index) => {
             return (
            
               <TouchableOpacity 
               
               onPress={() => {setSearchQuery(catégorie.nom); setBgcTous("orange")}}

               key={index} style={{
                  borderWidth: 2,
                  borderColor: 'brown',
                  minWidth: 310,
                  height: '83%',
                  borderRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
               }}>

                      {catégorie.image == 4.0 && <Image style={{
                         width: "100%",
                         height: "100%"
                      }} source={require("../images/catégorie_alimentaire.jpg")} />}

                      {catégorie.image == 5.0 && <Image style={{
                         width: "100%",
                         height: "100%"
                      }} source={require("../images/catégorie_électronique.jpg")} />}

                      {(catégorie.image != 4.0 && catégorie.image != 5.0) && <Image style={{
                         width: "100%",
                         height: "100%"
                      }} source={{uri: catégorie.image}} />}

                      <Text style={{
                         position: 'absolute',
                        // width: '100%',
                        // height: '100%',
                         display: 'flex',
                         justifyContent: 'center',
                         alignItems: 'center',
                         backgroundColor: 'rgba(0, 0, 0, 0.6)',
                         fontSize: 25,
                         fontWeight: 'bold',
                         color: 'white',
                         textShadowColor: "black",
                         textShadowOffset: {width: -3, height: 3},
                         textShadowRadius: 1,
                      }}> {catégorie.nom} </Text>

               </TouchableOpacity>

            )
      })
  }


    const getData = async () => {
      const genre = await AsyncStorage.getItem("Genre");
      if(genre == "Administrateur") {
         setDisplayChat(false);
      }

      try {
        const ac = await AsyncStorage.getItem("activeUser");
        if(ac !== null){
           setUserID(ac);
        }else{
           navigation.navigate("LogIn")
        }
        //alert('ok now');
      } catch (error) {
        // Gérer l'erreur de sauvegarde
      }
    };
    useEffect(() =>{
       //alert("Bien là")

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

       initPanier();
       getCatégories();

       let i=0;

      let interData = setInterval(() => {

         if(i==2) {
            clearInterval(interData);
         }

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
                        categorie: rows.item(i).Categorie,
                        datePub: rows.item(i).DatePublication,
                        solde: rows.item(i).Solde,
                        prix: rows.item(i).Prix,
                        quantité: rows.item(i).Quantité
                  })
                   //alert(rows.item(i).Image)
               }

               setTabProduits(TAB);
            }
            })
          })
          i++;
       }, 500);



       setInterval(() => {
         getData();
       }, 2000)
    }, []);


    // Fonction enregistrant un produit ajouté au panier dans localStorage
      const addProduct = async (nameProduct) => {

              let panierProduits = await AsyncStorage.getItem("Panier");
              let panierConcret;
              // alert(nameProduct.nom +" "+ nameProduct.prix +" "+ nameProduct.quantité +" "+ nameProduct.quantitéProduit);


                  try {
                     
                     if (!panierProduits) {
                        //alert ("Le panier n'existe pas !");
                        await AsyncStorage.setItem("Panier", JSON.stringify([]));
                        panierProduits = await AsyncStorage.getItem("Panier");
                        panierConcret = JSON.parse(panierProduits);
                        panierConcret.unshift({nom: nameProduct.nom, quantité: nameProduct.quantité, prix: nameProduct.prix, quantitéMax: nameProduct.quantitéProduit});
                        await AsyncStorage.setItem("Panier", JSON.stringify(panierConcret));
                       // addProduct();
                     } 
                     else {
                        //alert ("Le panier existe !"); 
                        //panierProduits.unshift(nameProduct);
                        panierConcret = JSON.parse(panierProduits);
                        
                        for (let elt of panierConcret) {
                              if (elt.nom === nameProduct.nom) {
                                 alert ("Ce produit a déjà été ajouté au panier !");
                                 setNotifPanier(notifPanier);
                                 return;
                              }
                        }

                        panierConcret.unshift({nom: nameProduct.nom, image: nameProduct.image, quantité: nameProduct.quantité, prix: nameProduct.prix, quantitéMax: nameProduct.quantitéProduit});
                        await AsyncStorage.setItem("Panier", JSON.stringify(panierConcret));
                        displayAjoutMessage();

                     }

                  }
                  catch (error) {
                     console.log(error);
                  }
      };

    // Fonction retournant chaque produit de tabProduits
    const tousProduits = () => {
     
      return tabProduits.map((produit, index) => {

          if((produit.nom.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
             produit.description.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
             produit.categorie.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) || 
             (produit.prix - ((produit.prix * produit.solde)/100) <= searchQuery)) && produit.quantité > 0 ){
              return (

               <View key={index} style={{
                  flexDirection: 'column',
                  borderWidth: 2,
                  borderColor: "rgb(196, 54, 3)",
                  paddingHorizontal: 0,
                  width: '85%',
                  marginVertical: 15,
                  marginLeft: '7.5%',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  overflow: 'hidden',
                  paddingBottom: 5
               }}>

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
                          
                         <Text style={{marginLeft: 8, fontStyle: "italic", color: "rgb(168, 46, 2)"}}>Ajouté le: {produit.datePub}</Text>
                         <Text style={{color: 'maroon', marginVertical: 1, textAlign: 'center', fontSize: 22, fontWeight: 'bold', paddingHorizontal: '3%'}}>{produit.nom}</Text> 
                         <Text style={{textAlign: 'center', fontSize: 15, paddingHorizontal: 1, fontStyle: 'italic'}}>
                            {produit.description}
                         </Text>
                         <Text style={{color: 'orangered', textAlign: 'center', marginVertical: 2, fontWeight: 'bold', fontSize: 22}}> {produit.solde > 0 && (<Text style={{color: "gray", textDecorationLine: "line-through", fontStyle: "italic"}}>{produit.prix} fcfa</Text>)}  {produit.prix - ((produit.prix * produit.solde)/100)} fcfa </Text> 

                         <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", marginTop: 2}}>
                            <Text onPress={() => {addProduct(
                               {
                                  image: produit.image,
                                  nom: produit.nom,
                                  prix: produit.prix - ((produit.prix * produit.solde)/100),
                                  quantité: 1,
                                  quantitéProduit: produit.quantité
                               }
                            ); setNotifPanier("flex"); setPanierVide(false); setReinitialiser(0)}} style={{marginRight:10, marginBottom: 8, color: 'white', backgroundColor: 'orangered', fontWeight: 'bold', fontSize: 18, textAlign: 'center', borderRadius: 10,padding: 13, width: '60%'}}>
                               Ajouter au Panier
                            </Text>
                            <Text onPress={() => {setAfficheView(true); getCommentaires(produit.nom); setProduitCommenté(produit.nom);}} style={{paddingTop: 3, textAlign: 'center', marginBottom: 8, borderWidth: 2, borderColor: "orange", borderRadius: 10, padding:1}}>
                               <Icon
                                  source="message"
                                  size={39}
                                  color="orange"
                               />
                            </Text>
                         </View>

               </View>

              )
             }
            })
    }


   const [active, setActive] = React.useState('');

   //Pour la barre de recherche
   const [searchQuery, setSearchQuery] = React.useState('');
   const onChangeSearch = query => setSearchQuery(query);

   /* Partie contenant la constante messageCommentaire lorsqu'un utilisateur ajoute un commentaire
   et contenant aussi la fonction pour afficher les différents commentaires sur un
   produit, commentaires récupérés depuis la BD des commentaires */ 

   const [afficheView, setAfficheView] = useState(false);

   const [messageCommentaire, setMessageCommentaire] = useState("");
   const [produitCommenté, setProduitCommenté] = useState("");
   const [tabCommentaires, setTabCommentaires] = useState([]);

   function getCommentaires (produit) {

      db.transaction(tx => {
         tx.executeSql(
         "SELECT * FROM Commentaires",
         [],
         (_, { rows }) => {
            if (rows.length > 0) {
               let TAB = [];
            for(let i=0; i<rows.length; i++){
               if (rows.item(i).Produit === produit) {
                  TAB.unshift({
                        profil: rows.item(i).Profil,
                        message: rows.item(i).Messages,
                        username: rows.item(i).Username,
                  })
               }
            }
            setTabCommentaires(TAB);
         }
         })
       })
   }

   function afficheCommentaires() {

      return tabCommentaires.map((produitCommentaire, index) => {
            return (
                     <View key={index} style={{
                        //borderWidth: 1,
                        padding: 8,
                        borderRadius: 20,
                        backgroundColor: 'rgb(247, 213, 156)',
                        flexDirection: 'row',
                        marginBottom: 10
                     }}>
                        <Image style={{height: 70, width: 70, borderRadius: 50, marginRight: 15}} source={produitCommentaire.profil ? {uri:produitCommentaire.profil} : require("../images/Profil.png")}/>
                        <View style={{width: '75%'}}>
                           <Text style={{fontSize: 16, fontWeight: '800'}}>{produitCommentaire.username}</Text>
                           <Text style={{ fontSize: 16, fontWeight: '400', flexWrap: 'wrap'}}>{produitCommentaire.message}</Text>
                        </View>
                     </View>
            )
      })
   }

   async function saveCommenatires() {
      
         let user = await AsyncStorage.getItem("activeUser");
         let profil = await AsyncStorage.getItem("LienProfil");

         if (!messageCommentaire || messageCommentaire.length == 0) {
            alert ("Veuillez ajouter un message de votre commentaire sur le produit")
            setMessageCommentaire("");
         }else {
            // alert(messageCommentaire)
            // alert(produitCommenté)
            db.transaction((tx) => {
               tx.executeSql(
               "INSERT INTO Commentaires (Profil, Produit, Messages, Username) VALUES (?,?,?,?)",
               [profil, produitCommenté, messageCommentaire, user],
               )
            } );

            getCommentaires(produitCommenté);
            setMessageCommentaire("");

         }

   }

   // Constante permettant l'affichage de l'icone chat
   const [displayChat, setDisplayChat] = useState(true);

   // constante permettant d'afficher le champ où l'utilisateur tape son commentaire
   const [displayField, setDisplayField] = useState(true);

     return (
      <View style={styles.container}>

         {/* View qui affiche le loading de la page */}
         {(!userID || tabProduits.length <= 0) && <View style={{position: 'absolute', width: "100%", height: '100%', zIndex: 200, backgroundColor: "rgba(0, 0, 0, 0.752)", justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={75} color={"orange"} />
                    </View>}
           
           {/* Message qui s'affiche lorsque l'utilisateur ajoute un produit au panier */}

           <Text style = {{
              position: "absolute",
              top: 80,
              left: 0,
              zIndex: 9,
              //borderWidth: 2,
              fontSize: 18,
              paddingVertical: 5,
              paddingHorizontal: 30,
              fontWeight: "bold",
              backgroundColor: "rgb(145, 194, 48)",
              color: "white",
              display: messageAjout
           }}>Produit ajouté</Text>

         {/* View permettant à l'utilisateur de voir les différents commentaires sur les produits, et aussi de les commenter s'il le souhaite */}
         {afficheView && (<View style={{
            zIndex: 120,
            //borderWidth: 2,
            height: '100%',
            width: '100%',
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.556)",
            justifyContent: "flex-end",
            alignItems: 'center'
         }}>
            <View style={{
               position: 'relative',
               borderWidth: 2,
               borderColor: 'white',
               width: '100%',
               height: '83%',
               backgroundColor: 'white',
               borderTopLeftRadius: 50,
               borderTopRightRadius: 50
            }}>

                 <Text style={{
                    position: 'absolute',
                    right: '8%',
                    top: '5%',
                    fontSize: 23,
                    fontWeight: '400',
                    //borderWidth: 2,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    textAlign: "center",
                    borderRadius: 50,
                    backgroundColor: 'rgb(207, 207, 207)'
                 }} onPress = {() => {setAfficheView(false); setTabCommentaires([])}}>X</Text>

                 <Text style={{
                    marginLeft: '30%',
                    marginTop: '17%',
                    fontSize: 22,
                    fontWeight: 'bold'
                 }}>Commentaires</Text>

             
               <View style={{
                  //borderWidth: 2,
                  width: '100%',
                  height: '73%',
                  padding: 8
               }}>

                    <ScrollView>

                         {afficheCommentaires()}

                    </ScrollView>

               </View>

               {displayField && (<View style={{
                  //borderWidth: 2,
                  // height: '13%',
                  // flexDirection: 'row',
                  // padding: 10
                     position: 'absolute',
                     bottom: 5,
                     height: 55,
                     width: '100%',
                     flexDirection: 'row',
                     paddingHorizontal: '1%'
               }}>

                   <TextInput 

                      multiline={true}
                      numberOfLines={3} 

                      placeholder='Tapez votre commentaire ici'
                      placeholderTextColor={"grey"}

                      onChangeText={setMessageCommentaire}

                      style={{
                         borderRadius: 10, 
                         width: '80%', 
                         height: '100%',
                         paddingLeft: 15, 
                         paddingTop: 5,
                         backgroundColor: 'rgb(197, 197, 197)',
                         marginLeft: "2%"
                      }}></TextInput>

                  <Text style={{
                     marginLeft: 7,
                     borderRadius: 50,
                     padding: 5,
                     textAlign: 'center',
                  }} onPress = {() => {
                     saveCommenatires();
                     setDisplayField(false);
                     setTimeout(() => {
                        setDisplayField(true);
                     }, 5);
                     }} >
                     <Icon
                        source="send"
                        size={50}
                        color="orange"
                     />
                  </Text>

               </View>)}

            </View>
         </View>)}


           {displayChat && (<TouchableOpacity style={{
              position: 'absolute',
              bottom: '6%',
              right: '8%',
              //borderWidth: 2,
              padding: '2.5%',
              borderRadius: 50,
              backgroundColor: 'rgb(10, 146, 10)',
              zIndex: 20,
              alignItems: 'center',
              justifyContent: 'center'
           }}

           
           onPress={async ()=>{
              

               const genre = await AsyncStorage.getItem("Genre");
               const user = await AsyncStorage.getItem("activeUser");
               
               if(genre != "Administrateur") {
                  // Requête permettant de mettre Notif de l'utilisateur à non une fois qu'il clique sur l'icone chat
                     db.transaction( tx => {
                        tx.executeSql(
                        "UPDATE Notifications SET Notif = ? WHERE User = ?",
                        ["non", user],
                        )
                     })

                     setColor("transparent");

                     navigation.navigate("Messaging support");
               }

         }}

           >
          
               <View style={{
                  position: 'absolute',
                  borderWidth: 10,
                  top: '-1%',
                  right: '2%',
                  borderRadius: 100,
                  borderColor: color
               }}></View>
               
               <Icon
                   source="chat"
                   size={50}
                   color="rgb(202, 235, 135)"
               />
           </TouchableOpacity>)}

           <TouchableOpacity 
                       
                           style={{
                              //borderWidth: 2,
                              borderColor: 'red',
                              padding: '1%',
                              borderRadius: 100,
                              zIndex: 20,
                              position: 'absolute',
                              top: '9%',
                              right: '4%',
                              backgroundColor: 'rgb(2, 2, 173)',
                              alignItems: 'center',
                              justifyContent: 'center'
                           }}
                    
                           onPress={()=>{
                              if(panierVide === true) {
                                 alert ("Votre panier est vide. Ajoutez au moins un produit afin de consulter votre panier !");
                              }else{
                                 //setNotifPanier("none");
                                 navigation.navigate("Votre Panier");
                              }
                         }}
                    >
                       
                       <Text 
                       
                       style = {{
                          //borderWidth: 2,
                          borderColor: 'red',
                          position: 'absolute',
                          width: '40%',
                          height: '40%',
                          zIndex: 3,
                          left: '-7%',
                          top: '-2%',
                          borderRadius: 100,
                          backgroundColor: 'orangered',
                          display: notifPanier
                       }}
                        
                       ></Text>

                        <Icon
                           source="basket"
                           size={39}
                           color="cyan"
                        />
           </TouchableOpacity>

            <View style={{
                   position: 'absolute',
                   //borderWidth: 3,
                   //borderColor: 'red',
                   bottom: 0,
                   width: '60%',
                   height: '30%',
                   borderTopEndRadius: 210,
                   //borderRadius: 20,
                   //backgroundColor: 'rgb(247, 139, 89)'
                   //backgroundColor: 'rgba(80, 50, 36, 0.45)'
                   backgroundColor: 'rgb(245, 217, 180)'
               }}> 
            </View>
            
           <View style={{
                   position: 'absolute',
                   //borderWidth: 3,
                   //borderColor: 'red',
                   top: 0,
                   right: 0,
                   width: '100%',
                   height: 280,
                   borderBottomStartRadius: 150,
                   //backgroundColor: 'rgb(247, 139, 89)'
                   backgroundColor: 'rgb(245, 217, 180)'
                   //backgroundColor: 'rgba(80, 50, 36, 0.459)'
               }}></View>


             <ScrollView style={{height: 'auto'}}>
             
                
                     <View style={{
                     //borderWidth: 2,
                     marginTop: '22%',
                     padding: '1%',
                     display: 'flex',
                     flexDirection: 'row',
                     flexDirection: 'row',
                             //borderWidth: 3,
                             //paddingHorizontal: '5%',
                     alignItems: "center"
                    }}>
                       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Text onPress={() => {setSearchQuery(""); setBgcTous("rgb(212, 90, 8)")}} style={{padding: 10, marginRight: 10, backgroundColor: bgcTous, color: 'white', fontSize: 18, textAlign: 'center', borderRadius: 15, fontWeight: 'bold'}}>Tous</Text>
                        {displayCategorieName()}
                        <Text style={{minWidth: '2%'}}> </Text>
                        </ScrollView>
                     </View>
               
             

               <View style={styles.welcome}>
                  <Text style={{textAlign: 'center', 
                                fontSize: 28, 
                                fontWeight: '900', 
                                color: 'white',
                                textShadowColor: "black",
                                textShadowOffset: {width: 2, height: 8},
                                textShadowRadius: 7,
                                }}>
                                   Bienvenu à vous
                  </Text>
                  <Text style={{textAlign: 'center', 
                                fontSize: 36, 
                                fontWeight: '900', 
                                color: 'white',
                                textShadowColor: "black",
                                textShadowOffset: {width: 2, height: 8},
                                textShadowRadius: 7,
                                }}>
                                  {userID}
                  </Text>
               </View>

               <Text style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 5,
                  paddingHorizontal: '5%',
                  marginTop: '7%',
                  fontStyle: 'italic',
                  color: 'rgb(148, 43, 1)'
               }}>
                  Tous ceux dont vous avez besoin sont ci-dessous
               </Text>

               <View style={{
               }}>

                  <View style={{
                     minHeight: 290,
                     marginBottom: 20,
                     width: "100%",
                     //borderWidth: 3
                  }}>
                    
                    
                    <ScrollView horizontal={true}>
                          <View style={{
                             flexDirection: 'row',
                             //borderWidth: 3,
                             paddingLeft: 10,
                             paddingHorizontal: 0,
                             alignItems: "center",
                             minWidth: "100%",
                             height: 300,
                             alignItems: 'center'
                             //gap: 15,
                             //justifyContent: "center"
                          }}>
                             

                             {displayCategorie()}
                          </View>
                     </ScrollView>
                       
                  </View>

                  <Searchbar
                     placeholder="Rechercher un produit"
                     onChangeText={(query) => {

                        setSearchQuery(query);

                        // starchyFoods();
                        // fvFoods();
                        // dairyFoods();
                        // mfeFoods();

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
                        backgroundColor: 'hsl(282, 38%, 86%)'
                     }}
               />

                  <View style={styles.list1}>
                     {displayFV && (<><Text style={{
                       fontWeight: "bold",
                       fontSize: 18,
                       color: "maroon",
                       fontStyle: 'italic'
                       //borderWidth: 3,
                       //width: 2
                    }}>_____Différents Produits</Text>
                    
                    <ScrollView>

                          {tousProduits()}

                    </ScrollView></>)}
                  </View>

               </View> 
                

            </ScrollView> 
         </View>
     )
}


const styles = StyleSheet.create({

   container: {
      flex: 1,
      height:'100%',
      //borderWidth: 2,
      borderColor: 'green',
      //backgroundColor: 'rgb(245, 250, 206)',
      //backgroundColor: 'rgb(250, 238, 233)',
      position: 'relative',
   },

   list1: {
      //borderWidth: 2,
      minHeight: 290,
      marginBottom: 120
   },

   welcome: {
      display: 'flex',
      flexDirection: 'column',
      //borderWidth: 2,
      borderColor: 'red',
      height: 160,
      width:'85%',
      marginTop: '5%',
      marginStart: '7.5%',
      paddingVertical: '10%',
      justifyContent: 'center',
      borderRadius: 32,
      //backgroundColor: 'rgb(2, 22, 44)'
      //backgroundColor: 'rgb(71, 54, 6)'
      //backgroundColor: 'rgb(44, 22, 12)'
      backgroundColor: 'rgb(66, 27, 2)'
   }
})