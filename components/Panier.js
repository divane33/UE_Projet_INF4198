import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

export default function Panier() {

  // Constante du tableau qui regroupera tous les livreurs
  const [tabLivreurs, setTabLivreurs] = useState([]);

  // Fonction permettant de recupérer tous les livreurs de la BD
  const getAllLivreurs = () => {
   
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Livreurs",
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            let tab = [];
              for(let i=0; i<rows.length; i++){
                tab.push(
                  {
                    tel: rows.item(i).Tel,
                    nbCommandes: rows.item(i).NbCommandes
                  }
                )
              }
              setTabLivreurs(tab);
          }})});
      
}

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // Constante de navigation
  const navigation = useNavigation();


  // constante du tableau permettant de recupérer les produits commandés
  const [tabProducts, setTabProducts] = useState([]);

  // Fonction permettant de récupérer les produits commandés du Panier dans le localstorage
  const getPanier = async () => {
     let panierProduits = await AsyncStorage.getItem("Panier");
     setTabProducts(JSON.parse(panierProduits));
  }

  // Fonction permettant de retirer un produit du panier
  const retirerProduits = async (produit) => {
    let updateTable =  tabProducts.filter(element => element !== produit);

    await AsyncStorage.setItem("Panier", JSON.stringify(updateTable));
    setTabProducts(updateTable);

    if (updateTable.length === 0) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
    //updatePanier();
  } 

  // Constante de la modification de la quantité d'un produit
  const [quantitéProduct, setQuantitéProduct] = useState(1);

  // Fonction permettant d'afficher chaque produit du panier
  const displayProduct = () => {

    return tabProducts.map((produit, index) => {
      return (

            <View key={index} style={{marginBottom: 15, paddingVertical: 10, backgroundColor: "white", alignItems: "center", borderWidth:2, borderColor: "rgb(54, 32, 90)", width: "75%", marginLeft: "12.5%", padding: 4}}>
                {/* <Image style={{
                    width: "75%",
                    height: 130
                }} source={{uri: produit.image}} /> */}
                {(produit.image == 7.0) && <Image style={{
                            width: "75%",
                            height: 130
                         }} source={require("../images/pain.jpg")} />}

                         {(produit.image == 8.0) && <Image style={{
                            width: "75%",
                            height: 130
                         }} source={require("../images/pain1.jpeg")} />}

                         {(produit.image != 7.0 && produit.image != 8.0) && <Image style={{
                            width: "75%",
                            height: 130
                         }} source={{uri: produit.image}} />}

                <Text style={{marginTop: 5, fontWeight: 'bold', fontSize: 19}}>{produit.nom}</Text>
                <Text onPress={()=>{setQuantitéProduct(produit.quantité); setDisplayView(true); setProductQté(produit.nom); setQtéMax(produit.quantitéMax)}} style={{marginTop: 2, textAlign: "center", fontWeight: 'bold', fontSize: 15}}>Quantité: {produit.quantité}</Text>
                <Text style={{marginTop: 5, textAlign: "center", fontWeight: 'bold', fontSize: 15}}>Prix U: <Text style={{fontWeight: "900"}}>{produit.prix} fcfa</Text></Text>

                <Text onPress={() => { retirerProduits(produit);}} style={{backgroundColor: "rgb(71, 42, 117)", color: "white", width: "60%", textAlign: "center", fontWeight: "bold", fontSize: 20, marginTop: 8, padding: 6}}>Rétirer</Text>

            </View>

      )
    })

  }

  useEffect (() => {
    getPanier();
    getAllLivreurs();

    // Crée la table Commandes s'il n'en existe pas
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Commandes (id INTEGER PRIMARY KEY AUTOINCREMENT, Ref TEXT, DateCommande TEXT, Tel_Livreur REAL, Tel_Client REAL, Status TEXT, Produits TEXT, Code TEXT, AdresseLivraison TEXT, Total REAL)',
        [],
      );
    });

  }, [])

  // Constante permettant de connaitre le produit dont on modifit la quantité, et constante de la quantité maximale
  const [productQté, setProductQté] = useState("");
  const [qtéMax, setQtéMax] = useState(0);

  // Constante permettant d'afficher la balise View pour la modification de la quantité
  const [displayView, setDisplayView] = useState(false);

  // Fonction permettant d'approuver et de valider la modification de la quantité d'un produit
  const approuverQté = async () => {
    for (let elt of tabProducts) {

      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM Produits",
          [],
          async (_, { rows }) => {
            if (rows.length > 0) {
              for(let i=0; i<rows.length; i++){
                if(rows.item(i).Nom === elt.nom && elt.nom === productQté) {

                        if(parseInt(quantitéProduct) > rows.item(i).Quantité) {
                                elt.quantité = rows.item(i).Quantité;
                                alert("La quantité maximale est de: "+rows.item(i).Quantité);
                                await AsyncStorage.setItem("Panier", JSON.stringify(tabProducts));
                                let nvTab = await AsyncStorage.getItem("Panier");
                                setTabProducts(JSON.parse(nvTab));
                                return
                        }
                        else if(!((parseInt(quantitéProduct)) > 0)){
                                alert ("Quantité non prise en charge !");
                                return
                        }
                        else{
                                elt.quantité = parseInt(quantitéProduct);
                                await AsyncStorage.setItem("Panier", JSON.stringify(tabProducts));
                                let nvTab = await AsyncStorage.getItem("Panier");
                                setTabProducts(JSON.parse(nvTab));
                                return
                        }

                }
              }
            }
          })
      })
    }
  }

   // Fonction pour connaîttre le coût total des produits commandés par un utilisateur
   const coutTotal = () => {

       let cout = 0;

       for (let elt of tabProducts) {
            cout  = (elt.prix * elt.quantité) + cout;
       }

       return cout;
   }

     // Constante pour recupérer l'adresse de livraison du client
     const [adresseLivraison, setAdresseLivraison] = useState("");

  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>

         {displayView && ( <View style={{
              //borderWidth: 2,
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0, 0, 0, 0.655)",
              zIndex: 10,
              alignItems: "center",
              justifyContent: "center"
          }}>

                <View style={{
                  borderWidth: 2,
                  borderColor: "white",
                  width: "85%",
                  backgroundColor: "white",
                  padding: 10
                }}>
                     <Text style={{fontWeight: "bold", fontSize: 20, textAlign: "center"}}>Entrer une quantité</Text>
                     <TextInput value={quantitéProduct.toString()} onChangeText={setQuantitéProduct} placeholder='Cliquez ici pour saisir' placeholderTextColor={"rgb(102, 102, 102)"} style={{padding: 5, marginTop: 5, backgroundColor: "rgb(182, 182, 182)", textAlign: "center"}}></TextInput>

                     <View style={{flexDirection: "row", justifyContent: "center", marginTop: 15}}>
                        <Text onPress={()=>{approuverQté(); setDisplayView(false)}} style={{borderColor: "blue", color: "blue", marginRight: 10, borderWidth: 2, fontSize: 16, fontWeight: "bold", paddingHorizontal: 20, paddingVertical: 4}}>Ok</Text>
                        <Text onPress={()=>{setDisplayView(false)}} style={{borderColor: "green", color: "green", borderWidth: 2, fontSize: 16, fontWeight: "bold", paddingHorizontal: 20, paddingVertical: 4}}>Annuler</Text>
                     </View>

                </View>

          </View>)}
 
          <View style={{
              position: 'absolute',
              //borderWidth: 3,
              width: '45%',
              height: '25%',
              zIndex: -1,
              borderBottomRightRadius: 250,
              backgroundColor: 'rgb(222, 215, 235)'
            }}></View>
            <View style={{
              position: 'absolute',
              //borderWidth: 3,
              width: '100%',
              height: '48%',
              zIndex: -1,
              borderTopLeftRadius: 250,
              backgroundColor: 'rgb(222, 215, 235)',
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
                  fontStyle: 'italic',
                  color: 'rgb(71, 42, 117)'
                }}>
                    Vos différents produits sélectionnés
                </Text>
                <Text style = {{marginBottom: 30, color: 'rgb(71, 42, 117)', fontSize: 16, textAlign: 'center', fontStyle: 'italic', marginTop: 10, marginHorizontal: '3%'}}> 
                (Vous pouvez modifier la quantité d'un produit en cliquant simplement sur sa Quantité) 
                </Text>
            
                 {displayProduct()}


                <Text style = {{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: 'rgb(71, 42, 97)',
                  textAlign: "center",
                  marginTop: 25
                }}>Entrer l'adresse de livraison:</Text>
                <TextInput
                
                      value={adresseLivraison}
                      onChangeText={setAdresseLivraison}
                 
                style={{
                  //borderWidth: 2,
                  width: "80%",
                  marginLeft: '10%',
                  padding: 5,
                  paddingLeft: 10,
                  backgroundColor: "rgb(163, 153, 202)",
                  marginTop: 5
                }}
                placeholder="Cliquez ici pour saisir"></TextInput>

                 <Text style={{
                   textAlign: "center",
                   fontWeight: "bold",
                   fontSize: 19,
                   marginTop: 20
                 }}>Total: <Text style={{fontWeight: "900", fontSize: 23}}>{coutTotal()} fcfa</Text></Text>

                 <Text
                  
                  onPress={ async () => {
                    let coutAchatTotal = coutTotal();
                    
                    if (await AsyncStorage.getItem("Solde") < coutAchatTotal) {
                      alert ("Votre solde est insuffisant pour éffectuer votre commande")
                    }
                    else if(!adresseLivraison) {
                       alert("Veuillez entrer une adresse de livraison valide car vous ne pourrez plus la modifier une fois la commande valider")
                    }
                    else {
                       let dat = new Date();
                       let date = dat.getDate() +"/"+ (dat.getMonth()+1) +"/"+ dat.getFullYear();
                       let ref = "00000000x";
                       let code;
                       let heure = dat.getHours()+":"+dat.getMinutes();
                       //alert(adresseLivraison);

                       // Fonction permettant de générer une fin pour la ref
                       const generateRandomWord = () => {
                            const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
                            let word = '';
                            for (let i = 0; i < 7; i++) {
                              const randomIndex = Math.floor(Math.random() * alphabet.length);
                              word += alphabet[randomIndex];
                            }

                            db.transaction(tx => {
                              tx.executeSql(
                                "SELECT * FROM Commandes",
                                [],
                                (_, { rows }) => {
                                  if (rows.length > 0) {
                                    for(let i=0; i<rows.length; i++){
                                        
                                        if(rows.item(i).Ref == word){
                                           // alert("les références sont identiques !");
                                            generateRandomWord();
                                            return
                                        }
                                    }
                                  }})});

                            return word;
                        };

                        // Fonction permettant de générer une fin pour la ref
                            const generateRandomCode = () => {
                                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                                let code = '';
                                for (let i = 0; i < 6; i++) {
                                  const randomIndex = Math.floor(Math.random() * alphabet.length);
                                  code += alphabet[randomIndex];
                                }

                                db.transaction(tx => {
                                  tx.executeSql(
                                    "SELECT * FROM Commandes",
                                    [],
                                    (_, { rows }) => {
                                      if (rows.length > 0) {
                                        for(let i=0; i<rows.length; i++){
                                            
                                            if(rows.item(i).Code == code){
                                               // alert("les références sont identiques !");
                                                generateRandomWord();
                                                return
                                            }
                                        }
                                      }})});

                                return code;
                            };

                        ref = ref+generateRandomWord();
                        //alert(ref);
                        code = generateRandomCode();
                        //alert(generateRandomCode())

                       let messageProduitsCommandés = "";

                       for (let elt of tabProducts) {

                        messageProduitsCommandés = messageProduitsCommandés + elt.quantité +" "+ elt.nom + " à " + elt.prix + " fcfa prix U ; ";

                        try {

                          db.transaction(tx => {
                            tx.executeSql(
                              "SELECT * FROM Produits",
                              [],
                              (_, { rows }) => {
                                if (rows.length > 0) {
                                  for(let i=0; i<rows.length; i++){
                                    if(rows.item(i).Nom === elt.nom) {

                                        db.transaction((tx) => {
                                          tx.executeSql(
                                          "UPDATE Produits SET Quantité = ? WHERE Nom = ?",
                                          [rows.item(i).Quantité - elt.quantité, elt.nom]
                                          )
                                        } );

                                    }
                                  }
                                }
                              })
                          })
                      }
                      catch (error) {
                          alert("Une erreur est survenue lors de la validation de votre commande: "+error);
                      }

                  }

                  let LivreurMinTel;

                  // Fonction permettent d'attribuer la commande à un livreur
                  const attribuerCommande = () => {

                              if(tabLivreurs.length == 0) {
                                   return 0;
                              } else {
                                  const objetComMinimum = tabLivreurs.reduce((min, current) => {
                                    return (current.nbCommandes < min.nbCommandes) ? current : min;
                                  }, tabLivreurs[0]);
    
                                  return objetComMinimum.tel;
                              }

                              // for (let elt of tabLivreurs) {
                              //   alert(elt.tel)
                              // }

                  }

                  LivreurMinTel = attribuerCommande();

                  if(LivreurMinTel == 0){
                    return alert("Il n'y a pas encore de livreurs enregistrés dans l'application. Veuillez reéssayer ultérieurement. Merci pour votre compréhension !")
                  }

                 // alert(messageProduitsCommandés); alert(coutAchatTotal)
                  let telClient = await AsyncStorage.getItem("Tel");
                  let activeUser = await AsyncStorage.getItem("activeUser");


                  // Requête permettant d'augmenter le nb de commandes du livreur sélectionner de 1
                  db.transaction(tx => {
                    tx.executeSql(
                      "UPDATE Livreurs SET NbCommandes = NbCommandes+1 WHERE Tel = ?",
                      [LivreurMinTel],
                    );
                  }); 


                  // Requête permettant d'ajouter la commande dans la BD
                      db.transaction((tx) => {
                        tx.executeSql(
                        "INSERT INTO Commandes (Ref, DateCommande, Tel_Livreur, Tel_Client, Status, Produits, Code, AdresseLivraison, Total) VALUES (?,?,?,?,?,?,?,?,?)",
                        [ref, date, LivreurMinTel, telClient, "En Cours...", messageProduitsCommandés, code, adresseLivraison, coutAchatTotal]
                        )
                    } );

                  // Requête permettant d'ajouter l'historique de la commande dans la BD
                  db.transaction((tx) => {
                    tx.executeSql(
                    "INSERT INTO Historiques (Username, Type, DateHistorique, Heure, Montant) VALUES (?,?,?,?,?)",
                    [activeUser, "commande", date, heure, coutAchatTotal]
                    )
                } );


                  /* Constante permettant de mettre à jour le solde de l'utilisateur dans la BD une fois
                   que sa commande a été approuvée et validé */
                  let user = await AsyncStorage.getItem("activeUser");
                  let soldeUpdate = (await AsyncStorage.getItem("Solde")) - coutAchatTotal;
                  await AsyncStorage.setItem("Solde", soldeUpdate.toString());

                  db.transaction(tx => {
                    tx.executeSql(
                      "UPDATE Users SET Solde = ? WHERE Username = ?",
                      [soldeUpdate, user],
                      (_, results) => {},
                      (_, error) => {
                        console.log("Error fetching user details:", error);
                        alert("Error fetching user details: " + error);
                      }
                    );
                  });


                  alert("Votre commande a été approuvée");

                       navigation.reset({
                          index: 0,
                          routes: [{ name: 'Home' }],
                        });
                    }

                  }}
                  
                 style={{
                   textAlign: "center",
                   fontSize: 22,
                   //borderWidth: 2,
                   width: "70%",
                   marginLeft: "15%",
                   padding: 13,
                   marginTop: 25,
                   marginBottom: 70,
                   fontWeight: "bold",
                   borderRadius: 15,
                   backgroundColor: "rgb(0, 110, 255)",
                   color: "white"
                 }}>Commander</Text>

          </View>
       </ScrollView>
    </View>
  )
}
