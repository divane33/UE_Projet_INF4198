//import { StatusBar } from 'expo-status-bar';
import React, {useState, useMemo, useEffect} from 'react';
import { StyleSheet, View, Text, ImageBackground, TextInput, ScrollView, TouchableOpacity } from 'react-native';
//import RadioGroup from 'react-native-radio-buttons-group';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Home from './Home';


export default function LoginPage() {

  // tableau contenant les catégories à ajouter par défaut
  const tabCategorie = [
    {
      nom: "Produits Alimentaire",
      image: require("../images/catégorie_alimentaire.jpg"),
    },
    {
      nom: "Produits Electronique",
      image: require("../images/catégorie_électronique.jpg"),
    }
  ]

  const storeData = async (key, value, profilL, genre, solde, tel) => {
    try {
      await AsyncStorage.setItem(key, value);
      await AsyncStorage.setItem("LienProfil", profilL);
      await AsyncStorage.setItem("Genre", genre);
      await AsyncStorage.setItem("Solde", solde);
      await AsyncStorage.setItem("Tel", tel);
      await AsyncStorage.setItem("Interlocuteur", "Administrateur");
      //alert('ok now');
    } catch (error) {
      // Gérer l'erreur de sauvegarde
    }
  };

  const rememberData = async (name, pass) => {
    try {
      await AsyncStorage.setItem("User", name);
      await AsyncStorage.setItem("Pass", pass);
      //alert('ok now');
    } catch (error) {
      // Gérer l'erreur de sauvegarde
    }
  };

  const callrememberData = async () => {
    try {
      const user = await AsyncStorage.getItem("User");
      const pass = await AsyncStorage.getItem("Pass");
      setUsername(user);
      setPassword(pass);
    } catch (error) {
      alert("this is the error: "+error);
      // Gérer l'erreur de sauvegarde
    }
  };

  const navigation = useNavigation();
  const [checked, setChecked] = React.useState('first');
  const [casebox, setCasebox] = React.useState('unchecked');

  // Constantes des différents champs où l'utilisteur entre ses informations
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

   // constante pour ouvrir ma base de données GFOOD 
   const db = SQLite.openDatabase("GFOOD_db");

   useEffect(()=>{
         callrememberData();

         // Crée la table Categorie s'il n'en existe pas
          db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS Categorie (id INTEGER PRIMARY KEY AUTOINCREMENT, Nom TEXT, Image TEXT)',
                  [],
                // (_, error) => console.error('Erreur lors de la création de la table : ', error)
                );
              });
       }, []);


  // Fonction permettant de vérifier les informations entrées par l'utilisateur pour se login
    const logUser = () => {

            if(!username || !password){
                alert("Veuillez renseigner tous les champs s'il vous plaît !");
            }else{
               
                              try {
                                      db.transaction(tx => {
                                        tx.executeSql(
                                          "SELECT * FROM Users",
                                          [],
                                          (_, { rows }) => {
                                            if (rows.length > 0) {
                                              for(let i=0; i<rows.length; i++){
                                                  
                                                  if(rows.item(i).Username == username && rows.item(i).Password == password){
                                                       alert("Connecté avec succès");
                                                       navigation.navigate('Home');
                                                       storeData("activeUser", username, rows.item(i).Profil, rows.item(i).Gender, rows.item(i).Solde, rows.item(i).Tel);
                                                       if(casebox == 'checked'){
                                                          rememberData(username, password);
                                                       }
                                                       return
                                                  }else{
                                                    if(i == rows.length-1){ 
                                                      alert("Username ou Mot de passe incorrect !");
                                                      return
                                                    }
                                                  }
                                              }
                                            } else {
                                              alert("Il n'y a aucun utilisateur enregistré dans la Base de données. La BD est vide !");
                                              
                                              db.transaction(tx => {
                                                tx.executeSql(
                                                  "SELECT * FROM Categorie",
                                                  [],
                                                  (_, { rows }) => {
                                                    if (rows.length <= 0) {
                                                        for( let elt of tabCategorie) {

                                                                    db.transaction((tx) => {
                                                                        tx.executeSql(
                                                                        "INSERT INTO Categorie (Nom, Image) VALUES (?,?)",
                                                                        [elt.nom, elt.image]
                                                                        )
                                                                    } );

                                                        }
                                                    }
                                                  })
                                                })
                                            }
                                          },
                                          (_, error) => {
                                            console.log("Error fetching user details:", error);
                                            alert("Error fetching user details: " + error);
                                          }
                                        );
                                      });
                              
                                   } catch (error) {
                                        alert("There were some mistakes during the authentification of your information: " + error);
                              }

            }

    }

  return (
    <View style = {styles.container}>
       <ImageBackground source={require("../images/signin.png")} style={{width:'100%', height:'100%'}}/>
          <ScrollView style={styles.formstyle}>
             <Text style={{
               fontSize: 34, 
               fontWeight: '900',
               color: 'white',
               textShadowColor: "black",
               textShadowOffset: {width: -1, height: 4},
               textShadowRadius: 4,
               marginBottom: 30,
               marginStart: 20,
               marginTop: '15%'
              }}
             >
               Renseignez vos informations pour vous Connecter :
             </Text>
             <View style={styles.formFields}> 
                <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 4}}>Username:</Text>
                <TextInput placeholder='Appuyer ici pour remplir' style={{
                  backgroundColor:'rgb(211, 209, 209)', 
                  paddingHorizontal: 20, 
                  paddingVertical: 6, 
                  width: '80%', 
                  borderRadius: 20,
                  marginBottom: 10
                  }}

                    value={username}
                  
                    onChangeText = {setUsername}
                  
                  />   

                  <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 4}}>Mot de passe:</Text>
                <TextInput placeholder='Appuyer ici pour remplir' secureTextEntry autoCorrect={false} style={{
                  backgroundColor:'rgb(211, 209, 209)', 
                  paddingHorizontal: 20, 
                  paddingVertical: 6, 
                  width: '80%', 
                  borderRadius: 20
                  }}
                  
                  value={password}
                  onChangeText = {setPassword}
                  
                  />   

                <View style={{
                     alignItems: 'flex-end',
                     //borderWidth: 2,
                     width: '80%'
                  }}>
                   <Text style={{
                     marginTop: 7,
                     fontSize: 16,
                     fontWeight: 'bold',
                     color: 'rgb(19, 90, 170)'
                   }}
                   
                   onPress={()=>{
                    navigation.navigate("Password Recovery");
                   }}

                   > 
                    Mot de passe oublié ? 
                   </Text>
                </View>

                  <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '85%',
                    marginTop: 10
                  }}>
                       <Checkbox.Item status={casebox} onPress={()=>{
                         if(casebox == 'unchecked'){
                          setCasebox ("checked");
                         }else{
                          setCasebox ("unchecked");
                         }
                       }}/>
                       <Text style={{marginStart: -15, fontSize: 14, fontWeight:'bold'}}>Se souvenir de moi</Text>
                  </View>
                  
                  <TouchableOpacity style={{
                   // borderWidth: 2, 
                    marginTop: 5, 
                    width: '60%', 
                    padding: 9,
                    borderRadius: 20,
                    backgroundColor: 'rgb(24, 110, 209)'
                    }}
                    
                    onPress={()=>{
                      logUser();
                       // navigation.navigate('Home')
                   }}
                    
                    >
                  <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white'}}
                  > Connexion </Text>
                  </TouchableOpacity> 

                   <View style={{
                       display: 'flex',
                       flexDirection: 'row',
                       marginTop: 6
                   }}>
                   <Text> Pas de compte? </Text> 
                   <Text style={{color: 'rgb(24, 110, 209)', textDecorationLine: 'underline'}}
                      onPress={()=>{
                         navigation.navigate('SignUp')
                      }}
                   
                   > Enregistrez-vous </Text> 
                   </View>  

             </View>
          </ScrollView>     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  formstyle: {
    position: 'absolute',
    //borderWidth: 2,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.486)',
    //justifyContent: 'center',
    //alignItems:'center'
  },
  formFields: {
    //borderWidth: 2,
    width: '90%',
    height: 420,
    borderRadius: 25,
    backgroundColor: 'white',
    //justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 55,
    marginStart: '5%',
    marginBottom: '20%'
  },
  radioButton: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18
  }
});