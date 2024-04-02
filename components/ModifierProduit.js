import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Icon, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ModifierProduit() {

  // Constante de chargement
  const [loading, setLoading] = useState(true);

  // Constante de navigation
  const navigation = useNavigation();

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // Constantes du formulaire
   const [idProduit, setIdProduit] = useState();
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
            


     // Fonction pour mettre à jour les infos d'un produit dans la BD
     const updateProduit = () => {
        if(name.length==0 || description.length==0 || prix.length==0 || quantité.length==0 || solde.length==0 || categorie.length==0 || imageLink.length==0){
           alert("S'il vous plaît, remplissez tous les champs !")
        }
        else if (!(prix > 0) || !(quantité >= 1) || !(solde >= 0)){
             alert ("Veuillez revérifier s'il n'y a aucune érreur au niveau du prix, de la quantité ou du solde !");
        }
        else if (!actualDate) {
             setActualDate(dat.getDate() +"/"+ dat.getMonth() +"/"+ dat.getFullYear());
             updateProduit();
        }
        else { 

         // alert("Tous les champs ont été bien remplis, merci !")

            try {
                  db.transaction((tx) => {
                  tx.executeSql(
                  "UPDATE Produits SET Nom = ?, Description = ?, DatePublication = ?, Categorie = ?, Image = ?, Prix = ?, Quantité = ?, Solde = ? WHERE id = ?",
                  [name, description, actualDate, categorie, imageLink, prix, quantité, solde, idProduit]
                  )
              } );

              alert("Produit mis à jour avec succès !");
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' },{ name: 'Centre Administrateur' },{ name: 'GererProduits' }],
              });
              // navigation.navigate("Home")
              // navigation.navigate("Centre Administrateur")
              // navigation.navigate("GererProduits")
              //navigation.navigate("ModifierProduit")
          }
          catch (error) {
              alert("Une erreur est survenue lors de la mise à jour: "+error);
          }

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


   // Fonction pour récupérer et afficher des données de la BD
 const renderData = async () => {
    //alert(activeU);
       try {

                   const ac = await AsyncStorage.getItem("Produitàmodifier");

                   db.transaction(tx => {
                     tx.executeSql(
                       "SELECT * FROM Produits WHERE Nom = ?",
                       [ac],
                       (_, { rows }) => {

                               setIdProduit(rows.item(0).id);
                               setName(rows.item(0).Nom);
                               setDescription(rows.item(0).Description);
                               setPrix(rows.item(0).Prix.toString());
                               setQuantité(rows.item(0).Quantité.toString());
                               setSolde(rows.item(0).Solde.toString());
                               setActualDate(rows.item(0).DatePublication);
                               setCategorie(rows.item(0).Categorie);
                               setImageLink(rows.item(0).Image);

                               setLoading(false);
                          
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


useEffect(()=>{

      defaultCatégories();
      renderData();

 }, []);

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
             ( Veuillez remplir les différents champs ci-dessous pour mettre à jour votre produit )
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

                      value={prix}

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

                      value={quantité}

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

                      value = {solde}

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

                        defaultValue = {categorie}

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
                {/* <Image style={{
                        width: '53%',
                        height: 190,
                        borderRadius: 100,
                        marginBottom: '5%',
                        marginTop: '7%'
                      }} source={imageLink ? {uri:imageLink} : require('../images/emptyImage.jpeg')}
                    /> */}
                    {(imageLink == 7.0) && <Image style={{
                            width: '53%',
                            height: 190,
                            borderRadius: 100,
                            marginBottom: '5%',
                            marginTop: '7%'
                         }} source={require("../images/pain.jpg")} />}

                         {(imageLink == 8.0) && <Image style={{
                            width: '53%',
                            height: 190,
                            borderRadius: 100,
                            marginBottom: '5%',
                            marginTop: '7%'
                         }} source={require("../images/pain1.jpeg")} />}

                         {(imageLink != 7.0 && imageLink != 8.0) && <Image style={{
                            width: '53%',
                            height: 190,
                            borderRadius: 100,
                            marginBottom: '5%',
                            marginTop: '7%'
                         }} source={imageLink ? {uri:imageLink} : require('../images/emptyImage.jpeg')} />}
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
                   
                     onPress = {updateProduit}

                   >
                        <Text style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 22,
                          color: 'white'
                        }}>
                           Mettre à jour
                        </Text>
                    </TouchableOpacity>
          

        </View>
        </ScrollView>
    </View>
  )
}
