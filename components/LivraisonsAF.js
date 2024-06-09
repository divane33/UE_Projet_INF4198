import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LivraisonsAF() {

  // Constante de chargement 
  const [loading, setLoading] = useState(true);

  // Constantes pour la récupération de la Ref de la commande, le code de la commande, et le code que le livreur entre pour la validation de la livraison
  const [refCommande, setRefCommande] = useState("");
  const [codeCommande, setCodeCommande] = useState(); 
  const [code, setCode] = useState();

  // Constante permettant d'afficher la View permettant au livreur(se) d'entrer le code de livraison
  const [displayView, setDisplayView] = useState(false);

   // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // constante du tableau qui contiendra les différentes commandes recupérés de la BD
  const [tabCommandes, setTabCommandes] = useState([]);

  // Constante pour la navigation
  const navigation = useNavigation();

  // Fonction permettant de recupérer le numéro de téléphone de l'utilisateur actif
  const getUserTel = async () => {
    let User = await AsyncStorage.getItem("Tel");
    return User;
  }

  useEffect(()=>{
    
    getUserTel().then(active => {
     // alert(active)

     let tab = [];

     db.transaction(tx => {

      tx.executeSql(
        "SELECT * FROM Commandes",
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            for(let i=0; i<rows.length; i++){
                 
              // alert(rows.item(i).Tel_Client);

              if(((rows.item(i).Tel_Livreur == active) && (rows.item(i).Status == "En Cours...")) || (rows.item(i).Tel_Livreur == active && rows.item(i).Renvoi == "oui")) {
               // alert(rows.item(i).Tel_Client);
                tab.push({
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
          } else {
            setLoading(false)
          }
        })});
    });

  }, [])


  // Fonction permettant d'afficher les commandes à livrer un à un
  const afficherCommandes = () => {
           
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
                        <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Tel_Livreur: <Text style={{fontSize: 17, fontWeight: '700', color: 'rgb(80, 78, 78)'}}>{commande.telLivreur}</Text></Text>                        
                        <Text style={{paddingHorizontal: 20, textAlign: 'center', marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Adresse_Livraison: <Text style={{fontSize: 17, fontWeight: '700', color: 'rgb(80, 78, 78)'}}>{commande.adresse}</Text></Text>
                        <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Total: <Text style={{fontSize: 17, fontWeight: '700', color: 'rgb(80, 78, 78)'}}>{commande.total} fcfa</Text></Text>            
                        <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Status: <Text style={{fontSize: 17, fontWeight: '700', color: 'rgb(80, 78, 78)'}}>{commande.statut}</Text></Text>
                        {commande.renvoi == "oui" && <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Motif: <Text style={{fontSize: 17, fontWeight: '700', color: 'rgb(80, 78, 78)'}}>{commande.motif}</Text></Text>}
                        {commande.renvoi == "oui" && <Text style={{fontStyle: "italic", fontSize: 18, color: "red", textAlign: "center", marginTop: 8, fontWeight: 'bold'}}>Commande non approuvée par le client</Text>}
                        {commande.renvoi == "non" && <Text style={{
                          //borderWidth: 2,
                          paddingVertical: 10,
                          fontSize: 18,
                          fontWeight: 'bold',
                          width: '80%',
                          textAlign: 'center',
                          marginTop: 12,
                          borderRadius: 10,
                          backgroundColor: 'green',
                          color: 'white'
                        }}
                        
                        onPress={()=>{setDisplayView(true); setRefCommande(commande.ref); setCodeCommande(commande.code)}}
                          
                        >Valider la livraison</Text>}
            
                      </View>
             )

    })
  }



  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>

      {/* View qui affiche le loading de la page */}
      {loading && <View style={{position: 'absolute', width: "100%", height: '100%', zIndex: 200, backgroundColor: "rgba(0, 0, 0, 0.752)", justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={75} color={"yellow"} />
                    </View>}

          <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45%',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(238, 236, 188)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100%',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(238, 236, 188)',
           bottom: 0,
           right: 0
         }}></View>

         {/* View permettant au livreur(se) d'entrer le code fourni par l'utilisateur afin de valider la livraison de la commande */}
         {displayView && (

               <View style={{
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 //borderWidth: 2,
                 width: '100%',
                 height: '100%',
                 zIndex: 5,
                 backgroundColor: 'rgba(0, 0, 0, 0.550)',
                 justifyContent: 'center',
                 alignItems: 'center'
               }}>
                 
                 <View style={{
                   borderWidth: 3,
                   borderColor: 'white',
                   width: '80%',
                   padding: 8,
                   backgroundColor: 'white',
                   paddingVertical: 20,
                   paddingHorizontal: 22,
                   borderRadius: 20
                 }}>
                      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 19}}>Entrer le code fourni par le client, ci-dessous</Text>
                      <TextInput value={code} onChangeText={setCode} placeholder='Entrer le code ici' placeholderTextColor={"rgb(100, 100, 100)"} style={{backgroundColor: 'rgb(200, 200, 200)', paddingVertical: 8, textAlign: 'center', marginTop: 8}}></TextInput>
                 
                      <Text onPress={()=>{
                        // alert(refCommande); 
                        //alert(codeCommande)
                        if(!code) {
                          alert("Veuillez renseigner le code s'il vous plaît")
                        }else if (code == codeCommande) {

                          db.transaction(tx => {
                            tx.executeSql(
                              "UPDATE Commandes SET Status = ? WHERE Ref = ?",
                              ["Terminé", refCommande]
                            );
                          });

                          alert("La livraison a bien été approuvée");
                          setDisplayView(false);
                          setCode("");

                          navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' },{ name: 'Livraisons à faire' }],
                          });

                        } else {
                          alert("Code invalide. Veuillez reessayer s'il vous plaît !");
                          setCode("");
                        }
                      }} style={{borderRadius: 7, width: '100%', textAlign: 'center', fontSize: 18, marginTop: 8, paddingVertical: 4, fontWeight: 'bold', backgroundColor: 'rgb(66, 145, 235)', color: 'white'}}>Valider</Text>
                      <Text onPress={()=>{setDisplayView(false)}} style={{borderRadius: 7, width: '100%', textAlign: 'center', fontSize: 18, marginTop: 8, paddingVertical: 4, fontWeight: 'bold', backgroundColor: 'rgb(207, 135, 1)', color: 'white'}}>Annuler</Text>
                 </View>

               </View>

         )}


      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '3%',
                  color: 'rgb(153, 123, 41)'
                }}>
                    Retrouvez ci-dessous vos différentes livraisons à éffectuer !
                </Text>
                <Text style={{
                  textAlign: "center",
                  paddingHorizontal: 30,
                  marginTop: 15,
                  fontSize: 15,
                  fontStyle: "italic",
                  marginBottom: 20
                }}>(Si la page est vierge, alors cela signifit que vous n'avez aucune commande à livrer)</Text>

                <Text style={{
                  textAlign: "center",
                  paddingHorizontal: 30,
                  fontSize: 15,
                  fontStyle: "italic",
                  marginBottom: 20,
                  color: "red",
                  fontWeight: 'bold'
                }}>NB: Si une commande a été non approuvée, alors vous devez aller la récupérer chez le client</Text>
          </View>

          {afficherCommandes()}

       </ScrollView>
    </View>
  )
}
