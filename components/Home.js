//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Icon } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
//import { Drawer } from 'react-native-paper';


export default function Home() {

   // Tableau des nourritures de la base de données
   const tabFoods = [
      {
        id: "d1",
        name: "Bread",
        description: "Bread is the traditional staple of many cultures. It is made from flour and water, and usually contains salt. Other ingredients are added depending on the type of bread and the way it is culturally prepared.",
        calorie: 265,
        actualDate: "2023-12-3",
        categorie: "starchy food",
        imageLink: "../images/pain1.jpeg"
      },
      {
        id: "d2",
        name: "Rice",
        description: "Rice is the seed of a semi-aquatic grass (Oryza sativa) that is cultivated extensively in warm climates in many countries, including the United States, for its edible grain. It is a staple food throughout the world.",
        calorie: 200,
        actualDate: "2023-12-3",
        categorie: "starchy food",
        imageLink: "../images/riz.jpeg"
      },
      {
       id: "d3",
       name: "Spaghetti",
       description: "Spaghetti is a long, thin, solid, cylindrical pasta. It is a staple food of traditional Italian cuisine. Like other pasta, spaghetti is made of milled wheat, water, and sometimes enriched with vitamins and minerals. Italian spaghetti is typically made from durum-wheat semolina.",
       calorie: 221,
       actualDate: "2023-12-3",
       categorie: "starchy food",
       imageLink: "../images/spaghetti.jpg"
     },
     {
       id: "d4",
       name: "Strawberries",
       description: "A strawberry is both a low-growing, flowering plant and also the name of the fruit that it produces. Strawberries are soft, sweet, bright red berries. They're also delicious. Strawberries have tiny edible seeds, which grow all over their surface.",
       calorie: 32,
       actualDate: "2023-12-3",
       categorie: "fruit and vegetable food",
       imageLink: "../images/fraises.jpeg"
     },
     {
       id: "d5",
       name: "Mandarin",
       description: "The mandarin is a fruit similar to the orange but smaller and flattened in its base. Its rind is smooth, shining red orange-coloured and very easy to peel, even with the hands. The mandarin is consumed mainly as fresh fruit, although there are also tinned mandarin gores.",
       calorie: 47,
       actualDate: "2023-12-3",
       categorie: "fruit and vegetable food",
       imageLink: "../images/mandarines.jpeg"
     },
     {
       id: "d6",
       name: "Tomato",
       description: "The tomato fruit is globular or ovoid. Botanically, the fruit exhibits all of the common characteristics of berries; a simple fleshy fruit that encloses its seed in the pulp. The outer skin is a thin and fleshy tissue that comprises the remainder of the fruit wall as well as the placenta.",
       calorie: 22,
       actualDate: "2023-12-3",
       categorie: "fruit and vegetable food",
       imageLink: "../images/tomate.jpeg"
     },
     {
       id: "d7",
       name: "Milk",
       description: "Milk is essentially an emulsion of fat and protein in water, along with dissolved sugar (carbohydrate), minerals, and vitamins. These constituents are present in the milk of all mammals, though their proportions differ from one species to another and within species.",
       calorie: 149,
       actualDate: "2023-12-3",
       categorie: "dairy food",
       imageLink: "../images/lait.jpeg"
     },
     {
       id: "d8",
       name: "Cheese",
       description: "Cheese is a nutrient-dense dairy food, providing protein, fats, and minerals. Some hard block cheeses that contain little moisture like Parmigiano-Reggiano and aged cheddar are easily stored and travel well because they do not require refrigeration.",
       calorie: 120,
       actualDate: "2023-12-3",
       categorie: "dairy food",
       imageLink: "../images/fromage.jpeg"
     },
     {
       id: "d9",
       name: "Rosted Fish",
       description: "Fish are aquatic vertebrate animals that have gills but lack limbs with digits, like fingers or toes. Recall that vertebrates are animals with internal backbones. Most fish are streamlined in their general body form.",
       calorie: 100,
       actualDate: "2023-12-3",
       categorie: "meat, fish and eggs food",
       imageLink: "../images/poisson.jpg"
     },
     {
       id: "d10",
       name: "Rosted Chicken",
       description: "Chickens are average-sized fowls, characterized by smaller heads, short beaks and wings, and a round body perched on featherless legs. Exact size varies greatly among breeds, as does color. In many breeds, both sexes will have fleshy skin folds on the chin and atop the head, known as wattles and combs, respectively.",
       calorie: 284,
       actualDate: "2023-12-3",
       categorie: "meat, fish and eggs food",
       imageLink: "../images/viande.jpg"
     },
     {
       id: "d11",
       name: "Egg",
       description: "Eggs, as a foodstuff, are an agricultural product derived from a variety of livestock farms and used by humans as a simple food or as an ingredient in the composition of many dishes in most cultures around the world.",
       calorie: 155,
       actualDate: "2023-12-3",
       categorie: "meat, fish and eggs food",
       imageLink: "../images/oeuf.jpg"
     }
     
    ]


    // différentes constantes pour l'affichage des catégories de nourriture
    const [display1, setDisplay1] = useState("block");




   // Fonction qui affiche les nourritures de categorie "starchy food"
   const starchyFoods = () => {
          
      //   const tab = ["pomme", "apple", "carotte"];
      //   return tab.map((po, index) => {
      //      if(po == "carotte" && po.includes(searchQuery.toLocaleLowerCase())){
      //         return (<Text key={index}>{po}</Text>)
      //      }
      //   })


       return tabFoods.map((food, index) => {
          if((food.categorie === "starchy food") && (food.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) || food.description.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) || food.actualDate.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) || food.categorie.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))){
             
            setDisplayStarchy(true);

            if(food.id === "d1"){
                  return ( <TouchableOpacity key={index} style={{
                     borderWidth: 4,
                     width: 305,
                     height: "105%",
                     backgroundColor: "white",
                     borderRadius: 20,
                     marginHorizontal: 10,
                     overflow: "hidden",
                     flexDirection: "column",
                     borderColor: "brown"
                  }}>
                   
                   <Image style={{
                      width: "100%",
                      height: "75%"
                   }} source={require("../images/pain1.jpeg")} />
                   <Text style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginLeft: 20,
                      color: 'brown'
                   }}>Bread  </Text>
                   <Text style={{
                      fontWeight: "bold",
                      marginLeft: 20,
                      textDecorationLine: "underline",
                      color: 'orangered'
                   }}>See more Infos +</Text>

                  </TouchableOpacity>
                  )
             } else if(food.id === "d2") {
                return (<TouchableOpacity key={index} style={{
                  borderWidth: 4,
                  width: 305,
                  height: "105%",
                  backgroundColor: "white",
                  borderRadius: 20,
                  marginHorizontal: 10,
                  overflow: "hidden",
                  flexDirection: "column",
                  borderColor: "brown"
               }}>
                
                <Image style={{
                   width: "100%",
                   height: "75%"
                }} source={require("../images/riz.jpeg")} />
                <Text style={{
                   fontSize: 20,
                   fontWeight: 'bold',
                   marginLeft: 20,
                   color: 'brown'
                }}>Rice</Text>
                <Text style={{
                   fontWeight: "bold",
                   marginLeft: 20,
                   textDecorationLine: "underline",
                   color: 'orangered'
                }}>See more Infos +</Text>

               </TouchableOpacity>)
             } else if (food.id === "d3"){
                return (<TouchableOpacity key={index} style={{
                  borderWidth: 4,
                  width: 305,
                  height: "105%",
                  backgroundColor: "white",
                  borderRadius: 20,
                  marginHorizontal: 10,
                  overflow: "hidden",
                  flexDirection: "column",
                  borderColor: "brown"
               }}>
                
                <Image style={{
                   width: "100%",
                   height: "75%"
                }} source={require("../images/spaghetti.jpg")} />
                <Text style={{
                   fontSize: 20,
                   fontWeight: 'bold',
                   marginLeft: 20,
                   color: 'brown'
                }}>Spaghetti</Text>
                <Text style={{
                   fontWeight: "bold",
                   marginLeft: 20,
                   textDecorationLine: "underline",
                   color: 'orangered'
                }}>See more Infos +</Text>

               </TouchableOpacity>)
             } else {
               return (<TouchableOpacity key={index} style={{
                 borderWidth: 4,
                 width: 305,
                 height: "105%",
                 backgroundColor: "white",
                 borderRadius: 20,
                 marginHorizontal: 10,
                 overflow: "hidden",
                 flexDirection: "column",
                 borderColor: "brown"
              }}>
               
               <Image style={{
                  width: "100%",
                  height: "75%"
               }} source={{uri: food.imageLink}} />
               <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 20,
                  color: 'brown'
               }}>{food.name}</Text>
               <Text style={{
                  fontWeight: "bold",
                  marginLeft: 20,
                  textDecorationLine: "underline",
                  color: 'orangered'
               }}>See more Infos +</Text>

              </TouchableOpacity>)
            }
          }else{
              setDisplayStarchy(false);
          }
       })
   }


  // Constante de notification
   const [color, setColor] = useState('red');

   // Constantes d'affichage des différentes sections de catégories de nourritures
   const [displayStarchy, setDisplayStarchy] = useState(true);
   const [displayFV, setDisplayFV] = useState(true);
   const [displayDairy, setDisplayDairy] = useState(true);
   const [displayMFE, setDisplayMFE] = useState(true);

   const navigation = useNavigation();

   const [userID, setUserID] = useState(" ");

   // constante pour ouvrir ma base de données GFOOD 
    const db = SQLite.openDatabase("GFOOD_db");

    const getData = async () => {
      try {
        const ac = await AsyncStorage.getItem("activeUser");
        if(ac !== null){
           setUserID(ac);
        }else{
           navigation.navigate("LogIn")
        }
        //alert('ok now');
      } catch (error) {
        // Gérer l'erreur de sauvegarde
      }
    };
    useEffect(() =>{
       //alert("Bien là")
       setInterval(() => {
         getData();
       }, 2000)
    }, []);


   const [active, setActive] = React.useState('');

   //Pour la barre de recherche
   const [searchQuery, setSearchQuery] = React.useState('');
   const onChangeSearch = query => setSearchQuery(query);


     return (
      <View style={styles.container}>
           
           <TouchableOpacity style={{
              position: 'absolute',
              bottom: '6%',
              right: '8%',
              //borderWidth: 2,
              padding: '2.5%',
              borderRadius: 50,
              backgroundColor: 'rgb(10, 146, 10)',
              zIndex: 20,
              alignItems: 'center',
              justifyContent: 'center'
           }}

           
           onPress={()=>{
              navigation.navigate("Messaging support");
              //alert(userID);
         }}

           >
          
               <View style={{
                  position: 'absolute',
                  borderWidth: 10,
                  top: '-1%',
                  right: '2%',
                  borderRadius: 100,
                  borderColor: color
               }}></View>
               
               <Icon
                   source="chat"
                   size={50}
                   color="rgb(202, 235, 135)"
               />
           </TouchableOpacity>

           <TouchableOpacity 
                       
                           style={{
                              //borderWidth: 2,
                              borderColor: 'red',
                              padding: '1%',
                              borderRadius: 100,
                              zIndex: 20,
                              position: 'absolute',
                              top: '7%',
                              right: '4%',
                              backgroundColor: 'rgb(2, 2, 173)'
                           }}
                    
                           onPress={()=>{
                              navigation.navigate("Votre Panier");
                         }}
                    >
                       
                       <Text 
                       
                       style = {{
                          //borderWidth: 2,
                          borderColor: 'red',
                          position: 'absolute',
                          width: '40%',
                          height: '40%',
                          zIndex: 3,
                          left: '-7%',
                          top: '-2%',
                          borderRadius: 100,
                          backgroundColor: 'orangered'
                       }}
                        
                       ></Text>

                        <Icon
                           source="basket"
                           size={39}
                           color="cyan"
                        />
           </TouchableOpacity>

            <View style={{
                   position: 'absolute',
                   //borderWidth: 3,
                   //borderColor: 'red',
                   bottom: 0,
                   width: '60%',
                   height: '30%',
                   borderTopEndRadius: 210,
                   //borderRadius: 20,
                   //backgroundColor: 'rgb(247, 139, 89)'
                   //backgroundColor: 'rgba(80, 50, 36, 0.45)'
                   backgroundColor: 'rgb(245, 217, 180)'
               }}> 
            </View>
            
           <View style={{
                   position: 'absolute',
                   //borderWidth: 3,
                   //borderColor: 'red',
                   top: 0,
                   right: 0,
                   width: '100%',
                   height: 280,
                   borderBottomStartRadius: 150,
                   //backgroundColor: 'rgb(247, 139, 89)'
                   backgroundColor: 'rgb(245, 217, 180)'
                   //backgroundColor: 'rgba(80, 50, 36, 0.459)'
               }}></View>


             <ScrollView style={{height: 'auto'}}>
             
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                     <View style={{
                     //borderWidth: 2,
                     marginTop: '22%',
                     padding: '1%',
                     display: 'flex',
                     flexDirection: 'row',
                     gap: '2%',
                     flexDirection: 'row',
                             //borderWidth: 3,
                             //paddingHorizontal: '5%',
                             alignItems: "center",
                             paddingRight: '5%'
                    }}>
                        <Text style={{backgroundColor: 'rgb(212, 90, 8)', color: 'white', fontSize: 18, padding: '3%', minWidth: '20%', textAlign: 'center', borderRadius: 15, fontWeight: 'bold'}}>Tous</Text>
                        <Text style={{backgroundColor: 'orange', color: 'white', fontSize: 18, padding: '3%', minWidth: '60%', textAlign: 'center', borderRadius: 15, fontWeight: 'bold'}}>Produits alimentaires</Text>
                        <Text style={{backgroundColor: 'orange', color: 'white', fontSize: 18, padding: '3%', minWidth: '60%', textAlign: 'center', borderRadius: 15, fontWeight: 'bold'}}>Produits électroniques</Text>
                        <Text style={{minWidth: '2%'}}> </Text>
                     </View>
                </ScrollView>
             

               <View style={styles.welcome}>
                  <Text style={{textAlign: 'center', 
                                fontSize: 28, 
                                fontWeight: '900', 
                                color: 'white',
                                textShadowColor: "black",
                                textShadowOffset: {width: 2, height: 8},
                                textShadowRadius: 7,
                                }}>
                                   Bienvenu à vous
                  </Text>
                  <Text style={{textAlign: 'center', 
                                fontSize: 36, 
                                fontWeight: '900', 
                                color: 'white',
                                textShadowColor: "black",
                                textShadowOffset: {width: 2, height: 8},
                                textShadowRadius: 7,
                                }}>
                                  {userID}
                  </Text>
               </View>

               <Text style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 25,
                  paddingHorizontal: '5%',
                  marginTop: '7%',
                  fontStyle: 'italic',
                  color: 'rgb(148, 43, 1)'
               }}>
                  Tous ceux dont vous avez besoin sont ci-dessous
               </Text>

               <Searchbar
                     placeholder="Rechercher un produit"
                     onChangeText={(query) => {

                        setSearchQuery(query);

                        // starchyFoods();
                        // fvFoods();
                        // dairyFoods();
                        // mfeFoods();

                     }}
                     //value={searchQuery}
                     //placeholderTextColor = "white"

                     onSubmitEditing = {() => {
                        //alert("OK !");
                     }}

                     style={{
                        //marginVertical: 25,
                        marginBottom: '8%',
                        width: '90%',
                        marginStart: '5%',
                        backgroundColor: 'hsl(282, 38%, 86%)'
                     }}
               />

               <View style={{
                  
               }}>

                  <View style={styles.list1}>
                     {displayStarchy && (<>
                    <ScrollView horizontal={true}>

                          <View style={{
                             flexDirection: 'row',
                             //borderWidth: 3,
                             paddingLeft: 10,
                             paddingHorizontal: 0,
                             alignItems: "center",
                             width: '100vw',
                             gap: 15
                             //justifyContent: "center"
                          }}>
                             <TouchableOpacity style={{
                                //borderWidth: 3,
                                borderColor: 'purple',
                                width: '90%',
                                height: '90%',
                                borderRadius: 20,
                                overflow: 'hidden',
                                position: 'relative'
                             }}>

                                    <Image style={{
                                       width: "100%",
                                       height: "100%"
                                    }} source={require("../images/catégorie_alimentaire.jpg")} />

                                    <Text style={{
                                       position: 'absolute',
                                       width: '100%',
                                       height: '100%',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                       fontSize: 25,
                                       fontWeight: 'bold',
                                       color: 'white',
                                       textShadowColor: "black",
                                       textShadowOffset: {width: -3, height: 3},
                                       textShadowRadius: 1,
                                    }}> Produits alimentaires </Text>

                             </TouchableOpacity>

                             <View style={{
                                borderWidth: 3,
                                borderColor: 'purple',
                                width: '90%',
                                height: '90%',
                                borderRadius: 20,
                                overflow: 'hidden',
                                position: 'relative'
                             }}>

                                    <Image style={{
                                       width: "100%",
                                       height: "100%"
                                    }} source={require("../images/catégorie_électronique.jpg")} />

                             </View>
                             {/* {starchyFoods()} */}

                          </View>
                       </ScrollView></>)}
                  </View>

                  <View style={styles.list1}>
                     {displayFV && (<><Text style={{
                       fontWeight: "bold",
                       fontSize: 18,
                       color: "maroon",
                       fontStyle: 'italic'
                       //borderWidth: 3,
                       //width: 2
                    }}>_____Différents Produits</Text>
                    
                    <ScrollView>

                          <View style={{
                             flexDirection: 'column',
                             borderWidth: 1,
                             //padding: 20,
                             paddingHorizontal: 0,
                             //alignItems: "center",
                             width: '90vw',
                             minHeight: 450,
                             marginVertical: 15,
                             marginLeft: '5%',
                             backgroundColor: 'white',
                             //backgroundColor: 'rgb(211, 211, 211)',
                             borderRadius: 20,
                             overflow: 'hidden',
                             paddingBottom: 10
                             //justifyContent: "center"
                          }}>

                                    <Image style={{
                                       width: "100%",
                                       minHeight: "55%"
                                    }} source={require("../images/salmon.jpg")} />
                                     
                                    <Text style={{color: 'maroon', marginVertical: 5, textAlign: 'center', fontSize: 26, fontWeight: 'bold', paddingHorizontal: '3%'}}>Saumon</Text> 
                                    <Text style={{textAlign: 'center', fontSize: 15, paddingHorizontal: '3%', fontStyle: 'italic'}}>
                                       Saumon très frais pour tous vos repas de maison ou de restaurant. Contient de bonnes 
                                       propriétés pour garantir la santé du corps humain.
                                    </Text>
                                    <Text style={{color: 'orangered', textAlign: 'center', marginVertical: 5, fontWeight: 'bold', fontSize: 22}}>- 500 fcfa -</Text> 

                                    <Text style={{color: 'white', backgroundColor: 'rgb(67, 146, 211)', fontWeight: 'bold', fontSize: 18, textAlign: 'center', borderRadius: 10,padding: 13, width: '60%', marginLeft: '20%'}}>Ajouter au Panier</Text>

                             {/* {fvFoods()} */}

                          </View>

                          <View style={{
                             flexDirection: 'row',
                             borderWidth: 3,
                             padding: 20,
                             paddingHorizontal: 0,
                             alignItems: "center",
                             width: '90vw',
                             height: 250,
                             marginVertical: 15,
                             marginLeft: '5%'
                             //justifyContent: "center"
                          }}>

                             {/* {fvFoods()} */}

                          </View>
                       </ScrollView></>)}
                  </View>

                  <View style={styles.list1}>
                     {displayDairy && (<><Text style={{
                       fontWeight: "bold",
                       fontSize: 18,
                       color: "green"
                       //borderWidth: 3,
                       //width: 2
                    }}>_____Dairy Foods</Text><ScrollView horizontal={true}>

                          <View style={{
                             flexDirection: 'row',
                             //borderWidth: 3,
                             padding: 20,
                             paddingHorizontal: 0,
                             alignItems: "center",
                             //justifyContent: "center"
                          }}>

                             {/* {dairyFoods()} */}

                          </View>
                       </ScrollView></>)}
                  </View>

                  <View style={styles.list1}>
                     {displayMFE && (<><Text style={{
                       fontWeight: "bold",
                       fontSize: 18,
                       color: "green"
                       //borderWidth: 3,
                       //width: 2
                    }}>_____Meat, fish and eggs Foods</Text><ScrollView horizontal={true}>

                          <View style={{
                             flexDirection: 'row',
                             //borderWidth: 3,
                             padding: 20,
                             paddingHorizontal: 0,
                             alignItems: "center",
                             //justifyContent: "center"
                          }}>

                             {/* {mfeFoods()} */}

                          </View>
                       </ScrollView></>)}
                  </View>

               </View>  

            </ScrollView> 
         </View>
     )
}


const styles = StyleSheet.create({

   container: {
      flex: 1,
      height:'100%',
      //borderWidth: 2,
      borderColor: 'green',
      //backgroundColor: 'rgb(245, 250, 206)',
      //backgroundColor: 'rgb(250, 238, 233)',
      position: 'relative',
   },

   list1: {
      //borderWidth: 2,
      minHeight: 290,
      marginBottom: 30
   },

   welcome: {
      display: 'flex',
      flexDirection: 'column',
      //borderWidth: 2,
      borderColor: 'red',
      height: 160,
      width:'85%',
      marginTop: '5%',
      marginStart: '7.5%',
      paddingVertical: '10%',
      justifyContent: 'center',
      borderRadius: 32,
      //backgroundColor: 'rgb(2, 22, 44)'
      //backgroundColor: 'rgb(71, 54, 6)'
      //backgroundColor: 'rgb(44, 22, 12)'
      backgroundColor: 'rgb(66, 27, 2)'
   }
})