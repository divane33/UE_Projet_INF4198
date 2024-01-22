import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import * as SQLite from 'expo-sqlite';


import { Icon, List } from 'react-native-paper';

export default function AddFood() {

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  // Constantes du formulaire
   const [name, setName] = useState();
   const [description, setDescription] = useState();
   const [calorie, setCalorie] = useState();
   const [actualDate, setActualDate] = useState();
   const [categorie, setCategorie] = useState();
   const [imageLink, setImageLink] = useState();

   // Constante pour sélectionner une date
      const [date, setDate] = useState(new Date());
      const [show, setShow] = useState(false);
   //alert(date.getHours()+":"+date.getMinutes())
      

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setActualDate(currentDate.getFullYear() +"-"+ parseInt(currentDate.getMonth()+1) +"-"+ currentDate.getDate());
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


     // Fonction pour enregistrer les infos de la nourriture dans la BD
     const saveFood = () => {
        if(!name || !description || !calorie || !actualDate || !categorie || !imageLink){
           alert("Please fill in all the fields and select an image")
        }
     } 

     // Tableau des nourritures par défaut
     const tabDefaultsFoods = [
       {
         name: "Bread",
         description: "Bread is the traditional staple of many cultures. It is made from flour and water, and usually contains salt. Other ingredients are added depending on the type of bread and the way it is culturally prepared.",
         calorie: 265,
         actualDate: "2023-12-3",
         categorie: "starchy food",
         imageLink: "../images/pain1.jpeg"
       },
       {
         name: "Rice",
         description: "Rice is the seed of a semi-aquatic grass (Oryza sativa) that is cultivated extensively in warm climates in many countries, including the United States, for its edible grain. It is a staple food throughout the world.",
         calorie: 200,
         actualDate: "2023-12-3",
         categorie: "starchy food",
         imageLink: "../images/riz.jpeg"
       },
       {
        name: "Spaghetti",
        description: "Spaghetti is a long, thin, solid, cylindrical pasta. It is a staple food of traditional Italian cuisine. Like other pasta, spaghetti is made of milled wheat, water, and sometimes enriched with vitamins and minerals. Italian spaghetti is typically made from durum-wheat semolina.",
        calorie: 221,
        actualDate: "2023-12-3",
        categorie: "starchy food",
        imageLink: "../images/spaghetti.jpg"
      },
      {
        name: "Strawberries",
        description: "A strawberry is both a low-growing, flowering plant and also the name of the fruit that it produces. Strawberries are soft, sweet, bright red berries. They're also delicious. Strawberries have tiny edible seeds, which grow all over their surface.",
        calorie: 32,
        actualDate: "2023-12-3",
        categorie: "fruit and vegetable food",
        imageLink: "../images/fraises.jpeg"
      },
      {
        name: "Mandarin",
        description: "The mandarin is a fruit similar to the orange but smaller and flattened in its base. Its rind is smooth, shining red orange-coloured and very easy to peel, even with the hands. The mandarin is consumed mainly as fresh fruit, although there are also tinned mandarin gores.",
        calorie: 47,
        actualDate: "2023-12-3",
        categorie: "fruit and vegetable food",
        imageLink: "../images/mandarines.jpeg"
      },
      {
        name: "Tomato",
        description: "The tomato fruit is globular or ovoid. Botanically, the fruit exhibits all of the common characteristics of berries; a simple fleshy fruit that encloses its seed in the pulp. The outer skin is a thin and fleshy tissue that comprises the remainder of the fruit wall as well as the placenta.",
        calorie: 22,
        actualDate: "2023-12-3",
        categorie: "fruit and vegetable food",
        imageLink: "../images/tomate.jpeg"
      },
      {
        name: "Milk",
        description: "Milk is essentially an emulsion of fat and protein in water, along with dissolved sugar (carbohydrate), minerals, and vitamins. These constituents are present in the milk of all mammals, though their proportions differ from one species to another and within species.",
        calorie: 149,
        actualDate: "2023-12-3",
        categorie: "dairy food",
        imageLink: "../images/lait.jpeg"
      },
      {
        name: "Cheese",
        description: "Cheese is a nutrient-dense dairy food, providing protein, fats, and minerals. Some hard block cheeses that contain little moisture like Parmigiano-Reggiano and aged cheddar are easily stored and travel well because they do not require refrigeration.",
        calorie: 120,
        actualDate: "2023-12-3",
        categorie: "dairy food",
        imageLink: "../images/fromage.jpeg"
      },
      {
        name: "Rosted Fish",
        description: "Fish are aquatic vertebrate animals that have gills but lack limbs with digits, like fingers or toes. Recall that vertebrates are animals with internal backbones. Most fish are streamlined in their general body form.",
        calorie: 100,
        actualDate: "2023-12-3",
        categorie: "meat, fish and eggs food",
        imageLink: "../images/poisson.jpg"
      },
      {
        name: "Rosted Chicken",
        description: "Chickens are average-sized fowls, characterized by smaller heads, short beaks and wings, and a round body perched on featherless legs. Exact size varies greatly among breeds, as does color. In many breeds, both sexes will have fleshy skin folds on the chin and atop the head, known as wattles and combs, respectively.",
        calorie: 284,
        actualDate: "2023-12-3",
        categorie: "meat, fish and eggs food",
        imageLink: "../images/viande.jpg"
      },
      {
        name: "Egg",
        description: "Eggs, as a foodstuff, are an agricultural product derived from a variety of livestock farms and used by humans as a simple food or as an ingredient in the composition of many dishes in most cultures around the world.",
        calorie: 155,
        actualDate: "2023-12-3",
        categorie: "meat, fish and eggs food",
        imageLink: "../images/oeuf.jpg"
      }
      
     ]

     // Fonction pour ajouter les nourritures par défaut de l'application
     const placeDefaultFoods = () => {
          db.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM Foods",
              [],
              (_, { rows }) => {
                if (rows.length <= 0) {
                   for(let elt of tabDefaultsFoods){
                        db.transaction((tx) => {
                          tx.executeSql(
                          "INSERT INTO Foods (Name, Description, Calorie, Date, Category, Image) VALUES (?,?,?,?,?,?)",
                          [elt.name, elt.description, elt.calorie, elt.actualDate, elt.categorie, elt.imageLink]
                          )
                      } );
                   }        
                }
              },
              (_, error) => {
                console.log("Error fetching user details:", error);
                alert("Error fetching user details: " + error);
              }
            );
          });
     }

     useEffect(()=>{

      // Requête pour supprimer une table
      // db.transaction(tx => {
      //   tx.executeSql(
      //     'DROP TABLE IF EXISTS Foods',
      //     [],
      //     (_, res) => {
      //       alert('Table supprimée avec succès');
      //     },
      //     (_,error) => {
      //       alert('Erreur lors de la suppression de la table', error);
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
    <View style={{backgroundColor: 'white'}}>
        <ScrollView style={{height: 'auto'}}>
        <View>
           <Text style={{
             textAlign: 'center',
             fontSize: 25, 
             paddingHorizontal: 35,
             marginTop: 50,
             fontWeight: 'bold',
             fontFamily: 'sans-serif'
           }}

           >
             Please fill in the following form to add a food
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
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Food's name :</Text>
                <TextInput placeholder="Press here to fill in"
                      style = {{
                        //backgroundColor: "rgb(179, 178, 178)",
                        backgroundColor: "rgb(185, 197, 224)",
                        width: '80%',
                        padding: '2%',
                        paddingHorizontal: '5%',
                        borderRadius: 100,
                        marginBottom: '4%'
                      }}
                >
                </TextInput>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Food's description :</Text>
                <TextInput placeholder="Press here to fill in"

                      multiline={true}
                      numberOfLines={3}

                      style = {{
                        backgroundColor: "rgb(185, 197, 224)",
                        width: '80%',
                        padding: '2%',
                        paddingHorizontal: '5%',
                        borderRadius: 5,
                        marginBottom: '4%'
                      }}
                >
                </TextInput>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Amount of Calories :</Text>
                <TextInput placeholder="Press here to fill in"
                      style = {{
                        backgroundColor: "rgb(185, 197, 224)",
                        width: '80%',
                        padding: '2%',
                        paddingHorizontal: '5%',
                        borderRadius: 100,
                        marginBottom: '6%'
                      }}
                >
                </TextInput>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Select a Date :</Text>
                    <TouchableOpacity 
                        style={{
                          //borderWidth: 2,
                          width: '60%',
                          alignItems: 'center',
                          marginBottom: '6%',
                          padding: '1.5%',
                          borderRadius: 10,
                          backgroundColor: 'rgb(185, 197, 224)'
                        }}
                        onPress = {showDatepicker}
                    >
                        <TextInput
                          value={actualDate}
                          editable={false}
                          placeholder='0000-00-00'
                          style={{
                            color: 'black'
                          }}
                          //placeholderTextColor="red"
                        ></TextInput>
                    </TouchableOpacity>

                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Select a category :</Text>
                <View style={{
                  //borderWidth: 1,
                  width: '60%',
                  marginBottom: '6%',
                  backgroundColor: 'rgb(185, 197, 224)',
                }}>

                  <SelectDropdown
                        data={[
                          "starchy food", 
                          "fruit and vegetable food", 
                          "dairy food", 
                          "meat, fish and eggs food"
                        ]} 
                        onSelect = {(selectedItem, index) => {
                          //alert (selectedItem);
                        }}

                         buttonStyle={{
                           backgroundColor: 'rgb(185, 197, 224)',
                           height: 45
                         }}
                         buttonTextStyle={{
                           color: 'white',
                           fontWeight: 'bold'
                         }}

                        dropdownStyle={{
                          //backgroundColor: 'red',
                          width: '70%'
                        }}
                        // rowTextStyle={{
                        //   backgroundColor: 'yellow'
                        // }}
                  />

                </View>

                <Text style={{fontWeight: 'bold'}}>Upload an image :</Text>
                <Image style={{
                        width: '53%',
                        height: 190,
                        borderRadius: 100,
                        marginBottom: '5%',
                        marginTop: '7%'
                      }} source={imageLink ? {uri:imageLink} : require('../images/emptyImage.jpeg')}
                    />
                <View style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: '2%',
                  alignItems: 'center'
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
                    }}> or </Text>

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
                   
                     onPress = {saveFood}

                   >
                        <Text style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 22,
                          color: 'white'
                        }}>
                           Save
                        </Text>
                    </TouchableOpacity>
          

        </View>
        </ScrollView>
    </View>
  )
}
