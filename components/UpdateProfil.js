import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { RadioButton, Icon } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';



export default function UpdateProfil() {

  const navigation = useNavigation();

  // Constante du chargement
  const [loading, setLoading] = useState(true);

  // Constante permettant de mettre les différentes tables de la base de données les une après les autres
  const [updateNext, setUpdateNext] = useState(0);

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState();
  const [gender, setGender] = useState();
  const [profLink, setProfLink] = useState();

  // Constantes statiques pour éffectuer aussi la mise à jour de toutes les autres tables de la BD 
  const [usernameStatic, setUsernameStatic] = useState("");
  const [emailStatic, setEmailStatic] = useState("");
  const [passwordStatic, setPasswordStatic] = useState("");
  const [telStatic, setTelStatic] = useState();
  const [genderStatic, setGenderStatic] = useState();
  const [profLinkStatic, setProfLinkStatic] = useState();

 const [checked, setChecked] = React.useState('second');
 const [idUser, setIdUser] = useState();

 // Fonction pour récupérer et afficher des données de la BD
 const renderData = async () => {
     //alert(activeU);
        try {

                    const ac = await AsyncStorage.getItem("activeUser");

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
                                setTel(rows.item(0).Tel.toString());

                                setLoading(false)

                                // Ici on définit les différentes constantes statiques
                                setUsernameStatic(rows.item(0).Username);
                                setEmailStatic(rows.item(0).Email);
                                setPasswordStatic(rows.item(0).Password);
                                setGenderStatic(rows.item(0).Gender);
                                setProfLinkStatic(rows.item(0).Profil);
                                setTelStatic(rows.item(0).Tel.toString());
                           
                        },
                        (_, error) => {
                          console.log("Error fetching user details:", error);
                          alert("Error fetching user details: " + error);
                        }
                      );
                    });
           
      
    } catch (error) {
      // Gérer l'erreur de sauvegarde
    }
 }

        // Fonction pour la mise à jour de la table Notifications
        const updateNotifications = () => {

          db.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM Notifications",
              [],
              (_, { rows }) => {
                if (rows.length > 0) {
                  for(let i=0; i<rows.length; i++){
                   // alert(profLinkStatic);
                      if(rows.item(i).User == usernameStatic && rows.item(i).Profil == null) {
                          let id = rows.item(i).id;
                          tx.executeSql(
                            "UPDATE Notifications SET User = ?, Profil = ? WHERE id = ?",
                            [username, profLink, id],
                            () => {alert("table des notifications mise à jour avec succès !")}
                          )
                      }
            }
          }})})

        }


 useEffect(() => {
    renderData();
    //getData();
  }, []);

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

      const saveImage = async (imageLink) => {
        try {
           setProfLink(imageLink);
        } catch (error) {
           throw error;
        }
      }

      // Fonction pour rafaîchir la BD de AsyncStorage
      const refreshAsync = async (key, value, profilL) => {
            try {
              await AsyncStorage.setItem(key, value);
              await AsyncStorage.setItem("LienProfil", profilL);
              //alert('ok now');
            } catch (error) {
              // Gérer l'erreur de sauvegarde
            }
      };


      // Fonction pour mettre à jour les informations
      const updateUser = () => {

        var aro = false;
   
         if(!username || !email || !password){
                alert("Please fill in all the fields");
         }else if( !(tel >= 0) || tel.length < 8){
          alert("Il se pourrait que vous ayez mal écrit votre numéro de téléphone. Veuillez le rectifier s'il vous plaît !")
         }
         else{
                  
               for(let i = 0; i < email.length; i++){
                 if(email.charAt(i) == "@") {
                   aro = true;
                   if(email.charAt(i+1) && email.charAt(i+1) != "."){
                       for(let j = i+1; j < email.length; j++){
                           if(email.charAt(j) == "."){
                               if(email.charAt(j+1) && email.charAt(j+1) != "" && email.charAt(j+1) != "."){
  
                                try{
  
                                  db.transaction(tx => {

                                    tx.executeSql(
                                      "SELECT * FROM Users",
                                      [],
                                      (_, { rows }) => {
                                        if (rows.length > 0) {
                                          for(let i=0; i<rows.length; i++){
                                                if(rows.item(i).Username == username && usernameStatic != username){
                                                  alert("Veuillez changer votre Username s'il vous plaît !");
                                                  return
                                                  }else if (rows.item(i).Email == email && emailStatic != email) {
                                                      alert("Veuillez changer votre adresse Email s'il vous plaît !");
                                                      return
                                                  }else if (rows.item(i).Tel == tel && telStatic != tel) {
                                                  alert("Veuillez changer votre numéro de téléphone s'il vous plaît !");
                                                  return
                                              } else if(i == rows.length-1){
                                                     
                                    // On commence par la table Messages à faire les mise à jour
                                    db.transaction(tx => {
                                    tx.executeSql(
                                      "SELECT * FROM Messages",
                                      [],
                                      (_, { rows }) => {

                                         let taille;
                                         if(rows.length <= 0) {
                                           taille = 1;
                                         } else {
                                           taille = rows.length;
                                         }

                                        if (taille > 0) {
                                          for(let i=0; i<taille; i++){
                                              if(rows.length != 0){
                                                if(rows.item(i).Envoyeur == usernameStatic && rows.item(i).NomEnvoyeur == usernameStatic){
                                                let id = rows.item(i).id;
                                                tx.executeSql(
                                                  "UPDATE Messages SET Envoyeur = ?, NomEnvoyeur = ? WHERE id = ?",
                                                  [username, username, id],
                                                  //()=>{alert("Table Messages mise à jour avec succès !")}
                                                )
                                              } else if(rows.item(i).Recepteur == usernameStatic) {
                                                let id = rows.item(i).id;
                                                tx.executeSql(
                                                  "UPDATE Messages SET Recepteur = ? WHERE id = ?",
                                                  [username, id],
                                                  //()=>{alert("Table Messages mise à jour avec succès !")}
                                                )
                                              }}
                                            } 

                                            // Après la c'est la table Notifications qu'on met à jour
                                            db.transaction(tx => {
                                              tx.executeSql(
                                                "SELECT * FROM Notifications",
                                                [],
                                                (_, { rows }) => {

                                                  let taille;
                                                  if(rows.length <= 0) {
                                                    taille = 1;
                                                  } else {
                                                    taille = rows.length;
                                                  }

                                                  if (taille > 0) {
                                                    for(let i=0; i<taille; i++){
                                                        if(rows.length != 0){
                                                          if(rows.item(i).User == usernameStatic /*&& rows.item(i).Profil == profLinkStatic*/) {
                                                            let id = rows.item(i).id;
                                                            tx.executeSql(
                                                              "UPDATE Notifications SET User = ?, Profil = ? WHERE id = ?",
                                                              [username, profLink, id],
                                                              //() => {alert("table des notifications mise à jour avec succès !")}
                                                            )
                                                        }}
                                              }

                                              // Après la c'est la table Historiques qu'on met à jour
                                                db.transaction(tx => {
                                                  tx.executeSql(
                                                    "SELECT * FROM Historiques",
                                                    [],
                                                    (_, { rows }) => {

                                                      let taille;
                                                      if(rows.length <= 0) {
                                                        taille = 1;
                                                      } else {
                                                        taille = rows.length;
                                                      }

                                                      if (taille > 0) {
                                                        for(let i=0; i<taille; i++){
                                                            if(rows.length != 0){
                                                              if(rows.item(i).Username == usernameStatic) {
                                                                let id = rows.item(i).id;
                                                                tx.executeSql(
                                                                  "UPDATE Historiques SET Username = ? WHERE id = ?",
                                                                  [username, id],
                                                                  //() => {alert("table des Historiques mise à jour avec succès !")}
                                                                )
                                                            }}
                                                  }

                                              // Après la c'est la table Commentaires qu'on met à jour
                                                db.transaction(tx => {
                                                  tx.executeSql(
                                                    "SELECT * FROM Commentaires",
                                                    [],
                                                    (_, { rows }) => {

                                                      let taille;
                                                      if(rows.length <= 0) {
                                                        taille = 1;
                                                      } else {
                                                        taille = rows.length;
                                                      }

                                                      if (taille > 0) {
                                                        for(let i=0; i<taille; i++){
                                                            if(rows.length != 0){
                                                              if(rows.item(i).Username == usernameStatic /*&& rows.item(i).Profil == profLinkStatic*/) {
                                                                let id = rows.item(i).id;
                                                                tx.executeSql(
                                                                  "UPDATE Commentaires SET Username = ?, Profil = ? WHERE id = ?",
                                                                  [username, profLink, id],
                                                                  //() => {alert("table des Commentaires mise à jour avec succès !")}
                                                                )
                                                            }}
                                                  }

                                                // Après la c'est la table Commandes qu'on met à jour
                                                    db.transaction(tx => {
                                                      tx.executeSql(
                                                        "SELECT * FROM Commandes",
                                                        [],
                                                        (_, { rows }) => {

                                                          let taille;
                                                          if(rows.length <= 0) {
                                                            taille = 1;
                                                          } else {
                                                            taille = rows.length;
                                                          }

                                                          if (taille > 0) {
                                                            for(let i=0; i<taille; i++){
                                                                if(rows.length != 0){
                                                                  if(rows.item(i).Tel_Client == telStatic) {
                                                                    let id = rows.item(i).id;
                                                                    tx.executeSql(
                                                                      "UPDATE Commandes SET Tel_Client = ? WHERE id = ?",
                                                                      [tel, id],
                                                                      //() => {alert("table des Commandes mise à jour avec succès !")}
                                                                    )
                                                                } else if (rows.item(i).Tel_Livreur == telStatic) {
                                                                    let id = rows.item(i).id;
                                                                    tx.executeSql(
                                                                      "UPDATE Commandes SET Tel_Livreur = ? WHERE id = ?",
                                                                      [tel, id],
                                                                      //() => {alert("table des Commandes mise à jour avec succès !")}
                                                                    )
                                                                }}
                                                      }

                                                      // Après la c'est la table Recharges qu'on met à jour
                                                          db.transaction(tx => {
                                                            tx.executeSql(
                                                              "SELECT * FROM Recharges",
                                                              [],
                                                              (_, { rows }) => {

                                                                let taille;
                                                                  if(rows.length <= 0) {
                                                                    taille = 1;
                                                                  } else {
                                                                    taille = rows.length;
                                                                  }

                                                                if (taille > 0) {
                                                                  for(let i=0; i<taille; i++){
                                                                     if(rows.length != 0){
                                                                       if(rows.item(i).Username == usernameStatic /*&& rows.item(i).Profil == profLinkStatic*/ && rows.item(i).Tel == telStatic) {
                                                                       let id = rows.item(i).id;
                                                                          tx.executeSql(
                                                                            "UPDATE Recharges SET Username = ?, Profil = ?, Tel = ? WHERE id = ?",
                                                                            [username, profLink, tel, id],
                                                                            //() => {alert("table des Recharges mise à jour avec succès !")}
                                                                          )
                                                                      }}
                                                            }

                                                      // Après la c'est la table Livreurs qu'on met à jour
                                                          db.transaction(tx => {
                                                            tx.executeSql(
                                                              "SELECT * FROM Livreurs",
                                                              [],
                                                              (_, { rows }) => {

                                                                let taille;
                                                                  if(rows.length <= 0) {
                                                                    taille = 1;
                                                                  } else {
                                                                    taille = rows.length;
                                                                  }

                                                                if (taille > 0) {
                                                                  for(let i=0; i<taille; i++){
                                                                      if(rows.length != 0){
                                                                        if(rows.item(i).Tel == telStatic) {
                                                                          let id = rows.item(i).id;
                                                                          tx.executeSql(
                                                                            "UPDATE Livreurs SET Tel = ? WHERE id = ?",
                                                                            [tel, id],
                                                                            //() => {alert("table des Livreurs mise à jour avec succès !")}
                                                                          )
                                                                      }}
                                                            }

                                                       // Enfin on met à jour la table Users
                                                            db.transaction(tx => {
                                                              tx.executeSql(
                                                                "UPDATE Users SET Username = ?, Email = ?, Password = ?, Tel = ?, Gender = ?, Profil = ? WHERE id = ?",
                                                                [username, email, password, tel, gender, profLink, idUser],
                                                                (_, results) => {
                                                                  // Validation de la modification dans la base de données
                                                                  // alert(usernameStatic+" "+emailStatic+" "+passwordStatic+" "+genderStatic+" "+profLinkStatic+" "+telStatic)
                                                                  alert('Informations mises à jour avec succès');
                                                                  refreshAsync("activeUser", username, profLink);
                                                                  renderData();
                        
                                                                  navigation.reset({
                                                                    index: 0,
                                                                    routes: [{ name: 'Home' }, { name: 'Your Profil' }],
                                                                  });
                                                                    // navigation.navigate("Home");
                                                                    // navigation.navigate("Your Profil");
                                                                  
                                                                },
                                                                (_, error) => {
                                                                  console.log("Error fetching user details:", error);
                                                                  alert("Error fetching user details: " + error);
                                                                }
                                                              )});       

                                                          }})})

                                                          }})})

                                                    }})})

                                                }})})

                                                }})})

                                            }})})
                                           // setUpdateNext(1);
                                          }})});
                                         // updateNotifications(); 

                                         


                                            }
                                          }
                                        }})

                                  });
  
  
                                }catch(error){
                                  alert("There were some mistake during the saving of your informations: "+error);
                                }
  
                                 return
  
                               }else{
                                     alert('adresse non valide')
                                     return
                               }
                           }else if(j == email.length - 1){
                               alert('adresse non valide')
                               return
                           }
                   }
                   }else{    
                         alert('adresse non valide')
                         return
                   }
                 }else {   
                         if((i == email.length - 1) && aro == false){
                           alert("adresse non valide");
                         };
                 };
             }
         }
     }

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>

      {/* View qui affiche le loading de la page */}
      {loading && <View style={{position: 'absolute', width: "100%", height: '100%', zIndex: 200, backgroundColor: "rgba(0, 0, 0, 0.752)", justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={75} color={"yellowgreen"} />
                    </View>}

<View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45%',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(233, 226, 184)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100%',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(233, 226, 184)',
           bottom: 0,
           right: 0
         }}></View>

        <ScrollView>
              <View>
                  <Text style={{
                    fontWeight: 'bold',
                    fontSize: 21,
                    textAlign: 'center',
                    paddingHorizontal: '6%',
                    marginTop: '12%',
                    fontStyle: 'italic',
                    color: 'rgb(107, 94, 18)'
                  }}>
                    Vous pouvez modifier les champs ci-dessous pour mettre à jour vos informations
                </Text>

                <View style={{
                    marginTop: '12%',
                    paddingHorizontal: '10%'
                }}>
                   
                    <Text style={{fontWeight: 'bold'}}>Username:</Text>
                    <TextInput value={username} 
                    
                      onChangeText={setUsername} 

                    style={{
                       //backgroundColor: 'rgb(179, 178, 178)',
                       backgroundColor: 'rgb(200, 206, 182)',
                       padding: '3%',
                       paddingHorizontal: '6%',
                       borderRadius: 7,
                       marginBottom: '5%'
                    }} />

                    <Text style={{fontWeight: 'bold'}}>Email:</Text>
                    <TextInput value={email} 

                      keyboardType="email-address"
                      autoCapitalize="none"
                    
                    onChangeText={setEmail} 
                    
                    style={{
                       backgroundColor: 'rgb(200, 206, 182)',
                       padding: '3%',
                       paddingHorizontal: '6%',
                       borderRadius: 7,
                       marginBottom: '5%'
                    }} />

                    <Text style={{fontWeight: 'bold'}}>Mot de passe:</Text>
                    <TextInput value={password} 
                    
                    onChangeText={setPassword} 

                    style={{
                       backgroundColor: 'rgb(200, 206, 182)',
                       padding: '3%',
                       paddingHorizontal: '6%',
                       borderRadius: 7,
                       marginBottom: '5%'
                    }} />

                    <Text style={{fontWeight: 'bold'}}>Tel:</Text>
                    <TextInput value={tel} 
                    
                    onChangeText={setTel} 

                    // onChangeText = {(query) => {
                    //   if(query > 0 && (query.length === 9 || query.length === 8)){
                    //     setTel(query);
                    //   }
                    //  }}

                    keyboardType="numeric"

                    style={{
                       backgroundColor: 'rgb(200, 206, 182)',
                       padding: '3%',
                       paddingHorizontal: '6%',
                       borderRadius: 7,
                       marginBottom: '5%'
                    }} />

                    <Text style={{fontWeight: 'bold'}}>Image de profil:</Text>
                    <Image style={{
                        width: 180,
                        height: 180,
                        borderRadius: 100,
                        marginLeft: '17%',
                        marginBottom: '5%',
                        marginTop: '7%'
                      }} source={profLink ? {uri: profLink} : require("../images/Profil.png")}
                    />
                    <View style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginLeft: '7%',
                  marginTop: '2%',
                  alignItems: 'center',
                  marginBottom: '12%'
                }}>
                    <TouchableOpacity style={{
                      borderWidth: 3,
                      padding: '2%',
                      paddingHorizontal: '4%',
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
                        <Text style={{
                          marginLeft: 3,
                          fontWeight: 'bold',
                          color: 'orangered'

                        }}>Import</Text>
                    </TouchableOpacity>

                    <Text style={{
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}> ou </Text>

                    <TouchableOpacity style={{
                      borderWidth: 3,
                      padding: '2%',
                      paddingHorizontal: '4%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderColor: 'orangered',
                      backgroundColor: 'white'
                    }}
                    
                       onPress={uploadImage}
                    
                    >
                        <Icon
                          source="camera"
                          size={30}
                          color="orangered"
                        />
                        <Text style={{
                          marginLeft: 3,
                          fontWeight: 'bold',
                          color: 'orangered'

                        }}>Snap</Text>
                    </TouchableOpacity>

                </View>


                    {/* <Text style={{fontWeight: 'bold'}}>Gender:</Text>
                   <View style={{
                     flexDirection: 'row',
                     alignItems: 'center'
                   }}>
                          <RadioButton
                            value="first"
                            status={ gender === 'Man' ? 'checked' : 'unchecked' }
                            onPress={() => {
                              setChecked('first');
                              setGender("Man");
                              //alert('Vous êtes un homme')
                            }}
                          /><Text style={{marginEnd: 20}}>Man</Text>
                          <RadioButton
                            value="second"
                            status={ gender === 'Woman' ? 'checked' : 'unchecked' }
                            onPress={() => {
                              setChecked('second');
                              setGender("Woman");
                              //alert('Vous êtes une femme')
                            }}
                          /><Text>Woman</Text>
                    </View> */}

                    <TouchableOpacity style={{
                      //borderWidth: 2,
                      width: '100%',
                      padding: '4%',
                      marginVertical: '18%',
                      marginBottom: '30%',
                      borderRadius: 10,
                      backgroundColor: 'rgb(28, 116, 231)'
                    }}
                    
                     onPress={updateUser}
                    
                    >
                          <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white'
                          }}>Sauvegarder</Text>
                    </TouchableOpacity>

                </View>

              </View>
        </ScrollView>
    </View>
  )
}
