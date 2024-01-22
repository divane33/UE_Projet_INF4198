import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { RadioButton, Icon } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';



export default function UpdateProfil() {

  const navigation = useNavigation();

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState();
  const [gender, setGender] = useState();
  const [profLink, setProfLink] = useState();

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
         }else{
                  
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
                                      "UPDATE Users SET Username = ?, Email = ?, Password = ?, Tel = ?, Gender = ?, Profil = ? WHERE id = ?",
                                      [username, email, password, tel, gender, profLink, idUser],
                                      (_, results) => {
                                        // Validation de la modification dans la base de données
                                        alert('Informations mises à jour avec succès');
                                        refreshAsync("activeUser", username, profLink);
                                        renderData();
                                          navigation.navigate("Home");
                                          navigation.navigate("Your Profil");
                                        
                                      },
                                      (_, error) => {
                                        console.log("Error fetching user details:", error);
                                        alert("Error fetching user details: " + error);
                                      }
                                    );
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

<View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45vw',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(233, 226, 184)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100vw',
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
