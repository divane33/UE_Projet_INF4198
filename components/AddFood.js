import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import * as SQLite from 'expo-sqlite';


import { Icon, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function AddFood() {

  // Constante de navigation
  const navigation = useNavigation();

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // Constantes du formulaire
   const [name, setName] = useState();
   const [description, setDescription] = useState();
   const [prix, setPrix] = useState();
   const [quantité, setQuantité] = useState();
   const [solde, setSolde] = useState();
   const [actualDate, setActualDate] = useState();
   const [categorie, setCategorie] = useState();
   const [imageLink, setImageLink] = useState();

   let dat = new Date();

   // Constante pour sélectionner une date
      const [date, setDate] = useState(new Date());
      const [show, setShow] = useState(false);
   //alert(date.getHours()+":"+date.getMinutes())
      

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setActualDate(currentDate.getDate() +"/"+ parseInt(currentDate.getMonth()+1) +"/"+ currentDate.getFullYear());
        //alert(currentDate.getDate() +"/"+ parseInt(currentDate.getMonth()+1) +"/"+ currentDate.getFullYear());
      };

      const showDatepicker = () => {
        setShow(true);
      };
    //---------------------------------

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
            setImageLink(imageLink);
         } catch (error) {
            throw error;
         }
   }

   // Fonction pour importer une image du téléphone
   const selectImage = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            alert(imageUri);
            setSelectedImage(imageUri);
            setImageLink(imageUri);
          }
        });
  };

     // Fonction pour prendre une photo avec la caméra du téléphone
     const takePicture = () => {

            const options = {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 2000,
              maxWidth: 2000,
            };
          
            launchCamera(options, response => {
              if (response.didCancel) {
                console.log('User cancelled camera');
              } else if (response.error) {
                console.log('Camera Error: ', response.error);
              } else {
                //let imageUri = response.uri || response.assets?.[0]?.uri;
                //setSelectedImage(imageUri);
                //console.log(imageUri);
                alert(response.uri);
              }
            });

     }

     // Fonction pour prendre une photo
     const openCamera = async () => {
       const result = await ImagePicker.launchCamera();
       alert (result?.assets[0]?.uri);
     }


     // Fonction pour enregistrer un nouveau produit dans la BD
     const saveProduit = () => {
        if(!name || !description || !prix || !quantité || !solde || !categorie || !imageLink){
           alert("S'il vous plaît, remplissez tous les champs !")
        }
        else if (!(prix > 0) || !(quantité >= 1) || !(solde >= 0)){
             alert ("Veuillez revérifier s'il n'y a aucune érreur au niveau du prix, de la quantité ou du solde !");
        }
        else { 

          // Requête pour ajouter le produit par défaut: pain
              db.transaction((tx) => {

                tx.executeSql(
                  "SELECT * FROM Produits",
                  [],
                  (_, { rows }) => {
                    if (rows.length > 0) {
                       for(let i=0; i < rows.length; i++) {
                          if (rows.item(i).Nom == name) {
                            alert("Veuillez modifier le nom du produit s'il vous plaît !")
                            return
                          }
                       }
                       let datejour;
                          if(!actualDate) {
                            // setActualDate(dat.getDate() +"/"+ dat.getMonth() +"/"+ dat.getFullYear());
                            datejour = dat.getDate() +"/"+ (dat.getMonth()+1) +"/"+ dat.getFullYear();
                          }else {
                            datejour = actualDate;
                          }
                        // alert("Tous les champs ont été bien remplis, merci !")

                          db.transaction((tx) => {
                            tx.executeSql(
                            "INSERT INTO Produits (Nom, Description, DatePublication, Categorie, Image, Prix, Commentaires, Quantité, Solde) VALUES (?,?,?,?,?,?,?,?,?)",
                            [name, description, datejour, categorie, imageLink, prix, "", quantité, solde]
                            )
                        } );

                        alert("Produit enregistré avec succès !");
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Home' },{ name: 'Centre Administrateur' },{ name: 'GererProduits' }, {name: 'Add Food'}],
                        });
                    }
                  })
            } );

          
          //  navigation.navigate("Home")
          //  navigation.navigate("Centre Administrateur")
          //  navigation.navigate("GererProduits")
          //  navigation.navigate("Add Food")

        }
     } 


     // Tableau qui récupère les catégories par défaut dans la BD
     const [tabCategories, setTabCategories] = useState([]);

    // Fonction pour recupérer les différents types de catégories présentes dans la BD
      const defaultCatégories = () => {

            db.transaction(tx => {
              tx.executeSql(
                "SELECT * FROM Categorie",
                [],
                (_, { rows }) => {
                  if (rows.length > 0) {

                       let TAB = [];

                        for(let i=0; i<rows.length; i++){

                          TAB.push(rows.item(i).Nom)
                          //alert(rows.item(i).Nom)
                          
                        }

                        setTabCategories(TAB);
                  }
                })
          })

      }



     useEffect(()=>{

      defaultCatégories();

     db.transaction(tx => {
      tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Produits (id INTEGER PRIMARY KEY AUTOINCREMENT, Nom TEXT, Description TEXT, DatePublication TEXT, Categorie TEXT, Image TEXT, Prix REAL, Commentaires TEXT, Quantité INTEGER, Solde REAL)',
          [],
        // (_, error) => console.error('Erreur lors de la création de la table : ', error)
        );
      });

      // Requête pour supprimer une table
      // db.transaction(tx => {
      //   tx.executeSql(
      //     'DROP TABLE IF EXISTS Produits',
      //     [],
      //     (_, res) => {
      //       alert('Table supprimée avec succès');
      //     }
      //   );
      // });

      // Crée la table Users s'il n'en existe pas
      //  db.transaction(tx => {
      //    tx.executeSql(
      //      'CREATE TABLE IF NOT EXISTS Foods (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Description TEXT, Calorie TEXT, Date TEXT, Category TEXT, Image TEXT)',
      //      [],
      //     // (_, response) => alert('Table créée: ', response),
      //     // (_, error) => alert('Erreur lors de la création de la table : ', error)
      //    );
      //  });

   //createTable();

 }, []);

  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>
       <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45%',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(216, 228, 241)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100%',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(216, 228, 241)',
           bottom: 0,
           right: 0
         }}></View>


        <ScrollView style={{height: 'auto'}}>
        <View>
           <Text style={{
             textAlign: 'center',
             fontSize: 17, 
             paddingHorizontal: 35,
             marginTop: 50,
             fontWeight: 'bold',
             fontFamily: 'sans-serif',
             fontStyle: "italic",
             color: "rgb(27, 70, 119)"
           }}

           >
             ( Veuillez remplir les différents champs ci-dessous pour ajouter un nouveau produit )
           </Text>

           <View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>

           <View style={{
             marginTop: '10%',
             justifyContent: 'center',
             alignItems: 'center'
           }}>
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Nom du produit :</Text>
                <TextInput placeholder="Appuyer ici pour remplir"
                      style = {{
                        //backgroundColor: "rgb(179, 178, 178)",
                        backgroundColor: "rgb(162, 175, 206)",
                        width: '80%',
                        padding: '2%',
                        paddingHorizontal: '5%',
                        borderRadius: 100,
                        marginBottom: '4%'
                      }}

                      placeholderTextColor = {"rgb(240, 240, 240)"}

                      value = {name}

                      onChangeText = {(query) => {
                        if(query.length <= 30) {
                          setName(query)
                        }
                      }}
                >
                </TextInput>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Description du produit :</Text>
                <TextInput placeholder="Appuyer ici pour remplir"

                      multiline={true}
                      numberOfLines={3}

                      style = {{
                        backgroundColor: "rgb(162, 175, 206)",
                        width: '80%',
                        padding: '2%',
                        paddingHorizontal: '5%',
                        borderRadius: 5,
                        marginBottom: '4%'
                      }}

                      placeholderTextColor = {"rgb(240, 240, 240)"}

                      value = {description}

                      onChangeText = {(query) => {
                        if(query.length <= 70) {
                          setDescription(query)
                        }
                      }}
                >
                </TextInput>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Date d'ajout :</Text>
                    <TouchableOpacity 
                        style={{
                          //borderWidth: 2,
                          width: '60%',
                          alignItems: 'center',
                          marginBottom: '6%',
                          padding: '1.5%',
                          borderRadius: 10,
                          backgroundColor: 'rgb(162, 175, 206)'
                        }}
                        onPress = {showDatepicker}
                    >
                        <TextInput
                          value={actualDate}
                          editable={false}
                          placeholder='00-00-0000'
                          placeholderTextColor={"rgb(240, 240, 240)"}
                          style={{
                            color: 'black'
                          }}
                          //placeholderTextColor="red"
                        ></TextInput>
                    </TouchableOpacity>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Ajouter un prix :</Text>
                <TextInput placeholder="Appuyer ici pour remplir"
                      style = {{
                        backgroundColor: "rgb(162, 175, 206)",
                        width: '80%',
                        padding: '2%',
                        paddingHorizontal: '5%',
                        borderRadius: 100,
                        marginBottom: '6%',
                        textAlign: 'center'
                      }}

                      placeholderTextColor = {"rgb(240, 240, 240)"}

                      onChangeText = {setPrix}
                >
                </TextInput>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Ajouter une quantité :</Text>
                <TextInput placeholder="Appuyer ici pour remplir"
                      style = {{
                        backgroundColor: "rgb(162, 175, 206)",
                        width: '80%',
                        padding: '2%',
                        paddingHorizontal: '5%',
                        borderRadius: 100,
                        marginBottom: '6%',
                        textAlign: 'center'
                      }}

                      placeholderTextColor = {"rgb(240, 240, 240)"}

                      onChangeText = {setQuantité}
                >
                </TextInput>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Ajouter un solde (en %):</Text>
                <TextInput placeholder="Appuyer ici pour remplir"
                      style = {{
                        backgroundColor: "rgb(162, 175, 206)",
                        width: '80%',
                        padding: '2%',
                        paddingHorizontal: '5%',
                        borderRadius: 100,
                        marginBottom: '6%',
                        textAlign: "center"
                      }}

                      placeholderTextColor = {"rgb(240, 240, 240)"}

                      onChangeText = {setSolde}
                >
                </TextInput>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Choisissez la catégorie :</Text>
                <View style={{
                  //borderWidth: 1,
                  width: 250,
                  marginBottom: '6%',
                  backgroundColor: 'rgb(162, 175, 206)',
                  //marginLeft: "-15%"
                }}>

                  <SelectDropdown
                        data = {tabCategories} 

                        onSelect = {(selectedItem, index) => {
                          setCategorie(selectedItem);
                        }}

                         buttonStyle={{
                           backgroundColor: 'rgb(162, 175, 206)',
                           height: 45
                         }}
                         buttonTextStyle={{
                           color: 'white',
                           fontWeight: 'bold'
                         }}

                        dropdownStyle={{
                          //backgroundColor: 'red',
                          width: 250,
                        }}
                        rowTextStyle={{
                          //backgroundColor: 'yellow',
                          paddingVertical: 7,
                        }}
                  />

                </View>

                <Text style={{fontWeight: 'bold'}}>Ajoutez une image :</Text>
                <Image style={{
                        width: '53%',
                        height: 190,
                        borderRadius: 100,
                        marginBottom: '5%',
                        marginTop: '7%'
                      }} source={imageLink ? {uri:imageLink} : require('../images/emptyImage.jpeg')}
                    />
                <View style={{
                  //borderWidth: 2,
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: '2%',
                  alignItems: 'center',
                  marginLeft: '-6%'
                }}>
                    <TouchableOpacity style={{
                      borderWidth: 3,
                      padding: '2%',
                      paddingHorizontal: '4%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderColor: 'rgb(50, 94, 238)',
                    }}
                    
                    onPress={
                      ()=>{
                        galleryImage();
                      //alert("select some image !");
                      //selectImage();
                      }
                    } 

                    >
                        <Icon
                          source="upload"
                          size={30}
                          color="rgb(50, 94, 238)"
                        />
                        <Text style={{
                          marginLeft: 3,
                          fontWeight: 'bold',
                          color: 'rgb(50, 94, 238)'

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
                      borderColor: 'rgb(50, 94, 238)'
                    }}
                    
                    onPress={
                      ()=>{
                      //alert("Your Camera is going to open !");
                      //openCamera();
                      //takePicture();
                      uploadImage();
                      }
                    } 
                    
                    >
                        <Icon
                          source="camera"
                          size={30}
                          color="rgb(50, 94, 238)"
                        />
                        <Text style={{
                          marginLeft: 3,
                          fontWeight: 'bold',
                          color: 'rgb(50, 94, 238)'

                        }}>Snap</Text>
                    </TouchableOpacity>

                </View>

           </View>
            
                   <TouchableOpacity style={{
                     //borderWidth: 2,
                     marginTop: '17%',
                     padding: '3%',
                     backgroundColor: 'rgb(34, 42, 70)',
                     width: '85%',
                     marginLeft: '7.25%',
                     borderRadius: 100,
                     marginBottom: '16%'
                   }}
                   
                     onPress = {saveProduit}

                   >
                        <Text style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 22,
                          color: 'white'
                        }}>
                           Ajouter
                        </Text>
                    </TouchableOpacity>
          

        </View>
        </ScrollView>
    </View>
  )
}
