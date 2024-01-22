//import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useMemo} from 'react';
import { StyleSheet, View, Text, ImageBackground, TextInput, ScrollView, TouchableOpacity } from 'react-native';
//import RadioGroup from 'react-native-radio-buttons-group';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import SQLite from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';



export default function SignUpPage() {

  const navigation = useNavigation();
  const [checked, setChecked] = React.useState('third');

  // Variables sur les différents champs de notre formulaire
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tel, setTel] = useState();
  const [solde, setSolde] = useState(1000);
  const [gender, setGender] = useState('Client');
  const [profilLink, setProfilLink] = useState('');

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");

  useEffect(()=>{

       // Crée la table Users s'il n'en existe pas
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Email TEXT, Password TEXT, Tel REAL, Solde REAL, Gender TEXT, Profil TEXT)',
            [],
          // (_, error) => console.error('Erreur lors de la création de la table : ', error)
          );
        });

        // // Partie pour supprimer une table de la BD
        // db.transaction(tx => {
        //   tx.executeSql(
        //     "DROP TABLE IF EXISTS Users",
        //     [],
        //   // (_, error) => console.error('Erreur lors de la création de la table : ', error)
        //   );
        // });

    //createTable();

  }, []);


//fonction pour créer et ajouter un nouveau utilisateur
    const saveUser = () => {

      var aro = false;
 
       if(!username || !email || !password){
              alert("Remplissez tous les champs s'il vous plaît !");
       }else if(!tel){
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
                                    "SELECT * FROM Users",
                                    [],
                                    (_, { rows }) => {
                                      if (rows.length > 0) {
                                        for(let i=0; i<rows.length; i++){
                                            
                                            if(rows.item(i).Username == username || rows.item(i).Email == email){
                                                alert("Changer votre Username et votre Email s'il vous plaît !");
                                                return
                                            }else{
                                                    if(i == rows.length-1){ 
                                                      
                                                          db.transaction((tx) => {
                                                            tx.executeSql(
                                                            "INSERT INTO Users (Username, Email, Password, Tel, Solde, Gender, Profil) VALUES (?,?,?,?,?,?,?)",
                                                            [username, email, password, tel, solde, gender, profilLink]
                                                            )
                                                         } );
                        
                                                        alert("Informations sauvegardées avec succès. Vous avez 1000 Fcfa de Bonus pour votre inscription !");
                                                        navigation.navigate('LogIn');
                                                }
                                            }
                                        }
                                      } else {
                                            //alert("User not found in the database");
                                            db.transaction((tx) => {
                                              tx.executeSql(
                                              "INSERT INTO Users (Username, Email, Password, Tel, Solde, Gender, Profil) VALUES (?,?,?,?,?,?,?)",
                                              [username, email, password, tel, solde, gender, profilLink]
                                              )
                                           } );
          
                                          alert("Informations sauvegardées avec succès. Vous avez 1000 Fcfa de Bonus pour votre inscription !");
                                          navigation.navigate('LogIn');
                                      }
                                    },
                                    (_, error) => {
                                      console.log("Error fetching user details:", error);
                                      alert("Error fetching user details: " + error);
                                    }
                                  );
                                });


                              }catch(error){
                                alert("Il y'a eu des erreurs lors de la sauvegarde de vos informations: "+error);
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
    <View style = {styles.container}>
       <ImageBackground source={require("../images/signup.jpg")} style={{width:'100%', height:'100%'}}/>
          <ScrollView style={styles.formstyle}>
             <Text style={{
               fontSize: 34, 
               fontWeight: '900',
               color: 'white',
               textShadowColor: "black",
               textShadowOffset: {width: -1, height: 4},
               textShadowRadius: 4,
               marginBottom: 40,
               marginStart: 20,
               marginTop: '13%'
              }}
             >
               Veuillez renseigner vos informations ci-dessous:
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
                  
                   onChangeText = {setUsername}
                   
                  /> 

                  <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 4}}>Email:</Text>
                <TextInput placeholder='Appuyer ici pour remplir' style={{
                  backgroundColor:'rgb(211, 209, 209)', 
                  paddingHorizontal: 20, 
                  paddingVertical: 6, 
                  width: '80%', 
                  borderRadius: 20,
                  marginBottom: 10
                  }}
                  
                  onChangeText = {setEmail}
                  
                  />   

                  <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 4}}>Mot de passe:</Text>
                <TextInput placeholder='Appuyer ici pour remplir' secureTextEntry autoCorrect={false} style={{
                  backgroundColor:'rgb(211, 209, 209)', 
                  paddingHorizontal: 20, 
                  paddingVertical: 6, 
                  width: '80%', 
                  borderRadius: 20
                  }}
                  
                  onChangeText = {setPassword}
                  
                  />  

                  <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 4, marginTop: 10}}>Téléphone:</Text>
                <TextInput placeholder='ex: 600000000 ou 00000000' style={{
                  backgroundColor:'rgb(211, 209, 209)', 
                  paddingHorizontal: 20, 
                  paddingVertical: 6, 
                  width: '80%', 
                  borderRadius: 20
                  }}
                  
                   onChangeText = {(query) => {
                     if(query >= 0 && query.length > 7){
                       setTel(query);
                     }
                    }}
                  
                  />   

                    <View style={styles.radioButton}>
                          <RadioButton
                            value="first"
                            status={ checked === 'first' ? 'checked' : 'unchecked' }
                            onPress={() => {
                              setChecked('first');
                              setGender("Administrateur");
                              //alert('Vous êtes un administrateur')
                            }}
                          /><Text style={{marginEnd: 20}}>Administrateur</Text>
                    </View>

                    <View style={[styles.radioButton, {marginTop: -2}]}>
                          <RadioButton
                            value="second"
                            status={ checked === 'second' ? 'checked' : 'unchecked' }
                            onPress={() => {
                              setChecked('second');
                              setGender("Livreur");
                              //alert('Vous êtes un livreur')
                            }}
                          /><Text>Livreur(se)</Text>
                    </View>

                    <View style={[styles.radioButton, {marginTop: -2}]}>
                          <RadioButton
                            value="third"
                            status={ checked === 'third' ? 'checked' : 'unchecked' }
                            onPress={() => {
                              setChecked('third');
                              setGender("Client");
                              //alert('Vous êtes un client')
                            }}
                          /><Text>Client(e)</Text>
                    </View>
                    
                  
                  <TouchableOpacity style={{
                   // borderWidth: 2, 
                    marginTop: 30, 
                    width: '60%', 
                    padding: 9,
                    borderRadius: 20,
                    backgroundColor: 'rgb(24, 110, 209)'
                    }}
                    
                    onPress={()=>{
                      // navigation.navigate('LogIn')
                      saveUser();
                    }}
                    
                    >
                  <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white'}}
                  > Enregistrer </Text>
                  </TouchableOpacity> 

                   <View style={{
                       display: 'flex',
                       flexDirection: 'row',
                       marginTop: 6
                   }}>
                   <Text> Déjà un compte? </Text> 
                   <Text style={{color: 'rgb(24, 110, 209)', textDecorationLine: 'underline'}}
                      onPress={()=>{
                         navigation.navigate('LogIn')
                      }}
                   
                   > Se Connecter </Text> 
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
    height: 600,
    borderRadius: 25,
    backgroundColor: 'white',
    //justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 42,
    marginStart: '5%',
    marginBottom: '30%'
  },
  radioButton: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    //borderWidth: 3,
    width: '100%',
    paddingLeft: '10%'
  }
});