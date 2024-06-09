import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RejectCommandes() {

  // Constante du chargement
  const [loading, setLoading] = useState(true)

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // constante du tableau qui contiendra les différentes commandes recupérés de la BD
  const [tabCommandes, setTabCommandes] = useState([]);

  // Constante pour le genre de l'utilisateur (Admin, Client, Livreur ?)
  const [genre, setGenre] = useState("");

  // Fonction permettant de recupérer le numéro de téléphone de l'utilisateur actif
  const getUserTel = async () => {
    let User = await AsyncStorage.getItem("Tel");
    setGenre(await AsyncStorage.getItem("Genre"));
    return User;
  }

  useEffect (() => {

    let telUser;
    getUserTel().then(active => {
      telUser = active;

      let tab = [];

      db.transaction(tx => {

        tx.executeSql(
          "SELECT * FROM Commandes",
          [],
          (_, { rows }) => {
            if (rows.length > 0) {
              for(let i=0; i<rows.length; i++){
                   
                // alert(rows.item(i).Tel_Client);

                if(rows.item(i).Renvoi == "oui") {
                 // alert(rows.item(i).Tel_Client);
                  tab.unshift({
                      ref: rows.item(i).Ref,
                      produits: rows.item(i).Produits,
                      date: rows.item(i).DateCommande,
                      telClient: rows.item(i).Tel_Client,
                      telLivreur: rows.item(i).Tel_Livreur,
                      code: rows.item(i).Code,
                      adresse: rows.item(i).AdresseLivraison,
                      total: rows.item(i).Total,
                      statut: rows.item(i).Status,
                      renvoi: rows.item(i).Renvoi,
                      motif: rows.item(i).Motif
                  })
                }
              }  
              setTabCommandes(tab);
              setLoading(false);
            }else {
              setLoading(false);
            }
          })});

    });;

  }, [])


  // Fonction permettant d'afficher les commandes de l'utilisateur un à un
  const afficherHistoriques = () => {
           
    return tabCommandes.map((commande, index) => {
          
             return (
                      <View key={index} style={{
                        borderWidth: 2,
                        marginHorizontal: '5%',
                        marginVertical: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        backgroundColor: 'white',
                        paddingVertical: 20,
                        paddingHorizontal: 15
                      }}>
            
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Ref_Commande:</Text>
                        <Text style={{fontSize: 17}}>{commande.ref}</Text>
                        <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Produits:</Text>
                        <Text style={{fontSize: 17, textAlign: 'center', paddingHorizontal: 20}}>{commande.produits}</Text>
                        <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Date: <Text style={{fontSize: 17, fontWeight: '700', color: 'rgb(80, 78, 78)'}}>{commande.date}</Text></Text>
                        <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Tel_Client: <Text style={{fontSize: 17, fontWeight: '700', color: 'rgb(80, 78, 78)'}}>{commande.telClient}</Text></Text>
                        <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Total: <Text style={{fontSize: 17, fontWeight: '700', color: 'rgb(80, 78, 78)'}}>{commande.total} fcfa</Text></Text>            
                        <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold', color: "red"}}>Motif: <Text style={{fontSize: 17, fontWeight: '700', color: "red"}}>{commande.motif}</Text></Text> 
                        <Text style={{
                          //borderWidth: 2,
                          paddingVertical: 10,
                          fontSize: 18,
                          fontWeight: 'bold',
                          width: '80%',
                          textAlign: 'center',
                          marginTop: 12,
                          borderRadius: 10,
                          backgroundColor: 'rgb(1, 117, 212)',
                          color: 'white'
                        }}
                        
                              onPress = {() => {/*navigation.navigate("Messaging support")*/
                                setDisplayViewMotif(true);
                                setRefProduit(commande.ref);
                                setTel(commande.telClient);
                            }}
                          
                        >Approuver le Rejet</Text>
            
                      </View>
             )

    })
  }

  const navigation = useNavigation();

  // Constante pour l'envoi du motif
  const [displayViewMotif, setDisplayViewMotif] = useState(false);
  const [motif, setMotif] = useState("");
  const [refProduit, setRefProduit] = useState("");
  const [tel, setTel] = useState();

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>

        {/* View qui affiche le loading de la page */}
        {loading && <View style={{position: 'absolute', width: "100%", height: '100%', zIndex: 200, backgroundColor: "rgba(0, 0, 0, 0.752)", justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={75} color={"orange"} />
                    </View>}

        {/* View qui s'affiche lorsqu'un utilisateur décide de renvoyer une commande (on recupère avec le motif de renvoi) */}
        {displayViewMotif && <View style={{
           backgroundColor: "rgba(0, 0, 0, 0.5)",
           position: "absolute",
           width: "100%",
           height: "100%",
           zIndex: 5,
           display: 'flex',
           justifyContent: "center",
           alignItems: "center"
        }}>
            <View style={{
              // borderWidth: 2,
              backgroundColor: "white",
              padding: 10,
              width: "80%",
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
                <Text style={{
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '3%',
                  marginBottom: 20
                }}>
                    Veuillez s'il vous plaît entrer un montant de rembourssement pour le client ci-dessous
                </Text>
                <TextInput style={{
                  backgroundColor: "rgb(178, 178, 178)",
                  width: "95%",
                  borderRadius: 8,
                  padding: 7,
                  paddingHorizontal: 10
                }} multiline={true}
                   numberOfLines={4}
                   onChangeText = {setMotif}
                   keyboardType="numeric"
                   placeholder='Entrer un montant ici'
                   placeholderTextColor={"rgb(90, 90, 90)"}></TextInput>
                <Text style={{
                  padding: 10,
                  backgroundColor: "green",
                  width: "60%",
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: 20,
                  borderRadius: 3
                }}
                
                onPress = {()=>{
                  if(motif > 0){
                        db.transaction((tx) => {
                            tx.executeSql(
                            "DELETE FROM Commandes WHERE Ref = ?",
                            [refProduit]
                            )
                        } );

                        db.transaction(tx => {
                            tx.executeSql(
                              "UPDATE Users SET Solde = Solde+? WHERE Tel = ?",
                              [motif, tel],
                            );
                          });

                      alert("L'approbation a bien été validée !");

                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' },{ name: 'Centre Administrateur' },{ name: 'Commandes non approuvées' }],
                      });
                }
                  else {
                    alert("Veuillez entrer un montant valide s'il vous plaît !");
                  }
                  //alert(refProduit)
                }}
                
                >Approuver</Text>
                <Text style={{
                  padding: 10,
                  backgroundColor: "rgb(100,100,168)",
                  width: "60%",
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: 7,
                  borderRadius: 3,
                  marginBottom: 20
                }}
                
                onPress = {()=>{setDisplayViewMotif(false); setMotif()}}

                >Annuler</Text>
            </View>
        </View>}

       <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45%',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(216, 195, 231)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100%',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(216, 195, 231)',
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
                  color: 'rgb(62, 18, 94)',
                  fontStyle: 'italic',
                  paddingHorizontal: '3%',
                  marginBottom: 20
                }}>
                    Retrouvez les commandes non approuvées par les clients ci-dessous
                </Text>
                <Text style={{
                  marginBottom: 30,
                  fontSize: 17,
                  fontStyle: 'italic',
                  textAlign: 'center',
                  paddingHorizontal: 13,
                  marginTop: 10,
                  color: 'rgb(62, 18, 94)',
                  }}>(Si la page est vierge, alors cela signifit qu'il n'y a aucune commande non approuvée)</Text>
          </View>

          {afficherHistoriques()}

          <Text style={{marginBottom: 50}}></Text>
       </ScrollView>
    </View>
  )
}
