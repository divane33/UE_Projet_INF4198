import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

export default function YourProfil() {

  const navigation = useNavigation();

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  const [idUser, setIdUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState();
  const [solde, setSolde] = useState();
  const [gender, setGender] = useState("");
  const [profLink, setProfLink] = useState("");

  //Charger les infos de la base de données

  const getData = async () => {
    
    try {
      const ac = await AsyncStorage.getItem("activeUser");
      if(ac !== null){
            db.transaction(tx => {
              tx.executeSql(
                "SELECT * FROM Users WHERE Username = ?",
                [ac],
                (_, { rows }) => {

                        setIdUser(rows.item(0).id);
                        setUsername(rows.item(0).Username);
                        setEmail(rows.item(0).Email);
                        setPassword(rows.item(0).Password);
                        setGender(rows.item(0).Gender);
                        setProfLink(rows.item(0).Profil);
                        setTel(rows.item(0).Tel);
                        setSolde(rows.item(0).Solde);
                  
                },
                (_, error) => {
                  console.log("Error fetching user details:", error);
                  alert("Error fetching user details: " + error);
                }
              );
            });
         //setUsername(ac);
      }
    } catch (error) {
      // Gérer l'erreur de sauvegarde
    }
  };
  
  useEffect(() => {
      getData();
  }, []);



  const [countBeforeSupp, setCountBeforeSupp] = useState(1);
  // Fonction qui supprime l'utilisateur de la BD lorsqu'il clique sur le bouton "Supprimer Compte"
    const deleteAccount = () => {
           if(countBeforeSupp === 1){
             alert("Êtes vous sûr de vouloir supprimer votre compte ? Cette action est irréversible. Si vous souhaitez réellement supprimer votre compte, alors cliquez de nouveau sur le bouton supprimer compte !");
             setCountBeforeSupp(0); 
           }else{

                  try {
                        db.transaction((tx) => {
                          tx.executeSql(
                          "DELETE FROM Users WHERE id = ?",
                          [idUser]
                          )
                        } );

                         alert("Compte supprimé avec succès !");
                         navigation.reset({
                          index: 0,
                          routes: [{ name: ' ' }],
                        });
            
                    } catch (error) {
                          alert("Il y'a eu une erreur lors de la vérification de vos informations : " + error);
                     }

           }
    }




// Partie qui s'assure du rafraîchissement de la page lorsqu'un utilisateur glisse vers le bas de l'écran du téléphone
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);



  return (
    <View style={{backgroundColor: 'white', height:'100%'}}>

<View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45vw',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(207, 247, 192)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100vw',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(207, 247, 192)',
           bottom: 0,
           right: 0
         }}></View>

      <ScrollView
      
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      
      >
            <View>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 28,
                  textAlign: 'center',
                  paddingHorizontal: '5%',
                  marginTop: '12%'
                }}
                
                >
                  Ci-dessous, vous pouvez consulter informations
              </Text>
            </View>

            <View style={{
              marginTop: '12%',
            }}>

              <Text style={{
                 marginLeft: '5%',
                 fontWeight: 'bold',
                 fontSize: 18,
                 marginBottom: '4%',
                 borderWidth: 3,
                 width: '90%',
                 textAlign: 'center',
                 paddingVertical: '2%',
                 borderRadius: 8,
                 color: 'green',
                 borderColor: 'green',
                 backgroundColor: 'white'
              }}> Votre Photo de Profil </Text>
              <Image style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                marginLeft: '21%',
                marginBottom: '7%'
              }} source={profLink ? {uri:profLink} : require("../images/Profil.png")}/>

              <Text style={{
                 marginLeft: '5%',
                 fontWeight: 'bold',
                 fontSize: 15,
                 marginBottom: '2%',
                 borderWidth: 2,
                 width: '90%',
                 textAlign: 'center',
                 paddingVertical: '2%',
                 borderRadius: 8,
                 color: 'green',
                 borderColor: 'green',
                 backgroundColor: 'white'
              }}>Votre Username : <Text style={{color: 'orangered'}}>{username}</Text></Text>

              <Text style={{
                 marginLeft: '5%',
                 fontWeight: 'bold',
                 fontSize: 15,
                 marginBottom: '2%',
                 borderWidth: 2,
                 width: '90%',
                 textAlign: 'center',
                 paddingVertical: '2%',
                 borderRadius: 8,
                 color: 'green',
                 borderColor: 'green',
                 backgroundColor: 'white'
                // marginBottom: '2%'
              }}>Votre adresse Email : <Text style={{color: 'orangered'}}>{email}</Text></Text>

            <Text style={{
                 marginLeft: '5%',
                 fontWeight: 'bold',
                 fontSize: 15,
                 marginBottom: '2%',
                 borderWidth: 2,
                 width: '90%',
                 textAlign: 'center',
                 paddingVertical: '2%',
                 borderRadius: 8,
                 color: 'green',
                 borderColor: 'green',
                 backgroundColor: 'white'
              }}>Votre mot de passe : <Text style={{color: 'orangered'}}>{password}</Text></Text>

             <Text style={{
                 marginLeft: '5%',
                 fontWeight: 'bold',
                 fontSize: 15,
                 marginBottom: '2%',
                 borderWidth: 2,
                 width: '90%',
                 textAlign: 'center',
                 paddingVertical: '2%',
                 borderRadius: 8,
                 color: 'green',
                 borderColor: 'green',
                 backgroundColor: 'white'
              }}>Votre Genre : <Text style={{color: 'orangered'}}>{gender}</Text></Text>

              <Text style={{
                 marginLeft: '5%',
                 fontWeight: 'bold',
                 fontSize: 15,
                 marginBottom: '2%',
                 borderWidth: 2,
                 width: '90%',
                 textAlign: 'center',
                 paddingVertical: '2%',
                 borderRadius: 8,
                 color: 'green',
                 borderColor: 'green',
                 backgroundColor: 'white'
              }}>Votre Téléphone : <Text style={{color: 'orangered'}}>{tel}</Text> </Text>

              <Text style={{
                 marginLeft: '5%',
                 fontWeight: 'bold',
                 fontSize: 15,
                 borderWidth: 2,
                 width: '90%',
                 textAlign: 'center',
                 paddingVertical: '2%',
                 borderRadius: 8,
                 color: 'green',
                 borderColor: 'green',
                 backgroundColor: 'white'
                // marginBottom: '2%'
              }}>Votre Solde : <Text style={{color: 'orangered'}}>{solde} Fcfa</Text></Text>


<TouchableOpacity style={{
                width: '80%',
                //borderWidth: 2,
                padding: '4%',
                marginLeft: '10%',
                marginTop: '10%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'rgb(46, 154, 241)',
              }} 
              
              onPress = {() => {
                navigation.navigate('Update your Profil');
             }}

              >
                  <Text style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: 'white'
                  }}>
                     Modifier Compte
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                width: '80%',
                //borderWidth: 2,
                padding: '3%',
                marginLeft: '10%',
                marginTop: '3%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'red',
                marginBottom: '10%'
              }}
              
              onPress = {deleteAccount}
                
              >
                  <Icon
                          source="exclamation"
                          size={30}
                          color="yellow"
                  />
                  <Text style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: 'white'
                  }}>
                     Supprimer Compte
                  </Text>
              </TouchableOpacity>

            </View>

      </ScrollView>
    </View>
  )
}
