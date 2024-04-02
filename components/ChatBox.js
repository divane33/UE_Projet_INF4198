import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, TextInput, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from "expo-sqlite";


export default function ChatBox() {

  // Constante du chargement
  const [loading, setLoading] = useState(true);

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // Constante permettant d'afficher la View pour l'ajout d'image
  const [displayView, setDisplayView] = useState(false);
  const [chatField, setChatField] = useState(true);

  // Différentes constantes pour l'envoi d'un message
  const [envoyeur, setEnvoyeur] = useState("");
  const [recepteur, setRecepteur] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  //const [nomEnvoyeur, setNomEnvoyeur] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [genre, setGenre] = useState("");

  const [profil, setProfil] = useState("");

  // Constante du tableau permettant de récupérer tous les messages de l'utilisateur
  const [tabMessages, setTabMessages] = useState([]);

  //fonction pour uploader une image à partir de la gallérie
  const galleryImage = async () => {
            try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

            if(!result.canceled){
                await saveImage(result.assets[0].uri);
            }

            } catch (error) {
            alert("this is the error : "+error);
            }
        }

    //fonction pour uploader une image à partir de la caméra
    const uploadImage = async () => {
        try {
          await ImagePicker.requestCameraPermissionsAsync();
          let result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
          });

          if(!result.canceled){
            await saveImage(result.assets[0].uri);
            //console.log(result.assets[0].uri);
          }

        } catch (error) {
          alert("this is the error : "+error);
        }
      }

        const saveImage = async (imageLink) => {
            try {
               setImage(imageLink);
               setDisplayView(false);
            } catch (error) {
               throw error;
            }
          }

  // Fonction asynchrone permettant de récupérer l'envoyeur et le recepteur
  const getInfos = async () => {
        let user = await AsyncStorage.getItem("activeUser");
        let profil = await AsyncStorage.getItem("LienProfil");
        setActiveUser(user);
        setProfil(profil);

        // Constante avec laquelle on conditionne le chargement des messages (on éffectue la condition entre un Admin et les non admins)
        let checkUserCondition;

        setEnvoyeur(await AsyncStorage.getItem("activeUser"));
        let interlocuteur = await AsyncStorage.getItem("Interlocuteur");
        let checkGenre = await AsyncStorage.getItem("Genre");
        setGenre(checkGenre);
        //alert(checkGenre);
        if(checkGenre != "Administrateur") {
            setRecepteur("Administrateur");
            checkUserCondition = user; // On charge les messages dans la table suivant user
        }else{
            setRecepteur(interlocuteur);
            checkUserCondition = interlocuteur; // On charge les messages dans la table suivant interlocuteur
        }

        db.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM Messages",
              [],
              (_, { rows }) => {
                if (rows.length > 0) {
                  let tab = [];
                    for(let i=0; i<rows.length; i++){
                        if(rows.item(i).Envoyeur == checkUserCondition || rows.item(i).Recepteur == checkUserCondition) {
                            tab.push(
                                {
                                  envoyeur: rows.item(i).Envoyeur,
                                  recepteur: rows.item(i).Recepteur,
                                  message: rows.item(i).Message,
                                  image: rows.item(i).Image,
                                  nomEnvoyeur: rows.item(i).NomEnvoyeur,
                                  genre: rows.item(i).GenreEnvoyeur
                                }
                              )
                        }
                    }
                    setTabMessages(tab);
                    setLoading(false)
                }else {
                  setLoading(false);
                }})});
               

  }

  useEffect(()=>{
    getInfos()
  }, [])

  // Fonction permettant d'afficher tous les messages contenus dans tabMessages un à un
  const displayMessage = () => {

    // for(let elt of tabMessages) {
    //     alert(elt.message);
    // }

        return tabMessages.map((message, index) => {
              if(message.nomEnvoyeur == activeUser) {
                  return (
                    <View key={index} style={{
                        //borderWidth: 2,
                        width: '75%',
                        //padding: '4%',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        backgroundColor: 'white',
                        marginLeft: '25%',
                        marginBottom: '2%'
                        
                    }}>
                          <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: '4%', marginLeft: '4%', marginRight: '4%'}}>Vous</Text>
                            <Text style={{marginLeft: '4%', marginBottom: 13, marginRight: '4%'}}>
                                {message.message}
                            </Text>
                            {message.image && (<Image style={{
                            height: 270,
                            width: 260,
                            aspectRatio: 'auto'
                            }} source={{uri: message.image}}/>)}
                    </View>
                  )
              } else {
                        return (<View key={index} style={{
                            //borderWidth: 2,
                            width: '75%',
                            //padding: '4%',
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            backgroundColor: 'rgb(140, 243, 140)',
                            marginBottom: '2%'
                        }}>
                            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: '4%', marginLeft: '4%', marginRight: '4%'}}>{message.envoyeur} ({message.genre})</Text>
                            <Text style={{marginLeft: '4%', marginBottom: 13, marginRight: '4%'}}>
                                {message.message}
                            </Text>
                            {message.image && (<Image style={{
                            height: 270,
                            width: 260
                            }} source={{uri: message.image}}/>)}
                        </View>)
              }
        })

  }

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>

      {/* View qui affiche le loading de la page */}
      {loading && <View style={{position: 'absolute', width: "100%", height: '100%', zIndex: 200, backgroundColor: "rgba(0, 0, 0, 0.752)", justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={75} color={"yellowgreen"} />
                    </View>}

    {/* View permettant d'afficher la section permettant d'ajouter une image soit en filmant ou en important */}
      {displayView && ( <View style={{
          position: 'absolute',
          //borderWidth: 2,
          width: '100%',
          bottom: 0,
          left: 0,
          zIndex: 5,
          height: 100,
          marginBottom: 60,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 10
       }}>
           <View style={{
               //borderWidth: 2,
               height: "100%",
               justifyContent: 'center',
               alignItems: "center",
               flexDirection: "row"
           }}>

                    <TouchableOpacity style={{
                      borderWidth: 3,
                      padding: '1%',
                      paddingHorizontal: '2%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderColor: 'orangered',
                      backgroundColor: 'white'
                    }}

                    onPress={galleryImage}

                    >
                        <Icon
                          source="upload"
                          size={30}
                          color="orangered"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                      borderWidth: 3,
                      padding: '1%',
                      paddingHorizontal: '2%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderColor: 'orangered',
                      backgroundColor: 'white',
                      marginLeft: 10
                    }}

                    onPress={uploadImage}
                    
                    >
                        <Icon
                          source="camera"
                          size={30}
                          color="orangered"
                        />
                    </TouchableOpacity>

           </View>
           <Text onPress={()=>{setDisplayView(false)}} style={{position: 'absolute', right: "6%", top: "10%", fontSize: 16}}>X</Text>
           
        </View>)}
        
     <ImageBackground source={require("../images/chatBack.jpg")} style={{width:'100%', height:'100%'}}/>
      <ScrollView style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.300)'
      }}>
        <View style={{
           //borderWidth: 2,
           paddingBottom: '20%',
           padding: '2%',
           marginBottom: 70
        }}>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'rgb(140, 243, 140)',
              marginBottom: '2%',
              marginTop: '5%'
          }}>
               <Text style={{fontWeight: 'bold', fontSize: 15}}>Support</Text>
                <Text>
                    Merci chèr(e) utilisateur d'avoir choisi notre application. N'hésitez surtout 
                    pas à nous écrire si vous avez un quelconque problème.
                </Text>
          </View>

          {displayMessage()}

          {image && (<View style={{marginTop: 10, marginLeft: '25%'}}>
                <Text style={{ backgroundColor: 'white', fontSize: 17, fontWeight: 'bold', color: 'orangered', marginTop: 5, paddingLeft: 10, paddingVertical: 5}} onPress={()=>{setImage("")}}>Supprimer l'image ?</Text>
                <Image style={{
                  height: 250,
                  width: 260
                }} source={{uri: image}}/>
          </View>)}
        </View>

       </ScrollView>
       {chatField && (<View style={{
              //borderWidth: 2,
              position: 'absolute',
              bottom: 5,
              height: 55,
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: '1%'
          }}>
              <TouchableOpacity style={{
                  //borderWidth: 2,
                  //borderColor: 'red',
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'orange',
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
              }}
              
                 onPress={() => {setDisplayView(true)}}

              >
                  <Icon
                    source="folder"
                    size={30}
                    color="white"
                  />
              </TouchableOpacity>

              <TextInput placeholder='Ecrivez un message...'

                   multiline={true}
                   onChangeText={setMessage}

                   style={{
                       width: '65%',
                       backgroundColor: 'white',
                       padding: '2%'
                   }}
              >
              </TextInput>

              <TouchableOpacity style={{
                  //borderWidth: 2,
                  //borderColor: 'red',
                  width: '20%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgb(3, 187, 3)',
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
              }} 
              
                onPress={() => {

                        if(message || image) {
                            setChatField(false);
                            // alert(envoyeur +" "+ recepteur +" "+ message +" "+ image +" "+ envoyeur +" "+ genre);
                            let tab = tabMessages;
                            tab.push({
                                envoyeur: envoyeur,
                                recepteur: recepteur,
                                message: message,
                                image: image,
                                nomEnvoyeur: envoyeur
                            })
                            setTabMessages(tab);

                            // Requête pour envoyer le message dans la BD
                            db.transaction((tx) => {
                                tx.executeSql(
                                "INSERT INTO Messages (Envoyeur, Recepteur, Message, Image, NomEnvoyeur, GenreEnvoyeur) VALUES (?,?,?,?,?,?)",
                                [envoyeur, recepteur, message, image, envoyeur, genre]
                                )
                              } );

                            // Requête pour signaler que l'utilisateur a écrit un message
                            if (genre == "Administrateur") {
                                db.transaction(tx => {
                                    tx.executeSql(
                                    "UPDATE Notifications SET Notif = ? WHERE User = ?",
                                    ["oui", recepteur],
                                    //() => {alert("Table Notifications mise à jour avec succès !")}
                                    )
                                 })
                            }else{
                                db.transaction(tx => {
                                    tx.executeSql(
                                    "UPDATE Notifications SET AEnvoyé = ?, Profil = ? WHERE User = ?",
                                    ["oui", profil, envoyeur]
                                    )
                                 })
                            }

                            setMessage();
                            setImage();
                            setTimeout(() => {
                                setChatField(true);
                            }, 5);
                        }
                }}

              >
                  <Icon
                    source="send"
                    size={35}
                    color="white"
                  />
              </TouchableOpacity>
                
       </View>)}
       
    </View>
  )
}
